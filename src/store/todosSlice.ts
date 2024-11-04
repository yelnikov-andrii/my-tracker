import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: StateInterface = {
  todoToChange: null,
  todoName: '',
  todos: [],
  filteredTodos: [],
};

export const todoslice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getTodosFromServer: (state: StateInterface, action: PayloadAction<any>) => {
      state.todos = action.payload;
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
    // addDay: (state: StateInterface, action: PayloadAction<DayInterface>) => {
    //   state.days.push(action.payload);
    //   saveTodosToLocaleStorage(state.days);
    // },
    // clearDaysWhereDealsIsEmpty: (state: StateInterface) => {
    //   state.days = state.days.filter(day => day.todos.length > 0);
    //   saveTodosToLocaleStorage(state.days);
    // },
    // toggleTodos: (state: StateInterface, action: PayloadAction<ToggleDayInterface>) => {
    //   const foundDay = state.days.find(day => day.date === action.payload.date);
    //   if (foundDay) {
    //     if (action.payload.isToggled) {
    //       foundDay.todos = foundDay?.todos.map(todo => {
    //         if (todo.completed) {
    //           return todo;
    //         } else {
    //           const newTodo = {...todo};
    //           newTodo.completed = true;
    //           return newTodo;
    //         }
    //       });
    //     } else {
    //       foundDay.todos = foundDay?.todos.map(todo => {
    //         if (todo.completed) {
    //           const newTodo = {...todo};
    //           newTodo.completed = false;
    //           return newTodo;
    //         } else {
    //           return todo;
    //         }
    //       });
    //     }
    //   }
    // }
  },
});

export const { changeTodoName, changeTodoAction, setFilteredTodos, deleteTodoAction, getTodosFromServer } = todoslice.actions;

export default todoslice.reducer;