import { Box, IconButton, Menu } from "@mui/material";
import React from "react";
import { LinksBlock, privateLinks, publicLinks } from "./Header";
import { useSelector } from "react-redux";

const MenuComp = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const { isAuth } = useSelector((state: RootState) => state.auth);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="medium"
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
                style={{ color: 'green' }}
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
                    <LinksBlock
                        links={privateLinks}
                        handleCloseNavMenu={handleCloseNavMenu}
                        mobile={true}
                    />
                ) : (
                    <LinksBlock
                        links={publicLinks}
                        handleCloseNavMenu={handleCloseNavMenu}
                        mobile={true}
                    />
                )}
            </Menu>
        </Box>
    );
}

export default MenuComp;