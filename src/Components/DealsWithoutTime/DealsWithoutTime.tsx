import React from 'react'
import { useDispatch } from 'react-redux'
import { MyModal } from '../../UI/MyModal';
import { MyContainer } from '../../UI/Container';
import { openModal } from '../../store/modalSlice';
import { Box, Button, Typography } from '@mui/material';
import { Form } from './Form';
import { DealList } from './List';


export const DealsWithoutTime = () => {
  const dispatch = useDispatch();

  return (
    <Box paddingTop={6}>
      <MyContainer>
      <Typography variant='h3'>
        Справи без ліміту
      </Typography>
      <MyModal>
        <Form />
      </MyModal>
      <div>
        <Button 
          onClick={() => {
            dispatch(openModal());
          }}
          variant='contained'
        >
          Додати справу
        </Button>
      </div>
      <DealList />
      </MyContainer>
    </Box>
  )
}
