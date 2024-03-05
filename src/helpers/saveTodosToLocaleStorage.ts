export const saveTodosToLocaleStorage = (todos: any) => {
  localStorage.setItem('todos', JSON.stringify(todos));
}