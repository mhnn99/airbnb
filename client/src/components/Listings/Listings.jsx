import { Grid, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Rating from '@mui/material/Rating'
const Listings = () => {
  const { city } = useParams();
  const [listings, setListings] = useState([]);
  const amenitiesList = [
    { id: 2, amenity: "Kitchen" },
    { id: 4, amenity: "Wifi" },
    { id: 5, amenity: "Air conditioning" },
    { id: 7, amenity: "Pool" },
    { id: 8, amenity: "Kitchen" },
    { id: 9, amenity: "Free parking on premises" },
    { id: 11, amenity: "Smoking allowed" },
    { id: 12, amenity: "Pets allowed" },
    { id: 15, amenity: "Gym" },
    { id: 16, amenity: "Breakfast" },
    { id: 21, amenity: "Elevator" },
    { id: 25, amenity: "Hot tub" },
    { id: 27, amenity: "Indoor fireplace" },
    { id: 30, amenity: "Heating" },
    { id: 33, amenity: "Washer" },
    { id: 34, amenity: "Dryer" },
    { id: 35, amenity: "Smoke alarm" },
    { id: 36, amenity: "Carbon monoxide alarm" },
    { id: 41, amenity: "Shampoo" },
    { id: 44, amenity: "Hangers" },
    { id: 45, amenity: "Hair dryer" },
    { id: 46, amenity: "Iron" },
    { id: 47, amenity: "Laptop-friendly workspace" },
    { id: 51, amenity: "Self check-in" },
    { id: 58, amenity: "TV" },
    { id: 64, amenity: "High chair" },
    { id: 78, amenity: "Private bathroom" },
    { id: 109, amenity: "Wide hallways" },
    { id: 110, amenity: "No stairs or steps to enter" },
    { id: 111, amenity: "Wide entrance for guests" },
    { id: 112, amenity: "Step-free path to entrance" },
    { id: 113, amenity: "Well-lit path to entrance" },
    { id: 114, amenity: "Disabled parking spot" },
    { id: 115, amenity: "No stairs or steps to enter" },
    { id: 116, amenity: "Wide entrance" },
    { id: 117, amenity: "Extra space around bed" },
    { id: 118, amenity: "Accessible-height bed" },
    { id: 120, amenity: "No stairs or steps to enter" },
    { id: 121, amenity: "Wide doorway to guest bathroom" },
    { id: 123, amenity: "Bathtub with bath chair" },
    { id: 125, amenity: "Accessible-height toilet" },
    { id: 127, amenity: "No stairs or steps to enter" },
    { id: 128, amenity: "Wide entryway" },
    { id: 136, amenity: "Handheld shower head" },
    { id: 286, amenity: "Crib" },
    { id: 288, amenity: "Electric profiling bed" },
    { id: 289, amenity: "Mobile hoist" },
    { id: 290, amenity: "Pool with pool hoist" },
    { id: 291, amenity: "Ceiling hoist" },
    { id: 294, amenity: "Fixed grab bars for shower" },
    { id: 295, amenity: "Fixed grab bars for toilet" },
    { id: 296, amenity: "Step-free shower" },
    { id: 297, amenity: "Shower chair" },
    { id: 347, amenity: "Piano" },
    { id: 608, amenity: "Extra space around toilet" },
    { id: 609, amenity: "Extra space around shower" },
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
        setListings(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchListings();
  }, [city]);
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
                <Card>
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
