import React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import dayjs from 'dayjs';
import { ViewsStrT } from '../../../types/mainForm';
import { TimePicker } from '@mui/x-date-pickers';

type Props = {
    viewValue: ViewsStrT;
    changeViewValue: (value: ViewsStrT) => void;
    value: any;
    setValue: any;
    label: string;
}

export const ClockBlock = ({ viewValue, value, setValue, label }: Props) => {
    const { currentDate } = useSelector((state: RootState) => state.time);

    const handleTimeChange = (newTime: any) => {
        const updatedValue = dayjs(currentDate)
            .hour(newTime.hour())
            .minute(newTime.minute())

        setValue(updatedValue.toISOString());
    };

    return (
        <DemoContainer components={['TimeClock']}>
            <DemoItem label={label}>
                <TimePicker
                    value={value && dayjs(value)}
                    onChange={handleTimeChange}
                    view={viewValue}
                    views={['hours', 'minutes']}
                    ampm={false} />
            </DemoItem>
        </DemoContainer>
    )
}