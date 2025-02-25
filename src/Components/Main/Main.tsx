/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { Form } from './Form/Form';
import { TodoList } from './TodoList/TodoList';
import { useSelector } from 'react-redux';
import { DateBlock } from './DateBlock/DateBlock';
import { DeleteCompleted } from './DeleteCompleted/DeleteCompleted';
import { ReadyToDelete } from './ReadyToDelete/ReadyToDelete';
import { Box, Container } from '@mui/material';
import { AddTodoBlock } from './AddTodoBlock/AddTodoBlock';
import { MyModal } from '../UI/MyModal';
import Calendar from './Calendar/Calendar';
import GlobalAlert from './GlobalAlert/GlobalAlert';
import LoadingFromServerBlock from './LoadingFromServerBlock/LoadingFromServerBlock';

export const Main: React.FC = () => {
  const [readyToDelete, setReadyToDelete] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const alert = useSelector((state: RootState) => state.alert.alert);

  const [notClose, setNotClose] = useState(false);

  return (
    <Box paddingTop={3}>
      <Container>
        <Calendar />
        <DateBlock />
        <LoadingFromServerBlock />
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
          />
        )}
        {alert && (
          <GlobalAlert
            alert={alert}
          />
        )}
      </Container>
    </Box>
  )
}
