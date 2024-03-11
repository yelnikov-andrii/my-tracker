/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { MyDropdown } from '../../../UI/MyDropdown'
import { Box, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Alert } from '../../../UI/Alert';
import { WeekDays } from './WeekDays';
import { clearDaysWhereDealsIsEmpty } from '../../../store/todosSlice';
import { DayInterface, TodoInterface } from '../../../types/todos';
import { addWeekdays } from '../../../store/weekdaySlice';
import { saveWeekdaysToLocaleStorage } from '../../../helpers/saveDataToLocaleStorage';
import { addTodosForRepeating, setDateWhenTodosRepeated } from '../../../store/todosRepeatedSlice';

interface Props {
  date: string;
}

export const GlobalOptions: React.FC<Props> = ({ date }) => {
  // const [selectedDays, setSelectedDays] = React.useState<string[]>([]);
  const { weekdays } = useSelector((state: RootState) => state.weekday);
  const { days } = useSelector((state: RootState) => state.todos);
  const { dateWhenTodosRepeated } = useSelector((state: RootState) => state.todosRepeated);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [alertText, setAlerttext] = React.useState('Тепер справи за цей день будут повторюватись по вибраним дням тижня');

  const foundDay = days.find((day: DayInterface) => day.date === date);
  
  function handleApplyButtonClick() {
    dispatch(addTodosForRepeating({ days: weekdays, todos: foundDay?.todos as TodoInterface[] }));
    setAlerttext('Тепер справи за цей день будут повторюватись по вибраним дням тижня');
    saveWeekdaysToLocaleStorage(weekdays);
    dispatch(setDateWhenTodosRepeated(date));
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
    dispatch(setDateWhenTodosRepeated(''));
    setIsOpen(true);
    setAlerttext('Повторювання справ вимкнено');
    saveWeekdaysToLocaleStorage([]);
    hideAlert();
  }

  return (
    <div>
      <MyDropdown butttonContent="Вибрати опцію">
        <div>
          {dateWhenTodosRepeated && (
            <Box mb={1}>
              справи цієї дати {dateWhenTodosRepeated} будуть повторюватись по дням тижня
            </Box>
          )}
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
