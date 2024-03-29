import { Box, Checkbox } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { toggleTodos } from '../../../store/todosSlice';
import { DayInterface } from '../../../types/todos';

interface Props {
  date: string;
  foundDay: DayInterface | null;
  active: boolean;
}

export const ToggleBlock: React.FC <Props> = ({ date, foundDay, active }) => {
  const [isToggled, setIsToggled] = React.useState(false);
  const dispatch = useDispatch();
  
  function handleCheckboxChange() {
    if (!isToggled) {
      dispatch(toggleTodos({ date, isToggled: true }));
    } else {
      dispatch(toggleTodos({ date, isToggled: false }));
    }

    setIsToggled(!isToggled);
  }

  React.useEffect(() => {
    if (foundDay?.todos.every(todo => todo.completed)) {
      setIsToggled(true);
    } else {
      setIsToggled(false);
    }
  }, [foundDay]);

  return (
      <Box display="flex" justifyContent="flex-end" alignItems="center" paddingRight="5px">
        {active ? (
          <>
            <span>
              Вибрати усі
            </span>
            <Checkbox checked={isToggled} onChange={handleCheckboxChange} value={isToggled} />
          </>
        ) : (
          <></>
        )}
    </Box>
  )
}
