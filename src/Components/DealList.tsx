import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { removeDeal, updateDeal } from '../store/dealSlice';
import { saveDealsToLocaleStorage } from '../helpers/saveDealsTolocaleStorage';

const List = styled.ul`
margin: 0;
list-style: none;
border: 1px solid teal;
border-radius: 12px;
padding: 10px;
width: 70%;
display: flex;
flex-direction: column;
gap: 20px;

@media (max-width: 768px) {
  width: 100%;
}
`;

const ListItem = styled.li<any>`
font-size: 20px;
font-weight: 500;
display: flex;
justify-content: space-between;
text-decoration: ${props => props.completed ? 'line-through' : 'none'};
flex-wrap: wrap;
gap: 10px;
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

export const DealList = () => {
  const { deals } = useSelector((state: any) => state.deal);
  const dispatch = useDispatch();

  function toggleDeal(dealId: number) {
    dispatch(updateDeal(dealId));
    const updatedDeals = deals.map((deal: any) => {
      if (deal.id === dealId) {
        return {
          ...deal,
          completed: !deal.completed,
        };
      }
      return deal;
    });

    saveDealsToLocaleStorage(updatedDeals);
  }

  function deleteDeal(dealId: number) {
    const updatedDeals = deals.filter((deal: any) => deal.id !== dealId);
    saveDealsToLocaleStorage(updatedDeals);
    dispatch(removeDeal(dealId));
    
  }

  return (
    <div>
      <h4>
        Tasks list
      </h4>
      <List>
        {deals.length > 0 ? deals.map((deal: any) => (
          <>
          <ListItem 
            key={deal.name}
            completed={deal.completed}
          >
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
            <Button onClick={() => {
            deleteDeal(deal.id);
          }}>
            Видалити
          </Button>
          </ListItem>
          </>
        )) : (
          <ListItem>
            No tasks yet
          </ListItem>
        )}
      </List>
    </div>
  )
}
