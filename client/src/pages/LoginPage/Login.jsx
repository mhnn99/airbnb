import * as React from "react";
import { Navigate, Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import {Box,Typography,useTheme,useMediaQuery} from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid'
import Form from '../../components/Form/Form';
import HomeIcon from "@mui/icons-material/Home";

const Login = () =>{
const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

const [anchorElUser, setAnchorElUser] = React.useState(null);

const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const MyHome = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/" {...props} />
  ));

  return(
    <Box>
        <AppBar position='static'>
        <Link
            component={MyHome}
            onClick={handleCloseUserMenu}
            color="inherit"
            underline="none"
          >
            <HomeIcon sx={{ fontSize: 40, mt: 1 }} />
          </Link>
            <Typography fontWeight='bold' fontSize='32px' color='primary' alignSelf='center'>
                NumeSite
            </Typography>
        </AppBar>

        <Box display='flex' justifyContent="center" alignItems="center" m='6rem auto'>
        <Form/>
        </Box>
    </Box>
)
}

export default Login