import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Carousel from 'react-material-ui-carousel'

const Listing = () => {
  const [listing, setListing] = useState([]);
  const { id } = useParams();
  const listings = useSelector((state) => state.listings);
  useEffect(() => {
    setListing(listings.results.filter((el) => el.id === id));
  }, [id, listings.results]);
  console.log(listing);

  return (
    <>
      {listing.length > 0 && <Typography>{listing[0].name}</Typography>}
      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            details
          </Grid>
          {listing[0]?.images && listing[0]?.images.length > 0 && (
            <Grid item xs={12} md={6}>
              <Carousel
                    autoPlay={true}
                  >
                    {listing[0].images.map((item, index) => (
                      <img
                        key={index}
                        src={item}
                        alt="app pic"
                        style={{
                          display: 'block',
                          maxWidth: '100%',
                          height: 'auto',
                        }}
                      />
                    ))}
                  </Carousel>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Listing;
