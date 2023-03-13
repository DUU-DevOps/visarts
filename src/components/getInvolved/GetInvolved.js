import React from 'react';
import {useState, useEffect } from 'react';
import { createURL, grabImage } from '../sanityClient.js';
import axios from 'axios';
import {Grid,  Fade, Link,  Avatar, CardContent, CardMedia, Button, Grow } from '@mui/material';
import '../../resources/getInvolved.css';




const GetInvolved = (props) => {
    const PAGE_URL = createURL("getInvolved");
    const [content, setContent] = useState({
        message: "",
        contacts: []
    });

    useEffect(() => {
        axios.get(PAGE_URL)
        .then((response) => {
            let temp = response.data.result[0];
            let arr = [];
            let delay = 0;
            temp.contactLinks.forEach((link) => {
                delay =  delay + 500;
                arr.push({
                    name: link.name,
                    url: link.url,
                    icon: grabImage(link.icon),
                    button: link.buttonTitle,
                    copy: link.clickCopy,
                    del: delay
                })
            })
            setContent({
                message: temp.message,
                image: grabImage(temp.image.asset),
                contacts: arr
            });
        });
    }, [PAGE_URL]);

    console.log(content);

    
    return  (
        <Fade {...(content.message !== "" ? { timeout: 1000 } : {})}  in={content.message !== ""}>
            <div style = {{marginTop: "70px" }}>
                <Grid container justifyContent = "space-evenly" alignItems = "center" style = {{padding: "10px", backgroundColor: "#84c3eb90"}}>
                    <Grid item xs = {12} sm = {5} style = {{ padding: "20px"}}>
                        <h1 className = "header">Join us!</h1>
                        <p className = "text">{content.message}</p>
                    </Grid>
                    <Grid item xs = {12} sm = {6} >
                        <img  alt = "get involved pic" src = {content.image} />
                    </Grid>
                </Grid>
                <Grid container justifyContent = "space-evenly" style = {{marginTop: "20px", marginBottom: "10px"}}>
                    {content.contacts.map((c) => {
                        return (
                            <Grow in = {content.contacts.length > 0} {...(content.contacts.length > 0 ? { timeout: c.del} : {})}>
                                <Grid item xs = {12} sm = {3}  style = {{justifyContent: 'center', display: 'flex'}} >
                                        <CardContent>
                                            <CardMedia>
                                                <Avatar className = "zoom" sx={{ width: 200, height:200, display: "flex", justifyContent: "center"}} src = {c.icon} />
                                            </CardMedia>
                                            <h3 className = "header">
                                                {c.name}
                                            </h3>
                                            <Link to = {c.url} style = {{textDecoration: 'none', display: "flex", justifyContent: "center"}}  >
                                                <Button
                                                    variant = "contained"
                                                    sx={{  ':hover': {
                                                        bgcolor: '#efaf40', 
                                                        color: 'white'}, my: 2, color: "white", display: 'block',  textTransform: 'none', backgroundColor: "#815299", borderRadius: "20px" }}
                                                        onClick={() => {c.copy ? navigator.clipboard.writeText(c.url): console.log("")}} className = "text"
                                                >
                                                    {c.button}
                                                </Button>
                                            </Link>
                                        </CardContent>
                                </Grid>
                            </Grow>
                        )
                    })}
                </Grid>
            </div>
        </Fade>
    )
}

export default GetInvolved;