import { Button } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAction, deleteTodoAction, selectTodoToChange } from '../../../store/todosSlice';
import { baseUrl } from '../../../helpers/baseUrl';
import { changeTime } from '../../../store/timeSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchWithAuth } from '../../../helpers/fetchWithAuth';
import { showGlobalAlert } from '../../../helpers/alertGlobal/showGlobalAlert';

interface Props {
  todo: TodoInterface;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Buttons: React.FC<Props> = ({ todo, setIsOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  async function deleteTodo(todoId: number | string) {
    try {
      const response = await fetchWithAuth(`${baseUrl}/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id })
      });

      if (!response.ok) {
        showGlobalAlert("Не вдалося видалити справу");
        discardDelete(todo);
        return;
      }

    } catch (error) {
      discardDelete(todo);
      showGlobalAlert("Не вдалося видалити справу");
      console.error('Error deleting todo:', error);
    }
  }

  function changeTheTodo() {
    setIsOpen(true);
    dispatch(selectTodoToChange(todo));
    dispatch(changeTime({ start: todo.start, finish: todo.finish }));
  }

  function discardDelete(todo: TodoInterface) {
    dispatch(addTodoAction(todo));
  }

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', textDecoration: 'none' }}>
      <Button
        variant="contained"
        size='small'
        onClick={() => {
          deleteTodo(todo.id);
          dispatch(deleteTodoAction(todo.id));
        }
        }
        sx={{
          textDecoration: 'none',
          '@media (max-width: 425px)': {
            fontSize: '14px'
          },
        }}
      >
        <DeleteIcon />
      </Button>
      <Button
        size='small'
        variant="contained"
        onClick={() => changeTheTodo()}
        sx={{
          '@media (max-width: 425px)': {
            fontSize: '14px'
          },
        }}
      >
        <EditIcon />
      </Button>
    </div>
  )
}
