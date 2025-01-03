/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { MyContainer } from '../UI/Container';
import { Form } from './Form/Form';
import TodoList from './TodoList/TodoList';
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
import { useGetTodos } from '../../helpers/useGetTodos';
import { useCheckIfCompletedExist } from '../../helpers/useCheckIfCompletedIxist';

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const { currentDate } = useSelector((state: RootState) => state.time);
  const [readyToDelete, setReadyToDelete] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [getTodos] = useGetTodos();
  const isCheckedExist = useCheckIfCompletedExist();

  console.log('main renders');

  function changeCurrentDate(newDate: Date) {
    const formatedDate = newDate.toISOString();
    dispatch(setDate(formatedDate));
    localStorage.setItem('date_tracker', formatedDate);
  }

  useEffect(() => {
    getTodos();
  }, [currentDate]);

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
          date={formatDate(currentDate)}
          setIsOpen={setIsOpen}
        />
        <AddTodoBlock
          setIsOpen={setIsOpen}
        />
        {isCheckedExist && (
          <DeleteCompleted
            setReadyToDelete={setReadyToDelete}
            date={formatDate(currentDate)}
          />
        )}
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
