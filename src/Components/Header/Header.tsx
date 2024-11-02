import React from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Box, MenuItem, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import MenuComp from './MenuComp';

interface Props {
  links: LinkI[];
  handleCloseNavMenu?: () => void;
  mobile?: boolean;
}

export const publicLinks = [
  {
    id: 1,
    name: 'Реєстрація',
    href: '/registration'
  },
  {
    id: 2,
    name: 'Логін',
    href: '/login'
  }
];

export const privateLinks = [...publicLinks,
{
  id: 3,
  name: 'Справи за графіком',
  href: '/'
},
{
  id: 4,
  name: 'Справи без часових меж',
  href: '/todos-without-timeline'
}
];

export const LinksBlock: React.FC<Props> = ({ links, handleCloseNavMenu, mobile }) => {
  return (
    <Box sx={!mobile ? { display: 'flex', gap: '32px' }: {display: 'flex', flexDirection: 'column', gap: '16px'}}>
      {links.map((obj: any) => (
        <MenuItem key={obj.id} onClick={handleCloseNavMenu}>
          <Link to={obj.href} style={mobile ? {color: 'primary.main', textDecoration: 'none'} : {color: 'white', textDecoration: 'none'}}>
            {obj.name}
          </Link>
        </MenuItem>
      ))}
    </Box>
  )
}

export const Header = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MenuComp />
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Box sx={{ display: 'flex', gap: '32px' }}>
                {isAuth ? (
                  <LinksBlock
                    links={privateLinks}
                  />
                ) : (
                  <LinksBlock
                    links={publicLinks}
                  />
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  )
}
