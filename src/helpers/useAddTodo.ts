import { useDispatch, useSelector } from "react-redux";
import { addTodoAction, changeTodoName } from "../store/todosSlice";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetOccupiedTimes } from "./getOccupiedTime";
import isBetween from "dayjs/plugin/isBetween";
import { fetchWithAuth } from "./fetchWithAuth";
import { baseUrl } from "./baseUrl";
import { changeTime } from "../store/timeSlice";
import { useGetTodos } from "./useGetTodos";
import { getTodosFromLocalStorage, saveTodosToLocalStorage } from "./todosInLocaleStorage";

dayjs.extend(isBetween);

type AddTodoHandler = () => void;

async function createTodo(todo: TodoInterfaceToAdd, userId: string, getTodos: (id: string) => void) {
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

    if (response.ok) {
      getTodos(userId);
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
    const occupiedTimesNew = useGetOccupiedTimes(todos || []);
    const { user } = useSelector((state: RootState) => state.auth);
    const [getTodos] = useGetTodos();

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

        const isTimeOccupied = occupiedTimesNew.some((occupied: any) => {
          const res = (dayjs(startTime).isBetween(occupied.start, occupied.finish) ||
          dayjs(finishTime).isBetween(occupied.start, occupied.finish));
          return res;
    });

        

        if (isTimeOccupied) {
          setAlert('Вибраний час вже зайнято');
          setTimeout(() => setAlert(''), 3000);
          return;
        }

        const todoNew = {
          name: todoName,
          start: startTime,
          finish: finishTime,
          completed: false,
        };

        const userId = user.id;

        const todosFromStorage = getTodosFromLocalStorage();
        const todosFromStorageNew = [...todosFromStorage, {...todoNew, id: Date.now()}];
        saveTodosToLocalStorage(todosFromStorageNew);

        dispatch(addTodoAction({...todoNew, id: Date.now()}));

        createTodo(todoNew, userId, getTodos);
        dispatch(changeTodoName(''));
        dispatch(changeTime({start: todoNew.finish, finish: dayjs(todoNew.finish).add(5, 'minute').toISOString()}));
    }

    return [addTodoHandler, alert];
}