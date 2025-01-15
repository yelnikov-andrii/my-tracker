import { useSelector } from "react-redux";
import { baseUrl } from "../baseUrl";
import { useCallback } from "react";
import { showGlobalAlert } from "../alertGlobal/showGlobalAlert";
import { fetchWithAuth } from "../fetchWithAuth";

export const useToggleAll = () => {
    const filteredTodos = useSelector((state: RootState) => state.todos.filteredTodos);
    const allChecked = useSelector((state: RootState) => state.todos.allChecked);

    const updatedTodos = filteredTodos.map(todo => ({ ...todo, completed: !allChecked }));

    const toggleAll = useCallback(async () => {
        try {
            const response = await fetchWithAuth(`${baseUrl}/todos`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'PATCH',
                body: JSON.stringify({ todos: updatedTodos })
            });

            if (!response.ok) {
                showGlobalAlert('Помилка при виборі усіх завдань');
            }
        } catch (e) {
            showGlobalAlert('Помилка при виборі усіх завдань');
            console.error("Error toggling todos:", e);
        }
    }, [updatedTodos]);

    return toggleAll;
};