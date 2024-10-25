/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import { TodoInterface } from "../types/todos";
import { useMemo } from "react";

export const useGetOccupiedTimes = (day: any, todoId?: any) => {
    function getOccupiedTimes(day: any) {
        if (!day) return [];
        const filteredTodos = day.todos.filter((todo: any) => {
            if (todoId) {
                if (todo.id !== todoId) {
                    return todo;
                }
            } else {
                return todo;
            }
        })
        return filteredTodos.map((todo: TodoInterface) => ({
            start: dayjs(todo.start),
            finish: dayjs(todo.finish)
        }));
    }


    const occupiedTimes = useMemo(() => getOccupiedTimes(day), [day, todoId]);
    return occupiedTimes;
}