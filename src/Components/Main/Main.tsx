/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { MyContainer } from '../../UI/Container';
import { Form } from './Form/Form';
import { TodoList } from './TodoList/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { MyCalendar } from '../../UI/MyCalendar';
import { RootState } from '../../store/store';
import { setDate } from '../../store/timeSlice';
import { formatDate } from '../../helpers/formateDate';
import { DateBlock } from './DateBlock/DateBlock';
import { DeleteCompleted } from './DeleteCompleted/DeleteCompleted';
import { ReadyToDelete } from './ReadyToDelete/ReadyToDelete';
import { Box } from '@mui/material';
import { GlobalOptions } from './GlobalOptions/GlobalOptions';
import { AddTodoBlock } from './AddTodoBlock/AddTodoBlock';
import { MyModal } from '../../UI/MyModal';

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const { currentDate } = useSelector((state: RootState) => state.time);
  const [readyToDelete, setReadyToDelete] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  function changeCurrentDate(newDate: Date) {
    dispatch(setDate(newDate.toISOString()))
  }

  return (
    <Box paddingTop={3}>
      <MyContainer>
        <GlobalOptions 
          date={formatDate(currentDate)}
        />
        <MyCalendar
          value={currentDate}
          onChange={changeCurrentDate}
        />
        <DateBlock />
        <MyModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <Form 
            date={formatDate(currentDate)}
            setIsOpen={setIsOpen}
          />
        </MyModal>
        <TodoList
          date={formatDate(currentDate)}
          setIsOpen={setIsOpen}
        />
        <AddTodoBlock 
          setIsOpen={setIsOpen}
        />
        <DeleteCompleted
          setReadyToDelete={setReadyToDelete}
          date={formatDate(currentDate)}
        />
        {readyToDelete === true && (
          <ReadyToDelete 
            readyToDelete={readyToDelete}
            setReadyToDelete={setReadyToDelete}
            date={formatDate(currentDate)}
          />
        )}
      </MyContainer>
    </Box>
  )
}
