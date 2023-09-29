import React from 'react';
import styled from 'styled-components';
import { MySelect } from '../UI/MySelect';
import { hours, minutes } from '../helpers/hoursAndMinutes';
import { useDispatch, useSelector } from 'react-redux';
import { addDeal, changeTheDeal, selectDealIdToChange } from '../store/dealSlice';
import { saveDealsToLocaleStorage } from '../helpers/saveDealsTolocaleStorage';
import { closeModal } from '../store/modalSlice';

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

export const Form = () => {
  const [nameOfTheTask, setNameOfTheTask] = React.useState('');
  const [startHour, setStartHour] = React.useState('00');
  const [startMinutes, setStartMinutes] = React.useState('00');
  const [finishHour, setFInishHour] = React.useState('00');
  const [finishMinutes, setFinishMinutes] = React.useState('00');
  const { deals, dealIdToChange } = useSelector((state: any) => state.deal);

  
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
      id: Date.now()
    };

    dispatch(addDeal(deal));
    setNameOfTheTask('');

    if (startHour === finishHour) {
      if (finishMinutes === '55') {
        setStartHour((prev: string) => {
          let res = (+prev + 1).toString();
          if (res.length === 1) {
            res = '0' + res;
          }

          return res;
        });
        setStartMinutes('00');
        setFInishHour((prev: string) => {
          let res = (+prev + 1).toString();
          if (res.length === 1) {
            res = '0' + res;
          }

          return res;
        });
        setFinishMinutes('05');
      } else {
        setStartMinutes(finishMinutes);
      setFinishMinutes(prev => {
        if (prev === '00') {
          return '05'
        }
  
        return (+prev + 5).toString();
      });
      }
      
    } else {
      setStartHour(finishHour);
    setStartMinutes(finishMinutes);
    setFinishMinutes(prev => {
      if (prev === '00') {
        return '05'
      }

      return (+prev + 5).toString();
    });
    }

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
    const copyDeals = [...deals];
    saveDealsToLocaleStorage(copyDeals);
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
            change={setStartHour}
            value={startHour}
          />
          <MySelect 
            options={minutes}
            change={setStartMinutes}
            value={startMinutes}
          />
        </BlockInput>
        <div> - </div>
        <BlockInput>
        <MySelect 
            options={hours}
            change={setFInishHour}
            value={finishHour}
          />
          <MySelect 
            options={minutes}
            change={setFinishMinutes}
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
