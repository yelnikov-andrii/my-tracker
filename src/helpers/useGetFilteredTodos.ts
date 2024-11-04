/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setFilteredTodos } from "../store/todosSlice";

export const useGetFilteredTodos = (todos: TodoInterface[], date: string) => {
    const dispatch = useDispatch();
    
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