/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { useDispatch } from 'react-redux';
import { getTodosFromStorage } from './store/todosSlice';
import { Routes, Route } from 'react-router-dom';
import { TodosWithoutTime } from './Components/TodosWithoutTime/TodosWithoutTime';
import { getWeekdaysFromStorage } from './store/weekdaySlice';
import { getDataFromServer } from './store/todosRepeatedSlice';
import Registration from './Components/Registration/Registration';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    localStorage.clear();
    dispatch(getTodosFromStorage());
    dispatch(getWeekdaysFromStorage());
    dispatch(getDataFromServer());
  }, []);

  

  return (
    <div>
      <Header />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Main />}>
          </Route>
          <Route path='/login' element={<Main />}>
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
