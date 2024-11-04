/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { MyDropdown } from '../../UI/MyDropdown'
import { Box, Button } from '@mui/material'
import { useSelector } from 'react-redux';
import { Alert } from '../../UI/Alert';
import { WeekDays } from './WeekDays';

// interface Props {
//   date: string;
// }

export const GlobalOptions = () => {
  const { weekdays } = useSelector((state: RootState) => state.weekday);
  const [isOpen, setIsOpen] = React.useState(false);
  // const [alertText, setAlerttext] = React.useState('Тепер справи за цей день будут повторюватись по вибраним дням тижня');

  // function hideAlert() {
  //   setTimeout(() => {
  //     setIsOpen(false)
  //   }, 2500);
  // }

  return (
    <div>
      <MyDropdown butttonContent="Вибрати опцію">
        <div>
          <Box display="flex" flexDirection="column" gap={1} maxWidth={290}>
            <Button 
              variant="contained" 
              // onClick={handleApplyButtonClick}
              disabled={weekdays.length === 0}
            >
              Повторювати список справ
            </Button>
            <Button variant="contained">
              Не повторювати список справ
            </Button>
          </Box>
          <WeekDays />
        </div>
      </MyDropdown>
      <Alert 
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      >
        <div>
          {/* {alertText} */}
        </div>
      </Alert>
    </div>
  )
}
