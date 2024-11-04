import { Box, Checkbox } from '@mui/material'
import React from 'react'
// import { useDispatch } from 'react-redux';

interface Props {
  date: string;
  active: boolean;
}

export const ToggleBlock: React.FC <Props> = ({ active }) => {
  const [isToggled, setIsToggled] = React.useState(false);
  // const dispatch = useDispatch();
  
  function handleCheckboxChange() {
    // if (!isToggled) {
    //   dispatch(toggleTodos({ date, isToggled: true }));
    // } else {
    //   dispatch(toggleTodos({ date, isToggled: false }));
    // }

    setIsToggled(!isToggled);
  }

  React.useEffect(() => {
    // if (foundDay?.todos.every(todo => todo.completed)) {
    //   setIsToggled(true);
    // } else {
    //   setIsToggled(false);
    // }
  }, []);

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
