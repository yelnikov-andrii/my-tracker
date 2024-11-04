import dayjs from "dayjs";
import { useMemo } from "react";

export const useGetSortedTodos = (todos: TodoInterface[]) => {
    const getSortedTodos = (todos: TodoInterface[]) => {
        return todos.slice().sort((a, b) => dayjs(a.start).diff(dayjs(b.start)));
    };

    const sortedTodos = useMemo(() => {
        if (!todos || todos?.length === 0) {
            return [];
        } else {
            const sortedTodos = getSortedTodos(todos);
            return sortedTodos;
        }
    }, [todos]);

    return [sortedTodos];
}