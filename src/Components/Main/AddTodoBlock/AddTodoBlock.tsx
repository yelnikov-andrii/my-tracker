import { Box, Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux';
import { selectTodoToChange } from '../../../store/todosSlice';

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddTodoBlock: React.FC <Props> = ({ setIsOpen }) => {
  const dispatch = useDispatch();

  return (
    <Box mb={2} mt={2}>
      <Button 
        onClick={() => {
          setIsOpen(true);
          dispatch(selectTodoToChange(null));
          
        }}
        variant="contained"
      >
        Додати справу
      </Button>
    </Box>
  )
}
