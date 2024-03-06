import { DayInterface, TodoRepeatedInterface, TodoWithoutTimeInterface } from "../types/todos";

export const saveTodosToLocaleStorage = (todos: DayInterface[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export const saveTodosWithoutTimeline = (todosWithoutTimeline: TodoWithoutTimeInterface[]) => {
  localStorage.setItem('todos-without-timeline', JSON.stringify(todosWithoutTimeline));
}

export const saveTodosForRepeatingInLocaleStorage = (todosForRepeating: TodoRepeatedInterface[]) => {
  localStorage.setItem('todos-for-repeating', JSON.stringify(todosForRepeating));
}