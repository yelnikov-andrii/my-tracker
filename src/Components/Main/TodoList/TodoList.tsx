/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { List, ListItem, Paper, Typography } from '@mui/material';
import { TodoInterface } from '../../../types/todos';
import { useAddTodosWhenRepeatedTasks } from '../../../helpers/addTodosWhenRepeatsWeekdayTasks';
import { ListItemComponent } from './ListItemComponent';
import { ToggleBlock } from './ToggleBlock';

interface Props {
  date: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const TodoList: React.FC<Props> = ({ date, setIsOpen }) => {
  const { days } = useSelector((state: RootState) => state.todos);
  const { currentDate } = useSelector((state: RootState) => state.time);
  useAddTodosWhenRepeatedTasks(currentDate);


  const foundDay = React.useMemo(() => {
    const foundDay = days.find(day => day.date === date);
    if (foundDay) {
      return foundDay;
    }
    
  }, [date, days]);

  return (
    <React.Fragment>
    <Typography variant='h6'>
      Список завдань
    </Typography>
      <ToggleBlock 
        date={date}
        foundDay={foundDay || null}
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
