import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';



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
    changeTime: (state, action: PayloadAction<TodoInterfaceToAdd>) => {
      state.startTime = action.payload.finish;
      state.finishTime = dayjs(action.payload.finish).add(5, 'minute').toISOString();
    }
  },
});

export const { setDate, setStartTime, setFinishTime, changeTime } = timeSlice.actions;

export default timeSlice.reducer;