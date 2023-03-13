import { createURL, grabImage } from '../sanityClient.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import {Grid, Avatar, Grow } from '@mui/material';


const MeetUs = (props) => {
    const PEOPLE_URL = createURL("people");
    const [people, setPeople] = useState([]);

    useEffect(() => {
        axios.get(PEOPLE_URL)
        .then((response) => {
            let temp = [];
            let delay = 0;
            response.data.result.forEach((a) => {
                delay = delay + 1000;
                temp.push({
                    name: a.name,
                    title: a.title,
                    image: grabImage(a.image.asset),
                    del: delay
                })
            }
            )
            setPeople(temp);
        });
    }, [PEOPLE_URL]);


    return  (
        <div>
            <Grid container style = {{marginTop: "80px"}} spacing = {3} justifyContent = "space-evenly">
                {people.map((a) => {
                    return (
                        <Grow in = {people.length > 0} {...(people.length > 0 ? { timeout: a.del} : {})} >
                            <Grid  item xs = {4} >
                                <div style = {{display: "flex", justifyContent: "center"}}>
                                    <Avatar variant = "square" sx={{ width: 300, height:300}} src = {a.image} />
                                </div>
                                <h3 className = "header" >
                                    {a.title} 
                                    <br />
                                    {a.name}
                                </h3>
                            </Grid>
                        </Grow>
                    )
                })}
            </Grid>
        </div>
    )
}

export default MeetUs;