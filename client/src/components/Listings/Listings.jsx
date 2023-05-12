import { Grid, Box, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListings, setFavorites, setRemoveFavs } from "../../state";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { Button } from "@material-ui/core";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Listings = () => {
  const dispatch = useDispatch();
  const { city } = useParams();
  const navigate = useNavigate();
  const listings = useSelector((state) => state.listings);
  const favorites = useSelector((state) => state.favorites);
  const message = useRef("");
  const [open, setOpen] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const addToFav = (listing) => {
    if (
      !favorites.find(
        (fav) => fav.favorites.id === listings.results[listing].id
      )
    ) {
      dispatch(
        setFavorites({ city: city, favorites: listings.results[listing] })
      );
      message.current = "Listing added to favorites!";
    } 
    setOpen(true);
  };
  console.log(favorites);

  const removeFav = (listing) => {
dispatch(setRemoveFavs({id:listings.results[listing].id}))
setOpen(true)
message.current = 'Removed from favorites'
  };
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
                  <Card>
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
                        {favorites.find(
                          (fav) => fav.favorites.id === listing.id
                        ) ? (
                          <SpeedDialAction
                            icon={<HeartBrokenIcon />}
                            onClick={() => {
                              removeFav(i);
                            }}
                          />
                        ) : (
                          <SpeedDialAction
                            icon={<FavoriteIcon />}
                            onClick={() => {
                              addToFav(i);
                            }}
                          />
                        )}

                        {open && (
                          <Snackbar
                            open={open}
                            autoHideDuration={700}
                            onClose={() => setOpen(false)}
                          >
                            <Alert
                              severity={
                                message.current ===
                                "Listing added to favorites!"
                                  ? "success"
                                  : "error"
                              }
                              sx={{ width: "100%" }}
                            >
                              {message.current}
                            </Alert>
                          </Snackbar>
                        )}
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
                          {listing.price.total} {listing.price.currency} per
                          night
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => navigate(`/location/${listing.id}`)}
                        >
                          Check availability
                        </Button>
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
