import { Container } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const MyContainer: React.FC <Props> = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}
