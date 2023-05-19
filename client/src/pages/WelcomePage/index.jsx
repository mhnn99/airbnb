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

const AnimatedTypography = animated(Typography);

const WelcomePage = () => {
  const parallax = useRef(null);
  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    const currentTarget = targetRef.current;
    console.log(currentTarget)
    if (currentTarget) observer.observe(currentTarget);
    return () =>{
      if(currentTarget) observer.unobserve(currentTarget)
    }
  
  }, [targetRef, options]);

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
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Successfully logged in!
          </Alert>
        </Snackbar>
      )}

      <Parallax ref={parallax} pages={2}>
        <ParallaxLayer offset={0} speed={0.5} style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backgroundImage: "url(https://www.pixelstalk.net/wp-content/uploads/images6/Beach-Wallpaper-HD-Free-download.jpg)", backgroundSize: "cover" }}>
          <div className="parallax-section">
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
              <AnimatedTypography variant="h1" sx={{ color: "white", textAlign: "center", textShadow: "1px 1px 10px #061a40, 1px 1px 10px #b16100" }} style={springProps}>
                Discover Amazing Places
              </AnimatedTypography>
              <Button variant="outlined" color="inherit" sx={{ mt: 3, fontSize: "22px" }} onClick={() => scroll(0.62)}>
                Get Started
              </Button>
            </Box>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.5} >
          <div className="parallax-section" ref={targetRef}>
            <Box sx={{ textAlign: "center", marginTop: "6rem", height: "100%" }}>
              <AnimatedTypography variant="h4" sx={{ color: "inherit", textAlign: "center", marginBottom: 5, textShadow: "1px 1px 20px #fbf5df" }} style={springProps} >
                Explore our curated travel destinations
              </AnimatedTypography>
              {isVisible && <CatList />}
            </Box>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.5}>
          <h1>3rd layer</h1>
          <Footer />
        </ParallaxLayer>
      </Parallax>
    </>
  );
};

export default WelcomePage;
