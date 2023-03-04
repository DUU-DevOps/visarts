import React from 'react';
import {useState, useEffect} from 'react';
import { createURL, grabImage } from '../sanityClient.js';
import axios from 'axios';
import {Grid,  Typography, Fade} from '@mui/material';
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
        <div style = {{marginTop: 70, marginLeft: 10, marginRight: 10}}>
            <Fade {...(artistInfo.name !== "" ? { timeout: 1000 } : {})}  in={artistInfo.name !== ""} mountOnEnter unmountOnExit>
            <Grid container  alignItems = "flex-start" justifyContent = "space-between" >
                    <Grid style = {{margin: 10}} align = "center" item xs = {12} md = {5} sx={{  padding: "10px" }} >                       
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style = {{ marginBottom: -100, transform: "scale(1.1)",}} className = "filter" >
                            <defs>
                                <clipPath id="user-space" clipPathUnits="userSpaceOnUse" >
                                    <path  id = "curve" fill="#FF0066" d="M42.9,-61.4C56.4,-58.2,68.7,-47.5,77,-33.8C85.3,-20.1,89.6,-3.3,81.4,7.4C73.1,18.1,52.3,22.6,39,28.5C25.7,34.3,19.9,41.4,11.9,46.4C3.9,51.5,-6.5,54.5,-17.4,53.8C-28.4,53.2,-39.8,48.8,-47.6,40.7C-55.3,32.7,-59.4,20.9,-65.4,6.8C-71.4,-7.2,-79.4,-23.6,-72.7,-31C-65.9,-38.4,-44.3,-37,-29.8,-39.7C-15.2,-42.4,-7.6,-49.3,3.6,-54.8C14.7,-60.4,29.5,-64.6,42.9,-61.4Z" transform="translate(100 100)" />
                                </clipPath>
                            </defs>
                            <text x="320" dy = "-10" >
                            <textPath xlinkHref="#curve" className = "artist-header" >
                                    {artistInfo.name}
                            </textPath>
                            </text>
                            <image width="100%" height="100%"  xlinkHref= {artistInfo.image} clipPath= "url(#user-space)"/>
                        </svg>

                        <Typography className = "artist-description" sx={{  textAlign: "left", padding: '10px', borderRadius: '10px'  }}>
                        {artistInfo.description}
                        </Typography>

                    </Grid>
                <Grid item xs = {12} md = {6} style = {{margin: 10}} >
                <Carousel autoPlay = {true} infiniteLoop = {true} >
                        {artistImages.map((img, key) => {
                            return(
                                <div className = "zoom" style = {{height: "700px"}} key = {key}>
                                    <img  alt = "" src = {img}/>
                                </div>  
                            )
                        })}
                    </Carousel>
                </Grid>
            </Grid>
            </Fade>
        </div>
    )
}

export default ArtistSpotlight;