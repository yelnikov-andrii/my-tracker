export interface TodoInterface {
  completed: boolean;
  finish: string;
  id: number | string;
  name: string;
  start: string;
}

export interface DayInterface {
  date: string;
  todos: TodoInterface[]
}

export interface DayWithTodoInterface {
  date: string;
  todo: TodoInterface;
}

interface NewTodoInterface {
  name: string;
  start: string;
  finish: string;
}

export interface TodoToChangeInterface {
  date: string;
  todo: NewTodoInterface;
}

export interface TodoForUpdateInterface {
  date: string;
  id: number | string;
}

export interface ToggleDayInterface {
  date: string;
  isToggled: boolean;
}