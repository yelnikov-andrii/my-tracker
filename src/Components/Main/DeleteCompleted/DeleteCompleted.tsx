import { Box, Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { formatDate } from '../../../helpers/formateDate';

interface Props {
  setReadyToDelete: Dispatch<SetStateAction<boolean>>;
}

export const DeleteCompleted: React.FC <Props> = ({ setReadyToDelete }) => {
  const { deals } = useSelector((state: RootState) => state.deal);
  const { currentDate } = useSelector((state: RootState) => state.time);
  
  return (
    <Box>
      <Button onClick={(e) => {
        if (deals.find(deal => (deal.date === formatDate(currentDate)) && deal.completed === true)) {
          setReadyToDelete(true);
        } else {
          return;
        }
      }}>
        Видалити завершені
      </Button>
    </Box>
  )
}
