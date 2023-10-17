/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Container } from '../UI/Container';
import styled from 'styled-components';
import { MyModal } from '../UI/MyModal';
import { Form } from './Form';
import { DealList } from './DealList';
import { deleteCompletedTasks } from '../store/dealSlice';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../store/modalSlice';
import { MyCalendar } from './MyCalendar';
import { RootState } from '../store/store';
import { setDate } from '../store/timeSlice';
import { formatDate } from '../helpers/formateDate';

const StyledMain = styled.main`
padding: 50px 0;
`;

const ButtonBlock = styled.div`
display: flex;
gap: 30px;
align-items: center;
margin: 20px 0 0 0;
`;

const Data = styled.b`
margin: 0;
font-size: 22px;
font-weight: 600;
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

@media screen and (max-width: 768px) {
  width: 100%;
}
`;

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const { currentDate } = useSelector((state: RootState) => state.time);

  function changeCurrentDate(newDate: any) {
    dispatch(setDate(newDate.toISOString()))
  }

  return (
    <StyledMain>
      <Container>
        <div>
          <div>
          <MyCalendar 
            value={currentDate}
            onChange={changeCurrentDate}
          />
          </div>
          <ButtonBlock>
            <Data>
              {`Дата: ${formatDate(currentDate)}`}
            </Data>
            <Button onClick={() => {
              dispatch(openModal())
            }}>
              Додати справу
            </Button>
          </ButtonBlock>
          <MyModal>
            <Form 
              date={formatDate(currentDate)}
            />
          </MyModal>
          <DealList 
            date={formatDate(currentDate)}
          />
          <Block>
            <Button onClick={(e) => {
              dispatch(deleteCompletedTasks(currentDate));
            }}>
              Видалити завершені
            </Button>
          </Block>
        </div>
      </Container>
    </StyledMain>
  )
}
