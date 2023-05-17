import React, { useState, useEffect, useMemo } from "react";
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
  
  const groupedFavs = useMemo(() => {
    return favorites.flat().reduce((a, fav) => {
      const key = fav.city;
      if (a[key] == null) a[key] = [];
      a[key].push(fav.favorites);
      return a;
    }, {});
  }, [favorites]);

  const [favCities, setFavCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const fetchedCities = await Promise.all(
          Object.entries(groupedFavs).map(async ([key, value]) => {
            const response = await fetch(
              `https://airbnb13.p.rapidapi.com/search-location?location=${key}&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD`,
              {
                method: "GET",
                headers: {
                  "X-RapidAPI-Key": "f6dfa6fc95msh3ea6d12e80670ecp18a7dfjsne8f981e298ac",
                  "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
                },
              }
            );
            const data = await response.json();
            return { city: key, fav: data.results.filter((listing) => value.includes(listing.id)) };
          })
        );

        setFavCities(fetchedCities.reduce((a, b) => {
          const key = b.city;
          if (a[key] == null) a[key] = [];
          a[key] = b.fav;
          return a;
        }, {}));
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [groupedFavs]);

  return (
    <>
      <Navbar />
      <Box sx={{ m: 5 }}>
        <Typography variant="h3" align="left">
          Hello, {isLoggedIn.user.firstName}!
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
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          {Object.entries(favCities).map(([city, fav]) => (
            <div key={city}>
              <h3>{city}</h3>
              {fav.map((listing) => (
                <Card key={listing.id}>
                  {/* Render your listing card here */}
                </Card>
              ))}
            </div>
          ))}
        </div>
      )}
</>
  )}

  export default Account