import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { Card, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const Account = () => {
  const isLoggedIn = useSelector((state) => ({
    user: state.user,
    token: state.token,
    mode: state.mode,
  }));

  return (
    <>
      <Navbar />
      <Box sx={{width:'100%', maxWidth:'2000'}}>
        <Typography variant="h3"
        align="left"
        sx={{m:5}}>
          Hello, {isLoggedIn.user.firstName} !
        </Typography>
        
      </Box>
    </>
  );
};

export default Account;
