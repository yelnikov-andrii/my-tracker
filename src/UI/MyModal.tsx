import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { closeModal } from '../store/modalSlice';



interface Props {
  children: React.ReactNode;
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

export const MyModal: React.FC <Props> = ({ children }) => {
  const { isOpen } = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();

  return (
    <MyModalStyled
      active={isOpen}
      onClick={() => {
        dispatch(closeModal());
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
