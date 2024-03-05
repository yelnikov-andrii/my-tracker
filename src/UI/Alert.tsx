import { Box } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
}

export const Alert: React.FC <Props> = ({ children, isOpen }) => {
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
