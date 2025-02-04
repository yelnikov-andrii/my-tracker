export function saveTodosToLocalStorage(todos: TodoInterfaceToAdd[]): void {
    localStorage.setItem('todos_tracker', JSON.stringify(todos));
}

export function getTodosFromLocalStorage(): TodoInterface[] {
    const savedTodos = localStorage.getItem('todos_tracker');
    return savedTodos ? JSON.parse(savedTodos) : [];
}