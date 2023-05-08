import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { Card, Typography, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Account = () => {
  const isLoggedIn = useSelector((state) => ({
    user: state.user,
    token: state.token,
    mode: state.mode,
  }));
  

  return (
    <>
      <Navbar />
      <Box sx={{ m:5}}>
        <Typography variant="h3"
        align="left">
          Hello, {isLoggedIn.user.firstName} !
        </Typography>
        <Grid item xs={12} sm={6}>
        <TextField
          disabled
          id="outlined-disabled"
          label="Email address"
          defaultValue={isLoggedIn.user.email}
          sx={{mt:5, minWidth:"20rem"}}
        />
        </Grid>  
        <Grid item xs={12} sm={6}>
        <TextField
          id="outlined-password-input"
          label="Change Password"
          type="password"
          autoComplete="current-password"
          sx={{mt:5, minWidth:"20rem"}}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          sx={{mt:5, minWidth:"20rem"}}
        />
        </Grid> 
        <Button sx={{mt:5}}variant="outlined">Change Password</Button>    
      </Box>
    </>
  );
};

export default Account;
