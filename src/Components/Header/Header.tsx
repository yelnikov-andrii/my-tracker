import React from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Toolbar } from '@mui/material';

export const Header = () => {

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Container maxWidth="sm">
          <Toolbar sx={{
            paddingLeft: 2,
            paddingRight: 2,
            display: 'flex',
            justifyContent: 'space-between',
            '& a': {
              color: 'primary.contrastText',
              textDecoration: 'none',
              marginLeft: 2,
              marginRight: 2,
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            '@media (min-width:1200px)': {
              paddingLeft: 6,
              paddingRight: 6,
            },
          }}>
            <Link to="/" color="white" >
              Справи за графіком
            </Link>
            <Link to="/todos-without-timeline" color="white" >
              Справи без ліміту
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  )
}
