import { TodoInterface } from "./todos";

export interface DayTodosForRepeatingInterface {
  days: string[];
  todos: TodoInterface[];
}

export interface TodoRepeatedInterface {
  day: string;
  todos: TodoInterface[];
}