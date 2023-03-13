import { createURL, grabImage } from '../sanityClient.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import {Grid, Avatar, Grow, Card, CardContent, CardMedia } from '@mui/material';


const AlumniPage = (props) => {
    const ALUMNI_URL = createURL("alumni");
    const [alumni, setAlumni] = useState([]);

    useEffect(() => {
        axios.get(ALUMNI_URL)
        .then((response) => {
            let temp = [];
            let delay = 0;
            response.data.result.forEach((a) => {
                delay = delay + 1000;
                temp.push({
                    name: a.name,
                    quote: a.quote,
                    image: grabImage(a.image.asset),
                    del: delay
                })
            }
            )
            setAlumni(temp);
        });
    }, [ALUMNI_URL]);

    console.log(alumni);

    return  (
        <div>
            <Grid container style = {{marginTop: "80px"}} spacing = {3} justifyContent = "space-evenly">
                {alumni.map((a) => {
                    return (
                        <Grow in = {alumni.length > 0} {...(alumni.length > 0 ? { timeout: a.del} : {})}>
                            <Grid  item xs = {4} >
                                <Card className = "zoom" raised style = {{justifyContent: 'center', display: 'flex', backgroundColor:  "#84c3eb90"}}>
                                    <CardContent >
                                        <CardMedia style ={{display: "flex", justifyContent: "center"}}>
                                            <Avatar  sx={{ width: 200, height:200, display: "flex", justifyContent: "center"}} src = {a.image} />
                                        </CardMedia>
                                        <h3 className = "header" >
                                            {a.name}
                                        </h3>
                                        <p className = "text" >
                                            {a.quote}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grow>
                    )
                })}
            </Grid>
        </div>
    )
}

export default AlumniPage;