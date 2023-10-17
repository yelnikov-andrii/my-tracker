/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Container } from '../UI/Container';
import styled from 'styled-components';
import { MyModal } from '../UI/MyModal';
import { Form } from './Form';
import { DealList } from './DealList';
import { deleteCompletedTasks } from '../store/dealSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MyCalendar } from './MyCalendar';
import { RootState } from '../store/store';
import { setDate } from '../store/timeSlice';
import { formatDate } from '../helpers/formateDate';
import { MyModal1 } from '../UI/MyModal1';
import { openModal } from '../store/modalSlice';

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

const Question = styled.h3`
font-size: 18px;
font-weight: 500;
margin: 0 0 20px 0;
`;

const Buttons = styled.div`
display: flex;
gap: 20px;
`;

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const { currentDate } = useSelector((state: RootState) => state.time);
  const { deals } = useSelector((state: RootState) => state.deal);
  const [readyToDelete, setReadyToDelete] = React.useState(false);

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
              dispatch(openModal());
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
              if (deals.find(deal => (deal.date === formatDate(currentDate)) && deal.completed === true)) {
                console.log('deal was found')
                setReadyToDelete(true);
              } else {
                return;
              }
            }}>
              Видалити завершені
            </Button>
          </Block>
          {readyToDelete === true && (
            <MyModal1
              isOpen={readyToDelete}
              setIsOpen={setReadyToDelete}
            >
              <Question>
                Ви впевнені, що бажаєте видалити всі завершені справи за цей день?
              </Question>
              <Buttons>
                <Button
                  onClick={() => {
                    dispatch(deleteCompletedTasks(currentDate));
                    setReadyToDelete(false);
                  }}
                >
                  Так
                </Button>
                <Button
                  onClick={() => {
                    setReadyToDelete(false);
                  }}
                >
                  Ні
                </Button>
              </Buttons>
            </MyModal1>
          )}
        </div>
      </Container>
    </StyledMain>
  )
}
