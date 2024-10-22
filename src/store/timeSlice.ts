import { createSlice } from '@reduxjs/toolkit';

export interface TimeState {
  currentDate: string;
  startTime: any;
  finishTime: any;
}

const initialState: TimeState = {
  currentDate: new Date().toISOString(),
  startTime: null,
  finishTime: null,
}

export const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    setDate: (state: TimeState, action) => {
      state.currentDate = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setFinishTime: (state, action) => {
      state.finishTime = action.payload;
    }
  },
});

export const { setDate, setStartTime, setFinishTime } = timeSlice.actions;

export default timeSlice.reducer;