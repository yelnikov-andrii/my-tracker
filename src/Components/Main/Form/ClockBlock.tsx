import React from 'react';
import { Box, Button } from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import dayjs from 'dayjs';
import { ViewsStrT } from '../../../types/mainForm';

type Props = {
    viewValue: ViewsStrT;
    changeViewValue: (value: ViewsStrT) => void;
    value: any;
    setValue: any;
    label: string;
}

export const ClockBlock = ({ viewValue, changeViewValue, value, setValue, label }: Props) => {
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
                <TimeClock
                    value={value && dayjs(value)}
                    onChange={handleTimeChange}
                    view={viewValue}
                    views={['hours', 'minutes']}
                    ampm={false}
                />
            </DemoItem>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <Button
                    onClick={() => {
                        changeViewValue('hours')
                    }}
                >
                    Години
                </Button>
                <Button
                    onClick={() => {
                        changeViewValue('minutes')
                    }}
                >
                    Хвилини
                </Button>
            </Box>
        </DemoContainer>
    )
}