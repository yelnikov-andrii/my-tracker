import React from 'react'
import { Container } from '../UI/Container';
import styled from 'styled-components';
import { MyModal } from '../UI/MyModal';
import { Form } from './Form';
import { DealList } from './DealList';
import { addDeal } from '../store/dealSlice';
import { useDispatch } from 'react-redux';

const StyledMain = styled.main`
padding: 50px 0;
`;

const ButtonBlock = styled.div`
display: flex;
justify-content: center;
align-items: center;
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

export const Main = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const dispatch = useDispatch();

    React.useEffect(() => {
      const dealsString = localStorage.getItem('deals');
      if (dealsString) {
        const deals = JSON.parse(dealsString);
        deals.forEach((deal: any) => dispatch(addDeal(deal)));
      }
    }, []);

  return (
    <StyledMain>
      <Container>
        <div>
          <ButtonBlock>
            <Button onClick={() => {
              setModalIsOpen(true);
            }}>
              Додати справу
            </Button>
          </ButtonBlock>
          <MyModal
            active={modalIsOpen}
            setActive={setModalIsOpen}
          >
            <Form 
              setActive={setModalIsOpen}
            />
          </MyModal>
          <DealList />
        </div>
      </Container>
    </StyledMain>
  )
}
