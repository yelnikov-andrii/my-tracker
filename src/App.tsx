/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TodosWithoutTime } from './Components/TodosWithoutTime/TodosWithoutTime';
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import { changeAuth, changeUser } from './store/authSlice';
import { getTodosFromServer } from './store/todosSlice';
import { getTodosFromLocalStorage } from './helpers/localeStorage/todosInLocaleStorage';
import { setDate } from './store/timeSlice';
import { useGetTodos } from './helpers/getTodosHelper/useGetTodos';
import { Box } from '@mui/material';

function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem('accessToken');
  const userStr = localStorage.getItem('user_todo');
  const date = localStorage.getItem('date_tracker');

  const [getTodos] = useGetTodos();

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const [initialized, setInitialized] = useState(false);

  const todosFromStorage = getTodosFromLocalStorage();

  const user = userStr ? JSON.parse(userStr) : '';

  useEffect(() => {
    if (todosFromStorage.length) {
      dispatch(getTodosFromServer(todosFromStorage));
    }

    if (date) {
      const formatedDate = date.toString();
      dispatch(setDate(formatedDate));
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(changeUser(user));
      getTodos(user.id);
    }

    if (token) {
      dispatch(changeAuth(true));
    }

    setInitialized(true);
  }, [user?.id, dispatch]);


  if (!initialized) {
    return (
      <Box sx={{ padding: '48px' }}>
        <h4>
          Завантаження<span className='dots'></span>
        </h4>
      </Box>
    )
  }

  console.log('app renders')

  return (
    <div>
      <Header />
      <div className='container'>
        <Routes>
          <Route path='/' element={isAuth ? <Main /> : <Navigate to="/login" />}>
          </Route>
          <Route path='/login' element={<Login />}>
          </Route>
          <Route path='/registration' element={<Registration />}>
          </Route>
          <Route path='/todos-without-timeline' element={isAuth ? <TodosWithoutTime /> : <Navigate to="/login" />}>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
