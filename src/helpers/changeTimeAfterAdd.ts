import { setFinishHour, setFinishMinutes, setStartHour, setStartMinutes } from "../store/timeSlice";

export const changeTimeAfterAddingAdeal = (startHour: string, finishHour: string, finishMinutes: string, dispatch: any) => {
    dispatch(setStartHour(finishHour));
    dispatch(setFinishHour(finishHour));
    dispatch(setStartMinutes(finishMinutes));
    dispatch(setFinishMinutes((+finishMinutes + 5).toString().padStart(2, '0')));

    if (finishMinutes === '55') {
      const newStartHour = (+finishHour + 1).toString().padStart(2, '0');
      dispatch(setFinishHour(newStartHour));
      dispatch(setFinishMinutes('00'));
    }
}