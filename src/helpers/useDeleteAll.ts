/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { baseUrl } from "./baseUrl";
import { useCallback } from "react";
import { useGetTodos } from "./useGetTodos";

async function deleteTodos(completedTodosIds: string[], user: UserI, getTodos: (userId: string) => void) {
    try {
        const response = await fetch(`${baseUrl}/todos`, {
            headers: {
                'Content-Type': "application/json"
            },
            method: 'DELETE',
            body: JSON.stringify({ todosIds: completedTodosIds, userId: user?.id })
        });

        if (!response.ok) {
            throw new Error(`Failed to create todo: ${response.statusText}`);
        } else {
            getTodos(user.id);
        }

    } catch (e) {
        console.log(e);
    }
}

export const useDeleteAll = () => {
    const filteredTodos = useSelector((state: RootState) => state.todos.filteredTodos);
    const user = useSelector((state: RootState) => state.auth.user);

    const [getTodos] = useGetTodos();

    const completedTodosIds = filteredTodos.map((todo) => {
        if (todo.completed) {
            return todo.id;
        }
    });

    const deleteAllCompletedTodos = useCallback(() => {
        if (completedTodosIds.length > 0) {
            deleteTodos(completedTodosIds, user, getTodos);
        }
    }, [completedTodosIds]);

    return deleteAllCompletedTodos;

}