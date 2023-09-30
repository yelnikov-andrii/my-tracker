import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { removeDeal, selectDealIdToChange, updateDeal } from '../store/dealSlice';
import { openModal } from '../store/modalSlice';
import { setFinishHour, setFinishMinutes, setStartHour, setStartMinutes } from '../store/timeSlice';

const List = styled.ul<any>`
margin: 0;
list-style: none;
border: 1px solid teal;
border-radius: 12px;
padding: 10px;
width: 70%;
display: flex;
flex-direction: column;
gap: 20px;
cursor: ${props => props.ready === 'true' ? 'pointer' : ''};

@media (max-width: 768px) {
  width: 100%;
}
`;

const ListItem = styled.li<any>`
font-size: 20px;
font-weight: 500;
display: flex;
flex-direction: column;
text-decoration: ${props => props.completed === 'true' ? 'line-through' : 'none'};
flex-wrap: wrap;
gap: 10px;
`;

const ListItemBlock = styled.div`
display: flex;
justify-content: space-between;
`;

const Name = styled.span`
font-size: 16px;
font-weight: 400;
`;

const Button = styled.button`
width: 120px;
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

@media (max-width: 768px) {
  width: 80px;
  height: 30px;
  font-size: 12px;
  font-weight: 400;
}
`;

const Checkbox = styled.input`
width: 20px;
height: 20px;
color: teal;
`;

interface Props {
  readyToChange: boolean;
}

export const DealList: React.FC <Props> = ({ readyToChange }) => {
  const { deals } = useSelector((state: any) => state.deal);
  const dispatch = useDispatch();

  function toggleDeal(dealId: number) {
    dispatch(updateDeal(dealId));
  }

  function deleteDeal(dealId: number) {
    dispatch(removeDeal(dealId));
  }

  function changeTheDeal(dealId: number) {
    dispatch(openModal());
    dispatch(selectDealIdToChange(dealId));
    const foundDeal = deals.find((deal: any) => deal.id === dealId);
    const startMinutes = foundDeal.start.slice(foundDeal.start.indexOf(':') + 1);
    const startHour = foundDeal.start.slice(0, foundDeal.start.lastIndexOf(':'));
    const finishMinutes = foundDeal.finish.slice(foundDeal.finish.indexOf(':') + 1);
    const finishHour = foundDeal.finish.slice(0, foundDeal.finish.lastIndexOf(':'));
    dispatch(setStartHour(startHour));
    dispatch(setStartMinutes(startMinutes));
    dispatch(setFinishHour(finishHour));
    dispatch(setFinishMinutes(finishMinutes));
  }

  return (
    <div>
      <h4>
        Tasks list
      </h4>
        {readyToChange && (
          <p>
            Виберіть таску, щоб змінити час і змістити план
          </p>
        )}
      <List
        ready={readyToChange ? 'true' : 'false'}
      >
        {deals.length > 0 ? deals.map((deal: any) => (
          <ListItem 
            key={deal.name}
            completed={deal.completed ? "true" : "false"}
          >
            <ListItemBlock>
            {`${deal.start} - ${deal.finish}`}
            <Name>
              {deal.name}
            </Name>
            <Checkbox 
              type='checkbox'
              onChange={(e) => {
                toggleDeal(deal.id)
              }}
              checked={deal.completed}
            />
            </ListItemBlock>
            <ListItemBlock>
              <Button 
                onClick={() => {
                  deleteDeal(deal.id);
                }}
              >
                Видалити
              </Button>
              <Button 
                onClick={() => {
                  changeTheDeal(deal.id);
                }}
              >
                Редагувати
              </Button>
            </ListItemBlock>
          </ListItem>
        )) : (
          <ListItem>
            No tasks yet
          </ListItem>
        )}
      </List>
    </div>
  )
}
