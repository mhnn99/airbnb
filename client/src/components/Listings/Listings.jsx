import { Grid, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListings, setFavorites } from "../../state";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { Button } from "@material-ui/core";
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Listings = () => {
  const dispatch = useDispatch();
  const { city } = useParams();
  const navigate = useNavigate();
  const listings = useSelector((state) => state.listings);
  // const favorites = useSelector((state) => state.favorites)
  const [favorites, setFavorites] = useState([])
  const [open,setOpen] = useState(false)
  const [added,setAdded] = useState(false)
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const [removed, setRemoved] = useState(false)

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const addToFav = (listing) => {
    if(!favorites.includes(listings.results[listing].id)){
    setFavorites([...favorites, listings.results[listing].id]);
    setOpen(true)
    setAdded(true)    
    }else{
      setOpen(true)
      setAlreadyAdded(true)
      console.log(listings.results[listing].id)
      console.log(favorites)
      
    }
  };
  
  const removeToFav = (listing) => {
    setFavorites(favorites => favorites.filter(fav => fav !== listings.results[listing].id));
    setOpen(true)
    setRemoved(true) 
    console.log(listing)
    console.log(favorites)
  };

  const setAllFalse = () =>{
    setOpen(false)
    setAdded(false)
    setAlreadyAdded(false)
    setRemoved(false)
  }
  const actions = [
    { icon: <HeartBrokenIcon />, name: "Remove from Favorites" },
    { icon: <FavoriteIcon />, name: "Add to Favorites" },
  ];
  useEffect(() => {
    const fetchListings = async () => {
      const url = `https://airbnb13.p.rapidapi.com/search-location?location=${city}&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "f6dfa6fc95msh3ea6d12e80670ecp18a7dfjsne8f981e298ac",
          "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        dispatch(setListings({ listings: result }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchListings();
  }, [city, dispatch]);
  console.log(listings);
  return (
    <>
      {listings.results?.length > 0 ? (
  <>
    <h1>
      {city.split("%20").join(" ").split("%2C").join(",")}, found{" "}
      {listings.results?.length} properties
    </h1>
    <Box
      sx={{
        p: 2,
        maxWidth: "lg",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Grid container spacing={4}>
        {listings.results.map((listing, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card >
              <Box sx={{ position: "relative" }}>
                <img
                  src={listing.hostThumbnail}
                  alt="thumbnail"
                  style={{
                    height: "3rem",
                    borderRadius: "2rem",
                    marginTop: "7px",
                    position: "absolute",
                    top: 10,
                    left: 10,
                    zIndex: 2,
                  }}
                ></img>
                <SpeedDial
                  ariaLabel="SpeedDial basic example"
                  sx={{ position: "absolute", bottom: 16, right: 16 }}
                  icon={<SpeedDialIcon />}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={
                        action.name === "Add to Favorites"
                          ? (() => {addToFav(i)})
                          : (() => {removeToFav(i)})
                      }
                    />
                  ))}
                  {open && added && <Snackbar open={open} autoHideDuration={600} onClose={()=>setAllFalse()}>
                          <Alert  severity='success' sx={{ width: '100%' }}>
                            Location added to favorites!
                          </Alert>
                        </Snackbar>}
                  {open && alreadyAdded && <Snackbar open={open} autoHideDuration={600} onClose={()=>setAllFalse()}>
                      <Alert  severity='warning' sx={{ width: '100%' }}>
                        Location already added to favorites!
                      </Alert>
                    </Snackbar>}
                  {open && removed && <Snackbar open={open} autoHideDuration={600} onClose={()=>setAllFalse()}>
                      <Alert  severity='error' sx={{ width: '100%' }}>
                        Location removed from favorites!
                      </Alert>
                    </Snackbar>}
                </SpeedDial>
                <CardMedia
                  sx={{ height: 200, position: "relative" }}
                  component="img"
                  alt="City"
                  image={listing.images[0]}
                />
              </Box>
              <CardContent sx={{ minHeight: 200, position: "relative" }}>
                {listing.name}
                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Rating
                    name="read-only"
                    value={listing?.rating}
                    readOnly
                  />
                  <Typography
                    fontSize="14px"
                    color="primary"
                    marginTop="4px"
                  >
                    {listing.reviewsCount} reviews
                  </Typography>
                </Box>
                {listing?.isSuperhost && (
                  <Box sx={{ display: "flex" }}>
                    <HowToRegIcon sx={{ marginTop: "12px" }} />{" "}
                    <Typography
                      sx={{ marginLeft: "12px", marginTop: "12px" }}
                    >
                      Superhost
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 6,
                    position: "absolute",
                    top: 110,
                    left: 19,
                    right: 19,
                  }}
                >
                  <Typography color="primary">
                    {listing.price.total} {listing.price.currency} per night
                  </Typography>
                  <Button variant="contained" onClick={() => navigate(`/location/${listing.id}`)}>Check availability</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  </>
) : (
  <Typography>No results found</Typography>
)}
    </>
  );
};

export default Listings;
