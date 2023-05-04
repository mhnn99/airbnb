import { setCities } from "../../state";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Box, Grid, TextField, Button, useTheme } from "@mui/material";


const CatList = () => {
const dispatch = useDispatch()
const cities = useSelector(state=>({cities:state.cities,initialArr:state.initialArr}))
  const theme = useTheme();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await Promise.all(
          cities.initialArr.map((url) =>
            fetch(`https://api.pexels.com/v1/search?query=${url}`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: "aA1vysRzOWAkW94xcM7VMp4wSdm2kKGZEr0vRfpmZZM924kjhIK4G2i5",
              },
            }).then((res) => res.json())
          )
        );
        dispatch(setCities({cities : response}));
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchCities();
  }, [dispatch]);

  return (
    <>
      <Box sx={{ p: 2, maxWidth: "lg", marginLeft: "auto", marginRight: "auto" }}>
        <Grid container spacing={4}>
          {cities.cities.length && cities.cities.map((city, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardMedia
                  sx={{ height: 200 }}
                  component="img"
                  alt="City"
                  image={city.photos[0].src.original}
                />
                <CardContent>{cities.initialArr[index]}</CardContent>
              </Card>
              <div className="card">
    <div class="imgbox">
        <div class="img"></div>
    </div>
    <div class="details">
        <h2 class="title">John Doe</h2>
        <span class="caption">Developer</span>
    </div>
</div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default CatList;
