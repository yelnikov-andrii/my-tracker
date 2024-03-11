import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { saveTodosToLocaleStorage } from '../helpers/saveDataToLocaleStorage';
import { DayInterface, DayWithTodoInterface, TodoForUpdateInterface, TodoInterface, TodoToChangeInterface, ToggleDayInterface } from '../types/todos';

interface StateInterface {
  days: DayInterface[];
  todoToAddBeforeThis: number | null;
  todoName: string;
  todoToChange: null | number | string;
  todoToAddAfterThis: null | number | string;
}

const initialState: StateInterface = {
  days: [],
  todoToAddBeforeThis: null,
  todoToAddAfterThis: null,
  todoToChange: null,
  todoName: '',
};

export const todoslice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state: StateInterface, action: PayloadAction<DayWithTodoInterface>) => {
    const foundDay = state.days.find((day: DayInterface) => day.date === action.payload.date);
    if (foundDay) {
      foundDay.todos = [...foundDay.todos, action.payload.todo];
      saveTodosToLocaleStorage(state.days);
    } else {
      const day = {
        date: action.payload.date,
        todos: [] as TodoInterface[],
      };
      day.todos.push(action.payload.todo);
      state.days.push(day);
      saveTodosToLocaleStorage(state.days);
    }
    },
    addTodoAfterThis: (state: StateInterface, action: PayloadAction<DayWithTodoInterface>) => {
    const foundDay = state.days.find(day => day.date === action.payload.date);
    if (foundDay) {
      const foundIndex = foundDay.todos.findIndex((todo) => todo.id === state.todoToAddAfterThis);

      if (foundIndex !== -1) {
        foundDay.todos.splice(foundIndex + 1, 0, action.payload.todo);
        saveTodosToLocaleStorage(state.days);
      }
    }
    },
    addTodoBeforeThis: (state: StateInterface, action: PayloadAction<DayWithTodoInterface>) => {
    const foundDay = state.days.find(day => day.date === action.payload.date);
    if (foundDay) {
      const foundIndex = foundDay.todos.findIndex((todo) => todo.id === state.todoToAddBeforeThis);

      if (foundIndex !== -1) {
        foundDay.todos.splice(foundIndex, 0, action.payload.todo);
        saveTodosToLocaleStorage(state.days);
      }
    }
    },
    getTodosFromStorage: (state: StateInterface) => {
      const todosString = localStorage.getItem('todos');
      state.days = [] as DayInterface[];
      if (todosString) {
        state.days = JSON.parse(todosString);
      }
    },
    updateTodo: (state: StateInterface, action: PayloadAction<TodoForUpdateInterface>) => {
      const foundDay = state.days.find((day: DayInterface) => day.date === action.payload.date);
      if (foundDay) {
      const foundTodo = foundDay.todos.find(todo => todo.id === action.payload.id);
      if (foundTodo) {
        foundTodo.completed = !foundTodo.completed;
      }
      saveTodosToLocaleStorage([...state.days]);
    }

    },
    removeTodo: (state: StateInterface, action: PayloadAction<TodoForUpdateInterface>) => {
    const foundDay = state.days.find((day: DayInterface) => day.date === action.payload.date);
    if (foundDay) {
    foundDay.todos = foundDay.todos.filter(todo => todo.id !== action.payload.id);
    saveTodosToLocaleStorage([...state.days]);
    }
    },
    selectTodoToChange: (state: StateInterface, action: PayloadAction<TodoForUpdateInterface | null>) => {
      state.todoToChange = action?.payload?.id || null;
      const foundDay = state.days.find(day => day.date === action.payload?.date);

      if (foundDay) {
        state.todoName = foundDay.todos.find(todo => todo.id === action?.payload?.id)?.name || '';
      }
    },
    selectTodoToAddAfterThis: (state: StateInterface, action: PayloadAction<number | string | null>) => {
      state.todoToAddAfterThis = action.payload;
    },
    selectTodoToAddBeforeThis: (state, action) => {
        state.todoToAddBeforeThis = action.payload;
    },
    changeTheTodo: (state: StateInterface, action: PayloadAction<TodoToChangeInterface>) => {
      const foundDay = state.days.find(day => day.date === action.payload.date);
      if (foundDay) {
        const foundTodo = foundDay.todos.find(todo => todo.id === state.todoToChange);

        if (foundTodo) {
          foundTodo.name = action.payload.todo.name;
          foundTodo.start = action.payload.todo.start;
          foundTodo.finish = action.payload.todo.finish;
        }
        saveTodosToLocaleStorage([...state.days]);
      }
    },
    deleteCompletedTasks: (state: StateInterface, action: PayloadAction<string>) => {
      const foundDay = state.days.find(day => day.date === action.payload);
      if (foundDay) {
        foundDay.todos = foundDay.todos.filter(todo =>  !todo.completed );
      }
      saveTodosToLocaleStorage([...state.days]);
    },
    changeTodoName: (state: StateInterface, action: PayloadAction<string>) => {
        state.todoName = action.payload;
    },
    addDay: (state: StateInterface, action: PayloadAction<DayInterface>) => {
      state.days.push(action.payload);
      saveTodosToLocaleStorage(state.days);
    },
    clearDaysWhereDealsIsEmpty: (state: StateInterface) => {
      state.days = state.days.filter(day => day.todos.length > 0);
      saveTodosToLocaleStorage(state.days);
    },
    toggleTodos: (state: StateInterface, action: PayloadAction<ToggleDayInterface>) => {
      const foundDay = state.days.find(day => day.date === action.payload.date);
      if (foundDay) {
        if (action.payload.isToggled) {
          foundDay.todos = foundDay?.todos.map(todo => {
            if (todo.completed) {
              return todo;
            } else {
              const newTodo = {...todo};
              newTodo.completed = true;
              return newTodo;
            }
          });
        } else {
          foundDay.todos = foundDay?.todos.map(todo => {
            if (todo.completed) {
              const newTodo = {...todo};
              newTodo.completed = false;
              return newTodo;
            } else {
              return todo;
            }
          });
        }
      }
    }
  },
});

export const { addTodo, changeTodoName, getTodosFromStorage, addTodoBeforeThis, addTodoAfterThis, selectTodoToAddBeforeThis, selectTodoToAddAfterThis, selectTodoToChange, changeTheTodo, updateTodo, removeTodo, deleteCompletedTasks, addDay, clearDaysWhereDealsIsEmpty, toggleTodos } = todoslice.actions;

export default todoslice.reducer;