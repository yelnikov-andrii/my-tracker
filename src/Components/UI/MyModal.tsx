import { Box } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const MyModal: React.FC <Props> = ({ children, isOpen, setIsOpen }) => {

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
        setIsOpen(false);
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
          maxWidth: '500px',
          '@media (max-width: 768px)': {
            width: '90%',
            padding: '8px'
          },
          '@media (max-width: 425px)': {
            width: '95%',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
