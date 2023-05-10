import { useParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useRef } from "react";
import { TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Zoom } from "swiper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import * as yup from "yup";
import { Formik } from "formik";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/zoom";
import Container from "@mui/material/Container";
import WifiIcon from "@mui/icons-material/Wifi";
import KitchenIcon from "@mui/icons-material/Kitchen";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BedIcon from "@mui/icons-material/Bed";
import StairsIcon from "@mui/icons-material/Stairs";
import BathtubIcon from "@mui/icons-material/Bathtub";
import ShowerIcon from "@mui/icons-material/Shower";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import AdjustIcon from "@mui/icons-material/Adjust";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import PoolIcon from "@mui/icons-material/Pool";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import WcIcon from "@mui/icons-material/Wc";
import ChairIcon from "@mui/icons-material/Chair";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import PetsIcon from "@mui/icons-material/Pets";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import ElevatorIcon from "@mui/icons-material/Elevator";
import HotTubIcon from "@mui/icons-material/HotTub";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import WashIcon from "@mui/icons-material/Wash";
import WarningIcon from "@mui/icons-material/Warning";
import SpaIcon from "@mui/icons-material/Spa";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DryIcon from "@mui/icons-material/Dry";
import IronIcon from "@mui/icons-material/Iron";
import LaptopIcon from "@mui/icons-material/Laptop";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import TvIcon from "@mui/icons-material/Tv";
import BathroomIcon from "@mui/icons-material/Bathroom";
import RouteIcon from "@mui/icons-material/Route";
import LightIcon from "@mui/icons-material/Light";
import ParkingIcon from "@mui/icons-material/LocalParking";


const Listing = () => {
  const amenities = [
    { id: 2, name: "Kitchen", icon: <KitchenIcon /> },
    { id: 4, name: "Wifi", icon: <WifiIcon /> },
    { id: 5, name: "Air conditioning", icon: <AcUnitIcon /> },
    { id: 7, name: "Pool", icon: <PoolIcon /> },
    { id: 8, name: "Kitchen", icon: <KitchenIcon /> },
    { id: 9, name: "Free parking on premises", icon: <LocalParkingIcon /> },
    { id: 11, name: "Smoking allowed", icon: <SmokingRoomsIcon /> },
    { id: 12, name: "Pets allowed", icon: <PetsIcon /> },
    { id: 15, name: "Gym", icon: <FitnessCenterIcon /> },
    { id: 16, name: "Breakfast", icon: <FreeBreakfastIcon /> },
    { id: 21, name: "Elevator", icon: <ElevatorIcon /> },
    { id: 25, name: "Hot tub", icon: <HotTubIcon /> },
    { id: 27, name: "Indoor fireplace", icon: <WhatshotIcon /> },
    { id: 30, name: "Heating", icon: <WhatshotIcon /> },
    { id: 33, name: "Washer", icon: <WashIcon /> },
    { id: 34, name: "Dryer", icon: <DryIcon /> },
    { id: 35, name: "Smoke alarm", icon: <WarningIcon /> },
    { id: 36, name: "Carbon monoxide alarm", icon: <WarningIcon /> },
    { id: 41, name: "Shampoo", icon: <SpaIcon /> },
    { id: 44, name: "Hangers", icon: <CheckroomIcon /> },
    { id: 45, name: "Hair dryer", icon: <DryIcon /> },
    { id: 46, name: "Iron", icon: <IronIcon /> },
    { id: 47, name: "Laptop-friendly workspace", icon: <LaptopIcon /> },
    { id: 51, name: "Self check-in", icon: <VpnKeyIcon /> },
    { id: 58, name: "TV", icon: <TvIcon /> },
    { id: 64, name: "High chair", icon: <ChairIcon /> },
    { id: 78, name: "Private bathroom", icon: <BathroomIcon /> },
    { id: 109, name: "Wide hallways", icon: <AccessibilityIcon /> },
    { id: 110, name: "No stairs or steps to enter", icon: <StairsIcon /> },
    { id: 111, name: "Wide entrance for guests", icon: <AccessibilityIcon /> },
    { id: 112, name: "Step-free path to entrance", icon: <RouteIcon /> },
    { id: 113, name: "Well-lit path to entrance", icon: <LightIcon /> },
    { id: 114, name: "Disabled parking spot", icon: <ParkingIcon /> },
    { id: 115, name: "No stairs or steps to enter", icon: <StairsIcon /> },
    { id: 116, name: "Wide entrance", icon: <AccessibilityIcon /> },
    { id: 117, name: "Extra space around bed", icon: <BedIcon /> },
    { id: 118, name: "Accessible-height bed", icon: <AccessibilityIcon /> },
    { id: 120, name: "No stairs or steps to enter", icon: <StairsIcon /> },
    {
      id: 121,
      name: "Wide doorway to guest bathroom",
      icon: <AccessibilityIcon />,
    },
    { id: 123, name: "Bathtub with bath chair", icon: <BathtubIcon /> },
    { id: 125, name: "Accessible-height toilet", icon: <AccessibilityIcon /> },
    { id: 127, name: "No stairs or steps to enter", icon: <StairsIcon /> },
    { id: 128, name: "Wide entryway", icon: <AccessibilityIcon /> },
    { id: 136, name: "Handheld shower head", icon: <ShowerIcon /> },
    { id: 286, name: "Crib", icon: <ChildFriendlyIcon /> },
    { id: 288, name: "Electric profiling bed", icon: <AdjustIcon /> },
    { id: 289, name: "Mobile hoist", icon: <AccessibilityIcon /> },
    { id: 290, name: "Pool with pool hoist", icon: <PoolIcon /> },
    { id: 291, name: "Ceiling hoist", icon: <AccessibilityIcon /> },
    {
      id: 294,
      name: "Fixed grab bars for shower",
      icon: <AccessibilityIcon />,
    },
    {
      id: 295,
      name: "Fixed grab bars for toilet",
      icon: <AccessibilityIcon />,
    },
    { id: 296, name: "Step-free shower", icon: <ShowerIcon /> },
    { id: 297, name: "Shower chair", icon: <ChairIcon /> },
    { id: 347, name: "Piano", icon: <MusicNoteIcon /> },
    { id: 608, name: "Extra space around toilet", icon: <WcIcon /> },
    { id: 609, name: "Extra space around shower", icon: <ShowerIcon /> },
  ];
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [listing, setListing] = useState([]);
  const [reviews,setReviews] = useState([])
  const [users,setUsers] = useState([])
  const { id } = useParams();
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const listings = useSelector((state) => state.listings);
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => ({
    user: state.user,
    token: state.token,
  }));

  useEffect(() => {
    setListing(listings.results.filter((el) => el.id === id));
    const fetchOrders = async () => {
      const orders = await fetch(`http://localhost:9000/orders/${id}`);
      const res = await orders.json();
      const reviews = await fetch(`http://localhost:9000/reviews/${id}`)
      const foundReviews = await reviews.json()
      if(foundReviews){
        const getUser = await Promise.all(foundReviews.foundReviews.map(foundReview=>
          fetch(`http://localhost:9000/users/${foundReview.userId}`).then((res) => res.json())))
          setUsers(getUser)
      }
      setOrders(res);
      setReviews(foundReviews.foundReviews)
    };
    fetchOrders();
  }, [id, listings.results]);
  console.log(users);
  const amenitiesList = listing[0]?.amenityIds
    .filter((el) => amenities.map((el) => el.id).includes(el))
    .map((el) => ({
      name: amenities[amenities.findIndex((element) => element.id === el)].name,
      icon: amenities[amenities.findIndex((element) => element.id === el)].icon,
    }));
 console.log(listing[0]?.name)
  const handleSubmit = async () => {
    const token = user ? user.token : null;

    if (token) {
      const decodedToken = jwt_decode(token);
      const order = {
        userId: decodedToken.userId,
        listingId: id,
        listingName:listing[0].name,
        checkinDate: checkinDate,
        checkoutDate: checkoutDate,
      };

      const orderPost = await fetch("http://localhost:9000/orders", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await orderPost.json();
    } else {
      navigate("/login");
    }
  };
  const isBooked = (date) => {
    for (let i = 0; i < orders.ordersByListing.length; i++) {
      if (
        date.isAfter(orders.ordersByListing[i].checkinDate) &&
        date.isBefore(orders.ordersByListing[i].checkoutDate)
      ) {
        return true;
      } else if (
        date.isSame(orders.ordersByListing[i].checkinDate) ||
        date.isSame(orders.ordersByListing[i].checkoutDate)
      ) {
        return true;
      }
    }
    return false;
  };
  return (
    <>
      {listing.length > 0 && (
        <Typography sx={{ fontSize: "32px" }}>{listing[0].name}</Typography>
      )}
      <Box sx={{ marginTop: 4 }}>
        <Container>
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow, Zoom]}
            centeredSlides
            slidesPerView={2}
            grabCursor
            navigation
            autoplay
            zoom
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
          >
            {listing[0]?.images &&
              listing[0]?.images.length > 0 &&
              listing[0].images.map((image, i) => (
                <SwiperSlide key={i}>
                  <div>
                    <img
                      src={image}
                      alt="asdf"
                      style={{
                        maxHeight: "400px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </Container>
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: "28px", marginTop: 2 }}>
              {listing[0]?.type}
            </Typography>
            <Typography
              sx={{ fontSize: "20px", color: theme.palette.secondary.dark }}
            >
              Rooms
            </Typography>
            <Box sx={{ display: "flex", marginTop: 2 }}>
              <Typography>Bedrooms:{listing[0]?.bedrooms} </Typography>
              <Typography sx={{ marginLeft: 1 }}>
                Bathrooms:{listing[0]?.bathrooms}{" "}
              </Typography>
              <Typography sx={{ marginLeft: 1 }}>
                Beds:{listing[0]?.beds}
              </Typography>
            </Box>
            <Typography
              sx={{
                marginTop: 2,
                fontSize: "20px",
                color: theme.palette.secondary.dark,
              }}
            >
              Amenities
            </Typography>
            <Grid container spacing={1} sx={{ marginTop: 2 }}>
              {amenitiesList?.map((el, i) => (
                <Grid item xs={6} md={4} key={i}>
                  {el.icon}
                  <Typography>{el.name}</Typography>
                </Grid>
              ))}
            </Grid>
            <Typography
              sx={{
                marginTop: 2,
                fontSize: "20px",
                color: theme.palette.secondary.dark,
              }}
            >
              Reviews
            </Typography>
            {reviews.map((review,i)=>{
            const user = users.find(user=>user.foundUser._id===review.userId)
            return<>
            <Typography key={i}>{user?.foundUser.firstName}: {review.comment}</Typography>
            </>
            })}
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: "28px", textAlign: "center" }}>
                  Reservation Details
                </Typography>
                <Box sx={{ margin: 4 }}>
                  <Typography>Check in date:</Typography>
                  <DatePicker
                    shouldDisableDate={isBooked}
                    value={checkinDate}
                    onChange={(newValue) => {
                      setCheckinDate(dayjs(newValue));
                      setCheckoutDate(newValue.add(1, "day"));
                    }}
                    disablePast
                  />
                </Box>
                <Box sx={{ margin: 4 }}>
                  <Typography>Checkout date:</Typography>
                  <DatePicker
                    value={checkoutDate}
                    shouldDisableDate={isBooked}
                    onChange={(newValue) => setCheckoutDate(dayjs(newValue))}
                    disablePast
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button fullWidth onClick={() => handleSubmit()}>
                  Book now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Listing;
