import { Box, Checkbox, ListItem, useTheme } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { TodoInterface } from '../../../types/todos'
import { MyDropdown } from '../../../UI/MyDropdown';
import { Buttons } from './Buttons';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../../../store/todosSlice';

interface Props {
  todo: TodoInterface;
  date: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ListItemComponent: React.FC <Props> = ({ todo, date, setIsOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  function toggleTodo(todoId: number) {
    dispatch(updateTodo({ id: todoId, date: date }));
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
        {`${todo.start} - ${todo.finish}`}
        <Box 
          sx={{
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.name}
        </Box>
        <Checkbox
          onChange={() => toggleTodo(todo.id)}
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
