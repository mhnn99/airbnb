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
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import jwt_decode from "jwt-decode";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import Footer from "../Footer/Footer";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import BackToTop from "../BackToTop/BackToTop";
import CircularProgress from "@mui/material/CircularProgress";

const Listings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { city } = useParams();
  const navigate = useNavigate();
  const listings = useSelector((state) => state.listings);
  const favorites = useSelector((state) => state.favorites);
  const message = useRef("");
  const [open, setOpen] = useState(false);
  const userToken = useSelector((state) => state.token);
  console.log(favorites.flat());

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const addToFav = async (listing) => {
    const token = userToken ? userToken : null;
    if (token) {
      const decodedToken = jwt_decode(token);
      if (
        !favorites.find((fav) => fav.favorites === listings.results[listing].id)
      ) {
        dispatch(
          setFavorites({ city: city, favorites: listings.results[listing].id })
        );
        try {
          const postFav = await fetch(
            `http://localhost:9000/favorites/${decodedToken.userId}`,
            {
              method: "POST",
              body: JSON.stringify({
                city: city,
                favorites: listings.results[listing].id,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const res = await postFav.json();
          console.log(res);
          message.current = "Listing added to favorites!";
          setOpen(true);
        } catch (err) {
          message.current = err.message;
        }
      }
    } else {
      navigate(`/login`);
      console.log("asdasdasd");
    }
  };

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

  const addIcons = [
    { icon: <FavoriteIcon />, name: "Add to Favorites" },
    { icon: <EditCalendarIcon />, name: "Check availability" },
  ];

  const removeIcons = [
    { icon: <HeartBrokenIcon />, name: "Remove from Favorites" },
    { icon: <EditCalendarIcon />, name: "Check availability" },
  ];

  useEffect(() => {
    const fetchListings = async () => {
      const url = `https://airbnb13.p.rapidapi.com/search-location?location=${city}&checkin=2024-09-16&checkout=2024-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "ffe7cd812fmsh2f8be9ba6e3320ap1ecb01jsnd1f93aa48bb6",
          "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
        },
      };

      try {
        setIsLoading(true);
        const response = await fetch(url, options);
        const result = await response.json();
        dispatch(setListings({ listings: result }));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchListings();
  }, [city, dispatch]);

  const priceFilterUp = () => {
    const sorted = [...listings.results].sort(
      (a, b) => a.price.rate - b.price.rate
    );
    const updatedListings = { ...listings, results: sorted };
    dispatch(setListings({ listings: updatedListings }));
  };


  const priceFilterDown = () => {
    let sortDown = [...listings.results].sort(
      (a, b) => b.price.rate - a.price.rate
    );
    const updatedListings = { ...listings, results: sortDown };
    dispatch(setListings({ listings: updatedListings }));
  };

  const ratingFilterUp = () => {
    let sortDown = [...listings.results].sort((a, b) => a.rating - b.rating);
    const updatedListings = { ...listings, results: sortDown };
    dispatch(setListings({ listings: updatedListings }));
  };

  const ratingFilterDown = () => {
    let sortDown = [...listings.results].sort((a, b) => b.rating - a.rating);
    const updatedListings = { ...listings, results: sortDown };
    dispatch(setListings({ listings: updatedListings }));
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : listings?.results?.length > 0 ? (
        <>
          <Typography variant="h3" align="center" sx={{ m: 5 }}>
            {city.split("%20").join(" ").split("%2C").join(",")}, found{" "}
            {listings.results?.length} properties
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <ButtonGroup
              variant="text"
              aria-label="text button group"
              color="inherit"
            >
              <Button onClick={() => priceFilterUp()}>Price/night ↑</Button>
              <Button onClick={() => priceFilterDown()}>Price/night ↓</Button>
              <Button onClick={() => ratingFilterUp()}>Rating ↑</Button>
              <Button onClick={() => ratingFilterDown()}>Rating ↓</Button>
            </ButtonGroup>
          </Box>
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
                        {favorites
                          .flat()
                          .find((fav) => fav.favorites === listing.id)
                          ? removeIcons.map((action) => (
                              <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={
                                  action.name === "Remove from Favorites"
                                    ? () => removeFav(i)
                                    : () => navigate(`/location/${listing.id}`)
                                }
                              />
                            ))
                          : addIcons.map((action) => (
                              <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={
                                  action.name === "Add to Favorites"
                                    ? () => addToFav(i)
                                    : () =>
                                        openInNewTab(`/location/${listing.id}`)
                                }
                              />
                            ))}
                      </SpeedDial>
                      {open && (
                        <Snackbar
                          open={open}
                          autoHideDuration={2000}
                          onClose={() => setOpen(false)}
                        >
                          <Alert
                            severity={
                              message.current === "Listing added to favorites!"
                                ? "success"
                                : "error"
                            }
                            sx={{ width: "100%" }}
                          >
                            {message.current}
                          </Alert>
                        </Snackbar>
                      )}
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
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <BackToTop />
          </Box>
        </>
      ) : (
        <Typography variant="h4" align="center" sx={{ m: 3 }}>
          No results found
        </Typography>
      )}
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
};

export default Listings;
