import React from 'react';
import {useState, useEffect} from 'react';
import { createURL, grabImage } from '../sanityClient.js';
import axios from 'axios';
import {Grid, Avatar, Card, Typography, CardContent} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';



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
        <Grid container>
            <Grid item xs = {6} component = {Card} raised>
                <Avatar src ={artistInfo.image} />
                <CardContent>
                    {artistInfo.name}
                </CardContent>
            </Grid>
            <Grid item xs = {6}  >
                <Carousel autoPlay = {true} infiniteLoop = {true}>
                    {artistImages.map((img, key) => {
                        return(
                            <div  key = {key}>
                                <img style = {{height: "500px", width: "500px"}} alt = "" src = {img}/>
                            </div>  
                        )
                    })}
                 </Carousel>
            </Grid>
            {/* <Grid item xs = {12} component = {Card} raised>

            </Grid> */}
        </Grid>
    )
}

export default ArtistSpotlight;