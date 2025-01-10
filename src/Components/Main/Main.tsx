/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { MyContainer } from '../UI/Container';
import { Form } from './Form/Form';
import { TodoList } from './TodoList/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { MyCalendar } from '../UI/MyCalendar';
import { setDate } from '../../store/timeSlice';
import { formatDate } from '../../helpers/formateDate';
import { DateBlock } from './DateBlock/DateBlock';
import { DeleteCompleted } from './DeleteCompleted/DeleteCompleted';
import { ReadyToDelete } from './ReadyToDelete/ReadyToDelete';
import { Box } from '@mui/material';
import { AddTodoBlock } from './AddTodoBlock/AddTodoBlock';
import { MyModal } from '../UI/MyModal';
import MyDropdown from '../UI/MyDropdown';

export const Main: React.FC = () => {
  const dispatch = useDispatch();

  const currentDate = useSelector((state: RootState) => state.time.currentDate);
  const [readyToDelete, setReadyToDelete] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

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
        >
          <Form
            date={formatDate(currentDate)}
            setIsOpen={setIsOpen}
          />
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
      </MyContainer>
    </Box>
  )
}
