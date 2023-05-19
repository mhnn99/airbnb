import { setCities } from "../../state";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTransition, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Grid from "@mui/material/Grid";

const CatList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cities = useSelector((state) => ({
    cities: state.cities,
    initialArr: state.initialArr,
  }));
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 200,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
  }));

  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  });

  const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  }));

  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  }));

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await Promise.all(
          cities.initialArr.map((url) =>
            fetch(`https://api.pexels.com/v1/search?query=${url}`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization:
                  "aA1vysRzOWAkW94xcM7VMp4wSdm2kKGZEr0vRfpmZZM924kjhIK4G2i5",
              },
            }).then((res) => res.json())
          )
        );
        dispatch(setCities({ cities: response }));
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchCities();
  }, [dispatch]);
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const transitions = useTransition(cities.cities, {
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: "scale(1)" },
    config: { mass: 1, tension: 280, friction: 30 },
    trail: 200,
    immediate: !inView,
  });

  return (
    <>
      <Grid container spacing={4}>
        {transitions((styles, item, t, index) => (
          <Grid item xs={12} sm={6} md={4} key={cities.initialArr[index]}>
            <animated.div style={styles} ref={ref}>
              <ImageButton
                focusRipple
                style={{
                  width: "100%",
                  margin: 30,
                }}
                onClick={() =>
                  navigate(`/locations/${cities.initialArr[index]}`)
                }
              >
                <ImageSrc
                  style={{
                    backgroundImage: `url(${item.photos[0].src.large})`,
                  }}
                />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: "relative",
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {cities.initialArr[index]}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ImageButton>
            </animated.div>
          </Grid>
        ))}
      </Grid>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
};

export default CatList;
