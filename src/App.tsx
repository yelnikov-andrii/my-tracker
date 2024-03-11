/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosFromStorage } from './store/todosSlice';
import { Routes, Route } from 'react-router-dom';
import { TodosWithoutTime } from './Components/TodosWithoutTime/TodosWithoutTime';
import { getWeekdaysFromStorage } from './store/weekdaySlice';
import { RootState } from './store/store';
import { getDataFromServer } from './store/todosRepeatedSlice';

function App() {
  const dispatch = useDispatch();
  const { todosRepeated } = useSelector((state: RootState) => state.todosRepeated);
  const { days } = useSelector((state: RootState) => state.todos);
  console.log(todosRepeated, 'todos repeated')
  console.log(days, 'dqays')

  React.useEffect(() => {
    dispatch(getTodosFromStorage());
    dispatch(getWeekdaysFromStorage());
    dispatch(getDataFromServer());
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Main />}>
        </Route>
        <Route path='/todos-without-timeline' element={<TodosWithoutTime />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
