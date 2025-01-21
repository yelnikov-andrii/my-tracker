import { useDispatch, useSelector } from "react-redux";
import { changeTodoAction, setFilteredTodos } from "../../store/todosSlice";
import { Dispatch, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import { useGetOccupiedTimes } from "../dateAndTimeHelpers/getOccupiedTime";
import { baseUrl } from "../baseUrl";
import { showGlobalAlert } from "../alertGlobal/showGlobalAlert";

async function changeTodo(todoId: string | number, newTodo: TodoInterfaceToAdd, dispatch: any, user: UserI, setLoading: Dispatch<SetStateAction<boolean>>) {
    setLoading(true);
    try {
        const response = await fetch(`${baseUrl}/todos/${todoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ todoId, newTodo, userId: user.id })
        });

        if (!response.ok) {
            console.error('Error: Cannot update todo');
            setLoading(false);
            return;
        }

        const updatedTodo = await response.json();
        dispatch(changeTodoAction({ todo: updatedTodo, todoId: updatedTodo.id }));
        return updatedTodo;
    }

    catch (error) {
        setLoading(false);
        console.error('Error updating todo:', error);
    }
    finally {
        setLoading(false);
    }
}

export const useChangeTodo = (todo: TodoInterface | undefined): [(todoId: TodoInterface | null) => void, string, boolean] => {
    const filteredTodos = useSelector((state: RootState) => state.todos.filteredTodos);

    const todoName = useSelector((state: RootState) => state.todos.todoName);

    const startTime = useSelector((state: RootState) => state.time.startTime);
    const finishTime = useSelector((state: RootState) => state.time.finishTime);

    const user = useSelector((state: RootState) => state.auth.user);

    const dispatch = useDispatch();

    const [changeAlert, setChangeAlert] = useState('');
    const [loading, setLoading] = useState(false);

    const occupiedTimes = useGetOccupiedTimes(filteredTodos, todo?.id);

    const showAlert = (message: string) => {
        setChangeAlert(message);
        setTimeout(() => setChangeAlert(''), 3000);
    };

    function changeTheTodoHandler(todo: TodoInterface | null) {
        if (!todo?.id) {
            return;
        }

        if (!todoName) {
            showAlert('Введіть назву справи');
            return;
        }

        if (dayjs(startTime).isAfter(dayjs(finishTime))) {
            showAlert('Початковий час не може бути пізніше кінцевого часу');
            return;
        }

        const isTimeOccupied = occupiedTimes.some((occupied: any) => {
            return (dayjs(startTime).isBetween(occupied.start, occupied.finish, null, '()') ||
                dayjs(finishTime).isBetween(occupied.start, occupied.finish, null, '()')) ||
                (dayjs(startTime).isSame(occupied.start) && dayjs(finishTime).isSame(occupied.finish))
        }

        );

        if (isTimeOccupied) {
            showAlert('Вибраний час вже зайнято');
            return;
        }

        const newTodo = {
            name: todoName,
            start: startTime,
            finish: finishTime,
        };

        if (user) {
            changeTodo(todo.id, newTodo, dispatch, user, setLoading)
                .then((res: any) => {
                    if (!res) {
                        showAlert('Помилка при редагуванні задачі');
                        dispatch(showGlobalAlert('Помилка при редагуванні задачі'));
                        return;
                    } else {
                        const updatedTodos = filteredTodos.map(filteredTodo => {
                            if (filteredTodo.id === todo.id) {
                                return { ...filteredTodo, name: todoName, start: startTime, finish: finishTime };
                            } else {
                                return filteredTodo;
                            }
                        });
                        dispatch(setFilteredTodos(updatedTodos));
                    }
                })
                .catch(() => {
                    showAlert('Помилка при оновленні справи');
                    dispatch(showGlobalAlert('Помилка при оновленні задачі'));
                })
        } else {
            showAlert('Виникла помилка');
        }


    }

    return [changeTheTodoHandler, changeAlert, loading];
}