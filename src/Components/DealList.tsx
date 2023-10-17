import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { removeDeal, selectDealIdToAddAfterThis, selectDealIdToAddBeforeThis, selectDealIdToChange, updateDeal } from '../store/dealSlice';
import { openModal } from '../store/modalSlice';
import { changeTime } from '../helpers/changeTime';
import { RootState } from '../store/store';
import { MyDropdown } from '../UI/MyDropdown';

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
border: 1px solid teal;
padding: 5px 10px;
`;

const ListItemBlock = styled.div`
display: flex;
justify-content: space-between;
`;

const Buttons = styled.div`
display: flex;
gap: 20px;
flex-wrap: wrap;
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
  width: 100px;
  height: 36px;
  font-size: 12px;
  font-weight: 400;
}
`;

const Checkbox = styled.input`
width: 20px;
height: 20px;
color: teal;
`;

export const DealList: React.FC<any> = ({ date }) => {
  const { deals } = useSelector((state: RootState) => state.deal);
  const dispatch = useDispatch();

  function toggleDeal(dealId: number) {
    dispatch(updateDeal(dealId));
  }

  function deleteDeal(dealId: number) {
    dispatch(removeDeal(dealId));
  }

  function changeTheDeal(deal: any) {
    dispatch(openModal());
    dispatch(selectDealIdToChange(deal));
    changeTime(deals, deal.id, dispatch);
  }

  function addDealAfter(dealId: number) {
    dispatch(openModal());
    dispatch(selectDealIdToAddAfterThis(dealId));
  }

  function addDealBefore(dealId: number) {
    dispatch(openModal());
    dispatch(selectDealIdToAddBeforeThis(dealId));
  }

  const filteredDeals = React.useMemo(() => {
    return deals.filter((deal: any) => deal.date === date);
  }, [date, deals]);

  return (
    <React.Fragment>
      <h2>
        Список завдань
      </h2>
      <List>
        {filteredDeals.length > 0 ? filteredDeals.map((deal: any) => (
          <ListItem 
            key={deal.id}
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
              <MyDropdown
                butttonContent="Вибрати опцію"
              >
              <Buttons>
                <Button 
                  onClick={() => {
                    deleteDeal(deal.id);
                  }}
                >
                  Видалити
                </Button>
                <Button 
                  onClick={() => {
                    changeTheDeal(deal);
                  }}
                >
                  Редагувати
                </Button>
                <Button 
                  onClick={() => {
                    addDealAfter(deal.id);
                  }}
                >
                  Додати справу після цієї
                </Button>
                <Button 
                  onClick={() => {
                    addDealBefore(deal.id);
                  }}
                >
                  Додати справу перед цією
                </Button>
              </Buttons>
              </MyDropdown>
            </ListItemBlock>
          </ListItem>
        )) : (
            <ListItem>
              Немає завдань
            </ListItem>
        )}
      </List>
    </React.Fragment>
  )
}
