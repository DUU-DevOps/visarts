import React from 'react';
import {useState, useEffect } from 'react';
import { createURL, grabImage } from '../sanityClient.js';
import axios from 'axios';
import {Grid, Avatar, Grow, Card, CardActionArea, CardMedia, CardContent} from '@mui/material';
import '../../resources/artistSpotlight.css';
import Spotlight from './Spotlight.js';

const ArtistSpotlight = (props) => {

    const [selected, setSelected] = useState(null);
    const [artists, setArtists] = useState([]);
    const ARTIST_URL = createURL("artist");

    useEffect(() => {
        axios.get(ARTIST_URL)
        .then((response) => {
            console.log(response.data.result)
            let temp = [];
            response.data.result.forEach((a, id) => {
                let socials = [];
                console.log(a)
                a.socialLinks.forEach((link) => {
                    socials.push({
                        type: link.type,
                        url: link.url
                    })
                })
                let images = [];
                a.imagesGallery.forEach((i, key) => {
                    images.push(
                        {
                            key: key,
                            image: grabImage(i.image.asset),
                            blurb: i.blurb,
                            title: i.title
                        }
                        );
                });
                temp.push({
                    name: a.name,
                    description: a.blurb,
                    image: grabImage(a.Image.asset),
                    socials: socials,
                    images: images
                })
            }
            )
            setArtists(temp);
        });
    }, [ARTIST_URL]);

    const updateSelected = (person) => {
        setSelected(person);
    }

    if (selected){
        return  (
            <Spotlight artist = {selected} />
            )
    }
    else {
        return (
            <div style={{padding: '1rem'}}>
                <Grid container spacing = {3} justifyContent = "space-evenly" alignItems="center">
                        {artists.map((a) => {
                            if (true) {
                                return (
                                    <Grow in = {artists.length > 0} {...(artists.length > 0 ? { timeout: 1000} : {})} >
                                        <Grid item xs = {6} sm = {4} md = {3} lg = {3}>
                                            <Card>
                                                <CardActionArea onClick={() => updateSelected(a)}>
                                                <CardMedia
                                                component="img"
                                                image={a.image} 
                                                height={400}
                                                />
                                                </CardActionArea>
                                                <CardContent>
                                                    <h2 className = "header" style={{margin: 0}}>
                                                        {a.name}
                                                    </h2>
                                                    <p className = "header" style={{margin: 0, fontStyle: 'italic'}}>
                                                        {a.title}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grow>
                                )
                            }
                            return null;
                        })}
                    </Grid>
            </div>
        )
    }
}

export default ArtistSpotlight;