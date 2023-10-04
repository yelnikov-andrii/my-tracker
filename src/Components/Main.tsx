/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Container } from '../UI/Container';
import styled from 'styled-components';
import { MyModal } from '../UI/MyModal';
import { Form } from './Form';
import { DealList } from './DealList';
import { deleteCompletedTasks } from '../store/dealSlice';
import { useDispatch } from 'react-redux';
import { openModal } from '../store/modalSlice';
import { MyCalendar } from './MyCalendar';

const StyledMain = styled.main`
padding: 50px 0;
`;

const ButtonBlock = styled.div`
display: flex;
gap: 30px;
align-items: center;
margin: 20px 0 0 0;
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
width: 70%;
`;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const [value, onChange] = React.useState<Value>(new Date());

  const formatDate = (date: any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}`;
  };

  return (
    <StyledMain>
      <Container>
        <div>
          <div>
          <MyCalendar 
            value={value}
            onChange={onChange}
          />
          </div>
          <ButtonBlock>
            <div>
              {`Дата: ${formatDate(value)}`}
            </div>
            <Button onClick={() => {
              dispatch(openModal())
            }}>
              Додати справу
            </Button>
          </ButtonBlock>
          <MyModal>
            <Form 
              date={formatDate(value)}
            />
          </MyModal>
          <DealList 
            date={formatDate(value)}
          />
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
