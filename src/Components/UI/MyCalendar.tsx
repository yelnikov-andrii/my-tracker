import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const MyCalendar: React.FC<any> = ({ value, onChange }) => {
  return (
    <div>
      <Calendar 
        onChange={onChange} 
        value={value}
        locale='ua-UA'
      />
    </div>
  )
}
