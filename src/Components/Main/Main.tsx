/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { MyContainer } from '../UI/Container';
import { Form } from './Form/Form';
import { TodoList } from './TodoList/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../store/timeSlice';
import { formatDate } from '../../helpers/dateAndTimeHelpers/formateDate';
import { DateBlock } from './DateBlock/DateBlock';
import { DeleteCompleted } from './DeleteCompleted/DeleteCompleted';
import { ReadyToDelete } from './ReadyToDelete/ReadyToDelete';
import { Box } from '@mui/material';
import { AddTodoBlock } from './AddTodoBlock/AddTodoBlock';
import { MyModal } from '../UI/MyModal';
import Calendar from './Calendar/Calendar';
import GlobalAlert from './GlobalAlert/GlobalAlert';

export const Main: React.FC = () => {
  const dispatch = useDispatch();

  const currentDate = useSelector((state: RootState) => state.time.currentDate);
  const [readyToDelete, setReadyToDelete] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const alert = useSelector((state: RootState) => state.alert.alert);

  const [notClose, setNotClose] = useState(false);

  function changeCurrentDate(newDate: Date) {
    const formatedDate = newDate.toISOString();
    dispatch(setDate(formatedDate));
    localStorage.setItem('date_tracker', formatedDate);
  }

  return (
    <Box paddingTop={3}>
      <MyContainer>
        <Calendar
          value={currentDate}
          onChange={changeCurrentDate}
        />
        <DateBlock />
        <MyModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          notClose={notClose}
        >
          {isOpen && (
            <Form
              setNotClose={setNotClose}
            />
          )}
        </MyModal>
        <TodoList
          setIsOpen={setIsOpen}
        />
        <AddTodoBlock
          setIsOpen={setIsOpen}
        />
        <DeleteCompleted
          setReadyToDelete={setReadyToDelete}
        />
        {readyToDelete === true && (
          <ReadyToDelete
            readyToDelete={readyToDelete}
            setReadyToDelete={setReadyToDelete}
            date={formatDate(currentDate)}
          />
        )}
        {alert && (
          <GlobalAlert
            alert={alert}
          />
        )}
      </MyContainer>
    </Box>
  )
}
