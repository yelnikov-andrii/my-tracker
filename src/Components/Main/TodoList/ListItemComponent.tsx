import { Box, Checkbox, ListItem } from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Buttons } from './Buttons';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { baseUrl } from '../../../helpers/baseUrl';
import { changeTodoAction } from '../../../store/todosSlice';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { fetchWithAuth } from '../../../helpers/fetchWithAuth';
import { showGlobalAlert } from '../../../helpers/alertGlobal/showGlobalAlert';

interface Props {
  todo: TodoInterface;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ListItemComponent: React.FC<Props> = ({ todo, setIsOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [loading, setLoading] = useState(false);

  async function updateTodo(todo: TodoInterface) {
    setLoading(true);
    const newTodo = { ...todo };
    newTodo.completed = !todo.completed;
    try {
      const response = await fetchWithAuth(`${baseUrl}/todos/${todo.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ newTodo, todoId: todo.id, userId: user.id })
      });

      if (!response.ok) {
        dispatch(showGlobalAlert('Помилка при оновленні справи'));
        console.error('Error: Cannot update todo');
        return;
      }
    } catch (e) {
      dispatch(showGlobalAlert('Помилка при оновленні справи'));
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  function toggleTodo(todo: TodoInterface) {
    updateTodo(todo)
      .then(() => {
        dispatch(changeTodoAction({ todo: { ...todo, completed: !todo.completed }, todoId: todo.id }));
      });

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
        alignItems="top"
        sx={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? '#9e9e9e' : 'inherit',
          opacity: todo.completed ? '0.7' : '1',
          gap: '16px',
          '@media (max-width: 768px)': {
            flexWrap: 'wrap',
            gap: '8px'
          }
        }}
      >
        <Box sx={{ display: 'flex', gap: '16px', alignItems: 'top', '@media (max-width: 768px)': { gap: '8px' } }}>
          <span style={{ fontWeight: '500', fontSize: '18px' }}>
            {`${dayjs(todo.start).format('HH:mm')}`}
          </span>
          <HorizontalRuleIcon />
          <span style={{ fontWeight: '500', fontSize: '18px' }}>
            {`${dayjs(todo.finish).format('HH:mm')}`}
          </span>
        </Box>
        <Box
          sx={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            fontWeight: '600',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection:'column', gap: '4px', justifyContent: 'flex-end'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <span>
                {todo.name}
              </span>
              <Checkbox
                onChange={() => toggleTodo(todo)}
                checked={todo.completed}
                disabled={loading}
              />
            </Box>
            <Box sx={{ fontSize: '14px', fontWeight: 400 }}>
              {loading && (
                <>
                  Оновлення
                  <span className='dots'></span>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box >
      <Buttons
        todo={todo}
        setIsOpen={setIsOpen}
      />
    </ListItem >
  )
}
