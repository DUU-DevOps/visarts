import React from 'react';
import {useState, useEffect} from 'react';
import { createURL, grabImage } from '../sanityClient.js';
import axios from 'axios';
import {Grid, Avatar, Card, Typography, CardContent, CardMedia, Paper} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../../resources/artistSpotlight.css';

const ArtistSpotlight = (props) => {

    const [artistInfo, setArtistInfo] = useState({
        name: "",
        description: "",
        image: ""
    });
    const [artistImages, setArtistImages] = useState([]);
    const ARTIST_URL = createURL("artist");
    useEffect(() => {
        axios.get(ARTIST_URL)
        .then((response) => {
            let temp = response.data.result[0];
            setArtistInfo({
                name: temp.name,
                description: temp.blurb,
                image: grabImage(temp.Image.asset)
            });
            let tempArray = [];
            temp.imagesGallery.forEach((i, key) => {
                tempArray.push(grabImage(i.asset));
            });
            setArtistImages(tempArray);
        });
    }, [ARTIST_URL]);

    console.log(artistImages);
    return  (
        <div style = {{margin: 10}}>
            <Grid container  alignItems = "flex-start" justifyContent = "space-evenly" >
                <Grid style = {{margin: 10}} align = "center" item xs = {5} sx={{ fontFamily: 'monospace', backgroundColor: "#f5f3f2", padding: "10px"  }} component = {Paper}>
                    <h1 className = "header">
                        {artistInfo.name}
                    </h1>
                    <CardMedia >
                        <Avatar src = {artistInfo.image}  sx = {{width: 300, height: 300, border: "5px solid #f5f3f2", marginBottom: "20px"}}/>
                    </CardMedia>
                    <Typography  variant='subtitle1' sx={{ fontFamily: "Playfair Display, serif", align: "center", backgroundColor: "#f5f3f2"  }}>
                        {artistInfo.description}
                    </Typography>
                </Grid>
                <Grid item xs = {6} style = {{margin: 10}} >
                    <Carousel autoPlay = {true} infiniteLoop = {true}>
                        {artistImages.map((img, key) => {
                            return(
                                <div style = {{height: "700px"}} key = {key}>
                                    <img  alt = "" src = {img}/>
                                </div>  
                            )
                        })}
                    </Carousel>
                </Grid>
            </Grid>
        </div>
    )
}

export default ArtistSpotlight;