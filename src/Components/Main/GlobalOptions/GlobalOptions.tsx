/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { MyDropdown } from '../../../UI/MyDropdown'
import { Box, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Alert } from '../../../UI/Alert';
import { WeekDays } from './WeekDays';
import { clearDaysWhereDealsIsEmpty } from '../../../store/todosSlice';
import { TodoInterface } from '../../../types/todos';
import { addWeekdays } from '../../../store/weekdaySlice';
import { saveWeekdaysToLocaleStorage } from '../../../helpers/saveDataToLocaleStorage';
import { addTodosForRepeating } from '../../../store/todosRepeatedSlice';

interface Props {
  date: string;
}

export const GlobalOptions: React.FC<Props> = ({ date }) => {
  // const [selectedDays, setSelectedDays] = React.useState<string[]>([]);
  const { weekdays } = useSelector((state: RootState) => state.weekday);
  const { days } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [alertText, setAlerttext] = React.useState('Тепер справи за цей день будут повторюватись по вибраним дням тижня');

  const foundDay = days.find(day => day.date === date);
  
  function handleApplyButtonClick() {
    dispatch(addTodosForRepeating({ days: weekdays, todos: foundDay?.todos as TodoInterface[] }));
    setAlerttext('Тепер справи за цей день будут повторюватись по вибраним дням тижня');
    saveWeekdaysToLocaleStorage(weekdays);
    setIsOpen(true);
    hideAlert();
  }

  function hideAlert() {
    setTimeout(() => {
      setIsOpen(false)
    }, 2500);
  }

  function handleOffRepeating() {
    dispatch(addTodosForRepeating({days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], todos: []}));
    dispatch(clearDaysWhereDealsIsEmpty());
    dispatch(addWeekdays([]));
    setIsOpen(true);
    setAlerttext('Повторювання справ вимкнено')
    hideAlert();
  }

  return (
    <div>
      <MyDropdown butttonContent="Вибрати опцію">
        <div>
          <Box display="flex" flexDirection="column" gap={1} maxWidth={290}>
          <Button 
            variant="contained" 
            onClick={handleApplyButtonClick}
            disabled={weekdays.length === 0}
          >
            Повторювати список справ
          </Button>
          <Button variant="contained" onClick={handleOffRepeating}>
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
          {alertText}
        </div>
      </Alert>
    </div>
  )
}
