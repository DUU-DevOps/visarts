import React from 'react';
import {Grid, Avatar, Box, Link, IconButton, Slide, Fade, Button} from '@mui/material';
import  '../../resources/homepage.css';
import { createURL, grabImage } from '../sanityClient.js';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react'
import FacebookIcon from '../../resources/facebook.png';
import PinterestIcon from '../../resources/pinterest.png';
import InstagramIcon from '../../resources/instagram.webp';
import TwitterIcon from '../../resources/twitter.png';
import useIntersection from '../useIntersection.js';



const Homepage = (props) => {
    const [artistInfo, setArtistInfo] = useState({name: "everyone", image: "", socials: []});
    const [content, setContent] = useState({image: ""});
    const HOMEPAGE_URL = createURL("homepage");
    const ARTIST_URL = createURL("artist");
    const linksRef = useRef();
    const artistRef = useRef();
    const appRef = useRef();
    const linksInViewport = useIntersection(linksRef, '0px');
    const artistInViewport = useIntersection(artistRef, '0px');
    const appInViewport = useIntersection(appRef, '0px');


    useEffect(() => {
        axios.get(ARTIST_URL)
        .then((response) => {
            let temp = [];
            response.data.result[0].socialLinks.forEach((link) => {
                temp.push({
                    type: link.type,
                    url: link.url
                })
            }
            )
            setArtistInfo({
                name: response.data.result[0].name.split(' ')[0],
                image: grabImage(response.data.result[0].Image.asset),
                socials: temp
            })
        });
    }, [ARTIST_URL]);
    useEffect(() => {
        axios.get(HOMEPAGE_URL)
        .then((response) => {
            setContent({
                statement: response.data.result[0].statement,
                image: grabImage(response.data.result[0].image.asset),
                spotlightText: response.data.result[0].spotlightText,
                galleryText: response.data.result[0].brownGalleryText,
                galleryURL: response.data.result[0].brownGalleryLink,
                galleryImage: grabImage(response.data.result[0].brownGalleryImage.asset)
            })
        });
    }, [HOMEPAGE_URL]);
    return  (
        <Fade {...(content.image !== "" ? { timeout: 1000 } : {})}  in={content.image !== ""} >
        <div>
            <Grid container justifyContent = "flex-start"  alignItems = "center" style = {{position: "relative", backgroundImage: `url(${content.image})`, backgroundSize: "100% 100%", width: "100%", height: "640px"}}>
                <Grid item xs = {12} sm = {10} md = {8} lg = {6} style = {{ backgroundColor: "#89c3db", position: "absolute"}}>
                    <Grid container style = {{padding: "20px"}} justifyContent = "center" >
                        <Grid item xs = {12} md = {5} style = {{align: "center"}}>
                            <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            >
                                <Avatar variant = "square" style = {{width: "250px", height: "250px",  borderRadius: "40px", alginSelf: "center"}} src ={require("../../resources/logo.png")}/>
                            </Box>
                        </Grid>
                        <Grid item xs ={12} md = {6}>
                            <div>
                                <h1 className = "home-statement-header" style = {{fontSize: "22px"}} >Experience the world through <em>your</em> art. </h1>
                                <p className = "home-statement-text">{content.statement}</p>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing = {3} justifyContent = "space-between" style = {{ backgroundColor: "#ffffff", padding: '40px'}}>
                <Grid item xs = {12} md = {6}  alignItems = "center" display = "flex">
                    <Grid container>
                        <Grid item xs = {12} justifyContent = "center" style = {{paddingRight: "20px"}}>
                            <h1 className = "spotlight-header">Check out <span className = "underline-magical">{artistInfo.name}'s</span> work.</h1>
                            <p className = "spotlight-text">
                                {content.spotlightText}
                            </p>
                        </Grid>
                        <Grid item xs = {12} sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex', gap: '20px' }}} justifyContent = "center" ref = {linksRef}>
                            <Slide direction = "right"  {...(linksInViewport ? { timeout: 1000 } : {})}  in={linksInViewport} checked = {linksInViewport} mountOnEnter unmountOnExit>
                                <div> 
                                {artistInfo.socials.map((link) => {
                                    let temp = link.type;
                                    let image = "";
                                    switch (temp) {
                                        case "instagram":
                                            image = InstagramIcon;
                                            break;
                                        case "facebook":
                                            image = FacebookIcon;
                                            break;
                                        case "pinterest":
                                            image = PinterestIcon;
                                            break;
                                        case "twitter":
                                            image = TwitterIcon;
                                            break;
                                        default:
                                            break;
                                    
                                    }
                                    return (
                                        <Link href = {link.url}>
                                            <IconButton className = "link-zoom">
                                                <Avatar src = {image} />
                                            </IconButton>
                                        </Link>
                                    )
                                })}
                                </div>
                            </Slide>
                            {!linksInViewport && <div style = {{visibility: "hidden"}}>
                                <IconButton>
                                    <Avatar/>
                                </IconButton>
                            </div>}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs = {12} md = {5} ref = {artistRef}>
                    <Fade {...(artistInViewport ? { timeout: 1000 } : {})}  in={artistInViewport} mountOnEnter unmountOnExit>
                        <Link href = "/artist-spotlight">
                            <IconButton>
                                <Avatar className = "home-artist-zoom" src ={artistInfo.image} style = {{width: "400px", height: "400px", border: "10px solid #815299"}}/>
                            </IconButton>
                        </Link>
                    </Fade>
                    {!artistInViewport && <IconButton style = {{visibility: "hidden"}}>
                        <Avatar style = {{width: "400px", height: "400px", border: "10px solid black"}}/>
                    </IconButton>}
                </Grid>
            </Grid>
            <Grid container style = {{backgroundColor: "#efaf40"}}>
                <Grid item xs = {12} md = {6} style = {{backgroundImage: `url(${content.galleryImage})`, backgroundSize: "100% 100%"}} />                    
                <Grid item xs = {12} md = {6} justifyContent = "center" style = {{padding: "10px"}} >
                    <h1 className = "gallery-header">
                        Brown Gallery
                    </h1>
                    <p className = "gallery-text" ref = {appRef}>
                        {content.galleryText}
                    </p>
                    <Fade {...(appInViewport ? { timeout: 1000 } : {})}  in={appInViewport} mountOnEnter unmountOnExit>
                        <Link href = {content.galleryURL} style = {{textDecoration: 'none', display: "flex", justifyContent: "center"}}  >
                            <Button
                                variant = "contained"
                                sx={{  ':hover': {
                                    bgcolor: '#efaf40', 
                                    color: 'white'}, my: 2, color: "white", display: 'block',  textTransform: 'none', backgroundColor: "#815299", borderRadius: "20px" }}
                            >
                                Application
                            </Button>
                        </Link>
                    </Fade>
                    {!appInViewport && <Button variant = "contained" sx = {{my: 2, display: 'block', borderRadius: "20px", visibility: "hidden"}}>
                        Application
                    </Button>}
                </Grid>
            </Grid>
        </div>
        </Fade>
    )
}

export default Homepage;