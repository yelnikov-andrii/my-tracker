export interface TodoInterface {
  completed: boolean;
  finish: string;
  id: number;
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

export interface TodoWithoutTimeInterface {
  id: number;
  name: string;
  completed: boolean;
}

export interface TodoRepeatedInterface {
  day: string;
  todos: TodoInterface[];
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
  id: number;
}

export interface DayTodosForRepeatingInterface {
  days: string[];
  todos: TodoInterface[];
}