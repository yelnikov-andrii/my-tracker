import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MyModal } from '../UI/MyModal';
import { Container } from '../UI/Container';
import { closeModal, openModal } from '../store/modalSlice';
import { addDealWithoutTimeline, removeDealWithout, updateDealWithout } from '../store/dealSlice';
import styled from 'styled-components';

const StyledForm = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 20px;
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

const List = styled.ul<any>`
margin: 10px 0 0 0;
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

const Checkbox = styled.input`
width: 20px;
height: 20px;
color: teal;
`;

export const DealsWithoutTime = () => {
  const { dealsWithoutTimeline } = useSelector((state: any) => state.deal);
  const dispatch = useDispatch();
  const [dealName, setDealName] = React.useState('');
  
  function addDealHandler() {
    const newDeal = {
      name: dealName,
      id: Date.now(),
      completed: false,
    };

    dispatch(addDealWithoutTimeline(newDeal));
    setDealName('');
    dispatch(closeModal());
  }

  function toggleDeal(dealId: number) {
    dispatch(updateDealWithout(dealId));
  }

  function deleteDeal(dealId: number) {
    dispatch(removeDealWithout(dealId));
  }

  return (
    <div>
      <Container>
      <h2>
        Справи без графіку
      </h2>
      <MyModal>
        <StyledForm>
        <MyInput 
          value={dealName}
          onChange={(e) => {
            setDealName(e.target.value);
          }}
        />
        <Button  onClick={(e) => {
          addDealHandler()
        }}>
          Додати справу
        </Button>
        </StyledForm>
      </MyModal>
      <div>
        <Button onClick={() => {
          dispatch(openModal());
        }}>
          Додати справу
        </Button>
      </div>
      <List>
        {dealsWithoutTimeline.length > 0 ? dealsWithoutTimeline.map((deal: any) => (
          <ListItem
            completed={deal.completed ? "true" : "false"}
          >
            <ListItemBlock>
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
            </ListItemBlock>
          </ListItem>
        )) : (
          <ListItem>
            Немає завдань
          </ListItem>
        )}
      </List>
      </Container>
    </div>
  )
}
