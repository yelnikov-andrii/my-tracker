import { useDispatch, useSelector } from "react-redux";
import { addTodoAction, changeTodoAction, changeTodoName, deleteTodoAction } from "../../store/todosSlice";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useGetOccupiedTimes } from "../dateAndTimeHelpers/getOccupiedTime";
import isBetween from "dayjs/plugin/isBetween";
import { fetchWithAuth } from "../fetchWithAuth";
import { baseUrl } from "../baseUrl";
import { changeTime } from "../../store/timeSlice";
import { showGlobalAlert } from "../alertGlobal/showGlobalAlert";

dayjs.extend(isBetween);

type AddTodoHandler = () => void;

async function createTodo(todo: TodoInterfaceToAdd, userId: string, setLoading: Dispatch<SetStateAction<boolean>>, isMounted: boolean) {
  setLoading(true);
  try {
    const response = await fetchWithAuth(`${baseUrl}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ todo, userId })
    });

    if (!response.ok) {
      if (isMounted) {
        setLoading(false);
      }
      console.log('response not ok')
      throw new Error(`Failed to create todo: ${response.statusText}`);
    }

    if (response.ok) {
      if (isMounted) {
        setLoading(false);
      }
      console.log(response, 'response ok')
      return response.json();
    }

  } catch (error) {
    if (isMounted) {
      setLoading(false);
    }
    console.error("Error creating todo:", error);
  }
}

export const useAddTodo = (setNotClose: Dispatch<SetStateAction<boolean>>): [AddTodoHandler, string, boolean] => {
  const startTime = useSelector((state: RootState) => state.time.startTime);
  const finishTime = useSelector((state: RootState) => state.time.finishTime);

  const todos = useSelector((state: RootState) => state.todos.todos);
  const todoName = useSelector((state: RootState) => state.todos.todoName);

  const dispatch = useDispatch();

  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(false);

  const delayNotClose = 1000;

  const [isMounted, setIsMounted] = useState(true);

  const occupiedTimesNew = useGetOccupiedTimes(todos || []);

  const user = useSelector((state: RootState) => state.auth.user);

  const showAlert = (message: string) => {
    setAlert(message);
    setTimeout(() => setAlert(''), 3000);
  };

  const isTimeOccupied = (startTime: string, finishTime: string) => {
    return occupiedTimesNew.some((occupied: any) =>
      dayjs(startTime).isBetween(occupied.start, occupied.finish) ||
      dayjs(finishTime).isBetween(occupied.start, occupied.finish)
    );
  };

  useEffect(() => {
    return () => {
      setIsMounted(false);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      setNotClose(true);
    } else {
      setTimeout(() => {
        setNotClose(false);
      }, delayNotClose);
    }
  }, [loading, setNotClose]);

  function addTodoHandler() {
    if (!todoName) {
      showAlert('Введіть назву справи');
      return;
    }

    if (dayjs(startTime).isAfter(dayjs(finishTime))) {
      showAlert('Початковий час не може бути пізніше кінцевого часу');
      return;
    }

    if (isTimeOccupied(startTime, finishTime)) {
      showAlert('Вибраний час вже зайнято');
      return;
    }

    const todoNew = {
      name: todoName,
      start: startTime,
      finish: finishTime,
      completed: false,
    };

    const userId = user.id;

    const localTodoId = Date.now();

    dispatch(addTodoAction({ ...todoNew, id: localTodoId }));

    const discardChanges = () => {
      dispatch(deleteTodoAction(localTodoId));
    }

    createTodo(todoNew, userId, setLoading, isMounted)
      .then((res: any) => {
        if (!res) {
          console.log(res, 'res')
          showAlert('Помилка при додаванні задачі');
          dispatch(showGlobalAlert('Помилка при додаванні задачі'));
          discardChanges();
          return;
        } else {
          dispatch(changeTodoName(''));
          dispatch(changeTime({ start: todoNew.finish, finish: dayjs(todoNew.finish).add(1, 'minute').toISOString() }));
          dispatch(changeTodoAction({ todo: res, todoId: localTodoId }));
        }

      })
      .catch((e) => {
        console.error(e)
        showAlert('Помилка при додаванні задачі');
        dispatch(showGlobalAlert('Помилка при додаванні задачі'));
        discardChanges();
      })
      .finally(() => {
        setTimeout(() => {
          setNotClose(false);
        }, delayNotClose)
      })
  }

  return [addTodoHandler, alert, loading];
}