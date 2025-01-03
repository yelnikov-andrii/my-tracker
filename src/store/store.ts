import { configureStore } from '@reduxjs/toolkit';
import timeSlice from './timeSlice';
import todosSlice from './todosSlice';
import weekdaySlice from './weekdaySlice';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    todos: todosSlice,
    time: timeSlice,
    weekday: weekdaySlice,
    auth: authSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});