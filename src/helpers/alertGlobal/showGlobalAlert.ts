import { clearGlobalAlert, setGlobalAlert } from "../../store/globalAlert";

export const showGlobalAlert = (message: string) => async (dispatch: any) => {
    dispatch(setGlobalAlert(message));

    setTimeout(() => {
      dispatch(clearGlobalAlert());
    }, 3000);
  };