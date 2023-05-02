import Navbar from "../../components/Navbar/Navbar"
import React,{useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector } from "react-redux";
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
    </>
}

export default WelcomePage