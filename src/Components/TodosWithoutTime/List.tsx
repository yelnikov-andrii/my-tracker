/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Checkbox, List, ListItem } from '@mui/material';
import React, { useEffect } from 'react';
import { baseUrl } from '../../helpers/baseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoWithoutAction, getTodosWithoutTimeFromServer } from '../../store/todosSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetTodosWIthoutTime } from '../../helpers/useGetTodosWithoutTIme';

export const TodoList = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const todosWithoutTime = useSelector((state: RootState) => state.todos.todosWithoutTime);
  const dispatch = useDispatch();
  const getTodosWithoutTime = useGetTodosWIthoutTime();

  useEffect(() => {
    if (user) {
      getTodosWithoutTime();
    }
  }, [user]);

  async function updateTodo(todo: TodoWithoutTmeI) {
    const newTodo = { ...todo };
    newTodo.completed = !todo.completed;

    try {
      const response = await fetch(`${baseUrl}/todos-without-time/${todo.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ newTodo, todoId: todo.id, userId: user.id })
      });

      if (!response.ok) {
        console.error('Error: Cannot update todo');
        return;
      } else {
        getTodosWithoutTime();
      }
    } catch (e) {
      console.log(e);
    }
  }

  function toggleTodo(todo: TodoWithoutTmeI) {
    updateTodo(todo);
    const updatedTodos = todosWithoutTime.map(t => {
      if (t.id !== todo.id) {
        return t;
      } else {
        const newTodo = { ...t };
        newTodo.completed = !t.completed;
        return newTodo;
      }
    });
    
    dispatch(getTodosWithoutTimeFromServer(updatedTodos));
  }

  async function deleteTodo(todo: TodoWithoutTmeI) {
    try {
      const response = await fetch(`${baseUrl}/todos-without-time/${todo.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id })
      });

      if (!response.ok) {
        console.log('Error: Cannot delete todo');
        return;
      }

      console.log('Todo deleted successfully');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  return (
    <React.Fragment>
      <List sx={{
        margin: '0 0 24px 0'
      }}>
        {todosWithoutTime.length > 0 ? todosWithoutTime.map(todo => (
          <ListItem key={todo.id} style={{
            fontWeight: '500',
            fontSize: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '12px',
            border: '1px solid #e0e0e0',
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
            borderRadius: '12px',
            backgroundColor: todo.completed ? '#f9f9f9' : 'white',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            textDecoration: todo.completed ? 'line-through' : '',
            color: todo.completed ? '#9e9e9e' : 'inherit',
            opacity: todo.completed ? '0.7' : '1'
          }}
            onMouseEnter={(e) => {
              (e.currentTarget.style.border = '1px solid #0057b8');
              (e.currentTarget.style.boxShadow = '0px 0px 16px rgba(0, 87, 184, 0.4)');
            }}
            onMouseLeave={(e) => {
              (e.currentTarget.style.border = '1px solid #e0e0e0');
              (e.currentTarget.style.boxShadow = '0px 0px 12px rgba(0, 0, 0, 0.2)');
            }}
          >
            <Box style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {todo?.name}
              <Checkbox
                onChange={() => toggleTodo(todo)}
                checked={todo.completed}
              />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'flex-start', width: '100%'}} onClick={() => {
              deleteTodo(todo);
              dispatch(deleteTodoWithoutAction(todo.id));

            }}>
              <Button variant="outlined" size="small">
                <DeleteIcon />
              </Button>
            </Box>
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
