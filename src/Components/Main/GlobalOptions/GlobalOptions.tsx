/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { MyDropdown } from '../../../UI/MyDropdown'
import { Box, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Alert } from '../../../UI/Alert';
import { WeekDays } from './WeekDays';
import { addTodosForRepeating } from '../../../store/todosSlice';

interface Props {
  date: string;
}

export const GlobalOptions: React.FC<Props> = ({ date }) => {
  const [selectedDays, setSelectedDays] = React.useState<string[]>([]);
  const { days } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [alertText, setAlerttext] = React.useState('Тепер справи за цей день будут повторюватись по вибраним дням тижня');

  const foundDay = days.find(day => day.date === date);
  
  function handleApplyButtonClick() {
    dispatch(addTodosForRepeating({ days: selectedDays, todos: foundDay?.todos }));
    setSelectedDays([]);
    setAlerttext('Тепер справи за цей день будут повторюватись по вибраним дням тижня');
    setIsOpen(true);
    hideAlert();
  }

  function hideAlert() {
    setTimeout(() => {
      setIsOpen(false)
    }, 2500);
  }

  function handleOffRepeating() {
    dispatch(addTodosForRepeating({days: ['mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun'], todos: []}));
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
            disabled={selectedDays.length === 0}
          >
            Повторювати список справ
          </Button>
          <Button variant="contained" onClick={handleOffRepeating}>
            Не повторювати список справ
          </Button>
          </Box>
          <WeekDays 
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
        </div>
      </MyDropdown>
      <Alert isOpen={isOpen}>
        <div>
          {alertText}
        </div>
      </Alert>
    </div>
  )
}
