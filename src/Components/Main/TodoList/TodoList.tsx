/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { List, ListItem, Paper, Typography } from '@mui/material';
import { TodoInterface } from '../../../types/todos';
import { useAddTodosWhenRepeatedTasks } from '../../../helpers/useAddTodosWhenRepeatedTasks';
import { ListItemComponent } from './ListItemComponent';
import { ToggleBlock } from './ToggleBlock';
import { changeTimeAfterAddingTodo } from '../../../helpers/changeTimeAfterAdd';
import { setInitialTime } from '../../../store/timeSlice';

interface Props {
  date: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const TodoList: React.FC<Props> = ({ date, setIsOpen }) => {
  const { days } = useSelector((state: RootState) => state.todos);
  const { currentDate } = useSelector((state: RootState) => state.time);
  useAddTodosWhenRepeatedTasks(currentDate);
  const dispatch = useDispatch();


  const foundDay = React.useMemo(() => {
    const foundDay = days.find(day => day.date === date);
    if (foundDay) {
      return foundDay;
    }
    
  }, [date, days]);

  React.useEffect(() => {
  const foundDay = days.find(day => day.date === date);
  if (foundDay && foundDay?.todos.length > 0) {
    const lastTodo = foundDay.todos[foundDay.todos.length - 1];
    const finishMinutes = lastTodo?.finish.slice(lastTodo.finish.indexOf(':') + 1);
    const finishHour = lastTodo?.finish.slice(0, lastTodo.finish.lastIndexOf(':'));
    changeTimeAfterAddingTodo(finishHour, finishMinutes, dispatch);
  } else {
    dispatch(setInitialTime());
  }
  }, [foundDay]);

  return (
    <React.Fragment>
    <Typography variant='h6'>
      Список завдань
    </Typography>
      <ToggleBlock 
        date={date}
        foundDay={foundDay || null}
        active={(foundDay && foundDay?.todos?.length > 0) || false}
      />
      <List>
        {foundDay && foundDay.todos.length > 0 ? foundDay.todos.map((todo: TodoInterface) => (
          <ListItemComponent
            todo={todo}
            key={todo.id}
            date={date}
            setIsOpen={setIsOpen}
          />
        )) : (
          <Paper variant='outlined'>
            <ListItem>
              Немає завдань
            </ListItem>
          </Paper>
        )}
      </List>
    </React.Fragment>
  )
}
