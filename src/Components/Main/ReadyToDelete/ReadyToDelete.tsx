import React, { Dispatch, SetStateAction } from 'react';
import { MyModal } from '../../UI/MyModal';
import { Box, Button, Typography } from '@mui/material';
// import { useDispatch } from 'react-redux';

interface Props {
  readyToDelete: boolean;
  setReadyToDelete: Dispatch<SetStateAction<boolean>>;
  date: string;
}

export const ReadyToDelete: React.FC <Props> = ({ readyToDelete, setReadyToDelete }) => {
  // const dispatch = useDispatch();

  return (
    <MyModal
      isOpen={readyToDelete}
      setIsOpen={setReadyToDelete}
    >
      <Typography>
        Ви впевнені, що бажаєте видалити всі завершені справи за цей день?
      </Typography>
      <Box display="flex" alignItems="center" gap={2} marginTop={2}>
        <Button
          variant="contained"
          onClick={() => {
            // dispatch(deleteCompletedTasks(date));
            setReadyToDelete(false);
          }}
        >
          Так
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setReadyToDelete(false);
          }}
        >
          Ні
        </Button>
      </Box>
    </MyModal>
  )
}
