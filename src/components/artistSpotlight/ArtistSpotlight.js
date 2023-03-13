import React from 'react';
import {useState, useEffect } from 'react';
import { createURL, grabImage } from '../sanityClient.js';
import axios from 'axios';
import {Grid, Fade, Slide, Link, IconButton, Avatar} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../../resources/artistSpotlight.css';
import FacebookIcon from '../../resources/facebook.png';
import PinterestIcon from '../../resources/pinterest.png';
import InstagramIcon from '../../resources/instagram.webp';
import TwitterIcon from '../../resources/twitter.png';

const ArtistSpotlight = (props) => {

    const [artistInfo, setArtistInfo] = useState({
        name: "",
        description: "",
        image: "",
        socials: []
    });
    const [artistImages, setArtistImages] = useState([]);
    const [imageIndex, setImageIndex] = useState(0);
    const ARTIST_URL = createURL("artist");

    useEffect(() => {
        axios.get(ARTIST_URL)
        .then((response) => {
            let temp = response.data.result[0];
            let arr = [];
            temp.socialLinks.forEach((link) => {
                arr.push({
                    type: link.type,
                    url: link.url
                })
            })
            setArtistInfo({
                name: temp.name,
                description: temp.blurb,
                image: grabImage(temp.Image.asset),
                socials: arr
            });
            let tempArray = [];
            temp.imagesGallery.forEach((i, key) => {
                tempArray.push(
                    {
                        key: key,
                        image: grabImage(i.image.asset),
                        blurb: i.blurb,
                        title: i.title
                    }
                    );
            });
            setArtistImages(tempArray);
        });
    }, [ARTIST_URL]);
    console.log(artistImages);
    return  (
        <Fade {...(artistInfo.name !== "" ? { timeout: 1000 } : {})}  in={artistInfo.name !== ""}>
        <div style = {{padding: "20px", backgroundColor: "white"}}>
            <h1 className = "spotlight-header" style = {{marginTop: "60px", marginBottom: "60px"}}>
                Artist Spotlight
            </h1>
            <Grid container  alignItems = "center" justifyContent = "space-between" style = {{backgroundColor: "#efaf4190", padding: "10px", marginTop: "-20px"}} >
                <Grid  align = "center" item xs = {12} md = {5} >                       
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style = {{ transform: "scale(1.1)", filter: "drop-shadow(10px 10px 2px #ffffffa0)"}} className = "filter" >
                        <defs style = {{border: "10px solid black"}}>
                            <clipPath id="user-space" clipPathUnits="userSpaceOnUse" >
                                <path  id = "curve"  fill="#FF0066" d="M42.9,-61.4C56.4,-58.2,68.7,-47.5,77,-33.8C85.3,-20.1,89.6,-3.3,81.4,7.4C73.1,18.1,52.3,22.6,39,28.5C25.7,34.3,19.9,41.4,11.9,46.4C3.9,51.5,-6.5,54.5,-17.4,53.8C-28.4,53.2,-39.8,48.8,-47.6,40.7C-55.3,32.7,-59.4,20.9,-65.4,6.8C-71.4,-7.2,-79.4,-23.6,-72.7,-31C-65.9,-38.4,-44.3,-37,-29.8,-39.7C-15.2,-42.4,-7.6,-49.3,3.6,-54.8C14.7,-60.4,29.5,-64.6,42.9,-61.4Z" transform="translate(90 100)" />
                            </clipPath>
                        </defs>
                        <image width="100%" height="100%"  xlinkHref= {artistInfo.image} clipPath= "url(#user-space)"/>
                    </svg>
                </Grid>
                <Grid item xs = {12} md = {6} style = {{padding: "20px"}}>
                    <h1 className = "artist-header">
                        {artistInfo.name}
                    </h1>
                    <p className = "artist-description" >
                    {artistInfo.description}
                    </p>
                    <Grid item xs = {12} sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex', gap: '20px' }}} justifyContent = "center">
                        <Slide direction = "left"  {...(artistInfo.name !== ""  ? { timeout: 1000 } : {})}  in={artistInfo.name !== "" } checked = {artistInfo.name !== "" } mountOnEnter unmountOnExit>
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
                                            <Avatar src = {image} style = {{backgroundColor: "white"}}/>
                                        </IconButton>
                                    </Link>
                                )
                            })}
                            </div>
                        </Slide>
                            {!(artistInfo.name !== "")  && <div style = {{visibility: "hidden"}}>
                                <IconButton>
                                    <Avatar/>
                                </IconButton>
                            </div>}
                        </Grid>
                </Grid>
            </Grid>
            <p align = "left">
                <em>
                    Check out their gallery. You can swipe through and read about their work below.
                </em>
                <div style = {{backgroundColor: "#efaf40", width: "60px", height: "3px"}}/>
            </p>
            <Grid container style = {{backgroundColor: "white", marginTop: "200px"}} spacing = {3} justifyContent = "center">
                <Grid item xs = {12} md = {5} style = {{display: "flex", alignItems: "center",  backgroundColor: "#84c3eb90", paddingLeft: "20px", paddingRight: "20px"}}>
                    {artistImages.find(i => i.key === imageIndex) &&
                    <div>
                    <h1 className = "gallery-header">
                        {artistImages.find(i => i.key === imageIndex).title}
                    </h1>
                    <p className = "gallery-text">
                        {artistImages.find(i => i.key === imageIndex).blurb}
                    </p>
                    </ div>
                        }
                </Grid>
                <Grid item xs = {12} md = {6} style = {{display: "flex", justifyContent: "flex-end"}}>
                    <div style = {{maxHeight: "500px", maxWidth: "500px"}}>
                        <Carousel  infiniteLoop = {true}  onChange = {(i) => {setImageIndex(i)}} >
                            {artistImages.map((img, key) => {
                                return(
                                    <div className = "zoom"  key = {key} >
                                        <img  style = {{ marginTop: 'auto', marginBottom: 'auto'}} alt = "" src = {img.image}/>
                                    </div>  
                                )
                            })}
                        </Carousel>
                    </div>
                </Grid>
                
            </Grid>
        </div>
        </Fade>
    )
}

export default ArtistSpotlight;