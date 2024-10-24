import { Box, Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { TodoInterface } from '../../../types/todos';

interface Props {
  setReadyToDelete: Dispatch<SetStateAction<boolean>>;
  date: string;
}

export const DeleteCompleted: React.FC <Props> = ({ setReadyToDelete, date }) => {
  const { days } = useSelector((state: RootState) => state.todos);
  const foundDay = days.find(day => day.date === date);
  
  return (
    <Box>
      <Button onClick={() => {
        if (foundDay && foundDay.todos.find((todo: TodoInterface) => todo.completed === true)) {
          setReadyToDelete(true);
        } else {
          return;
        }
      }}>
        Видалити завершені
      </Button>
    </Box>
  )
}
