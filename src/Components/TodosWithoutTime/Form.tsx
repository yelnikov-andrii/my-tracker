import { Box, Button, OutlinedInput } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react'
import { baseUrl } from '../../helpers/baseUrl';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Form: React.FC<Props> = () => {
  const [todoName, setTodoName] = React.useState('');
  const { user } = useSelector((state: RootState) => state.auth);

  async function addTodo(todo: TodoWithoutTmeI) {
    try {
      const response = await fetch(`${baseUrl}/todos-without-time`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ todo, userId: user?.id })
      });

      if (!response.ok) {
        throw new Error(`Failed to create todo: ${response.statusText}`);
      }

    } catch (e) {
      console.error('Error creating todo', e);
    }
  }

  function addTodoHandler(e: any) {
    e.preventDefault();
    const newTodo = {
      name: todoName,
      completed: false,
    };

    if (user) {
      addTodo(newTodo);
      setTodoName('');
    }

  }

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={1}
      sx={{
        width: '450px',
        "@media screen and (max-width: 768px)": {
          width: '100%'
        }
      }}
    >
      <OutlinedInput
        sx={{
          'input': {
            padding: '8px 16px'
          }
        }}
        value={todoName}
        onChange={(e) => {
          setTodoName(e.target.value);
        }}
      />
      <Button
        onClick={(e) => {
          addTodoHandler(e)
        }}
        variant='contained'
      >
        Додати справу
      </Button>
    </Box>
  )
}
