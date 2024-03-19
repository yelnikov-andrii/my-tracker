/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from '@mui/material'
import React from 'react'
import { MySelect } from '../../../../UI/MySelect'
import { useDispatch, useSelector } from 'react-redux';
import { setFinishHour, setFinishMinutes, setStartHour, setStartMinutes } from '../../../../store/timeSlice';
import { hours, minutes } from '../../../../helpers/hoursAndMinutes';
import { RootState } from '../../../../store/store';

export const TimeBlock = () => {
  const dispatch = useDispatch();
  const { startHour, startMinutes, finishHour, finishMinutes } = useSelector((state: RootState) => state.time);
  
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
  )
}
