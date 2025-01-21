/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { getTodosFromServer } from "../../store/todosSlice";
import { baseUrl } from "../baseUrl";
import { arraysAreEquals } from "./arrayAreEquals";
import { fetchWithAuth } from "../fetchWithAuth";
import { getTodosFromLocalStorage } from "../localeStorage/todosInLocaleStorage";

export const useGetTodos = () => {
    const dispatch = useDispatch();
    const todos = getTodosFromLocalStorage();

    const getTodos = async (userId: string) => {
        try {
            if (userId) {
                const response = await fetchWithAuth(`${baseUrl}/todos/${userId}`);
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
            console.error(e);
        }
    }

    return [getTodos];
}