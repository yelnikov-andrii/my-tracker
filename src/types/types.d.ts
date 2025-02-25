
import { store } from "../store/store";
export { };


declare global {
    // header link
    interface LinkI {
        href: string;
        name: string;
    }

    // store Root etc

    type RootState = ReturnType<typeof store.getState>;
    type AppDispatch = typeof store.dispatch;

    interface StateInterface {
        todoName: string;
        todoToChange: null | TodoInterface;
        todosWithoutTime: TodoWithoutTmeI[];
        todos: TodoInterface[];
        filteredTodos: any[];
        allChecked: boolean;
        todosLoading: boolean;
      }

    // hours, minutes

    type ViewT = {
        start: ViewsStrT;
        finish: ViewsStrT;
    }

    type ViewsStrT = 'hours' | 'minutes';

    interface TimeState {
        currentDate: string;
        startTime: any;
        finishTime: any;
      }

    // todos

    interface TodoInterfaceToAdd {
        completed?: boolean;
        finish: string;
        name: string;
        start: string;
      }

    interface TodoInterface extends TodoInterfaceToAdd {
        id: number | string;
      }

      interface TodoWithoutTmeI {
        completed: boolean;
        name: string;
        id?: string | number;
      }

    // login 

    interface ErrorI {
        email?: string;
        password?: string;
    }

    interface UserI {
      email: string;
      password: string;
      id: string;
    }
}