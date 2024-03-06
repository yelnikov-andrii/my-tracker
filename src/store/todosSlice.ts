import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { saveTodosForRepeatingInLocaleStorage, saveTodosToLocaleStorage, saveTodosWithoutTimeline } from '../helpers/saveTodosToLocaleStorage';
import { DayInterface, DayTodosForRepeatingInterface, DayWithTodoInterface, TodoForUpdateInterface, TodoInterface, TodoRepeatedInterface, TodoToChangeInterface, TodoWithoutTimeInterface } from '../types/todos';

interface StateInterface {
  days: DayInterface[];
  todosRepeated: TodoRepeatedInterface[];
  todoToAddBeforeThis: number | null;
  todoName: string;
  todoToChange: null | number;
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
    getTodosFromStorage: (state: StateInterface) => {
      const todosString = localStorage.getItem('todos');
      const todosForRepeating = localStorage.getItem('todos-for-repeating');
      state.days = [] as DayInterface[];
      if (todosString) {
        state.days = JSON.parse(todosString);
      }

      if (todosForRepeating) {
        state.todosRepeated = JSON.parse(todosForRepeating);
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
    selectTodoToAddAfterThis: (state: StateInterface, action: PayloadAction<number | null>) => {
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
    changeTodoName: (state: StateInterface, action: PayloadAction<string>) => {
        state.todoName = action.payload;
    },
    addTodosForRepeating: (state: StateInterface, action: PayloadAction<DayTodosForRepeatingInterface>) => {
      state.todosRepeated = state.todosRepeated.map((obj: TodoRepeatedInterface) => {
        if (action.payload.days.includes(obj.day)) {
          obj.todos = action.payload.todos;
        }
        return obj;
      });
      saveTodosForRepeatingInLocaleStorage(state.todosRepeated);
    },
    addDay: (state: StateInterface, action: PayloadAction<DayInterface>) => {
      state.days.push(action.payload);
      saveTodosToLocaleStorage(state.days);
    }
  },
});

export const { addTodo, changeTodoName, getTodosFromStorage, addTodoBeforeThis, addTodoAfterThis, selectTodoToAddBeforeThis, selectTodoToAddAfterThis, selectTodoToChange, changeTheTodo, updateTodo, removeTodo, deleteCompletedTasks, addTodoWithoutTimeline, updateTodoWithout, addTodosForRepeating, addDay, removeTodoWithoutTimeline } = todoslice.actions;

export default todoslice.reducer;