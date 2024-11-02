/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem } from '@mui/material';
import { TodoInterface } from '../../../types/todos';
import { useAddTodosWhenRepeatedTasks } from '../../../helpers/useAddTodosWhenRepeatedTasks';
import { ListItemComponent } from './ListItemComponent';
import { ToggleBlock } from './ToggleBlock';
import dayjs from 'dayjs';
import { setFilteredTodos } from '../../../store/todosSlice';

interface Props {
  date: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const TodoList: React.FC<Props> = ({ date, setIsOpen }) => {
  const { days, todos } = useSelector((state: RootState) => state.todos);
  const { currentDate } = useSelector((state: RootState) => state.time);
  const dispatch = useDispatch();
  useAddTodosWhenRepeatedTasks(currentDate);

  const filteredTodos = useMemo(() => {
    const res = todos?.filter((todo: any) => {
      const startTime = todo.start;
      const todoDate = dayjs(startTime).format('DD.MM.YYYY');
      if (todoDate === date) {
        return todo;
      }
    });

      return res || [];
  }, [todos, date]);

  useEffect(() => {
    dispatch(setFilteredTodos(filteredTodos));
  }, [filteredTodos]);


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
    if (!todos || todos?.length === 0) {
      return [];
    } else {
      const sortedTodos = getSortedTodos(filteredTodos);
      return sortedTodos;
    }
    // if (!foundDay) {
    //   return [];
    // } else {
    //   const sortedTodos = getSortedTodos(foundDay?.todos);
    //   return sortedTodos;
  // }, [foundDay?.todos]);
  }, [todos]);

  return (
    <React.Fragment>
      <ToggleBlock 
        date={date}
        foundDay={foundDay || null}
        active={(foundDay && foundDay?.todos?.length > 0) || false}
      />
      <List sx={{display: 'flex', flexDirection:'column', gap: '32px'}}>
        {sortedTodos.length > 0 ? sortedTodos.map((todo: TodoInterface) => (
          <ListItemComponent
            todo={todo}
            key={todo.id}
            date={date}
            setIsOpen={setIsOpen}
          />
        )) : (
            <ListItem>
              Немає завдань
            </ListItem>
        )}
      </List>
    </React.Fragment>
  )
}
