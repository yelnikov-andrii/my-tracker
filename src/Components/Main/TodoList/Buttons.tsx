import { Button } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, selectTodoToAddAfterThis, selectTodoToAddBeforeThis, selectTodoToChange } from '../../../store/todosSlice';
import { TodoInterface } from '../../../types/todos';
import { changeTime } from '../../../helpers/changeTime';
import { RootState } from '../../../store/store';

interface Props {
  date: string;
  todo: TodoInterface;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Buttons: React.FC <Props> = ({ date, todo, setIsOpen }) => {
  const dispatch = useDispatch();
  const { days } = useSelector((state: RootState) => state.todos);

  function deleteTodo(todoId: number | string) {
    dispatch(removeTodo({ id: todoId, date: date }));
  }

  function changeTheTodo(todo: TodoInterface) {
    setIsOpen(true);
    dispatch(selectTodoToChange({ id: todo.id, date: date }));
    changeTime(days, todo.id, dispatch, date);
  }

  function addTodoAfter(todoId: number | string) {
    setIsOpen(true);
    dispatch(selectTodoToAddAfterThis(todoId));
  }

  function addTodoBefore(todoId: number | string) {
    setIsOpen(true);
    dispatch(selectTodoToAddBeforeThis(todoId));
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
      <Button
        variant="contained"
        onClick={() => addTodoAfter(todo.id)}
        sx={{
          '@media (max-width: 425px)': {
            fontSize: '14px'
          },
        }}
      >
        Додати справу після цієї
      </Button>
      <Button
        variant="contained"
        onClick={() => addTodoBefore(todo.id)}
        sx={{
          '@media (max-width: 425px)': {
            fontSize: '14px'
          },
        }}
      >
        Додати справу перед цією
      </Button>
    </div>
  )
}
