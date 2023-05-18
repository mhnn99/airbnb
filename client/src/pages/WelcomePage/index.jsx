import Navbar from "../../components/Navbar/Navbar"
import React,{useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector } from "react-redux";
import CatList from "../../components/Catlist/CatList";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Box, Typography, Button } from "@mui/material";
import { useSpring, animated } from '@react-spring/web';
import { useTheme } from "@mui/material";

const AnimatedTypography = animated(Typography);
const WelcomePage = () =>{
  const theme = useTheme()
  const springProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 200, friction: 10 },
  });
    const [open,setOpen] = useState(true)
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    const isLoggedIn = useSelector(state=>state.token)
    return<>
  
    <Navbar/>
    {isLoggedIn && <Snackbar open={open} autoHideDuration={6000} onClose={()=>setOpen(false)}>
    <Alert  severity="success" sx={{ width: '100%' }}>
      Succesfully logged in!
    </Alert>
  </Snackbar>}

  <Parallax pages={2}>
  <ParallaxLayer offset={0} speed={0.5} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backgroundImage: 'url(https://www.pixelstalk.net/wp-content/uploads/images6/Beach-Wallpaper-HD-Free-download.jpg)', backgroundSize: 'cover' }}>
  <div className="parallax-section">
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <AnimatedTypography variant="h2" sx={{ color: theme.palette.primary.main, textAlign: 'center' }} style={springProps}>
        Discover Amazing Destinations
      </AnimatedTypography>
      <Button variant="contained" color="primary" sx={{ mt: 3 }}>
        Get Started
      </Button>
    </Box>
  </div>
</ParallaxLayer>


  <ParallaxLayer offset={1} speed={0.5}>
    <div className="parallax-section">
      <Box sx={{textAlign:'center', marginTop:'6rem', height:'100%' }}>
        <AnimatedTypography variant="h4" sx={{ color: theme.palette.secondary.dark, textAlign: 'center' }} style={springProps}>
          Explore our curated travel destinations
        </AnimatedTypography>
        <CatList/>
      </Box>
    </div>
  </ParallaxLayer>
</Parallax>

  
    </>
}

export default WelcomePage