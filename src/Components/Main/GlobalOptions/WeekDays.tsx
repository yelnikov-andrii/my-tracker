import { Box, Checkbox, FormControlLabel } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  selectedDays: string[];
  setSelectedDays: Dispatch<SetStateAction<string[]>>;
}

export const WeekDays: React.FC <Props> = ({ selectedDays, setSelectedDays }) => {

  const handleCheckboxChange = (event: any) => {
    const day = event.target.value;
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((d) => d !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
  };

  return (
    <Box display="flex" flexDirection="column">
      <FormControlLabel
        control={<Checkbox checked={selectedDays.includes('mon')} onChange={handleCheckboxChange} value="mon" />}
        label="Понеділок"
      />
      <FormControlLabel
        control={<Checkbox checked={selectedDays.includes('tue')} onChange={handleCheckboxChange} value="tue" />}
        label="Вівторок"
      />
      <FormControlLabel
        control={<Checkbox checked={selectedDays.includes('wen')} onChange={handleCheckboxChange} value="wen" />}
        label="Середа"
      />
      <FormControlLabel
        control={<Checkbox checked={selectedDays.includes('thu')} onChange={handleCheckboxChange} value="thu" />}
        label="Четверг"
      />
      <FormControlLabel
        control={<Checkbox checked={selectedDays.includes('fri')} onChange={handleCheckboxChange} value="fri" />}
        label="П&apos;ятниця"
      />
      <FormControlLabel
        control={<Checkbox checked={selectedDays.includes('sat')} onChange={handleCheckboxChange} value="sat" />}
        label="Субота"
      />
      <FormControlLabel
        control={<Checkbox checked={selectedDays.includes('sun')} onChange={handleCheckboxChange} value="sun" />}
        label="Неділя"
      />
    </Box>
  )
}
