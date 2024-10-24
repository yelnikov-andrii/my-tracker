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

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
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
          <Route path='/todos-without-timeline' element={<TodosWithoutTime />}>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
