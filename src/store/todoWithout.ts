import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoWithoutTimeInterface } from "../types/todosWithout";
import { saveTodosWithoutTimeline } from "../helpers/saveDataToLocaleStorage";

interface StateInterface {
  todosWIthoutTimeline: TodoWithoutTimeInterface[];
}

const initialState: StateInterface = {
  todosWIthoutTimeline: [] as TodoWithoutTimeInterface[],
};

const todosWithouttimelineSlice = createSlice({
  name: 'todosWithout',
  initialState,
  reducers: {
    addTodoWithoutTimeline: (state: StateInterface, action: PayloadAction<TodoWithoutTimeInterface>) => {
      state.todosWIthoutTimeline.push(action.payload);
      saveTodosWithoutTimeline(state.todosWIthoutTimeline);
    },
    updateTodoWithout: (state: StateInterface, action: PayloadAction<number>) => {
      const foundTodo = state.todosWIthoutTimeline.find((todo: TodoWithoutTimeInterface) => todo.id === action.payload);
      if (foundTodo) {
        foundTodo.completed = !foundTodo.completed;
        saveTodosWithoutTimeline(state.todosWIthoutTimeline);
      }
    },
    removeTodoWithoutTimeline: (state: StateInterface, action: PayloadAction<number>) => {
      state.todosWIthoutTimeline = state.todosWIthoutTimeline.filter((todo: TodoWithoutTimeInterface) => todo.id !== action.payload);
      saveTodosWithoutTimeline(state.todosWIthoutTimeline);
    },
  }
});

export const { addTodoWithoutTimeline, updateTodoWithout, removeTodoWithoutTimeline } = todosWithouttimelineSlice.actions;
export default todosWithouttimelineSlice.reducer;
