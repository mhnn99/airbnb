import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Navigate, Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setResetFavorites, setLogout } from "../../state";
import Switch from "@mui/material/Switch";
import { setMode } from "../../state";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import DestinationInput from "../DestinationInput/DestinationInput";
import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
  const settings = ["Account", "Logout"];

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
  const MyAccount = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/account" {...props} />
  ));
  const MyHome = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/" {...props} />
  ));
  // console.log(isLoggedIn.token);
  const dispatch = useDispatch();
  const isDarkMode = isLoggedIn.mode === "dark";

  return isLoggedIn.token !== null ? (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Link
            component={MyHome}
            onClick={handleCloseUserMenu}
            color="inherit"
            underline="none"
          >
            <HomeIcon sx={{ fontSize: 40, mt: 1 }} />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              padding: 2,
              mr: 2,
              display: { xs: "none", md: "flex" },
              alignItems: "flex-start",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {/* {isLoggedIn.user.firstName} */}
          </Typography>
        </Box>
        <DestinationInput />
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Switch
            checked={isDarkMode}
            onClick={() => dispatch(setMode())}
          ></Switch>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={isLoggedIn.user.firstName}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting === "Logout" ? (
                    <Link
                    component={MyHome}
                    onClick={() =>
                      {
                        dispatch(setLogout({ user: null, token: null }))
                        dispatch(setResetFavorites())
                      }
                    }
                    color="inherit"
                    underline="none"
                  >
                      {setting}
                    </Link>
                  ) : (
                    <Link
                      component={MyAccount}
                      onClick={handleCloseUserMenu}
                      color="inherit"
                      underline="none"
                    >
                      {setting}
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Link
            component={MyHome}
            onClick={handleCloseUserMenu}
            color="inherit"
            underline="none"
          >
            <HomeIcon sx={{ fontSize: 40, mt: 1 }} />
          </Link>
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            padding: 2,
              mr: 2,
              display: { xs: "none", md: "flex" },
              alignItems: "flex-start",
              color: "inherit",
              textDecoration: "none",
          }}
        >
          {/* Travel Website */}
        </Typography>
        </Box>
        <DestinationInput />
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
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
