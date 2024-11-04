import { Box, Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  setReadyToDelete: Dispatch<SetStateAction<boolean>>;
  date: string;
}

export const DeleteCompleted: React.FC<Props> = ({ setReadyToDelete }) => {

  return (
    <Box>
      <Button onClick={() => setReadyToDelete(true)}>
        Видалити завершені
      </Button>
    </Box>
  )
}
