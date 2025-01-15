/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import { useMemo } from "react";

export const useGetOccupiedTimes = (todos: TodoInterface[], todoId?: number | string) => {
    function getOccupiedTimes(todos: TodoInterface[], todoId?: number | string) {
        if (!todos || todos?.length === 0) {
            return [];
        }

        const filteredTodos = todos?.filter((todo: TodoInterface) => {
            if (todoId) {
                if (todo.id !== todoId) {
                    return todo;
                }
            } else {
                return todo;
            }
        });

        return filteredTodos.map((todo: TodoInterface) => ({
            start: dayjs(todo.start),
            finish: dayjs(todo.finish)
        }));
    }


    const occupiedTimes = useMemo(() => getOccupiedTimes(todos, todoId), [todos, todoId]);
    return occupiedTimes;
}