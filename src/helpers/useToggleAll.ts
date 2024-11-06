import { useSelector } from "react-redux";
import { baseUrl } from "./baseUrl";
import { useCallback } from "react";

export const useToggleAll = () => {
    const { filteredTodos, allChecked } = useSelector((state: RootState) => state.todos);

    const toggleAll = useCallback(async () => {
        const updatedTodos = filteredTodos.map(todo => ({ ...todo, completed: !allChecked }));
        
        try {
            const response = await fetch(`${baseUrl}/todos`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'PATCH',
                body: JSON.stringify({ todos: updatedTodos })
            });

            if (!response.ok) {
                throw new Error(`Failed to toggle todos: ${response.statusText}`);
            }
        } catch (e) {
            console.error("Error toggling todos:", e);
        }
    }, [filteredTodos, allChecked]);

    return toggleAll;
};