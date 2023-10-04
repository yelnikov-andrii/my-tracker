import { setFinishHour, setFinishMinutes, setStartHour, setStartMinutes } from "../store/timeSlice";

export const changeTimeAfterAddingAdeal = (startHour: string, finishHour: string, finishMinutes: string, dispatch: any) => {
  if (startHour === finishHour) {
    if (finishMinutes === '55') {
      const newStartHour = (+startHour + 1).toString().padStart(2, '0');
      const newFinishHour = (+finishHour + 1).toString().padStart(2, '0');
      dispatch(setStartHour(newStartHour));
      dispatch(setStartMinutes('00'));
      dispatch(setFinishHour(newFinishHour));
      dispatch(setFinishMinutes('05'));
    } else {
      dispatch(setStartMinutes(finishMinutes));
      dispatch(setFinishMinutes((+finishMinutes + 5).toString().padStart(2, '0')));
    }
  } else {
    dispatch(setStartHour(finishHour));
    dispatch(setStartMinutes(finishMinutes));
    dispatch(setFinishMinutes((+finishMinutes + 5).toString().padStart(2, '0')));
  }
}