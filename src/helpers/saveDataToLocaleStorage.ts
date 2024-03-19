import { TimeInterface } from "../types/time";
import { DayInterface } from "../types/todos";
import { TodoRepeatedInterface } from "../types/todosRepeated";
import { TodoWithoutTimeInterface } from "../types/todosWithout";

export const saveTodosToLocaleStorage = (todos: DayInterface[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export const saveTodosWithoutTimeline = (todosWithoutTimeline: TodoWithoutTimeInterface[]) => {
  localStorage.setItem('todos-without-timeline', JSON.stringify(todosWithoutTimeline));
}

export const saveTodosForRepeatingInLocaleStorage = (todosForRepeating: TodoRepeatedInterface[]) => {
  localStorage.setItem('todos-for-repeating', JSON.stringify(todosForRepeating));
}

export const saveWeekdaysToLocaleStorage = (weekdays: string[]) => {
  localStorage.setItem('weekdays', JSON.stringify(weekdays));
}

export const saveDateWhenTodosRepeated = (date: string) => {
  localStorage.setItem('date-when-todos-repeated', date);
}

export const saveTimeToLocalStorage = (time: TimeInterface) => {
  localStorage.setItem('time', JSON.stringify(time))
}