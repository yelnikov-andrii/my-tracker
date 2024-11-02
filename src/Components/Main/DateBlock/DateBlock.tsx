import React from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '../../../helpers/formateDate';
import { Box, Typography } from '@mui/material';

export const DateBlock = () => {
  const { currentDate } = useSelector((state: RootState) => state.time);
  
  return (
    <Box display="flex" alignItems="center" gap={2} marginTop={2}>
      <Typography fontWeight="bold" fontSize={22}>
        {`Дата: ${formatDate(currentDate)}`}
      </Typography>
    </Box>
  )
}
