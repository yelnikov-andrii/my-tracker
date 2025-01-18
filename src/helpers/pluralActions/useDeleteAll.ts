/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../baseUrl";
import { useCallback } from "react";
import { showGlobalAlert } from "../alertGlobal/showGlobalAlert";
import { saveTodosToLocalStorage } from "../localeStorage/todosInLocaleStorage";
import { fetchWithAuth } from "../fetchWithAuth";
import { getTodosFromServer } from "../../store/todosSlice";

async function deleteTodos(completedTodosIds: string[], user: UserI, dispatch: any) {
    try {
        const response = await fetchWithAuth(`${baseUrl}/todos`, {
            headers: {
                'Content-Type': "application/json"
            },
            method: 'DELETE',
            body: JSON.stringify({ todosIds: completedTodosIds, userId: user?.id })
        });

        if (!response.ok) {
            dispatch(showGlobalAlert('Помилка при видаленні справ'));
        }

    } catch (e) {
        dispatch(showGlobalAlert('Помилка при видаленні справ'));
        console.error(e);
    }
}

export const useDeleteAll = ():[() => void] => {
    const filteredTodos = useSelector((state: RootState) => state.todos.filteredTodos);
    const todos = useSelector((state: RootState) => state.todos.todos);
    const user = useSelector((state: RootState) => state.auth.user);

    const dispatch = useDispatch();

    const completedTodosIds = filteredTodos.map((todo) => {
        if (todo.completed) {
            return todo.id;
        }
    });

    const updatedTodos = todos.filter((todo: TodoInterface) => {
        if (!completedTodosIds.includes(todo.id)) {
            return todo;
        }
    });

    const deleteAllCompletedTodos = useCallback(() => {
        if (completedTodosIds.length > 0) {
            deleteTodos(completedTodosIds, user, dispatch)
            .then(() => {
                saveTodosToLocalStorage(todos);
                dispatch(getTodosFromServer(updatedTodos));
            })
            .catch(() => {
                dispatch(showGlobalAlert('Не вдалося видалити'));
            })
            
        }
    }, [completedTodosIds]);

    return [deleteAllCompletedTodos];

}