import { Button } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoAction } from '../../../store/todosSlice';
import { baseUrl } from '../../../helpers/baseUrl';

interface Props {
  date: string;
  todo: TodoInterface;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Buttons: React.FC<Props> = ({ todo, setIsOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  async function deleteTodo(todoId: number | string) {
    // dispatch(removeTodo({ id: todoId, date: date }));
    
    try {
      const response = await fetch(`${baseUrl}/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: user.id})
      });

      if (!response.ok) {
        console.log(response, 'response delete')
        console.log('Error: Cannot delete todo');
        return;
      }

      dispatch(deleteTodoAction(todoId));

      console.log('Todo deleted successfully');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  function changeTheTodo() {
    setIsOpen(true);
    // dispatch(selectTodoToChange({ id: todo.id, date: date }));
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
        onClick={() => changeTheTodo()}
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
