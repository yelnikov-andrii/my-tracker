import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { saveTodosToLocaleStorage } from '../helpers/saveTodosToLocaleStorage';
import { DayInterface, DayWithTodoInterface, TodoInterface, TodoWithoutTimeInterface } from '../types/todos';

interface StateInterface {
  days: DayInterface[];
  todosRepeated: any[];
  todoToAddBeforeThis: number | null;
  todoName: string;
  todoToChange: null | any;
  todoToAddAfterThis: null | number;
  todosWIthoutTimeline: TodoWithoutTimeInterface[];
}

const initialState: StateInterface = {
  days: [],
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
      day: 'wen',
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
  todoToAddBeforeThis: null,
  todoToAddAfterThis: null,
  todoToChange: null,
  todosWIthoutTimeline: [] as TodoWithoutTimeInterface[],
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
        repeated: false,
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
    getTodosFromStorage: (state: any) => {
    const todosString = localStorage.getItem('todos');
    state.todos = [];
    if (todosString) {
      state.todos = JSON.parse(todosString);
    }
    },
    updateTodo: (state: StateInterface, action: PayloadAction<any>) => {
    const foundDay = state.days.find((day: DayInterface) => day.date === action.payload.date);
    if (foundDay) {
    const foundTodo = foundDay.todos.find(todo => todo.id === action.payload.id);
    if (foundTodo) {
      foundTodo.completed = !foundTodo.completed;
    }
    saveTodosToLocaleStorage([...state.days]);
    }

    },
    removeTodo: (state: StateInterface, action: PayloadAction<any>) => {
    const foundDay = state.days.find((day: DayInterface) => day.date === action.payload.date);
    if (foundDay) {
    foundDay.todos = foundDay.todos.filter(todo => todo.id !== action.payload.id);
    saveTodosToLocaleStorage([...state.days]);
    }
    },
    selectTodoToChange: (state: StateInterface, action: PayloadAction<any | null>) => {
      state.todoToChange = action?.payload?.todo.id || null;
      const foundDay = state.days.find(day => day.date === action.payload?.date);

      if (foundDay) {
        state.todoName = foundDay.todos.find(deal => deal.id === action?.payload?.todo.id)?.name || '';
      }
    },
    selectTodoToAddAfterThis: (state: StateInterface, action: PayloadAction<number | null>) => {
      state.todoToAddAfterThis = action.payload;
    },
    selectTodoToAddBeforeThis: (state, action) => {
        state.todoToAddBeforeThis = action.payload;
    },
    changeTheDeal: (state: StateInterface, action: PayloadAction<any>) => {
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
    addTodoWithoutTimeline: (state: StateInterface, action: PayloadAction<any>) => {
      state.todosWIthoutTimeline.push(action.payload);
    },
    updateTodoWithout: (state: StateInterface, action: PayloadAction<number>) => {
      const foundTodo = state.todosWIthoutTimeline.find((todo: any) => todo.id === action.payload);
      if (foundTodo) {
        foundTodo.completed = !foundTodo.completed;
      }
    },
    removeTodoWithout: (state: StateInterface, action: PayloadAction<number>) => {
      state.todosWIthoutTimeline = state.todosWIthoutTimeline.filter((todo: any) => todo.id !== action.payload);
    },
    changeTodoName: (state: StateInterface, action: PayloadAction<string>) => {
        state.todoName = action.payload;
    },
    addTodosForRepeating: (state: StateInterface, action: PayloadAction<any>) => {
      state.todosRepeated = state.todosRepeated.map((obj: any) => {
        if (action.payload.days.includes(obj.day)) {
          obj.todos = action.payload.todos;
        }
        return obj;
      });
    },
    addDay: (state: StateInterface, action: PayloadAction<any>) => {
      state.days.push(action.payload);
      saveTodosToLocaleStorage([...state.days]);
    }
  },
});

export const { addTodo, changeTodoName, getTodosFromStorage, addTodoBeforeThis, addTodoAfterThis, selectTodoToAddBeforeThis, selectTodoToAddAfterThis, selectTodoToChange, changeTheDeal, updateTodo, removeTodo, deleteCompletedTasks, addTodoWithoutTimeline, updateTodoWithout, addTodosForRepeating, addDay } = todoslice.actions;

export default todoslice.reducer;