import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../state';

const Navbar = () =>{
  const isLoggedIn = useSelector(state=>({user:state.user, token:state.token}))
    const MyLink = React.forwardRef((props, ref) => (
        <RouterLink ref={ref} to='/login' {...props} />
      ));
      console.log(isLoggedIn.token)
      const dispatch = useDispatch()
    return (
      isLoggedIn.token!==null?
      <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {isLoggedIn.user.firstName}
              </Typography> 
              <Button onClick={()=>dispatch(setLogout({user:null,token:null}))} color='inherit'>Log out</Button>
            </Toolbar>
          </AppBar>
        </Box>
      :
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography> 
              <Link component={MyLink} color='inherit'>
              <Button color="inherit">Login</Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      );
}

export default Navbar