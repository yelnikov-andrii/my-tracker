import { Button } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux';
import { removeTodo, selectTodoToChange } from '../../../store/todosSlice';
import { TodoInterface } from '../../../types/todos';

interface Props {
  date: string;
  todo: TodoInterface;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Buttons: React.FC <Props> = ({ date, todo, setIsOpen }) => {
  const dispatch = useDispatch();

  function deleteTodo(todoId: number | string) {
    dispatch(removeTodo({ id: todoId, date: date }));
  }

  function changeTheTodo(todo: TodoInterface) {
    setIsOpen(true);
    dispatch(selectTodoToChange({ id: todo.id, date: date }));
  }

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', textDecoration: 'none' }}>
      <Button
        variant="contained"
        onClick={() => deleteTodo(todo.id)}
        sx={{
          textDecoration: 'none',
          '@media (max-width: 425px)': {
            fontSize: '14px'
          },
        }}
      >
        Видалити
      </Button>
      <Button
        variant="contained"
        onClick={() => changeTheTodo(todo)}
        sx={{
          '@media (max-width: 425px)': {
            fontSize: '14px'
          },
        }}
      >
        Редагувати
      </Button>
    </div>
  )
}
