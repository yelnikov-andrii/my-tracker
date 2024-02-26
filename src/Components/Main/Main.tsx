/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { MyContainer } from '../../UI/Container';
import { MyModal } from '../../UI/MyModal';
import { Form } from './Form/Form';
import { DealList } from './DealList/DealList';
import { useDispatch, useSelector } from 'react-redux';
import { MyCalendar } from '../../UI/MyCalendar';
import { RootState } from '../../store/store';
import { setDate } from '../../store/timeSlice';
import { formatDate } from '../../helpers/formateDate';
import { ButtonBlock } from './ButtonBlock/ButtonBlock';
import { DeleteCompleted } from './DeleteCompleted/DeleteCompleted';
import { ReadyToDelete } from './ReadyToDelete/ReadyToDelete';
import { Box } from '@mui/material';

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const { currentDate } = useSelector((state: RootState) => state.time);
  const [readyToDelete, setReadyToDelete] = React.useState(false);

  function changeCurrentDate(newDate: any) {
    dispatch(setDate(newDate.toISOString()))
  }

  return (
    <Box paddingTop={6}>
      <MyContainer>
        <MyCalendar 
          value={currentDate}
          onChange={changeCurrentDate}
        />
        <ButtonBlock />
        <MyModal>
          <Form 
            date={formatDate(currentDate)}
          />
        </MyModal>
        <DealList 
          date={formatDate(currentDate)}
        />
        <DeleteCompleted
          setReadyToDelete={setReadyToDelete}
        />
        {readyToDelete === true && (
          <ReadyToDelete 
            readyToDelete={readyToDelete}
            setReadyToDelete={setReadyToDelete}
          />
        )}
      </MyContainer>
    </Box>
  )
}
