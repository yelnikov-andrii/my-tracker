import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, OutlinedInput, Alert } from '@mui/material';
import { changeTodoName } from '../../../store/todosSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ClockBlock } from './ClockBlock';
import { setFinishTime, setStartTime } from '../../../store/timeSlice';
import { useAddTodo } from '../../../helpers/addTodoHelpers/useAddTodo';
import { useChangeTodo } from '../../../helpers/changeTodoHelpers/useChangeTodo';

interface Props {
  date: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Form: React.FC<Props> = React.memo(() => {
  const todoName = useSelector((state: RootState) => state.todos.todoName);
  const todoToChange = useSelector((state: RootState) => state.todos.todoToChange);
  const filteredTodos = useSelector((state: RootState) => state.todos.filteredTodos);
  const { startTime, finishTime } = useSelector((state: RootState) => state.time);

  const foundTodo = filteredTodos?.find(todo => todo.id === todoToChange?.id);
  const [view, setView] = useState<ViewT>({
    start: 'hours',
    finish: 'hours'
  });

  const dispatch = useDispatch();

  const [addTodoHandler, alert, loading] = useAddTodo();
  const [changeTheTodoHandler, changeAlert, changeLoading] = useChangeTodo(foundTodo);

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
            <Alert severity="error" variant='filled'>
              {alert}
            </Alert>
          )
        }
        {
          changeAlert && (
            <Alert severity="error" variant='filled'>
              {changeAlert}
            </Alert>
          )
        }
      </Box >
    </LocalizationProvider >
  )
});

Form.displayName = 'Form';
