/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import { useMemo } from "react";

export const useGetOccupiedTimes = (todos: any, todoId?: any) => {
    function getOccupiedTimes(todos: any) {
        if (!todos || todos?.length === 0) {
            return [];
        }

        const filteredTodos = todos?.filter((todo: any) => {
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


    const occupiedTimes = useMemo(() => getOccupiedTimes(todos), [todos, todoId]);
    return occupiedTimes;
}