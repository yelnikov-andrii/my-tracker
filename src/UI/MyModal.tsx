import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components';



interface Props {
  children: React.ReactNode;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

const MyModalStyled = styled.div<any>`
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
display: ${props => props.active ? 'flex' : 'none'};
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

export const MyModal: React.FC <Props> = ({ children, active, setActive }) => {
  return (
    <MyModalStyled
      active={active}
      onClick={() => {
        setActive(false);
      }}
    >
      <MyModalContent onClick={(e) => {
        e.stopPropagation();
      }}>
        {children}
      </MyModalContent>
    </MyModalStyled>
  )
}
