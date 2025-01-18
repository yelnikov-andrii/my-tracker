/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { MyContainer } from '../UI/Container';
import { Form } from './Form/Form';
import { TodoList } from './TodoList/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { MyCalendar } from '../UI/MyCalendar';
import { setDate } from '../../store/timeSlice';
import { formatDate } from '../../helpers/dateAndTimeHelpers/formateDate';
import { DateBlock } from './DateBlock/DateBlock';
import { DeleteCompleted } from './DeleteCompleted/DeleteCompleted';
import { ReadyToDelete } from './ReadyToDelete/ReadyToDelete';
import { Alert, Box, Button } from '@mui/material';
import { AddTodoBlock } from './AddTodoBlock/AddTodoBlock';
import { MyModal } from '../UI/MyModal';
import MyDropdown from '../UI/MyDropdown';
import { clearGlobalAlert } from '../../store/globalAlert';

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
        <MyDropdown butttonContent="Календар">
          <MyCalendar
            value={currentDate}
            onChange={changeCurrentDate}
          />
        </MyDropdown>
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
          <Box sx={{ padding: '16px 0 32px' }}>
            <Alert
              severity='error'
              className='global_alert'
              variant="filled"
              action={
                <Button color="inherit" size="small" onClick={() => {
                  dispatch(clearGlobalAlert());
                }}>
                  ок
                </Button>
              }
            >
              {alert}
            </Alert>
          </Box>
        )}
      </MyContainer>
    </Box>
  )
}
