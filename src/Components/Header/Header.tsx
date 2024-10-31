import React from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export const Header = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Container maxWidth="md">
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
            {isAuth && (
              <Box sx={{ display: 'flex', gap: '32px' }}>
                <Link to="/" color="white" >
                  Справи за графіком
                </Link>
                <Link to="/todos-without-timeline" color="white" >
                  Справи без ліміту
                </Link>
              </Box>
            )}
            <Box sx={{ display: 'flex', gap: '16px' }}>
              <Link to="/registration" color="white" >
                Реєстрація
              </Link>
              <Link to="/login" color="white" >
                Логін
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar> */}
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                Меню
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {isAuth ? (
                  <Box sx={{ display: 'flex', gap: '32px' }}>

                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/" color="white" >
                        Справи за графіком
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/todos-without-timeline" color="white" >
                        Справи без ліміту
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/registration" color="white" >
                        Реєстрація
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/login" color="white" >
                        Логін
                      </Link>
                    </MenuItem>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', gap: '32px' }}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/registration" color="white" >
                        Реєстрація
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/login" color="white" >
                        Логін
                      </Link>
                    </MenuItem>
                  </Box>
                )}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Box sx={{ display: 'flex', gap: '32px' }}>
                {isAuth ? (
                  <Box sx={{ display: 'flex', gap: '32px' }}>

                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/" color="white" >
                        Справи за графіком
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/todos-without-timeline" color="white" >
                        Справи без ліміту
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/registration" color="white" >
                        Реєстрація
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/login" color="white" >
                        Логін
                      </Link>
                    </MenuItem>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', gap: '32px' }}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/registration" color="white" >
                        Реєстрація
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/login" color="white" >
                        Логін
                      </Link>
                    </MenuItem>
                  </Box>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  )
}
