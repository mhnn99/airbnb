import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useTheme } from "@mui/material";
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Autoplay, EffectCoverflow, Zoom} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import 'swiper/css/zoom'
import Container from '@mui/material/Container'


const Listing = () => {
  const theme = useTheme();
  const [listing, setListing] = useState([]);
  const { id } = useParams();
  const listings = useSelector((state) => state.listings);
  useEffect(() => {
    setListing(listings.results.filter((el) => el.id === id));
  }, [id, listings.results]);
  console.log(listing);

  return (
    <>
      {listing.length > 0 && (
        <Typography sx={{ fontSize: "26px" }}>{listing[0].name}</Typography>
      )}
      <Box sx={{ marginTop: 4 }}>
          <Container>
            <Swiper
            modules={[Navigation,Autoplay,EffectCoverflow,Zoom]}
            centeredSlides
            slidesPerView={2}
            grabCursor
            navigation
            autoplay
            zoom
            effect="coverflow"
            coverflowEffect={{
              rotate:50,
              stretch:0,
              depth:100,
              modifier:1,
              slideShadows:true
            }}>

          {listing[0]?.images && listing[0]?.images.length > 0 && (
            listing[0].images.map((image,i)=>(
              <SwiperSlide>
                <div>
                  <img src={image} alt='asdf' style={{maxHeight:'400px', width:"100%", objectFit:'cover'}}/>
                </div>
              </SwiperSlide>
            ))
          )}
            </Swiper>
          </Container>
      </Box>
    </>
  );
};

export default Listing;
