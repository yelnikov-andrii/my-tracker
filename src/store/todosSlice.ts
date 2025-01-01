import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { saveTodosToLocalStorage } from '../helpers/todosInLocaleStorage';

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
      localStorage.setItem('todos_tracker', JSON.stringify(action.payload));
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
      localStorage.setItem('todos_tracker', JSON.stringify(state.todos));
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
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos_tracker', JSON.stringify(state.todos));
    },
    changeTodoName: (state: StateInterface, action: PayloadAction<string>) => {
      state.todoName = action.payload;
    },
    addTodoAction: (state: StateInterface, action: PayloadAction<any>) => {
      state.todos.push(action.payload);
      localStorage.setItem('todos_tracker', JSON.stringify(state.todos));
    }
  },
});

export const { changeTodoName, changeTodoAction, setFilteredTodos, deleteTodoAction, getTodosFromServer, selectTodoToChange, toggleAllAction, addTodoAction } = todoslice.actions;

export default todoslice.reducer;