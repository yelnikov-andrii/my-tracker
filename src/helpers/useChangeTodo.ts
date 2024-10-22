import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TodoInterface } from "../types/todos";
import { changeTheTodo, changeTodoName, selectTodoToChange } from "../store/todosSlice";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetOccupiedTimes } from "./getOccupiedTime";

export const useChangeTodo = (date: any):[(todoId: number | string | null) => void, string] => {
    const { days, todoName, todoToChange } = useSelector((state: RootState) => state.todos);
    const { startTime, finishTime } = useSelector((state: RootState) => state.time);
    const dispatch = useDispatch();
    const [changeAlert, setChangeAlert] = useState('');
    const foundDay = days.find(day => day.date === date);
    console.log(foundDay, 'found day')
    const occupiedTimes = useGetOccupiedTimes(foundDay, todoToChange);

    function changeTheTodoHandler(todoId: number | string | null) {
        if (!todoId) {
            return;
        }

        if (foundDay) {
            const foundTodo = foundDay.todos.find((todo: TodoInterface) => todo.id === todoId);

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
                (dayjs(startTime).isBetween(occupied.start, occupied.finish, null, '[)') ||
                    dayjs(finishTime).isBetween(occupied.start, occupied.finish, null, '(]')) ||
                (dayjs(startTime).isSame(occupied.start) && dayjs(finishTime).isSame(occupied.finish))
            );

            if (isTimeOccupied) {
                setChangeAlert('Вибраний час вже зайнято');
                setTimeout(() => setChangeAlert(''), 3000);
                return;
            }

            const newTodo = {
                ...foundTodo,
                name: todoName,
                start: startTime,
                finish: finishTime,
            };

            console.log(newTodo, 'newTodo')

            dispatch(changeTheTodo({ todo: newTodo, date: date }));
            dispatch(changeTodoName(''));
            dispatch(selectTodoToChange(null));
        }
    }

    return [changeTheTodoHandler, changeAlert];
}