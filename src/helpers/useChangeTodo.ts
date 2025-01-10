import { useDispatch, useSelector } from "react-redux";
import { changeTodoAction, setFilteredTodos } from "../store/todosSlice";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetOccupiedTimes } from "./getOccupiedTime";
import { baseUrl } from "./baseUrl";

export const useChangeTodo = (todo: TodoInterface | undefined): [(todoId: TodoInterface | null) => void, string] => {
    const filteredTodos = useSelector((state: RootState) => state.todos.filteredTodos);
    const todoName = useSelector((state: RootState) => state.todos.todoName);
    const startTime = useSelector((state: RootState) => state.time.startTime);
    const finishTime = useSelector((state: RootState) => state.time.finishTime);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const [changeAlert, setChangeAlert] = useState('');
    const occupiedTimes = useGetOccupiedTimes(filteredTodos, todo?.id);

    function changeTheTodoHandler(todo: TodoInterface | null) {
        if (!todo?.id) {
            return;
        }

        if (!todoName) {
            setChangeAlert('Введіть назву справи');

            setTimeout(() => {
                setChangeAlert('');
            }, 3000);

            return;
        }

        if (dayjs(startTime).isAfter(dayjs(finishTime))) {
            setChangeAlert('Початковий час не може бути пізніше кінцевого часу');
            setTimeout(() => setChangeAlert(''), 3000);
            return;
        }

        const isTimeOccupied = occupiedTimes.some((occupied: any) => {
            return (dayjs(startTime).isBetween(occupied.start, occupied.finish, null, '()') ||
                dayjs(finishTime).isBetween(occupied.start, occupied.finish, null, '()')) ||
                (dayjs(startTime).isSame(occupied.start) && dayjs(finishTime).isSame(occupied.finish))
        }

        );

        if (isTimeOccupied) {
            setChangeAlert('Вибраний час вже зайнято');
            setTimeout(() => setChangeAlert(''), 3000);
            return;
        }

        const newTodo = {
            name: todoName,
            start: startTime,
            finish: finishTime,
        };

        if (user) {
            changeTodo(todo.id, newTodo, dispatch, user);
            const updatedTodos = filteredTodos.map(filteredTodo => {
                if (filteredTodo.id === todo.id) {
                    return { ...filteredTodo, name: todoName, start: startTime, finish: finishTime };
                } else {
                    return filteredTodo;
                }
            });
            dispatch(setFilteredTodos(updatedTodos));
        }


    }

    return [changeTheTodoHandler, changeAlert];
}

async function changeTodo(todoId: string | number, newTodo: TodoInterfaceToAdd, dispatch: any, user: UserI) {
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
            return;
        }

        const updatedTodo = await response.json();
        console.log('Todo updated successfully:', updatedTodo);
        dispatch(changeTodoAction({ todo: newTodo, todoId: todoId }))
    }

    catch (error) {
        console.error('Error updating todo:', error);
    }
}