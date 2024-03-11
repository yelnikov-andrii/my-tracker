import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { saveTodosForRepeatingInLocaleStorage } from "../helpers/saveDataToLocaleStorage";
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
    getDataFromServer: (state: StateInterface, action: PayloadAction) => {
      const todosForRepeating = localStorage.getItem('todos-for-repeating');

      if (todosForRepeating) {
        state.todosRepeated = JSON.parse(todosForRepeating);
      }
    },
    setDateWhenTodosRepeated: (state: StateInterface, action) => {
      state.dateWhenTodosRepeated = action.payload;
    }
  }
});

export const { addTodosForRepeating, setDateWhenTodosRepeated, getDataFromServer } = todosRepeatedSlice.actions;
export default todosRepeatedSlice.reducer;