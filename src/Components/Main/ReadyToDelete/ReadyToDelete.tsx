import React, { Dispatch, SetStateAction } from 'react';
import { MyModal1 } from '../../../UI/MyModal1';
import { deleteCompletedTasks } from '../../../store/dealSlice';
import { Box, Button, Typography } from '@mui/material';
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  readyToDelete: boolean;
  setReadyToDelete: Dispatch<SetStateAction<boolean>>;
}

export const ReadyToDelete: React.FC <Props> = ({ readyToDelete, setReadyToDelete }) => {
  const dispatch = useDispatch();
  const { currentDate } = useSelector((state: RootState) => state.time);

  return (
    <MyModal1
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
            dispatch(deleteCompletedTasks(currentDate));
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
    </MyModal1>
  )
}
