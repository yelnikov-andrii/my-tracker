import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../store/timeSlice';

export const MyCalendar: React.FC<any> = () => {
  const currentDate = useSelector((state: RootState) => state.time.currentDate);
  const dispatch = useDispatch();

  function changeDate(date: any) {
    dispatch(setDate(date));
  }
  return (
    <div>
      <Calendar
        onChange={changeDate}
        value={currentDate}
        locale='ua-UA'
      />
    </div>
  )
}
