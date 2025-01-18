import { clearGlobalAlert, setGlobalAlert } from "../../store/globalAlert";

export const showGlobalAlert = (message: string) => async (dispatch: any) => {
  console.log(message, 'message')
    dispatch(setGlobalAlert(message));

    setTimeout(() => {
      dispatch(clearGlobalAlert());
    }, 3000);
  };