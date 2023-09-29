import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const StyledContainer = styled.div`
max-width: 1200px;
margin: 0 auto;
padding: 0 30px;

@media (max-width: 768px) {
  padding: 0 15px;
}
`;

export const Container: React.FC <Props> = ({ children }) => {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  )
}
