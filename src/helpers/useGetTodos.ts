/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { getTodosFromServer } from "../store/todosSlice";
import { baseUrl } from "./baseUrl";
import { useCallback } from "react";
import { arraysAreEquals } from "./arrayAreEquals";

export const useGetTodos = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const todos = useSelector((state: RootState) => state.todos.todos);

    const getTodos = useCallback(async () => {
        try {
            if (user) {
                const response = await fetch(`${baseUrl}/todos/${user?.id}`);
                const todosFromServer = await response.json();

                const todosAreEqual = arraysAreEquals(todos, todosFromServer);
                console.log(todosAreEqual, 'todos are equal')

                if (!todosAreEqual) {
                    dispatch(getTodosFromServer(todosFromServer));
                }
            }
        }

        catch (e) {
            console.log(e);
        }
    }, [user, todos])

    return [getTodos];
}