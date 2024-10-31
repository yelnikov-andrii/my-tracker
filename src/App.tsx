/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { useDispatch } from 'react-redux';
import { getTodosFromStorage } from './store/todosSlice';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { TodosWithoutTime } from './Components/TodosWithoutTime/TodosWithoutTime';
import { getWeekdaysFromStorage } from './store/weekdaySlice';
import { getDataFromServer } from './store/todosRepeatedSlice';
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import { changeAuth, changeUser } from './store/authSlice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTodosFromStorage());
    dispatch(getWeekdaysFromStorage());
    dispatch(getDataFromServer());
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user_todo');

    if (user) {
      const obj = JSON.parse(user);
      dispatch(changeUser(obj));
    }

    if (token && user) {
      dispatch(changeAuth(true));
    }

    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  

  return (
    <div>
      <Header />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Main />}>
          </Route>
          <Route path='/login' element={<Login />}>
          </Route>
          <Route path='/registration' element={<Registration />}>
          </Route>
          <Route path='/todos-without-timeline' element={<TodosWithoutTime />}>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
