import { Box, Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddTodoBlock: React.FC <Props> = ({ setIsOpen }) => {
  return (
    <Box mb={2} mt={2}>
      <Button 
        onClick={() => {
          setIsOpen(true)
        }}
        variant="contained"
      >
        Додати справу
      </Button>
    </Box>
  )
}
