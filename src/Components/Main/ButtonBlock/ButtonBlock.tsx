import React from 'react';
import { openModal } from '../../../store/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { formatDate } from '../../../helpers/formateDate';
import { Box, Button, Typography } from '@mui/material';

export const ButtonBlock = () => {
  const dispatch = useDispatch();
  const { currentDate } = useSelector((state: RootState) => state.time);
  
  return (
    <Box display="flex" alignItems="center" gap={2} marginTop={2}>
      <Typography fontWeight="bold" fontSize={22}>
        {`Дата: ${formatDate(currentDate)}`}
      </Typography>
      <Button 
        onClick={() => {
          dispatch(openModal());
        }}
        variant="contained"
      >
        Додати справу
      </Button>
    </Box>
  )
}
