import React from 'react';
import {Grid, Avatar, Box, Link, IconButton} from '@mui/material';
import  '../../resources/homepage.css';
import { createURL, grabImage } from '../sanityClient.js';
import axios from 'axios';
import { useEffect, useState } from 'react'

const Homepage = (props) => {
    const [artistInfo, setArtistInfo] = useState({});
    const [content, setContent] = useState({});
    const HOMEPAGE_URL = createURL("homepage");
    const ARTIST_URL = createURL("artist");
    useEffect(() => {
        axios.get(ARTIST_URL)
        .then((response) => {
            setArtistInfo({
                name: response.data.result[0].name.split(' ')[0],
                image: grabImage(response.data.result[0].Image.asset)
            })
        });
    }, [ARTIST_URL]);
    useEffect(() => {
        axios.get(HOMEPAGE_URL)
        .then((response) => {
            setContent({
                statement: response.data.result[0].statement,
                image: grabImage(response.data.result[0].image.asset)
            })
        });
    }, [HOMEPAGE_URL]);
    console.log(artistInfo);
    return  (
        <div > 
            <Grid container justifyContent = "flex-start"  alignItems = "center" style = {{position: "relative", backgroundImage: `url(${content.image})`, backgroundSize: "100% 100%", width: "100%", height: "640px"}}>
                <Grid item xs = {12} md = {6} style = {{ backgroundColor: "#89c3db", position: "absolute"}}>
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
                        <Grid item xs ={12} md  = {6}>
                            <div>
                                <h1 className = "home-statement-header" style = {{fontSize: "22px"}} >Experience the world through <em>your</em> art. </h1>
                                <p className = "home-statement-text">{content.statement}</p>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing = {3} justifyContent = "space-between" style = {{ backgroundColor: "#ffffff", padding: '40px'}}>
                <Grid item xs = {12} md = {6} className = "spotlight-text" alignItems = "center" display = "flex">
                    <span>Check out <span className = "underline-magical">{artistInfo.name}'s</span> work.</span>
                </Grid>
                <Grid item xs = {12} md = {5} >
                    <Link href = "/artist-spotlight">
                        <IconButton>
                            <Avatar className = "home-artist-zoom" src ={artistInfo.image} style = {{width: "400px", height: "400px", border: "10px solid #815299"}}/>
                        </IconButton>
                    </Link>
                </Grid>
            </Grid>
            <div style = {{position: "relative", backgroundColor: "#efaf40", width: "100%", height: "300px"}}>

            </div>
        </div>
    )
}

export default Homepage;