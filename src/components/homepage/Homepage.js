import React from 'react';
import {Grid, Avatar} from '@mui/material';
import  '../../resources/homepage.css';
import { createURL, grabImage } from '../sanityClient.js';
import axios from 'axios';
import { useEffect, useState } from 'react'

const Homepage = (props) => {
    const [content, setContent] = useState({});
    const HOMEPAGE_URL = createURL("homepage");
    useEffect(() => {
        axios.get(HOMEPAGE_URL)
        .then((response) => {
            console.log(response);
            setContent({
                statement: response.data.result[0].statement,
                image: grabImage(response.data.result[0].image.asset)
            })
        });
    }, [HOMEPAGE_URL]);
    console.log(content);
    return  (
        <div > 
            <Grid container justifyContent="center">
                <Grid item xs = {12} justifyContent= "center">
                    <div style = {{position: "relative", backgroundImage: `url(${content.image})`, backgroundSize: "100% 100%", width: "100%", height: "640px"}}>
                        <div style = {{width: "600px", height: "300px", backgroundColor: "#89c3db", position: "absolute", marginTop: 250}}>
                            <Grid container style = {{marginTop: "3%", marginLeft: "3%"}}>
                                <Grid item xs = {5}>
                                    <Avatar variant = "square" style = {{width: "250px", height: "250px",  borderRadius: "40px"}} src ={require("../../resources/logo.png")}/>
                                </Grid>
                                <Grid item xs ={6} >
                                    <div className = "statement" style = {{marginTop: 50}}>
                                        <h1 style = {{fontSize: "22px"}} >Experience the world through <em>your</em> art. </h1>
                                        <p>{content.statement}</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Grid> 
            </Grid>
        </div>
    )
}

export default Homepage;