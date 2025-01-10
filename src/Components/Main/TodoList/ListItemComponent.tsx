import { Box, Checkbox, ListItem } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { Buttons } from './Buttons';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { baseUrl } from '../../../helpers/baseUrl';
import { changeTodoAction } from '../../../store/todosSlice';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

interface Props {
  todo: TodoInterface;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ListItemComponent: React.FC<Props> = ({ todo, setIsOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  async function updateTodo(todo: TodoInterface) {
    const newTodo = { ...todo };
    newTodo.completed = !todo.completed;
    try {
      const response = await fetch(`${baseUrl}/todos/${todo.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ newTodo, todoId: todo.id, userId: user.id })
      });

      if (!response.ok) {
        console.error('Error: Cannot update todo');
        return;
      }
    } catch (e) {
      console.log(e);
    }
  }

  function toggleTodo(todo: TodoInterface) {
    updateTodo(todo);
    dispatch(changeTodoAction({ todo: { ...todo, completed: !todo.completed }, todoId: todo.id }));
  }

  return (
    <ListItem
      key={todo.id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontWeight: '500',
        fontSize: '18px',
        alignItems: 'flex-start',
        padding: '12px',
        border: '1px solid #e0e0e0',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
        borderRadius: '12px',
        backgroundColor: todo.completed ? '#f9f9f9' : 'white',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
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
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
        sx={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? '#9e9e9e' : 'inherit',
          opacity: todo.completed ? '0.7' : '1'
        }}
      >
        <Box sx={{display: 'flex', gap: '8px', alignItems: 'center'}}>
          <span style={{ fontWeight: '500', fontSize: '20px' }}>
            {`${dayjs(todo.start).format('HH:mm')}`}
          </span>
          <HorizontalRuleIcon />
          <span style={{ fontWeight: '500', fontSize: '20px' }}>
            {`${dayjs(todo.finish).format('HH:mm')}`}
          </span>
        </Box>
        <Box
          sx={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            fontWeight: '600',
            fontSize: '20px'
          }}
        >
          {todo.name}
        </Box>
        <Checkbox
          onChange={() => toggleTodo(todo)}
          checked={todo.completed}
        />
      </Box >
      <Buttons
        todo={todo}
        setIsOpen={setIsOpen}
      />
    </ListItem>
  )
}
