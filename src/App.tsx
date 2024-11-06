/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { TodosWithoutTime } from './Components/TodosWithoutTime/TodosWithoutTime';
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import { changeAuth, changeUser } from './store/authSlice';
import { useGetTodos } from './helpers/useGetTodos';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getTodos] = useGetTodos();

  const token = localStorage.getItem('accessToken');
  const userStr = localStorage.getItem('user_todo');
  const { user } = useSelector((state: RootState) => state.auth);
  const [userIsLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    if (userStr && !userIsLoaded) {
        const obj = JSON.parse(userStr);
        dispatch(changeUser(obj));
        setIsUserLoaded(true);
    }
}, [userStr, dispatch, userIsLoaded]);

  useEffect(() => {
    if (token && user && userIsLoaded) {
      dispatch(changeAuth(true));
      getTodos();
    }

    if ((!token || !user) && userIsLoaded) {
      navigate('/login');
    }
  }, [navigate, userIsLoaded]);

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
