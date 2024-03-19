import { setFinishHour, setFinishMinutes, setStartHour, setStartMinutes } from "../store/timeSlice";

export const changeTimeBeforeAddingTodo = (startHour: string, startMinutes: string, dispatch: any) => {
  dispatch(setStartHour(startHour));
  dispatch(setFinishHour(startHour));
  dispatch(setStartMinutes((+startMinutes - 5).toString().padStart(2, '0')));
  dispatch(setFinishMinutes(startMinutes));


  if (startMinutes === '00') {
    const newStartHour = (+startHour - 1).toString().padStart(2, '0');
    dispatch(setStartHour(newStartHour));
    dispatch(setStartMinutes('55'));
  }
}