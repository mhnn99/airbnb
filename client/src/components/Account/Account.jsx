import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { Card, Typography, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


const Account = () => {
  const isLoggedIn = useSelector((state) => ({
    user: state.user,
    token: state.token,
    mode: state.mode,
  }));
const favorites = useSelector(state=>state.favorites)
const groupedFavs = favorites.reduce((a,fav)=>{
  const key = fav.city 
  if(a[key]==null)a[key]=[]
  a[key].push(fav.favorites)
  return a
},{})
useEffect(()=>{
  
})
console.log(groupedFavs)
  return (
    <>
      <Navbar />
      <Box sx={{ m: 5 }}>
        <Typography variant="h3" align="left">
          Hello, {isLoggedIn.user.firstName} !
        </Typography>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            id="outlined-disabled"
            label="Email address"
            defaultValue={isLoggedIn.user.email}
            sx={{ mt: 5, minWidth: "20rem" }}
          />
        </Grid>
      </Box>
    </>
  );
};

export default Account;
