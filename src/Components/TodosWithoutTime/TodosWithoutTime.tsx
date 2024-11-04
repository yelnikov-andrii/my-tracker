import React from 'react'
import { MyContainer } from '../UI/Container';
import { Box, Button, Typography } from '@mui/material';
import { Form } from './Form';
import { TodoList } from './List';
import { MyModal } from '../UI/MyModal';


export const TodosWithoutTime = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Box paddingTop={6}>
      <MyContainer>
      <Typography variant='h3'>
        Справи без ліміту
      </Typography>
      <MyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Form 
          setIsOpen={setIsOpen}
        />
      </MyModal>
      <div>
        <Button 
          onClick={() => {
            setIsOpen(true)
          }}
          variant='contained'
        >
          Додати справу
        </Button>
      </div>
      <TodoList />
      </MyContainer>
    </Box>
  )
}
