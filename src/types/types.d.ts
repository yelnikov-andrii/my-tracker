
import { store } from "../store/store";
export { };


declare global {
    interface LinkI {
        href: string;
        name: string;
    }

    type RootState = ReturnType<typeof store.getState>;
    type AppDispatch = typeof store.dispatch;
}