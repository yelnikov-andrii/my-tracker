import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../helpers/formateDate';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { setDate } from '../../../store/timeSlice';

export const DateBlock = () => {
  const currentDate = useSelector((state: RootState) => state.time.currentDate);
  const dispatch = useDispatch();

  function changeDate(value: string) {
    const date = new Date(currentDate);
    if (value === 'next') {
      date.setDate(date.getDate() + 1);
    }

    if (value === 'prev') {
      date.setDate(date.getDate() - 1);
    }

    const formatedDate = date.toISOString();
    dispatch(setDate(formatedDate));
    localStorage.setItem('date_tracker', formatedDate);
  }

  return (
    <>
      <Box display="flex" alignItems="center" gap={2} marginTop={2} marginBottom={1}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <Typography variant='h4' style={{ display: 'inline-block' }}>
            Дата:
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button size='small' onClick={() => changeDate('prev')}>
              <ArrowBackIosIcon />
            </Button>
            <Typography variant='h4' style={{ display: 'inline-block' }}>
              {`${formatDate(currentDate)}`}
            </Typography>
            <Button size='small' onClick={() => changeDate('next')}>
              <ArrowForwardIosIcon />
            </Button>
          </Box>
        </Box>
      </Box>
      <p style={{ fontWeight: 400, fontSize: '16px', color: 'grey' }}>
        Виберіть справи, які потрібно виконати, та позначте їх як завершені.
      </p>
    </>
  )
}
