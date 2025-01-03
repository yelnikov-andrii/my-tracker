import { Box, Checkbox, FormControlLabel } from '@mui/material'
import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addWeekday } from '../../../store/weekdaySlice';

export const WeekDays = () => {
  const { weekdays } = useSelector((state: RootState) => state.weekday);
  const dispatch = useDispatch();

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const day = event.target.value;
    dispatch(addWeekday(day));
  };

  return (
    <Box display="flex" flexDirection="column">
      <FormControlLabel
        control={<Checkbox checked={weekdays.includes('mon')} onChange={handleCheckboxChange} value="mon" />}
        label="Понеділок"
      />
      <FormControlLabel
        control={<Checkbox checked={weekdays.includes('tue')} onChange={handleCheckboxChange} value="tue" />}
        label="Вівторок"
      />
      <FormControlLabel
        control={<Checkbox checked={weekdays.includes('wed')} onChange={handleCheckboxChange} value="wed" />}
        label="Середа"
      />
      <FormControlLabel
        control={<Checkbox checked={weekdays.includes('thu')} onChange={handleCheckboxChange} value="thu" />}
        label="Четверг"
      />
      <FormControlLabel
        control={<Checkbox checked={weekdays.includes('fri')} onChange={handleCheckboxChange} value="fri" />}
        label="П&apos;ятниця"
      />
      <FormControlLabel
        control={<Checkbox checked={weekdays.includes('sat')} onChange={handleCheckboxChange} value="sat" />}
        label="Субота"
      />
      <FormControlLabel
        control={<Checkbox checked={weekdays.includes('sun')} onChange={handleCheckboxChange} value="sun" />}
        label="Неділя"
      />
    </Box>
  )
}
