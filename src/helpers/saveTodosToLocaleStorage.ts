import { DayInterface } from "../types/todos";

export const saveTodosToLocaleStorage = (todos: DayInterface[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
}