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

function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem('accessToken');
  const userStr = localStorage.getItem('user_todo');
  
  const todosFromStorage = getTodosFromLocalStorage();

  const { user, isAuth } = useSelector((state: RootState) => state.auth);
  const [userIsLoaded, setIsUserLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (userStr && !userIsLoaded) {
      const obj = JSON.parse(userStr);
      dispatch(changeUser(obj));
      setIsUserLoaded(true);
    }
  }, [userStr, dispatch, userIsLoaded]);

  useEffect(() => {
    if (todosFromStorage.length) {
      dispatch(getTodosFromServer(todosFromStorage));
    }
  }, [todosFromStorage]);

  useEffect(() => {
    if (token && user && userIsLoaded) {
      dispatch(changeAuth(true));
      setInitialized(true);
    }
  }, [userIsLoaded, token, user]);

  if (!initialized) {
    return (
      <div style={{ padding: '48px' }}>
        <h4>
          Loading...
        </h4>
      </div>
    )
  }

  console.log('app renders');

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
