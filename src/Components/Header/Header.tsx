import React from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles: any = makeStyles((theme: any) => ({
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  link: {
    color: theme.palette.primary.contrastText,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
  },
}));

export const Header = () => {
const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.header}>
        <Container maxWidth="sm">
          <Toolbar className={classes.toolbar}>
            <Link to="/deals-without-timeline" color="white" className={classes.link}>
              Справи без ліміту
            </Link>
            <Link to="/" color="white" className={classes.link}>
              Справи за графіком
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  )
}
