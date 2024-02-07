import { createURL, grabImage } from '../sanityClient.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import {Grid, Avatar, Grow, Button, Accordion, AccordionSummary, AccordionDetails, Card, CardActionArea } from '@mui/material';
import '../../resources/meetus.css';



const paths = [
    "M38.1,-63.3C50.6,-58.7,62.9,-51.1,67.1,-40C71.2,-28.9,67.3,-14.5,68.6,0.8C70,16,76.6,32,72.6,43.3C68.5,54.6,53.8,61.1,39.9,67.4C26,73.7,13,79.8,-0.5,80.7C-14,81.5,-28,77.1,-42.3,71.1C-56.6,65,-71.3,57.3,-80.5,45.2C-89.6,33.1,-93.2,16.6,-90.1,1.8C-86.9,-12.9,-76.9,-25.8,-65.7,-34.3C-54.5,-42.8,-42,-46.9,-30.8,-52.3C-19.7,-57.6,-9.8,-64.1,1.5,-66.7C12.8,-69.2,25.6,-67.8,38.1,-63.3Z",
    "M36,-60C45.9,-56.7,52.6,-45.5,61.9,-34.1C71.2,-22.8,83.2,-11.4,87.5,2.5C91.7,16.3,88.3,32.6,77.5,41.4C66.7,50.2,48.5,51.5,34.4,56.8C20.3,62.1,10.1,71.4,-0.5,72.3C-11.2,73.3,-22.4,65.7,-36.7,60.5C-51,55.3,-68.4,52.5,-72,42.8C-75.6,33.1,-65.4,16.5,-63.1,1.4C-60.7,-13.8,-66.2,-27.6,-63.2,-38.3C-60.1,-48.9,-48.5,-56.5,-36.6,-58.5C-24.6,-60.6,-12.3,-57.3,0.4,-57.9C13.1,-58.6,26.2,-63.3,36,-60Z",
    "M35,-62.5C46.5,-54,57.7,-46.9,66.1,-36.7C74.5,-26.5,80.2,-13.3,81,0.5C81.9,14.2,77.9,28.4,71.4,42C64.9,55.5,55.8,68.3,43.5,73.1C31.2,77.9,15.6,74.7,-0.2,75C-16,75.3,-31.9,79.1,-43.5,73.9C-55.1,68.7,-62.4,54.4,-69.4,40.6C-76.4,26.8,-83.3,13.4,-82.1,0.7C-80.9,-12.1,-71.8,-24.1,-62.8,-34.5C-53.7,-44.8,-44.8,-53.5,-34.4,-62.6C-23.9,-71.7,-12,-81.3,-0.1,-81.1C11.8,-80.9,23.5,-71,35,-62.5Z"
]


const colors = [
    "#4287f5",
    "#32a852",
    "#fcba03",
    "#eb4034"
]




const MeetUs = (props) => {
    const PEOPLE_URL = createURL("people");
    const [people, setPeople] = useState([]);
    const [selected, setSelected] = useState(null);
    const [path, setPath] = useState(paths[0]);
    const [color, setColor] = useState(colors[0]);
    const [expanded, setExpanded] = useState(false);


    const scrollToBottom = () => {
        window.scrollTo({  top: document.body.scrollHeight, behavior: 'smooth' });
      };


    const updatePath = () => {
        setPath(paths[Math.floor(Math.random() * paths.length)]);
    }

    
    const updateColor = () => {
        setColor(colors[Math.floor(Math.random() * colors.length)]);
    }


    const updateSelected = (person) => {
        setExpanded(true);
        setSelected(person);
        updatePath();
        updateColor();
        if (expanded){
            scrollToBottom();
        }
        else{
            setTimeout(() => {
                scrollToBottom();
            }, 400);
        }
    }

    const goBack = () => { 
        setSelected(null);
        setExpanded(false);
    }

    useEffect(() => {
        axios.get(PEOPLE_URL)
        .then((response) => {
            let temp = [];
            response.data.result.forEach((a, id) => {
                temp.push({
                    id: id,
                    name: a.name,
                    title: a.title,
                    image: grabImage(a.image.asset),
                    bio: a.bio,
                })
            }
            )
            setPeople(temp);
        });
    }, [PEOPLE_URL]);
    console.log(people);

    return  (
        <div style={{padding: '1rem'}}>
            <div >
                <h1 className='page-header'>
                    Meet Us
                </h1>
            </div>
            <Accordion  expanded={expanded} 
sx={{backgroundColor: "transparent", "border": 'none', padding: '1rem', '& .MuiAccordion-root:hover, .MuiButtonBase-root:hover': {
                cursor: 'default'}}}>
                <AccordionSummary  onClick={(e) => e.stopPropagation()} >
                    <Grid container spacing = {3} justifyContent = "space-evenly" >
                        {people.map((a) => {
                            if (true) {
                                return (
                                    <Grow in = {people.length > 0} {...(people.length > 0 ? { timeout: 1000} : {})} >
                                        <Grid item xs = {6} sm = {4} md = {3} lg = {3}>
                                                    <div style = {{display: "flex", justifyContent: "center"}}>
                                                        <Card>
                                                            <CardActionArea onClick={() => updateSelected(a)} style={{cursor: 'pointer'}}>
                                                                <Avatar variant = "square" sx={{ width: 200, height:200}} src = {a.image} />
                                                            </CardActionArea>
                                                        </Card>
                                                    </div>
                                                    <h2 className = "header" style={{margin: 0}}>
                                                        {a.name}
                                                    </h2>
                                                    <p className = "header" style={{margin: 0, fontStyle: 'italic'}}>
                                                        {a.title}
                                                    </p>
                                        </Grid>
                                    </Grow>
                                )
                            }
                            return null;
                        })}
                    </Grid>
                </AccordionSummary>
                <AccordionDetails 
>
                    <Grid container justifyContent="space-evenly" alignItems='center' style={{padding: '1rem'}}>
                        <Grid item xs = {12} md ={6} style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                            <div>
                                <div style={{display: 'flex', justifyContent: 'center',height: '40rem'}}>
                                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style = {{ transform: "scale(1.1)", filter: `drop-shadow(10px 10px 2px ${color})`}} className = "filter" >
                                        <defs style = {{border: "10px solid black"}}>
                                            <clipPath id="user-space" clipPathUnits="userSpaceOnUse" >
                                                <path  id = "curve"  fill={color} d={path} transform="translate(90 100)" />
                                            </clipPath>
                                        </defs>
                                        <image width="100%" height="100%"  xlinkHref= {selected?.image} clipPath= "url(#user-space)"/>
                                    </svg>                                
                                </div>
                                <h2 className = "header" style={{margin: 0}}>
                                        {selected?.name}
                                </h2>
                                <p className = "header" style={{margin: 0, fontStyle: 'italic'}}>
                                    {selected?.title}
                                </p>
                            </div>
                            
                        </Grid>
                        <Grid item xs = {12} md ={6} style={{padding: '3rem', borderRadius: '2rem'}}>
                            <div className='bio-text'>
                                {selected?.bio}
                            </div>
                        </Grid>
                    </Grid>
                    <div style={{marginTop: "2rem"}}>
                        <Button variant="contained" style={{backgroundColor: `${color}f0`, fontFamily: 'Open Sans'}} onClick = {goBack}>
                            Go Back
                        </Button>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default MeetUs;