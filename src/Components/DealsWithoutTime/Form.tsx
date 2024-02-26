import { Box, Button, OutlinedInput } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { addDealWithoutTimeline } from '../../store/dealSlice';
import { closeModal } from '../../store/modalSlice';

export const Form = () => {
  const [dealName, setDealName] = React.useState('');
  const dispatch = useDispatch();

  function addDealHandler() {
    const newDeal = {
      name: dealName,
      id: Date.now(),
      completed: false,
    };

    dispatch(addDealWithoutTimeline(newDeal));
    setDealName('');
    dispatch(closeModal());
  }

  return (
    <Box 
      component="form" 
      display="flex" 
      flexDirection="column"
      gap={1}
    >
      <OutlinedInput 
        value={dealName}
        onChange={(e) => {
          setDealName(e.target.value);
        }}
      />
      <Button
        onClick={(e) => {
          addDealHandler()
        }}
        variant='contained'
      >
        Додати справу
      </Button>
      </Box>
  )
}
