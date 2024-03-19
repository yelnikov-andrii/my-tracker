import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { saveDateWhenTodosRepeated, saveTodosForRepeatingInLocaleStorage } from "../helpers/saveDataToLocaleStorage";
import { DayTodosForRepeatingInterface, TodoRepeatedInterface } from "../types/todosRepeated";

interface StateInterface {
  todosRepeated: TodoRepeatedInterface[];
  dateWhenTodosRepeated: string;
}

const initialState: StateInterface = {
  todosRepeated: [
    {
      day: 'mon',
      todos: [],
    },
    {
      day: 'tue',
      todos: [],
    },
    {
      day: 'wed',
      todos: [],
    },
    {
      day: 'thu',
      todos: [],
    },
    {
      day: 'fri',
      todos: [],
    },
    {
      day: 'sat',
      todos: [],
    },
    {
      day: 'sun',
      todos: [],
    }
  ],
  dateWhenTodosRepeated: ''
}

const todosRepeatedSlice = createSlice({
  name: 'todosRepeated',
  initialState,
  reducers: {
    addTodosForRepeating: (state: StateInterface, action: PayloadAction<DayTodosForRepeatingInterface>) => {
      state.todosRepeated = state.todosRepeated.map((obj: TodoRepeatedInterface) => {
        if (action.payload.days.includes(obj.day)) {
          obj.todos = action.payload.todos;
        }
        return obj;
      });
      saveTodosForRepeatingInLocaleStorage(state.todosRepeated);
    },
    getTodosRepeatedFromServer: (state: StateInterface, action: PayloadAction) => {
      const todosForRepeating = localStorage.getItem('todos-for-repeating');
      const dateWhenTodosRepeated = localStorage.getItem('date-when-todos-repeated');

      if (todosForRepeating) {
        state.todosRepeated = JSON.parse(todosForRepeating);
      }

      if (dateWhenTodosRepeated) {
        state.dateWhenTodosRepeated = dateWhenTodosRepeated;
      }
    },
    setDateWhenTodosRepeated: (state: StateInterface, action) => {
      state.dateWhenTodosRepeated = action.payload;
      saveDateWhenTodosRepeated(action.payload);
    }
  }
});

export const { addTodosForRepeating, setDateWhenTodosRepeated, getTodosRepeatedFromServer } = todosRepeatedSlice.actions;
export default todosRepeatedSlice.reducer;