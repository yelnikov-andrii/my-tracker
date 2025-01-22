import React, { FunctionComponent } from "react";
import MyDropdown from "../../UI/MyDropdown";
import { MyCalendar } from "../../UI/MyCalendar";

interface CalendarProps {
    value: string;
    onChange: (newDate: Date) => void;
}

const Calendar: FunctionComponent<CalendarProps> = ({ value, onChange}) => {
    return (
        <MyDropdown butttonContent="Календар">
            <MyCalendar
                value={value}
                onChange={onChange}
            />
        </MyDropdown>
    );
}

export default React.memo(Calendar);