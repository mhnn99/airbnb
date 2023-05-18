import Navbar from "../../components/Navbar/Navbar";
import React, { useState, useRef, useMemo, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import CatList from "../../components/Catlist/CatList";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Box, Typography, Button } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { useTheme } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import { useInView } from "@react-spring/web";
import { useDispatch } from "react-redux";
import { setCities } from "../../state";
import { Fab } from '@mui/material';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';

const AnimatedTypography = animated(Typography);

const WelcomePage = () => {
  const parallax = useRef(null);
  const dispatch = useDispatch();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  const cities = useSelector((state) => ({
    cities: state.cities,
    initialArr: state.initialArr,
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
                  "jePcpAc1q9cQdNqYEULs0QajmL86j6uFCeElsKKD44NnxI0WDFgUWfIr",
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
  }, []);
  const scroll = (to) => {
    if (parallax.current) {
      parallax.current.scrollTo(to);
    }
  };

  const theme = useTheme();
  const springProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 200, friction: 10 },
  });

  const [open, setOpen] = useState(true);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const isLoggedIn = useSelector((state) => state.token);

  return (
    <>
      <Navbar />
      {isLoggedIn && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Successfully logged in!
          </Alert>
        </Snackbar>
      )}

      <Parallax ref={parallax} pages={1.9}>
        <ParallaxLayer
          offset={0}
          speed={0.5}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundImage: "url(https://imgur.com/GJvEISJ.jpg)",
            backgroundSize: "cover",
          }}
        >
          <div className="parallax-section">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <AnimatedTypography
                variant="h1"
                sx={{
                  color: "white",
                  textAlign: "center",
                  textShadow: "1px 1px 10px #061a40, 1px 1px 10px #b16100",
                }}
                style={springProps}
              >
                Discover Amazing Places
              </AnimatedTypography>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ mt: 3, fontSize: "22px" }}
                onClick={() => scroll(0.48)}
              >
                Get Started
              </Button>
            </Box>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={0.95} speed={0.9}>
          <div className="parallax-section" ref={ref}>
            <Box
              sx={{ textAlign: "center", marginTop: "6rem", height: "100%" }}
            >
              <AnimatedTypography
                variant="h4"
                sx={{
                  color: "inherit",
                  textAlign: "center",
                  marginBottom: 5,
                  textShadow: "1px 1px 20px #fbf5df",
                }}
                style={springProps}
              >
                Explore our curated travel destinations
              </AnimatedTypography>
              {inView && <CatList />}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: 3,
                  marginRight: 5,
                }}
              >
                <Fab
                
                  onClick={() => scroll(0)}
                >
                  <UpIcon />
                </Fab>
              </Box>
              <Footer />
            </Box>
          </div>
        </ParallaxLayer>
      </Parallax>
    </>
  );
};

export default WelcomePage;
