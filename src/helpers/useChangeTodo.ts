import { useDispatch, useSelector } from "react-redux";
import { changeTodoAction } from "../store/todosSlice";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetOccupiedTimes } from "./getOccupiedTime";
import { baseUrl } from "./baseUrl";

export const useChangeTodo = (todo: any): [(todoId: number | string | null) => void, string] => {
    const { todoName, filteredTodos } = useSelector((state: RootState) => state.todos);
    const { startTime, finishTime } = useSelector((state: RootState) => state.time);
    const dispatch = useDispatch();
    const [changeAlert, setChangeAlert] = useState('');
    const occupiedTimes = useGetOccupiedTimes(filteredTodos, todo);

    function changeTheTodoHandler(todoId: number | string | null) {
        if (!todoId) {
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

        const isTimeOccupied = occupiedTimes.some((occupied: any) =>
            (dayjs(startTime).isBetween(occupied.start, occupied.finish, null, '[]') ||
                dayjs(finishTime).isBetween(occupied.start, occupied.finish, null, '[]')) ||
            (dayjs(startTime).isSame(occupied.start) && dayjs(finishTime).isSame(occupied.finish))
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

        changeTodo(todoId, newTodo, dispatch);
    }

    return [changeTheTodoHandler, changeAlert];
}

async function changeTodo(todoId: any, newTodo: any, dispatch: any) {
    try {
        const response = await fetch(`${baseUrl}/todos/${todoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({todoId, newTodo})
        });

        if (!response.ok) {
            console.error('Error: Cannot update todo');
            return;
        }

        const updatedTodo = await response.json();
        console.log('Todo updated successfully:', updatedTodo);
        dispatch(changeTodoAction({todo: newTodo, todoId: todoId}))
    }

    catch (error) {
        console.error('Error updating todo:', error);
    }
}