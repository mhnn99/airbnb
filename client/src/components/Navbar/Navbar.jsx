import * as React from "react";
import { MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";
import Switch from "@mui/material/Switch";
import { setMode } from "../../state";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Avatar from '@mui/material/Avatar';
import DestinationInput from "../DestinationInput/DestinationInput";

const Navbar = () => {
  const settings = ['Account', 'Logout'];

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const isLoggedIn = useSelector((state) => ({
    user: state.user,
    token: state.token,
    mode: state.mode,
  }));
  const MyLink = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/login" {...props} />
  ));
  console.log(isLoggedIn.token);
  const dispatch = useDispatch();
  const isDarkMode = isLoggedIn.mode === "dark";

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));



//   <Button
//   onClick={() => dispatch(setLogout({ user: null, token: null }))}
//   color="inherit"
// >
//   Log out
// </Button>
  return isLoggedIn.token !== null ? (
    <AppBar position="sticky">
      <Toolbar sx={{display: 'flex',justifyContent:"space-between"}}>
        <Typography 
        variant="h6"
        noWrap
        component="div"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'flex-start',
          color: 'inherit',
          textDecoration: 'none',
        }}>
          {isLoggedIn.user.firstName}
        </Typography>
        <DestinationInput
        />
        <Box 
        sx={{display:'flex', alignItems:'flex-end'}}>
        <Switch
          checked={isDarkMode}
          onClick={() => dispatch(setMode())}
        ></Switch>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={isLoggedIn.user.firstName} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting==='Logout' ? (<Typography textAlign="center" onClick={() => dispatch(setLogout({ user: null, token: null }))}>{setting}</Typography>) : (<Typography textAlign="center">{setting}</Typography>)}
                  
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar position="sticky">
      <Toolbar sx={{display: 'flex',justifyContent:"space-between"}}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Travel Website
          </Typography>
        <DestinationInput/>
        <Box 
        sx={{display:'flex', alignItems:'flex-end'}}>
        <Switch
          checked={isDarkMode}
          onClick={() => dispatch(setMode())}
        ></Switch>
        <Link component={MyLink} color="inherit">
          <Button color="inherit">Login</Button>
        </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
