import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addTodo, changeTodoName } from "../store/todosSlice";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetOccupiedTimes } from "./getOccupiedTime";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

type AddTodoHandler = () => void;

export const useAddTodo = (date: any):[AddTodoHandler, string] => {
    const { startTime, finishTime } = useSelector((state: RootState) => state.time);
    const { todoName, days } = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch();
    const [alert, setAlert] = useState('');
    const foundDay = days.find(day => day.date === date);
    const occupiedTimes = useGetOccupiedTimes(foundDay);

    function addTodoHandler() {
        if (!todoName) {
          setAlert('Введіть назву справи');

          setTimeout(() => {
            setAlert('');
          }, 3000);

          return;
        }

        if (dayjs(startTime).isAfter(dayjs(finishTime))) {
          setAlert('Початковий час не може бути пізніше кінцевого часу');
          setTimeout(() => setAlert(''), 3000);
          return;
        }

        const isTimeOccupied = occupiedTimes.some((occupied: any) => 
          (dayjs(startTime).isBetween(occupied.start, occupied.finish, null, '[)') ||
          dayjs(finishTime).isBetween(occupied.start, occupied.finish, null, '(]')) ||
          (dayjs(startTime).isSame(occupied.start) && dayjs(finishTime).isSame(occupied.finish))
        );
    
        if (isTimeOccupied) {
          setAlert('Вибраний час вже зайнято');
          setTimeout(() => setAlert(''), 3000);
          return;
        }
    
        const todo = {
          name: todoName,
          start: startTime,
          finish: finishTime,
          completed: false,
          id: Date.now()
        };
    
        dispatch(addTodo({ date: date, todo: todo }));
        dispatch(changeTodoName(''));
    }

    return [addTodoHandler, alert];
}