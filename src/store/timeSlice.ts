import { createSlice } from '@reduxjs/toolkit';

export interface TimeState {
  startHour: string;
  startMinutes: string;
  finishHour: string;
  finishMinutes: string;
  currentDate: any;
}

const initialState: TimeState = {
  startHour: '00',
  startMinutes: '00',
  finishHour: '00',
  finishMinutes: '00',
  currentDate: new Date().toISOString(),
}

export const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    setStartHour: (state: TimeState, action) => {
      state.startHour = action.payload;
    },
    setStartMinutes: (state: TimeState, action) => {
      state.startMinutes = action.payload;
    },
    setFinishHour: (state: TimeState, action) => {
      state.finishHour = action.payload;
    },
    setFinishMinutes: (state: TimeState, action) => {
      state.finishMinutes = action.payload;
    },
    setDate: (state: TimeState, action) => {
      state.currentDate = action.payload;
    }
  },
});

export const { setStartHour, setStartMinutes, setFinishHour, setFinishMinutes, setDate } = timeSlice.actions;

export default timeSlice.reducer;