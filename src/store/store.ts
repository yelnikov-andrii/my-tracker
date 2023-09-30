import { configureStore } from '@reduxjs/toolkit';
import dealSlice from './dealSlice';
import modalSlice from './modalSlice';
import timeSlice from './timeSlice';

export const store = configureStore({
  reducer: {
    deal: dealSlice,
    modal: modalSlice,
    time: timeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch