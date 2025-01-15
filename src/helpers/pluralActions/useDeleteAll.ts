/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { baseUrl } from "../baseUrl";
import { useCallback } from "react";
import { showGlobalAlert } from "../alertGlobal/showGlobalAlert";

async function deleteTodos(completedTodosIds: string[], user: UserI) {
    try {
        const response = await fetch(`${baseUrl}/todos`, {
            headers: {
                'Content-Type': "application/json"
            },
            method: 'DELETE',
            body: JSON.stringify({ todosIds: completedTodosIds, userId: user?.id })
        });

        if (!response.ok) {
            showGlobalAlert('Помилка при видаленні справ');
        }

    } catch (e) {
        showGlobalAlert('Помилка при видаленні справ');
        console.error(e);
    }
}

export const useDeleteAll = () => {
    const filteredTodos = useSelector((state: RootState) => state.todos.filteredTodos);
    const user = useSelector((state: RootState) => state.auth.user);

    const completedTodosIds = filteredTodos.map((todo) => {
        if (todo.completed) {
            return todo.id;
        }
    });

    const deleteAllCompletedTodos = useCallback(() => {
        if (completedTodosIds.length > 0) {
            deleteTodos(completedTodosIds, user);
        }
    }, [completedTodosIds]);

    return deleteAllCompletedTodos;

}