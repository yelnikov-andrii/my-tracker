/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { useDispatch } from 'react-redux';
import { getDealsFromStorage } from './store/dealSlice';
import { Routes, Route } from 'react-router-dom';
import { DealsWithoutTime } from './Components/DealsWithoutTime/DealsWithoutTime';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getDealsFromStorage());
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Main />}>
        </Route>
        <Route path='/deals-without-timeline' element={<DealsWithoutTime />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
