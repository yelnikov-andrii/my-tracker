import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateInterface {
  weekdays: string[];
}

const initialState: StateInterface = {
  weekdays: [],
};

export const weekdaySlice = createSlice({
  name: 'weekday',
  initialState,
  reducers: {
    addWeekday: (state: StateInterface, action: PayloadAction<any>) => {
      if (state.weekdays.includes(action.payload)) {
        state.weekdays = state.weekdays.filter(weekday => weekday !== action.payload);
      } else {
        state.weekdays.push(action.payload);
      }
    },
    addWeekdays: (state: StateInterface, action) => {
      state.weekdays = action.payload;
    },
    getWeekdaysFromStorage: (state: StateInterface) => {
      const weekdaysFromStorage = localStorage.getItem('weekdays');
      state.weekdays = weekdaysFromStorage ? JSON.parse(weekdaysFromStorage) : [];
    }
  },
});

export const { addWeekday, addWeekdays, getWeekdaysFromStorage } = weekdaySlice.actions;
export default weekdaySlice.reducer;