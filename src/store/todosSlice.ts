import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { saveTodosToLocalStorage } from '../helpers/localeStorage/todosInLocaleStorage';

const initialState: StateInterface = {
  todoToChange: null,
  todoName: '',
  todos: [],
  todosLoading: false,
  filteredTodos: [],
  allChecked: false,
  todosWithoutTime: [],
};

export const todoslice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodosLoading: (state: StateInterface, action: PayloadAction<boolean>) => {
      state.todosLoading = action.payload;
    },
    getTodosFromServer: (state: StateInterface, action: PayloadAction<any>) => {
      state.todos = action.payload;
      saveTodosToLocalStorage(action.payload);
    },
    getTodosWithoutTimeFromServer: (state: StateInterface, action: PayloadAction<any>) => {
      state.todosWithoutTime = action.payload;
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
      saveTodosToLocalStorage(state.todos);
    },
    changeTodoAction: (state: StateInterface, action: PayloadAction<any>) => {
      const updatedTodos = state.todos.map(todo => {
        if (todo.id === action.payload.todoId) {
          const newTodo = {...todo};
          Object.assign(newTodo, action.payload.todo);
          return newTodo;
        } else {
          return todo;
        }
      });
      state.todos = updatedTodos;
      saveTodosToLocalStorage(updatedTodos);
    },
    deleteTodoAction: (state: StateInterface, action: PayloadAction<any>) => {
      const newTodos = state.todos.filter(todo => todo.id !== action.payload);
      state.todos = newTodos;
      saveTodosToLocalStorage(newTodos);
    },
    changeTodoName: (state: StateInterface, action: PayloadAction<string>) => {
      state.todoName = action.payload;
    },
    addTodoAction: (state: StateInterface, action: PayloadAction<any>) => {
      state.todos.push(action.payload);
      saveTodosToLocalStorage(state.todos);
    },
    addTodoWithoutTime: (state: StateInterface, action: PayloadAction<TodoWithoutTmeI>) => {
      state.todosWithoutTime.push(action.payload);
    },
    deleteTodoWithoutAction: (state: StateInterface, action: PayloadAction<any>) => {
      state.todosWithoutTime = state.todosWithoutTime.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { changeTodoName, changeTodoAction, setFilteredTodos, deleteTodoAction, getTodosFromServer, selectTodoToChange, toggleAllAction, addTodoAction, addTodoWithoutTime, getTodosWithoutTimeFromServer, deleteTodoWithoutAction, setTodosLoading } = todoslice.actions;

export default todoslice.reducer;