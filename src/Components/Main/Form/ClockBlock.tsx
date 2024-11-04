import React, { Dispatch, SetStateAction } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { TimeField } from '@mui/x-date-pickers';

type Props = {
    viewValue: ViewsStrT;
    changeViewValue: (value: ViewsStrT) => void;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    label: string;
}

export const ClockBlock = ({ value, setValue, label }: Props) => {
    const { currentDate } = useSelector((state: RootState) => state.time);

    const handleTimeChange = (newTime: any) => {
        if (!newTime || !dayjs(newTime).isValid()) return;
        const updatedValue = dayjs(currentDate)
            .hour(newTime.hour())
            .minute(newTime.minute())

        setValue(updatedValue.toISOString());
    };

    return (
        <DemoContainer components={['TimePicker']}>
            <DemoItem label={label}>
                <TimeField
                    value={value && dayjs(value) || null}
                    onChange={handleTimeChange}
                    ampm={false}
                    />
            </DemoItem>
        </DemoContainer>
    )
}