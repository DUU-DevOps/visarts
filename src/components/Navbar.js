import {AppBar, Box, Toolbar, Menu, MenuItem, IconButton, Link, Typography, Button, Avatar } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
// import { createURL } from './sanityClient.js';
// import axios from 'axios';
// import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import '../resources/navbar.css';



const Navbar = (props) => {
    const menuItems = require('../resources/menuItems.json').menuItems;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // const ARTIST_URL = createURL("artist");
    // useEffect(() => {
    //     axios.get(ARTIST_URL)
    //     .then((response) => {
    //         console.log(response);
    //     });
    // }, [ARTIST_URL]);

    const currLoc = useLocation().pathname;
    return (
        <Box sx = {{flexGrow: 1, marginBottom: "20px"}}>
            <AppBar position = "fixed" style = {{background: "#ffffff"}}>
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
                        <Link href = "/" className = "visarts" style =  {{textDecoration: 'none'}}>
                                duu VisArts
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: '30px' }}} justifyContent = "center">
                        {menuItems.map((m) => (

                        <Link className = "navlink" href = {m.to} style = {{textDecoration: 'none'}}>
                            <Button
                                variant = {currLoc === m.to ? "contained": "normal"}
                                key={m}
                                onClick={handleCloseNavMenu}
                                sx={{  ':hover': {
                                    bgcolor: '#efaf40', 
                                    color: 'white'}, my: 2, color: currLoc === m.to ? "white": "black", display: 'block',  textTransform: 'none', backgroundColor: currLoc ===  m.to ? "#815299": "", borderRadius: "20px" }}
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