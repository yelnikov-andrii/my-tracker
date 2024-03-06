import React, { Dispatch, SetStateAction } from 'react';
import { hours, minutes } from '../../../helpers/hoursAndMinutes';
import { useDispatch, useSelector } from 'react-redux';
import { setFinishHour, setFinishMinutes, setStartHour, setStartMinutes } from '../../../store/timeSlice';
import { changeTimeAfterAddingTodo } from '../../../helpers/changeTimeAfterAdd';
import { RootState } from '../../../store/store';
import { MySelect } from '../../../UI/MySelect';
import { Box, Button, Typography, OutlinedInput } from '@mui/material';
import { addTodo, addTodoAfterThis, addTodoBeforeThis, changeTheTodo, changeTodoName, selectTodoToAddAfterThis, selectTodoToAddBeforeThis, selectTodoToChange } from '../../../store/todosSlice';
import { TodoInterface } from '../../../types/todos';

interface Props {
  date: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Form: React.FC <Props> = ({ date, setIsOpen }) => {
  const { days, todoName, todoToChange, todoToAddBeforeThis, todoToAddAfterThis } = useSelector((state: RootState) => state.todos);
  const { startHour, startMinutes, finishHour, finishMinutes } = useSelector((state: RootState) => state.time);
  
  const dispatch = useDispatch();

  function addTodoHandler() {
    if (!todoName || !startHour || !startMinutes || !finishHour || !finishMinutes) {
      return;
    }

    const todo = {
      name: todoName,
      start: `${startHour}:${startMinutes}`,
      finish: `${finishHour}:${finishMinutes}`,
      completed: false,
      id: Date.now()
    };

    if (todoToAddAfterThis) {
      dispatch(addTodoAfterThis({ date: date, todo: todo }));
      dispatch(changeTodoName(''));
      changeTimeAfterAddingTodo(finishHour, finishMinutes, dispatch);
      setIsOpen(false);
      dispatch(selectTodoToAddAfterThis(null));
      return;
    }

    if (todoToAddBeforeThis) {
      dispatch(addTodoBeforeThis({ date: date, todo: todo }));
      dispatch(changeTodoName(''));
      changeTimeAfterAddingTodo(finishHour, finishMinutes, dispatch);
      setIsOpen(false);
      dispatch(selectTodoToAddBeforeThis(null));
      return;
    }

    dispatch(addTodo({ date: date, todo: todo }));
    dispatch(changeTodoName(''));
    changeTimeAfterAddingTodo(finishHour, finishMinutes, dispatch);
    setIsOpen(false);
  }

  function changeTheTodoHandler(todoId: number) {
    const foundDay = days.find(day => day.date === date);
    
    if (foundDay) {
      const foundTodo = foundDay.todos.find((todo: TodoInterface) => todo.id === todoId);

      if (!todoName || !startHour || !startMinutes || !finishHour || !finishMinutes || !foundTodo) {
        dispatch(selectTodoToChange(null));
        return;
      }
      
      const newTodo = {
        name: todoName,
        start: `${startHour}:${startMinutes}`,
        finish: `${finishHour}:${finishMinutes}`,
      };
  
      dispatch(changeTheTodo({ todo: newTodo, date: date }));
      dispatch(changeTodoName(''));
      dispatch(selectTodoToChange(null));
      setIsOpen(false);
    }
  }

  function changeStartHour(value: string) {
    dispatch(setStartHour(value));
  }

  function changeStartMinutes(value: string) {
    dispatch(setStartMinutes(value));
  }

  function changeFinishHour(value: string) {
    dispatch(setFinishHour(value));
  }

  function changeFinishMinutes(value: string) {
    dispatch(setFinishMinutes(value));
  }

  return (
    <Box component="form">
      <Box
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        gap={1}
        mb={1}
      >
        <Typography>
          Початок
        </Typography>
        <Typography>
          Кінець
        </Typography>
      </Box>
      <Box 
        display="flex" 
        justifyContent="space-between"
        alignSelf="center"
        gap={1}
        mb={1}
      >
        <Box 
          display="flex" 
          justifyContent="space-between"
          alignSelf="center"
          flexWrap="wrap"
        >
          <MySelect 
            options={hours} 
            change={changeStartHour} 
            value={startHour} 
          />
          <MySelect 
            options={minutes} 
            change={changeStartMinutes} 
            value={startMinutes} 
          />
        </Box>
        <Typography
          alignSelf="center"
          sx={{
            '@media (max-width: 425px)': {
              alignSelf: 'center'
            },
          }}
        >
          &mdash;
        </Typography>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          flexWrap="wrap"
          sx={{
            '@media (max-width: 425px)': {
              justifyContent: 'flex-end'
            },
          }}
        >
          <MySelect options={hours} change={changeFinishHour} value={finishHour} />
          <MySelect options={minutes} change={changeFinishMinutes} value={finishMinutes} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" gap={1} marginBottom={2}>
        <OutlinedInput
          fullWidth
          value={todoName}
          onChange={(e) => dispatch(changeTodoName(e.target.value))}
        />
      </Box>
      <Box display="flex" justifyContent="center" gap={1}>
        {!todoToChange ? (
          <Button 
          onClick={addTodoHandler}
          variant="contained"
        >
          Додати справу
        </Button>
        ) : (
        <Button 
          onClick={() => changeTheTodoHandler(todoToChange)}
          variant="contained"
        >
          Редагувати справу
        </Button>
        )}
      </Box>
    </Box>
  )
}
