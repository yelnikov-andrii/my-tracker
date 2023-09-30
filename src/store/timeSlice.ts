import { createSlice } from '@reduxjs/toolkit';

export interface TimeState {
  startHour: string;
  startMinutes: string;
  finishHour: string;
  finishMinutes: string;
}

const initialState: TimeState = {
  startHour: '00',
  startMinutes: '00',
  finishHour: '00',
  finishMinutes: '00',
}

export const timeSlice: any = createSlice({
  name: 'time',
  initialState,
  reducers: {
    setStartHour: (state: any, action: any) => {
      state.startHour = action.payload;
    },
    setStartMinutes: (state: any, action: any) => {
      state.startMinutes = action.payload;
    },
    setFinishHour: (state: any, action: any) => {
      state.finishHour = action.payload;
    },
    setFinishMinutes: (state: any, action: any) => {
      state.finishMinutes = action.payload;
    }
  },
});

export const { setStartHour, setStartMinutes, setFinishHour, setFinishMinutes } = timeSlice.actions;

export default timeSlice.reducer;