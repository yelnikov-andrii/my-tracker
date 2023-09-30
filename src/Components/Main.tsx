/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction } from 'react'
import { Container } from '../UI/Container';
import styled from 'styled-components';
import { MyModal } from '../UI/MyModal';
import { Form } from './Form';
import { DealList } from './DealList';
import { deleteCompletedTasks } from '../store/dealSlice';
import { useDispatch } from 'react-redux';
import { openModal } from '../store/modalSlice';

const StyledMain = styled.main`
padding: 50px 0;
`;

const ButtonBlock = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const Button = styled.button`
width: 100px;
height: 40px;
border-radius: 8px;
border: none;
outline: none;
background: teal;
color: #fff;

&:hover {
  background: green;
  cursor: pointer;
}
`;

const Block = styled.div`
margin: 20px 0 0 0;
border: 1px solid teal;
border-radius: 12px;
padding: 10px;
display: flex;
gap: 20px;
`;

interface Props {
  readyToChange: boolean;
  setReadyToChange: Dispatch<SetStateAction<boolean>>;
}

export const Main: React.FC <Props> = ({ readyToChange, setReadyToChange }) => {
  const dispatch = useDispatch();

 function changeThePlanTime() {
   setReadyToChange(true);
 }

  return (
    <StyledMain>
      <Container>
        <div>
          <ButtonBlock>
            <Button onClick={() => {
              dispatch(openModal())
            }}>
              Додати справу
            </Button>
          </ButtonBlock>
          <MyModal>
            <Form />
          </MyModal>
          <DealList 
            readyToChange={readyToChange}
          />
          <Block>
            <Button onClick={(e) => {
              dispatch(deleteCompletedTasks());
            }}>
              Видалити завершені
            </Button>
            <Button onClick={(e) => {
              changeThePlanTime();
            }}>
              Змістити графік
            </Button>
          </Block>
        </div>
      </Container>
    </StyledMain>
  )
}
