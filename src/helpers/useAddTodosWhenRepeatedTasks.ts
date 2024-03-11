/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { formatDate } from "./formateDate";
import { DayInterface, TodoInterface } from "../types/todos";
import { addDay } from "../store/todosSlice";
import { TodoRepeatedInterface } from "../types/todosRepeated";

export const useAddTodosWhenRepeatedTasks = (currentDate: string) => {
  const { days } = useSelector((state: RootState) => state.todos);
  const { todosRepeated } = useSelector((state: RootState) => state.todosRepeated);
  const dispatch = useDispatch();

  const newDate = new Date(currentDate);
  const date = formatDate(currentDate);
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const thisWeekDay = daysOfWeek[newDate.getDay()];
  const foundTodoRepeated = todosRepeated.find((todoRepeated: TodoRepeatedInterface) => todoRepeated.day === thisWeekDay);

  React.useEffect(() => {
    const foundDay = days.find((day: DayInterface) => day.date === date);
    if (!foundDay && foundTodoRepeated && foundTodoRepeated.todos.length > 0) {
      const remasteredTodos = foundTodoRepeated.todos.map((todo: TodoInterface) => {
        return {...todo, id: (todo.id.toString() + date)};
      });

      const day = {
        date: date,
        todos: remasteredTodos,
      };

      dispatch(addDay(day));
    }
  }, [days, date, todosRepeated]);
}