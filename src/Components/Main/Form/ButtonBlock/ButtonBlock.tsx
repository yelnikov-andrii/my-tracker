import { Box, Button } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { TodoInterface } from '../../../../types/todos';
import { addTodo, addTodoAfterThis, addTodoBeforeThis, changeTheTodo, changeTodoName, selectTodoToAddAfterThis, selectTodoToAddBeforeThis, selectTodoToChange } from '../../../../store/todosSlice';
import { changeTimeAfterAddingTodo } from '../../../../helpers/changeTimeAfterAdd';

interface Props {
  date: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ButtonBlock: React.FC <Props> = ({ date, setIsOpen }) => {
  const { days, todoName, todoToChange, todoToAddAfterThis, todoToAddBeforeThis } = useSelector((state: RootState) => state.todos);
  const { startHour, startMinutes, finishHour, finishMinutes } = useSelector((state: RootState) => state.time);
  const dispatch = useDispatch();

  function changeTheTodoHandler(todoId: number | string) {
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

  return (
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
  )
}
