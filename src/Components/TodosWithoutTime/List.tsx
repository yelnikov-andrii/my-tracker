/* eslint-disable react-hooks/exhaustive-deps */
import { List, ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../helpers/baseUrl';
import { useSelector } from 'react-redux';

export const TodoList = () => {
  const [todosWithoutTime, setTodosWithoutTime] = useState<TodoWithoutTmeI[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  async function getTodosWithoutTime() {
    try {
      const response = await fetch(`${baseUrl}/todos-without-time/${user?.id}`);
      const todos = await response.json();
      setTodosWithoutTime(todos);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (user) {
      getTodosWithoutTime();
    }
  }, [user]);

  return (
    <React.Fragment>
      <List>
        {todosWithoutTime?.length ? todosWithoutTime.map(todo => (
          <ListItem key={todo.id}>
            {todo?.name}
          </ListItem>
        )) : (
          <ListItem>
            Немає завдань
          </ListItem>
        )}

      </List>
    </React.Fragment>
  )
}
