/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { getTodosFromServer } from "../store/todosSlice";
import { baseUrl } from "./baseUrl";

export const useGetTodos = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    
    async function getTodos() {
        try {
            if (user) {
                const response = await fetch(`${baseUrl}/todos/${user?.id}`);
                const todos = await response.json();
                dispatch(getTodosFromServer(todos));
            }
        }

        catch (e) {
            console.log(e);
        }
    }

    return [getTodos];

}