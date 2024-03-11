import { setFinishHour, setFinishMinutes, setStartHour, setStartMinutes } from "../store/timeSlice";
import { DayInterface, TodoInterface } from "../types/todos";

export function changeTime(days: DayInterface[], todoId: number | string, dispatch: any, date: string) {
    const foundDay = days.find((day: DayInterface) => day.date === date);
    const foundTodo = foundDay?.todos.find((todo: TodoInterface) => todo.id === todoId);
    const startMinutes = foundTodo?.start.slice(foundTodo.start.indexOf(':') + 1);
    const startHour = foundTodo?.start.slice(0, foundTodo.start.lastIndexOf(':'));
    const finishMinutes = foundTodo?.finish.slice(foundTodo.finish.indexOf(':') + 1);
    const finishHour = foundTodo?.finish.slice(0, foundTodo.finish.lastIndexOf(':'));
    dispatch(setStartHour(startHour));
    dispatch(setStartMinutes(startMinutes));
    dispatch(setFinishHour(finishHour));
    dispatch(setFinishMinutes(finishMinutes));
}