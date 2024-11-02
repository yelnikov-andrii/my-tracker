import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, OutlinedInput, Alert } from '@mui/material';
import { changeTodoName } from '../../../store/todosSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ClockBlock } from './ClockBlock';
import { setFinishTime, setStartTime } from '../../../store/timeSlice';
import { useAddTodo } from '../../../helpers/useAddTodo';
import { ViewsStrT, ViewT } from '../../../types/mainForm';
import { useChangeTodoNew } from '../../../helpers/useChangeTodo';

interface Props {
  date: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Form: React.FC<Props> = () => {
  const { todoName, todoToChange, todos } = useSelector((state: RootState) => state.todos);
  const { startTime, finishTime } = useSelector((state: RootState) => state.time);

  const foundTodo = todos?.find(todo => todo.id === todoToChange);
  const [view, setView] = useState<ViewT>({
    start: 'hours',
    finish: 'hours'
  });

  const dispatch = useDispatch();

  const [addTodoHandler, alert] = useAddTodo();
  // const [changeTheTodoHandler, changeAlert] = useChangeTodo(date);
  const [changeTheTodoHandler, changeAlert] = useChangeTodoNew(foundTodo);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form">
        <Box
          display="flex"
          justifyContent="space-between"
          alignSelf="center"
          gap={1}
          mb={1}
          sx={{
            '@media (max-width: 768px)': {
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignSelf="center"
            flexWrap="wrap"
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
            flexWrap="wrap">
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
              onClick={() => {
                addTodoHandler();
              }}
              variant="contained"
            >
              Додати справу
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
        </Box>
        {alert && (
          <Alert severity="error">
            {alert}
          </Alert>
        )}
        {changeAlert && (
          <Alert severity="error">
            {changeAlert}
          </Alert>
        )}
      </Box>
    </LocalizationProvider>
  )
}
