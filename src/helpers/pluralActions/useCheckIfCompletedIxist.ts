import { useMemo } from "react";
import { useSelector } from "react-redux"

export const useCheckIfCompletedExist = () => {
    const filteredTodos = useSelector((state: RootState) => state.todos.filteredTodos);

    const isCheckedExist = useMemo(() => {
        return filteredTodos.some((todo) => todo.completed);
    }, [filteredTodos])

    return isCheckedExist;
}