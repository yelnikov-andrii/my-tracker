/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Container } from '../UI/Container';
import styled from 'styled-components';
import { MyModal } from '../UI/MyModal';
import { Form } from './Form';
import { DealList } from './DealList';
import { addDeal, deleteCompletedTasks } from '../store/dealSlice';
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
`;

export const Main = () => {
  const dispatch = useDispatch();

    React.useEffect(() => {
      const dealsString = localStorage.getItem('deals');
      if (dealsString) {
        const deals = JSON.parse(dealsString);
        deals.forEach((deal: any) => dispatch(addDeal(deal)));
      }
    }, []);

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
          <DealList />
          <Block>
            <Button onClick={(e) => {
              dispatch(deleteCompletedTasks());
            }}>
              Видалити завершені
            </Button>
          </Block>
        </div>
      </Container>
    </StyledMain>
  )
}
