import { Box, Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux';
import { selectTodoToChange } from '../../../store/todosSlice';
import AddIcon from '@mui/icons-material/Add';

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
        size='large'
        style={{
          fontWeight: '600', 
          textTransform: 'uppercase',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4px',
          margin: '0'
        }}
      >
        Додати справу
        <AddIcon />
      </Button>
      
    </Box>
  )
}
