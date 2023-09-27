import React from 'react'
import { start } from 'repl';

interface Props {
  options: any[];
  change: any;
  value: string;
  startHour?: string;
  startMinutes?: string;
  equalHour?: boolean;
}

export const MySelect: React.FC <Props> = ({ options, change, value }) => {
  return (
    <select 
      onChange={(e) => {
        change(e.target.value)
      }}
      value={value}
    >
      {options.map(option => (
        <option
          value={option}
          key={option}
        >
          {option}
        </option>
      ))}
    </select>
  )
}
