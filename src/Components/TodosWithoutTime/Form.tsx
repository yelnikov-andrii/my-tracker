import { Box, Button, OutlinedInput } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react'
// import { useDispatch } from 'react-redux';

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Form: React.FC <Props> = ({ setIsOpen }) => {
  const [todoName, setTodoName] = React.useState('');

  function addTodoHandler() {
    // const newTodo = {
    //   name: todoName,
    //   id: Date.now(),
    //   completed: false,
    // };

    setTodoName('');
    setIsOpen(false);
  }

  return (
    <Box 
      component="form" 
      display="flex" 
      flexDirection="column"
      gap={1}
    >
      <OutlinedInput 
        value={todoName}
        onChange={(e) => {
          setTodoName(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          addTodoHandler()
        }}
        variant='contained'
      >
        Додати справу
      </Button>
      </Box>
  )
}
