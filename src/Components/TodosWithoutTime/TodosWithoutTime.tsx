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
        <Typography variant='h6' margin="0 0 16px 0">
          Справи без часових меж
        </Typography>
        <MyModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <Form
            setIsOpen={setIsOpen}
          />
        </MyModal>
        <TodoList />
        <div>
          <Button
            onClick={() => {
              setIsOpen(true)
            }}
            size='large'
            variant='contained'
          >
            Додати справу
          </Button>
        </div>
      </MyContainer>
    </Box>
  )
}
