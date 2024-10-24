/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { List, ListItem, Paper } from '@mui/material';
import { TodoInterface } from '../../../types/todos';
import { useAddTodosWhenRepeatedTasks } from '../../../helpers/useAddTodosWhenRepeatedTasks';
import { ListItemComponent } from './ListItemComponent';
import { ToggleBlock } from './ToggleBlock';
import dayjs from 'dayjs';

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

  const getSortedTodos = (todos: TodoInterface[]) => {
    return todos.slice().sort((a, b) => dayjs(a.start).diff(dayjs(b.start)));
  };

  const sortedTodos = useMemo(() => {
    if (!foundDay) {
      return [];
    } else {
      const sortedTodos = getSortedTodos(foundDay?.todos);
      return sortedTodos;
    }
  }, [foundDay?.todos]);

  return (
    <React.Fragment>
      <ToggleBlock 
        date={date}
        foundDay={foundDay || null}
        active={(foundDay && foundDay?.todos?.length > 0) || false}
      />
      <List>
        {sortedTodos.length > 0 ? sortedTodos.map((todo: TodoInterface) => (
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
