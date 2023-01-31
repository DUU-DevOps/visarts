import {AppBar, Box, Toolbar, Menu, MenuItem, IconButton, Link, Typography, Button } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = (props) => {
    const menuItems = require('../resources/menuItems.json').menuItems;
    console.log(menuItems);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box>
            <AppBar>
                <Toolbar disableGutters sx = {{paddingRight: "20px", paddingLeft: "20px"}}>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton onClick = {handleOpenNavMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Menu 
                        anchorEl={anchorElNav}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        style={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >
                            {menuItems.map((m) => {
                                return (
                                    <Link href = {m.to} style = {{textDecoration: 'none', color: 'black'}}>
                                        <MenuItem 
                                        key = {m.title}
                                        onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{m.title}</Typography>
                                        </MenuItem>
                                    </Link>
                                )
                            })}
                        </Menu>
                    </Box>
                    <Box>
                        <Link href = "/">
                            <IconButton>
                                <HomeIcon />
                            </IconButton>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: '30px' }}} justifyContent = "flex-end">
                        {menuItems.map((m) => (
                        <Link href = {m.to} style = {{textDecoration: 'none', color: 'white'}}>
                            <Button
                                key={m}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {m.title}
                            </Button>
                        </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;