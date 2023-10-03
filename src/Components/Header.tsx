import React from 'react';
import styled from 'styled-components';
import { Container } from '../UI/Container';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
height: 40px;
padding: 10px 0;
background: #ff0;
`;

const Block = styled.div`
display: flex;
justify-content: space-between;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <Block>
          <Link to="/">
            Tasker
          </Link>
          <Link to='/deals-without-timeline'>
            Справи без ліміту по часу
          </Link>
          <Link to='/'>
            Справи за графіком
          </Link>
        </Block>
      </Container>
    </StyledHeader>
  )
}
