import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
height: 60px;
padding: 10px 5px;
background: #ff0;
`;

const Block = styled.div`
display: flex;
justify-content: space-between;
`;

export const Header = () => {
  return (
    <StyledHeader>
        <Block>
          <Link to="/">
            Tasker
          </Link>
          <Link to='/deals-without-timeline'>
            Справи без ліміту
          </Link>
          <Link to='/'>
            Справи за графіком
          </Link>
        </Block>
    </StyledHeader>
  )
}
