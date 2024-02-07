import {AppBar, Box, Toolbar, Menu, MenuItem, IconButton, Typography, Button, Avatar } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { createURL, grabImage } from './sanityClient.js';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../resources/navbar.css';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom'



const Navbar = (props) => {
    const menuItems = require('../resources/menuItems.json').menuItems;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [links, setLinks] = useState([]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const LINK_URL = createURL("socialLink");
    useEffect(() => {
        axios.get(LINK_URL)
        .then((response) => {
            let temp = [];
            console.log(response.data.result);
            response.data.result.forEach((link) => {
                temp.push({
                    type: link.type,
                    url: link.url,
                })
            })
            setLinks(temp);
        });
    }, [LINK_URL]);
    console.log(links)
    const currLoc = useLocation().pathname;
    return (
        <Box sx = {{flexGrow: 1}}>
            <AppBar position='relative' style = {{background: "#ffffff", zIndex: '1'}}>
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
                        <Link to = "/" className = "visarts" style =  {{textDecoration: 'none'}}>
                                duu VisArts
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: '30px' }}} justifyContent = "flex-end">
                        {menuItems.map((m) => (
                        <Link className = "navlink" to = {m.to} style = {{textDecoration: 'none'}}>
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
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: '10px' }}} justifyContent = "flex-end">
                        {links.map((link) => {
                            let temp = link.type;
                            let element = null;
                            switch (temp) {
                                case 'facebook':
                                    element = <FacebookIcon />;
                                    break;
                                case 'instagram':
                                    element = <InstagramIcon />;
                                    break;
                                case 'twitter':
                                    element = <TwitterIcon />;
                                    break;
                                case 'pinterest':
                                    element = <PinterestIcon />;
                                    break;
                                default:
                                    break;
                            }
                            return (
                                <Link href = {link.url}>
                                    <IconButton>
                                    {element}   
                                    </IconButton>
                                </Link>
                            );
                            })
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;