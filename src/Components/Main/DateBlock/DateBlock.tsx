import React from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '../../../helpers/formateDate';
import { Box, Typography } from '@mui/material';

export const DateBlock = () => {
  const currentDate = useSelector((state: RootState) => state.time.currentDate);

  return (
    <>
      <Box display="flex" alignItems="center" gap={2} marginTop={2} marginBottom={1}>
        <Typography fontWeight="bold" fontSize={26}>
          {`Дата: ${formatDate(currentDate)}`}
        </Typography>
      </Box>
      <p style={{ fontWeight: 400, fontSize: '16px', color: 'grey' }}>
        Виберіть справи, які потрібно виконати, та позначте їх як завершені.
      </p>
    </>
  )
}
