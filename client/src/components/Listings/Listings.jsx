import { Grid, Box } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
const Listings = () => {
  const { city } = useParams();
  const [listings,setListings] = useState([])
  useEffect(() => {
    const fetchListings = async () => {
      const url =
        `https://airbnb13.p.rapidapi.com/search-location?location=${city}&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD`;
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
        setListings(result)
      } catch (error) {
        console.error(error);
      }
    };
    fetchListings()
  },[city]);
  console.log(listings)
  return (
    <>
      <h1>{city.split('%20').join(' ').split('%2C').join(',')}, found {listings.results?.length} properties</h1>
      <Box sx={{ p: 2, maxWidth: "lg", marginLeft: "auto", marginRight: "auto" }}>
      <Grid container spacing={4}>
        {listings.results?.length && listings.results.map((listing,i)=>(
            <Grid item xs={12} md={4} key={i}>
              <Card>
                <CardMedia
                  sx={{ height: 200 }}
                  component="img"
                  alt="City"
                  image={listing.images[0]}
                />
                <CardContent>{listing.address}</CardContent>
              </Card>
            </Grid>
        ))}
      </Grid>
      </Box>
    </>
  );
};

export default Listings;
