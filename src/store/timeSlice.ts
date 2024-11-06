import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    },
    changeTime: (state, action: PayloadAction<{start: string; finish: string}>) => {
      state.startTime = action.payload.start;
      state.finishTime = action.payload.finish;
    }
  },
});

export const { setDate, setStartTime, setFinishTime, changeTime } = timeSlice.actions;

export default timeSlice.reducer;