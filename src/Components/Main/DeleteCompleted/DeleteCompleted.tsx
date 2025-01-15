import { Box, Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { useCheckIfCompletedExist } from '../../../helpers/pluralActions/useCheckIfCompletedIxist';

interface Props {
  setReadyToDelete: Dispatch<SetStateAction<boolean>>;
}

export const DeleteCompleted: React.FC<Props> = ({ setReadyToDelete }) => {
  const isCheckedExist = useCheckIfCompletedExist();

  return (
    <>
      {
        isCheckedExist ? (
          <Box>
            <Button onClick={() => setReadyToDelete(true)}>
              Видалити завершені
            </Button>
          </Box >
        ) : (
          <></>
        )}
    </>
  )
}
