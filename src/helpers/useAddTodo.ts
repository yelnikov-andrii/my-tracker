import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { changeTodoName } from "../store/todosSlice";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetOccupiedTimes } from "./getOccupiedTime";
import isBetween from "dayjs/plugin/isBetween";
import { fetchWithAuth } from "./fetchWithAuth";
import { baseUrl } from "./baseUrl";

dayjs.extend(isBetween);

type AddTodoHandler = () => void;

async function createTodo(todo: any, userId: string) {
  try {
    const response = await fetchWithAuth(`${baseUrl}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ todo, userId })
    });
    if (!response.ok) {
      throw new Error(`Failed to create todo: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error creating todo:", error);
  }
}

export const useAddTodo = ():[AddTodoHandler, string] => {
    const { startTime, finishTime } = useSelector((state: RootState) => state.time);
    const { todoName, todos } = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch();
    const [alert, setAlert] = useState('');
    // const foundDay = days.find(day => day.date === date);
    // const occupiedTimes = useGetOccupiedTimes(foundDay?.todos);
    const occupiedTimesNew = useGetOccupiedTimes(todos || []);
    const { user } = useSelector((state: RootState) => state.auth);

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

        // const isTimeOccupied = occupiedTimes.some((occupied: any) => 
        //   (dayjs(startTime).isBetween(occupied.start, occupied.finish, null, '[)') ||
        //   dayjs(finishTime).isBetween(occupied.start, occupied.finish, null, '(]')) ||
        //   (dayjs(startTime).isSame(occupied.start) && dayjs(finishTime).isSame(occupied.finish))
        // );

        const isTimeOccupiedNew = occupiedTimesNew.some((occupied: any) => 
          (dayjs(startTime).isBetween(occupied.start, occupied.finish, null, '[)') ||
          dayjs(finishTime).isBetween(occupied.start, occupied.finish, null, '(]')) ||
          (dayjs(startTime).isSame(occupied.start) && dayjs(finishTime).isSame(occupied.finish))
        );

        if (isTimeOccupiedNew) {
          setAlert('Вибраний час вже зайнято');
          setTimeout(() => setAlert(''), 3000);
          return;
        }
    
        // if (isTimeOccupied) {
        //   setAlert('Вибраний час вже зайнято');
        //   setTimeout(() => setAlert(''), 3000);
        //   return;
        // }
    
        // const todo = {
        //   name: todoName,
        //   start: startTime,
        //   finish: finishTime,
        //   completed: false,
        //   id: Date.now()
        // };

        const todoNew = {
          name: todoName,
          start: startTime,
          finish: finishTime,
          completed: false,
        };

        const userId = user.id;

        createTodo(todoNew, userId);
        // dispatch(addTodo({ date: date, todo: todo }));
        dispatch(changeTodoName(''));
    }

    return [addTodoHandler, alert];
}