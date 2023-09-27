import React from 'react';
import styled from 'styled-components';
import { Container } from '../UI/Container';

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
          <a href="/">
            Logo
          </a>
          <a href='/user'>
            User
          </a>
        </Block>
      </Container>
    </StyledHeader>
  )
}
