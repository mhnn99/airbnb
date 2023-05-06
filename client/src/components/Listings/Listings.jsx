import { Grid, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Rating from '@mui/material/Rating'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../../state";
const Listings = () => {
  const dispatch = useDispatch()
  const { city } = useParams();
  const navigate = useNavigate()
  const listings = useSelector(state=>state.listings)
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
        dispatch(setListings({listings:result}));
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
        sx={{ p: 2, maxWidth: "lg", marginLeft: "auto", marginRight: "auto" }}
      >
        <Grid container spacing={4}>
          {
            listings.results.map((listing, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card onClick={()=>navigate(`/location/${listing.id}`)}>
                  <Box sx={{position:'relative'}}>
                  <img src={listing.hostThumbnail} alt='thumbnail' style={{height:'3rem', borderRadius:'2rem', marginTop:'7px', position: 'absolute', top: 10, left: 10, zIndex:2}}></img>
                  <CardMedia
                    sx={{ height: 200 ,position: 'relative'}}
                    component="img"
                    alt="City"
                    image={listing.images[0]}
                  />
                  </Box>
                  <CardContent sx={{minHeight:200, position:'relative'}}>
                    {listing.name}
                    <Box sx={{marginTop:2, display:'flex', justifyContent:'space-between'}}>
                    <Rating name="read-only" value={listing?.rating} readOnly />
                    <Typography fontSize='14px' color='primary' marginTop='4px'>
                      {listing.reviewsCount} reviews
                    </Typography>
                    </Box>
                    {listing?.isSuperhost&&<Box sx={{display:'flex'}}><HowToRegIcon sx={{marginTop:'12px'}}/> <Typography sx={{marginLeft:'12px', marginTop:'12px'}}>Superhost</Typography></Box>}
                    <Box sx={{marginTop:6, position:'absolute', top:110, left:19}}>
                      <Typography color='primary'>
                        {listing.price.total} {listing.price.currency} per night
                      </Typography>
                     
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  ) : (
    <p>Loading</p>
  )}
</>
  );
};

export default Listings;
