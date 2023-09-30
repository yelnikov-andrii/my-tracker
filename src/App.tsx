/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Header } from './Components/Header';
import { Main } from './Components/Main';
import { useDispatch } from 'react-redux';
import { getDealsFromStorage } from './store/dealSlice';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getDealsFromStorage());
  }, []);

  const [readyToChange, setReadyToChange] = React.useState(false);

  return (
    <div>
      <Header />
      <Main 
        readyToChange={readyToChange}
        setReadyToChange={setReadyToChange}
      />
    </div>
  );
}

export default App;
