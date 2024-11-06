import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: StateInterface = {
  todoToChange: null,
  todoName: '',
  todos: [],
  filteredTodos: [],
  allChecked: false,
};

export const todoslice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getTodosFromServer: (state: StateInterface, action: PayloadAction<any>) => {
      state.todos = action.payload;
    },
    selectTodoToChange: (state: StateInterface, action: PayloadAction<TodoInterface | null>) => {
      if (action.payload) {
        state.todoToChange = action.payload;
        state.todoName = action.payload.name;
        return;
      }

      state.todoName = '';
      state.todoToChange = null;

    },
    toggleAllAction: (state: StateInterface, action: PayloadAction<boolean>) => {
      state.allChecked = action.payload;
    },
    setFilteredTodos: (state: StateInterface, action: PayloadAction<any>) => {
      state.filteredTodos = action.payload;
    },
    changeTodoAction: (state: StateInterface, action: PayloadAction<any>) => {
      const foundTodo = state.todos.find(todo => todo.id === action.payload.todoId);
      if (foundTodo) {
        Object.assign(foundTodo, action.payload.todo);
      }
    },
    deleteTodoAction: (state: StateInterface, action: PayloadAction<any>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    changeTodoName: (state: StateInterface, action: PayloadAction<string>) => {
      state.todoName = action.payload;
    },
  },
});

export const { changeTodoName, changeTodoAction, setFilteredTodos, deleteTodoAction, getTodosFromServer, selectTodoToChange, toggleAllAction } = todoslice.actions;

export default todoslice.reducer;