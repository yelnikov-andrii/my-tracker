import React from 'react';
import styled from 'styled-components';
import { MySelect } from '../UI/MySelect';
import { hours, minutes } from '../helpers/hoursAndMinutes';
import { useDispatch, useSelector } from 'react-redux';
import { addDeal, changeTheDeal, selectDealIdToChange } from '../store/dealSlice';
import { closeModal } from '../store/modalSlice';
import { setFinishHour, setFinishMinutes, setStartHour, setStartMinutes } from '../store/timeSlice';
import { changeTimeAfterAddingAdeal } from '../helpers/changeTimeAfterAdd';

const StyledForm = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 20px;
`;

const Block = styled.div`
display: flex;
justify-content: space-between;
`;

const BlockInput = styled.div`
display: flex;
gap: 10px;
`;

const MyInput = styled.input`
height: 30px;
width: 100%;
border-radius: 8px;
border: 1px solid teal;
outline: none;
padding: 10px;
font-size: 22px;
font-weight: 700;
`;

const Button = styled.button`
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

export const Form: React.FC <any> = ({ date }) => {
  const [nameOfTheTask, setNameOfTheTask] = React.useState('');
  const { deals, dealIdToChange } = useSelector((state: any) => state.deal);
  const { startHour, startMinutes, finishHour, finishMinutes } = useSelector((state: any) => state.time);
  
  const dispatch = useDispatch();

  function addDealHandler() {
    if (!nameOfTheTask || !startHour || !startMinutes || !finishHour || !finishMinutes) {
      return;
    }

    const deal = {
      name: nameOfTheTask,
      start: `${startHour}:${startMinutes}`,
      finish: `${finishHour}:${finishMinutes}`,
      completed: false,
      date: date,
      id: Date.now()
    };

    dispatch(addDeal(deal));
    setNameOfTheTask('');
    changeTimeAfterAddingAdeal(startHour, finishHour, finishMinutes, dispatch);
    dispatch(closeModal());
  }

  function changeTheDealHandler(dealId: number) {
    const foundDeal = deals.find((deal: any) => deal.id === dealId);

    if (!nameOfTheTask || !startHour || !startMinutes || !finishHour || !finishMinutes || !foundDeal) {
      return;
    }

    const newDeal = {
      name: nameOfTheTask,
      start: `${startHour}:${startMinutes}`,
      finish: `${finishHour}:${finishMinutes}`,
    };

    dispatch(changeTheDeal(newDeal));
    setNameOfTheTask('');
    dispatch(selectDealIdToChange(null));
    dispatch(closeModal());
  }

  function changeStartHour(value: any) {
    dispatch(setStartHour(value));
  }

  function changeStartMinutes(value: any) {
    dispatch(setStartMinutes(value));
  }

  function changeFinishHour(value: any) {
    dispatch(setFinishHour(value));
  }

  function changeFinishMinutes(value: any) {
    dispatch(setFinishMinutes(value));
  }

  return (
    <StyledForm>
      <Block>
        <p>Початок</p>
        <p>Кінець</p>
      </Block>
      <Block>
        <BlockInput>
          <MySelect 
            options={hours}
            change={changeStartHour}
            value={startHour}
          />
          <MySelect 
            options={minutes}
            change={changeStartMinutes}
            value={startMinutes}
          />
        </BlockInput>
        <div> - </div>
        <BlockInput>
        <MySelect 
            options={hours}
            change={changeFinishHour}
            value={finishHour}
          />
          <MySelect 
            options={minutes}
            change={changeFinishMinutes}
            value={finishMinutes}
          />
        </BlockInput>
      </Block>
      <Block>
        <MyInput 
          value={nameOfTheTask}
          onChange={(e) => {
            setNameOfTheTask(e.target.value)
          }}
        />
      </Block>
      <Block>
        <Button onClick={() => {
          addDealHandler();
        }}>
          Додати справу
        </Button>
        <Button onClick={() => {
          changeTheDealHandler(dealIdToChange);
        }}>
          Редагувати справу
        </Button>
      </Block>
    </StyledForm>
  )
}
