import { configureStore } from '@reduxjs/toolkit';
import timeSlice from './timeSlice';
import todosSlice from './todosSlice';
import weekdaySlice from './weekdaySlice';
import todosRepeatedSlice from './todosRepeatedSlice';

export const store = configureStore({
  reducer: {
    todos: todosSlice,
    todosRepeated: todosRepeatedSlice,
    time: timeSlice,
    weekday: weekdaySlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;