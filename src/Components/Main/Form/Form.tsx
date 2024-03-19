import React, { Dispatch, SetStateAction } from 'react';
import { Box } from '@mui/material';
import { FormHeader } from './FormHeader/Header';
import { TimeBlock } from './TimeBlock/TimeBlock';
import { InputBlock } from './InputBlock/InputBlock';
import { ButtonBlock } from './ButtonBlock/ButtonBlock';

interface Props {
  date: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Form: React.FC <Props> = ({ date, setIsOpen }) => {
  return (
    <Box component="form">
      <FormHeader />
      <TimeBlock />
      <InputBlock />
      <ButtonBlock 
        date={date}
        setIsOpen={setIsOpen}
      />
    </Box>
  )
}
