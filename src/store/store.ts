import { configureStore } from '@reduxjs/toolkit';
import dealSlice from './dealSlice';

export const store = configureStore({
  reducer: {
    deal: dealSlice
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch