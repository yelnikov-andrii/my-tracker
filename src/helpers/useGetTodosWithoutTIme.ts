import React from "react";
import { baseUrl } from "./baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { getTodosWithoutTimeFromServer } from "../store/todosSlice";

export const useGetTodosWIthoutTime = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    async function getTodosWithoutTime() {
        try {
            const response = await fetch(`${baseUrl}/todos-without-time/${user?.id}`);
            const todos = await response.json();
            dispatch(getTodosWithoutTimeFromServer(todos));
        } catch (e) {
            console.log(e);
        }
    }

    return getTodosWithoutTime;
}