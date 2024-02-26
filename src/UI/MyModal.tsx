import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../store/modalSlice';
import { selectDealIdToChange } from '../store/dealSlice';
import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export const MyModal: React.FC <Props> = ({ children }) => {
  const { isOpen } = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();

  return (
    <Box
      position="fixed"
      top={0}
      bottom={0}
      left={0}
      right={0}
      display={isOpen ? 'flex' : 'none'}
      justifyContent="center"
      alignItems="center"
      style={{
        background: 'rgba(0, 0, 0, 0.5)'
      }}
      zIndex={1}
      onClick={() => {
        dispatch(closeModal());
        dispatch(selectDealIdToChange(null));
      }}
    >
      <Box 
        onClick={(e) => {
          e.stopPropagation();
        }}
        sx={{
          background: 'white',
          padding: '25px',
          minWidth: '250px',
          borderRadius: '16px',
          '@media (max-width: 425px)': {
            width: '90%',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
