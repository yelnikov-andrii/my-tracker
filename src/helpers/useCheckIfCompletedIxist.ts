import { useSelector } from "react-redux"

export const useCheckIfCompletedExist = () => {
    const { filteredTodos } = useSelector((state: RootState) => state.todos);

    const isCheckedExist = filteredTodos.some((todo) => todo.completed);

    if (isCheckedExist) {
        return true;
    }

    return false;
}