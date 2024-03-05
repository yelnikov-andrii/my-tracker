/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeTime } from '../../../helpers/changeTime';
import { RootState } from '../../../store/store';
import { MyDropdown } from '../../../UI/MyDropdown';
import { Box, Button, Checkbox, List, ListItem, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { addDay, removeTodo, selectTodoToAddAfterThis, selectTodoToAddBeforeThis, selectTodoToChange, updateTodo } from '../../../store/todosSlice';
import { TodoInterface } from '../../../types/todos';

interface Props {
  date: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const TodoList: React.FC<Props> = ({ date, setIsOpen }) => {
  const { days, todosRepeated } = useSelector((state: RootState) => state.todos);
  const { currentDate } = useSelector((state: RootState) => state.time);
  const dispatch = useDispatch();

  const theme = useTheme();
  const newDate = new Date(currentDate);
  const daysOfWeek = ['sun', 'mon', 'tue', 'wen', 'thu', 'fri', 'sat'];
  const thisWeekDay = daysOfWeek[newDate.getDay()];
  const foundTodoRepeated = todosRepeated.find(todoRepeated => todoRepeated.day === thisWeekDay);

  React.useEffect(() => {
    const foundDay = days.find(day => day.date === date);
    if (!foundDay && foundTodoRepeated && foundTodoRepeated.todos.length > 0) {
      const remasteredTodos = foundTodoRepeated.todos.map((todo: TodoInterface) => {
        return {...todo, id: Date.now()};
      });

      const day = {
        date: date,
        repeated: true,
        todos: remasteredTodos,
      };

      dispatch(addDay(day));
    }
  }, [days, date, todosRepeated]);

  function toggleTodo(todoId: number) {
    dispatch(updateTodo({ id: todoId, date: date }));
  }

  function deleteTodo(todoId: number) {
    dispatch(removeTodo({ id: todoId, date: date }));
  }

  function changeTheTodo(todo: TodoInterface) {
    setIsOpen(true);
    dispatch(selectTodoToChange({ id: todo.id, date: date }));
    changeTime(days, todo.id, dispatch, date);
  }

  function addTodoAfter(todoId: number) {
    setIsOpen(true);
    dispatch(selectTodoToAddAfterThis(todoId));
  }

  function addTodoBefore(todoId: number) {
    setIsOpen(true);
    dispatch(selectTodoToAddBeforeThis(todoId));
  }

  const foundTodo = React.useMemo(() => {
    const foundTodo = days.find(day => day.date === date);
    if (foundTodo) {
      return foundTodo;
    }
    
  }, [date, days]);

  return (
    <React.Fragment>
    <Typography variant='h6'>Список завдань</Typography>
      <List>
        {foundTodo && foundTodo.todos.length > 0 ? foundTodo.todos.map((todo: TodoInterface) => (
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
              </MyDropdown>
          </ListItem>
        )) : (
          <Paper variant='outlined'>
            <ListItem>Немає завдань</ListItem>
          </Paper>
        )}
      </List>
    </React.Fragment>
  )
}
