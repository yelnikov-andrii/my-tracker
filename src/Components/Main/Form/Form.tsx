/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, OutlinedInput, Alert } from '@mui/material';
import { changeTodoName, selectTodoToChange } from '../../../store/todosSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ClockBlock } from './ClockBlock';
import { useAddTodo } from '../../../helpers/addTodoHelpers/useAddTodo';
import { useChangeTodo } from '../../../helpers/changeTodoHelpers/useChangeTodo';
import { changeTime, setFinishTime, setStartTime } from '../../../store/timeSlice';
import dayjs from 'dayjs';

interface Props {
  setNotClose: Dispatch<SetStateAction<boolean>>;
}

export const Form: React.FC<Props> = React.memo(({ setNotClose }) => {
  const todoName = useSelector((state: RootState) => state.todos.todoName);
  const todoToChange = useSelector((state: RootState) => state.todos.todoToChange);
  const filteredTodos = useSelector((state: RootState) => state.todos.filteredTodos);
  const startTime = useSelector((state: RootState) => state.time.startTime);
  const finishTime = useSelector((state: RootState) => state.time.finishTime);
  const currentDate = useSelector((state: RootState) => state.time.currentDate);

  const foundTodo = filteredTodos?.find(todo => todo.id === todoToChange?.id);
  const [view, setView] = useState<ViewT>({
    start: 'hours',
    finish: 'hours'
  });

  const dispatch = useDispatch();

  const [addTodoHandler, alert, loading] = useAddTodo(setNotClose);
  const [changeTheTodoHandler, changeAlert, changeLoading] = useChangeTodo(foundTodo);

  useEffect(() => {
    const lastTodoInArr: TodoInterface = filteredTodos.at(filteredTodos.length - 1);

    if (todoToChange) {
      return;
    }

    if (!lastTodoInArr) {
      const timeObject = {
        start: dayjs(currentDate)
          .hour(0)
          .minute(0).toISOString(),
        finish: dayjs(currentDate)
          .hour(0)
          .minute(1).toISOString()
      };
      dispatch(changeTime({ start: timeObject.start, finish: timeObject.finish }));
      return;
    } else {
      dispatch(changeTime({ start: lastTodoInArr.finish, finish: dayjs(lastTodoInArr.finish).add(1, 'minute').toISOString() }));
      return;
    }
  }, [currentDate, dispatch, filteredTodos, todoToChange]);

  useEffect(() => {
    return () => {
      dispatch(selectTodoToChange(null));
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form">
        <Box
          display="flex"
          justifyContent="space-between"
          alignSelf="center"
          width="100%"
          gap={1}
          mb={1}
          sx={{
            '@media (max-width: 475px)': {
              flexWrap: 'wrap',
              flexDirection: 'column'
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
          >
            <ClockBlock
              viewValue={view.start}
              changeViewValue={(value: ViewsStrT) => {
                setView(prev => ({ ...prev, start: value }))
              }}
              label='Початок'
              value={startTime}
              setValue={(value: any) => {
                dispatch(setStartTime(value));
              }}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
          >
            <ClockBlock
              viewValue={view.finish}
              changeViewValue={(value: ViewsStrT) => {
                setView(prev => ({ ...prev, finish: value }))
              }}
              label='Кінець'
              value={finishTime}
              setValue={(value: any) => {
                dispatch(setFinishTime(value))
              }}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" gap={1} marginBottom={2} flexWrap="wrap">
          <OutlinedInput
            fullWidth
            value={todoName}
            onChange={(e) => dispatch(changeTodoName(e.target.value))}
          />
        </Box>
        <Box display="flex" justifyContent="center" gap={1}>
          {!todoToChange ? (
            <>
              {loading ? (
                <Button
                  variant="contained"
                  disabled
                >
                  Додавання справи<span className='dots'></span>
                </Button>
              ) : (
                <Button
                  onClick={
                    () => {
                      addTodoHandler();
                    }
                  }
                  variant="contained"
                >
                  Додати справу
                </Button>
              )}
            </>
          ) : (
            <>
              {changeLoading ? (
                <Button
                  variant="contained"
                >
                  Редагування справи<span className='dots'></span>
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    changeTheTodoHandler(todoToChange)
                  }
                  variant="contained"
                >
                  Редагувати справу
                </Button>
              )}
            </>
          )}
        </Box>
        {
          alert && (
            <Alert severity="error" variant='filled' sx={{ margin: '16px 0 0 0' }}>
              {alert}
            </Alert>
          )
        }
        {
          changeAlert && (
            <Alert severity="error" variant='filled' sx={{ margin: '16px 0 0 0' }}>
              {changeAlert}
            </Alert>
          )
        }
      </Box >
    </LocalizationProvider >
  )
});

Form.displayName = 'Form';
