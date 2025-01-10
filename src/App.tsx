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
import { getTodosFromLocalStorage } from './helpers/todosInLocaleStorage';
import { setDate } from './store/timeSlice';
import { useGetTodos } from './helpers/useGetTodos';

function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem('accessToken');
  const userStr = localStorage.getItem('user_todo');
  const date = localStorage.getItem('date_tracker');

  const todosFromStorage = React.useMemo(() => getTodosFromLocalStorage(), []);
  const [getTodos] = useGetTodos();

  const { isAuth } = useSelector((state: RootState) => state.auth);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (todosFromStorage.length) {
      dispatch(getTodosFromServer(todosFromStorage));
    }

    if (date) {
      const formatedDate = date.toString();
      dispatch(setDate(formatedDate));
    }
  }, [todosFromStorage, date]);

  useEffect(() => {
    if (userStr) {
      const user = JSON.parse(userStr);
      dispatch(changeUser(user));
      setInitialized(true);
    } else {
      setInitialized(true);
    }

    if (token) {
      dispatch(changeAuth(true));
    }
  }, []);

  useEffect(() => {
    console.log('get todos')
    getTodos();
  }, [])

  if (!initialized) {
    return (
      <div style={{ padding: '48px' }}>
        <h4>
          Loading...
        </h4>
      </div>
    )
  }

  console.log('apprenders')

  return (
    <div>
      <Header />
      <div className='container'>
        {isAuth ? (
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
        ) : (
          <Routes>
            <Route path='/' element={<Navigate to="/login" />}>
            </Route>
            <Route path='/login' element={<Login />}>
            </Route>
            <Route path='/registration' element={<Registration />}>
            </Route>
            <Route path='/todos-without-timeline' element={<Navigate to="/login" />}>
            </Route>
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
