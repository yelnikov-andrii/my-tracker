import { Box, Checkbox, ListItem } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import MyDropdown from '../../UI/MyDropdown';
import { Buttons } from './Buttons';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { baseUrl } from '../../../helpers/baseUrl';
import { changeTodoAction } from '../../../store/todosSlice';

interface Props {
  todo: TodoInterface;
  date: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ListItemComponent: React.FC<Props> = ({ todo, date, setIsOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

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
        padding: '4px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        backgroundColor: 'white'
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
        sx={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          opacity: todo.completed ? '0.5' : '1'
        }}
      >
        {`${dayjs(todo.start).format('HH:mm')} - ${dayjs(todo.finish).format('HH:mm')}`}
        <Box
          sx={{
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.name}
        </Box>
        <Checkbox
          onChange={() => toggleTodo(todo)}
          checked={todo.completed}
        />
      </Box >
      <MyDropdown butttonContent="Вибрати опцію">
        <Buttons
          date={date}
          todo={todo}
          setIsOpen={setIsOpen}
        />
      </MyDropdown>
    </ListItem>
  )
}
