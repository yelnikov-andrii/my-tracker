/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { List, ListItem, Paper, Typography } from '@mui/material';
import { TodoInterface } from '../../../types/todos';
import { useAddTodosWhenRepeatedTasks } from '../../../helpers/addTodosWhenRepeatsWeekdayTasks';
import { ListItemComponent } from './ListItemComponent';

interface Props {
  date: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const TodoList: React.FC<Props> = ({ date, setIsOpen }) => {
  const { days } = useSelector((state: RootState) => state.todos);
  const { todosRepeated } = useSelector((state: RootState) => state.todosRepeated);
  const { currentDate } = useSelector((state: RootState) => state.time);
  useAddTodosWhenRepeatedTasks(currentDate);

  console.log(todosRepeated, 'repeated todos')

  const foundTodo = React.useMemo(() => {
    const foundTodo = days.find(day => day.date === date);
    if (foundTodo) {
      return foundTodo;
    }
    
  }, [date, days]);

  return (
    <React.Fragment>
    <Typography variant='h6'>
      Список завдань
    </Typography>
      <List>
        {foundTodo && foundTodo.todos.length > 0 ? foundTodo.todos.map((todo: TodoInterface) => (
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
