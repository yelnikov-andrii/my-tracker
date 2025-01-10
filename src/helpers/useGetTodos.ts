/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { getTodosFromServer } from "../store/todosSlice";
import { baseUrl } from "./baseUrl";
import { useCallback } from "react";
import { arraysAreEquals } from "./arrayAreEquals";

export const useGetTodos = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);

    const getTodos = useCallback(async (userId: string) => {
        try {
            if (userId) {
                const response = await fetch(`${baseUrl}/todos/${userId}`);
                const todosFromServer = await response.json();

                const todosAreEqual = arraysAreEquals(todos, todosFromServer);

                if (!todosAreEqual) {
                    dispatch(getTodosFromServer(todosFromServer));
                } else {
                    return;
                }
            }
        }

        catch (e) {
            console.log(e);
        }
    }, [todos])

    return [getTodos];
}