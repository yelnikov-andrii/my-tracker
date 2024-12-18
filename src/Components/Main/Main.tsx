/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
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
import { AddTodoBlock } from './AddTodoBlock/AddTodoBlock';
import { MyModal } from '../../UI/MyModal';
import { getTodosFromServer } from '../../store/todosSlice';
import { baseUrl } from '../../helpers/baseUrl';

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const { currentDate } = useSelector((state: RootState) => state.time);
  const [readyToDelete, setReadyToDelete] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useSelector((state: RootState) => state.auth);



  function changeCurrentDate(newDate: Date) {
    dispatch(setDate(newDate.toISOString()))
  }

  async function getTodos() {
    try {
      const response = await fetch(`${baseUrl}/todos/${user.id}`);
      const todos = await response.json();
      dispatch(getTodosFromServer(todos));
    }

    catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getTodos();
  })

  return (
    <Box paddingTop={3}>
      <MyContainer>
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
