import React from 'react';
import styled from 'styled-components';
import { hours, minutes } from '../helpers/hoursAndMinutes';
import { useDispatch, useSelector } from 'react-redux';
import { addDeal, addDealAfterThis, addDealBeforeThis, changeDealName, changeTheDeal, selectDealIdToAddAfterThis, selectDealIdToAddBeforeThis, selectDealIdToChange } from '../store/dealSlice';
import { closeModal } from '../store/modalSlice';
import { setFinishHour, setFinishMinutes, setStartHour, setStartMinutes } from '../store/timeSlice';
import { changeTimeAfterAddingAdeal } from '../helpers/changeTimeAfterAdd';
import { RootState } from '../store/store';
import { MySelect } from '../UI/MySelect';

const StyledForm = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 20px;
`;

const Block = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
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

const Cipher = styled.div`
font-size: 28px;
font-weight: 500;
`;

export const Form: React.FC <any> = ({ date }) => {
  const { deals, dealIdToChange, dealName, dealIdToAddAfterThis, dealIdToAddBeforeThis } = useSelector((state: RootState) => state.deal);
  const { startHour, startMinutes, finishHour, finishMinutes } = useSelector((state: any) => state.time);
  
  const dispatch = useDispatch();

  function addDealHandler() {
    if (!dealName || !startHour || !startMinutes || !finishHour || !finishMinutes) {
      return;
    }

    const deal = {
      name: dealName,
      start: `${startHour}:${startMinutes}`,
      finish: `${finishHour}:${finishMinutes}`,
      completed: false,
      date: date,
      id: Date.now()
    };

    if (dealIdToAddAfterThis) {
      dispatch(addDealAfterThis(deal));
      dispatch(changeDealName(''));
      changeTimeAfterAddingAdeal(startHour, finishHour, finishMinutes, dispatch);
      dispatch(closeModal());
      dispatch(selectDealIdToAddAfterThis(null))
      return;
    }

    if (dealIdToAddBeforeThis) {
      dispatch(addDealBeforeThis(deal));
      dispatch(changeDealName(''));
      changeTimeAfterAddingAdeal(startHour, finishHour, finishMinutes, dispatch);
      dispatch(closeModal());
      dispatch(selectDealIdToAddBeforeThis(null));
      return;
    }

    dispatch(addDeal(deal));
    dispatch(changeDealName(''));
    changeTimeAfterAddingAdeal(startHour, finishHour, finishMinutes, dispatch);
    dispatch(closeModal());
  }

  function changeTheDealHandler(dealId: number | null) {
    const foundDeal = deals.find((deal: any) => deal.id === dealId);

    if (!dealName || !startHour || !startMinutes || !finishHour || !finishMinutes || !foundDeal) {
      return;
    }

    const newDeal = {
      name: dealName,
      start: `${startHour}:${startMinutes}`,
      finish: `${finishHour}:${finishMinutes}`,
      date: foundDeal.date,
    };

    dispatch(changeTheDeal(newDeal));
    dispatch(changeDealName(''));
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
        <Cipher> - </Cipher>
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
          value={dealName}
          onChange={(e) => {
            dispatch(changeDealName(e.target.value))
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
