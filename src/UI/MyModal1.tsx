import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components';

const MyModalStyled = styled.div<any>`
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
display: ${props => props.active === 'true' ? 'flex' : 'none'};
justify-content: center;
align-items: center;
background: rgba(0, 0, 0, 0.5);
`;

const MyModalContent = styled.div`
background: white;
padding: 25px;
min-width: 250px;
border-radius: 16px;

@media (min-width: 320px) and (max-width: 425px) {
  width: 90%;
}
`;

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const MyModal1: React.FC <Props> = ({ children, isOpen, setIsOpen }) => {

  return (
    <MyModalStyled
      active={isOpen ? 'true' : 'false'}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <MyModalContent onClick={(e) => {
        e.stopPropagation();
      }}>
        {children}
      </MyModalContent>
    </MyModalStyled>
  );
}
