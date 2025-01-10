/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredTodos } from "../store/todosSlice";
import { formatDate } from "./formateDate";

export const useGetFilteredTodos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const currentDate = useSelector((state: RootState) => state.time.currentDate);

  const date = useMemo(() => {
    const res = formatDate(currentDate);
    return res;
  }, [currentDate]);

  const filteredTodos = useMemo(() => {
    const res = todos?.filter((todo: any) => {
      const startTime = todo.start;
      const todoDate = dayjs(startTime).format('DD.MM.YYYY');
      if (todoDate === date) {
        return todo;
      }
    });

    return res || [];
  }, [todos, date]);

  useEffect(() => {
      dispatch(setFilteredTodos(filteredTodos));
  }, [filteredTodos]);
}