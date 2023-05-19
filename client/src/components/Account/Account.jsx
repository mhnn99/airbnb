import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { Card, Typography, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { setListings, setRemoveFavs } from "../../state";
import Footer from "../Footer/Footer";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import jwt_decode from "jwt-decode";


const Account = () => {
  const [open, setOpen] = useState(false);
  const userToken = useSelector((state) => state.token);
  const message = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => ({
    user: state.user,
    token: state.token,
    mode: state.mode,
  }));
  const favorites = useSelector((state) => state.favorites);
  const listings = useSelector((state) => state.listings)
  
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

        dispatch(setListings({listings: fetchedCities.reduce((a, b) => {
          const key = b.city;
          if (a[key] == null) a[key] = [];
          a[key] = b.fav;
          return a;
        }, {})}));
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [groupedFavs]);
  console.log(listings)

  const removeFav = async (listing) => {
    const token = userToken ? userToken : null;
    if (token) {
      dispatch(setRemoveFavs({ id: listings.results[listing].id }));
      try {
        const fetchFav = await fetch(
          `http://localhost:9000/favorites/${jwt_decode(token).userId}`,
          {
            method: "PATCH",
            body: JSON.stringify({ id: listings.results[listing].id }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const res = await fetchFav.json();
        message.current = res.message;
      } catch (err) {
        message.current = err.message;
      }
      setOpen(true);
    }
  };

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
      <Stack sx={{ width: '100%', color: 'grey.500'}} spacing={2} alignItems="center">
        <CircularProgress color="inherit"/>
        <Typography align="center" variant="h4">Loading...</Typography>
      </Stack>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Box sx={{m:5}}>
           <Typography variant="h4" align="left">
            Favourite locations:
          </Typography>
          {Object.entries(listings).map(([city, value]) => (
            <div key={city}>
              <Typography variant="h4" align="center" sx={{ p: 5 }}>
                {city}
              </Typography>
              <Grid container spacing={4}>
                {value.map((location, i) => (
                  <Grid item xs={12} md={4} key={i} >
                    <Card sx={{ maxWidth: 'lg', minHeight:'15rem' }} onClick={() => navigate(`/location/${location.id}`)}>
                      <CardActionArea>
                        <Fab style={{
                          color:"#610000",
                          height: "3rem",
                          width:"3rem",
                          marginTop: "7px",
                          position: "absolute",
                          top: 1,
                          right: 10,
                          zIndex: 2,
                        }}
                        onClick={() => removeFav(i)}>
                          <HeartBrokenIcon/>
                        </Fab>
                        <CardMedia
                          component="img"
                          height="250"
                          image={location.images[0]}
                          alt="green iguana"
                          />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {location.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {location.address}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          ))}
        </Box>
      )}
      <footer>
        <Footer />
      </footer>
</>
  )}

  export default Account