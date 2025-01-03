/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { getTodosFromServer } from "../store/todosSlice";
import { baseUrl } from "./baseUrl";
import { useCallback } from "react";

export const useGetTodos = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    const getTodos = useCallback(async () => {
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
    }, [user, dispatch])

    return [getTodos];
}