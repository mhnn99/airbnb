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
  const favorites = useSelector((state) => state.favorites);
  const groupedFavs = favorites.flat().reduce((a, fav) => {
    const key = fav.city;
    if (a[key] == null) a[key] = [];
    a[key].push(fav.favorites);
    return a;
  }, {});
  useEffect(() => {
    const fetchCities = async () => {
      const favCities = await Promise.all(
        Object.keys(groupedFavs).map(async (url) => {
          const response = await fetch(
            `https://airbnb13.p.rapidapi.com/search-location?location=${url}&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD`,
            {
              method: "GET",
              headers: {
                "X-RapidAPI-Key": "f6dfa6fc95msh3ea6d12e80670ecp18a7dfjsne8f981e298ac",
                "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
              },
            }
          );
          const data = await response.json();
          return { [url]: data.results }; // Append the `url` to the response data
        })
      );
      console.log(favCities);
    };
    fetchCities();
  }, [groupedFavs]);
  
  console.log(groupedFavs);
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
