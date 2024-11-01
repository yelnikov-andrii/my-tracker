import { Box, Checkbox, ListItem, useTheme } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { TodoInterface } from '../../../types/todos'
import { MyDropdown } from '../../../UI/MyDropdown';
import { Buttons } from './Buttons';
import { useDispatch } from 'react-redux';
// import { updateTodo } from '../../../store/todosSlice';
import dayjs from 'dayjs';
import { baseUrl } from '../../../helpers/baseUrl';
import { changeTodoAction } from '../../../store/todosSlice';

interface Props {
  todo: TodoInterface;
  date: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ListItemComponent: React.FC<Props> = ({ todo, date, setIsOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  async function updateTodo(todo: any) {
    console.log(todo, 'todo ')
    try {
      const newTodo = { ...todo };
      newTodo.completed = !todo.completed;
      const response = await fetch(`${baseUrl}/todos/${todo.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ newTodo, todoId: todo.id })
      });

      if (!response.ok) {
        console.error('Error: Cannot update todo');
        return;
      }

      dispatch(changeTodoAction({ todo: newTodo, todoId: todo.id }));


    } catch (e) {
      console.log(e);
    }
  }

  function toggleTodo(todo: any) {
    // dispatch(updateTodo({ id: todoId, date: date }));
    updateTodo(todo)
  }

  return (
    <ListItem
      key={todo.id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${theme.palette.primary.main}`,
        fontWeight: '500',
        fontSize: '18px',
        alignItems: 'flex-start',
        padding: '4px'
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
