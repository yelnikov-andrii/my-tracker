import { Box, Button, Checkbox, List, ListItem, Paper, Typography, useTheme } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateTodoWithout } from '../../store/todosSlice';
// import { removeDealWithout, updateDealWithout } from '../../store/dealSlice';

export const DealList = () => {
  const theme = useTheme();
  const { todosWIthoutTimeline } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  function toggleTodo(todoId: number) {
    dispatch(updateTodoWithout(todoId));
  }

  function deleteDeal(dealId: number) {
    // dispatch(removeDealWithout(dealId));
  }

  return (
    <React.Fragment>
    <Typography variant='h6'>
      Список завдань
    </Typography>
    <Paper variant="outlined">
      <List>
        {todosWIthoutTimeline.length > 0 ? todosWIthoutTimeline.map((todo: any) => (
          <ListItem
            key={todo.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              textDecoration: todo.completed ? 'line-through' : 'none',
              border: `1px solid ${theme.palette.primary.main}`,
              fontWeight: '500',
              fontSize: '18px',
              alignItems: 'flex-start'
            }}
          >
            <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
            <div>
              {todo.name}
            </div>
            <Checkbox
              onChange={(e) => {
                toggleTodo(todo.id)
              }}
              checked={todo.completed}
            />
            </Box>
            <Box>
              <Button 
                onClick={() => {
                  deleteDeal(todo.id);
                }}
                variant='contained'
              >
                Видалити
              </Button>
            </Box>
          </ListItem>
        )) : (
          <ListItem>
            Немає завдань
          </ListItem>
        )}
      </List>
    </Paper>
    </React.Fragment>
  )
}
