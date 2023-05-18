import Navbar from "../../components/Navbar/Navbar"
import React,{useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector } from "react-redux";
import CatList from "../../components/Catlist/CatList";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Box, Typography } from "@mui/material";
const WelcomePage = () =>{
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
<ParallaxLayer offset={0} speed={1}
style={{backgroundImage:`url(https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,backgroundSize:'cover'}}>
<Box >
<Typography sx={{fontSize:'10rem', textAlign:'center'}} color='primary'>Welcome to our travel app</Typography>
</Box>
</ParallaxLayer>
<ParallaxLayer offset={1} speed={0.5}>
  <CatList/>
</ParallaxLayer>
  </Parallax>
    </>
}

export default WelcomePage