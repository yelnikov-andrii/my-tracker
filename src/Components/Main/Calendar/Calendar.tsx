import React, { FunctionComponent } from "react";
import MyDropdown from "../../UI/MyDropdown";
import { MyCalendar } from "../../UI/MyCalendar";

const Calendar: FunctionComponent = () => {
    return (
        <MyDropdown butttonContent="Календар">
            <MyCalendar />
        </MyDropdown>
    );
}

export default React.memo(Calendar);