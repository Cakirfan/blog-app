import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../Assets/puzzle.jpg";
import { List, ListItem } from "@mui/material";
import useAuthCall from "../hooks/useAuthCall";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import avatar from "../Assets/avatar.jpg";

function NavBar() {
  const navigate = useNavigate();
  const { currentUser, image } = useSelector((state) => state.auth);
  const { logout } = useAuthCall();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigation = (endpoint) => {
    navigate(`/${endpoint}`);
    handleCloseNavMenu();
    handleCloseUserMenu();
  };
  const handleClick = () => {
    logout();
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "slategray", color: "white", opacity: ".8", paddingY: "10px" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            onClick={() => handleNavigation("")}
            component="a"
            href="/"
            sx={{
              mr: 2,
              borderRadius: "50%",
              overflow: "hidden",
              display: { xs: "none", md: "flex" },
            }}
          >
            <img src={logo} alt="#" width="80px" height="80px" />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                color: "white",
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                sx={{ color: "black", "&:hover": { backgroundColor: "white" } }}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">
                  <Button
                    onClick={() => handleNavigation("")}
                    sx={{ color: "black", display: "block" }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    onClick={() => handleNavigation("newblog")}
                    sx={{ color: "black", display: "block" }}
                  >
                    New Blog
                  </Button>
                  <Button
                    onClick={() => handleNavigation("about")}
                    sx={{ color: "black", display: "block" }}
                  >
                    About
                  </Button>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box
            onClick={() => handleNavigation("")}
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flex: 1,
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img src={logo} alt="#" width="80px" height="80px" />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => handleNavigation("")}
              sx={{ my: 2, ml: 2, color: "black", display: "block" }}
            >
              Dashboard
            </Button>
            {currentUser && (
              <>
                <Button
                  onClick={() => handleNavigation("newblog")}
                  sx={{ my: 2, ml: 2, color: "black", display: "block" }}
                >
                  New Blog
                </Button>
                <Button
                  onClick={() => handleNavigation("about")}
                  sx={{ my: 2, ml: 2, color: "black", display: "block" }}
                >
                  About
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={currentUser ? image : avatar} />
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
              <List component="ul" sx={{ margin: 0, padding: 0 }}>
                {currentUser && (
                  <>
                    <ListItem component="li" sx={{ marginBottom: -2 }}>
                      <Typography
                        sx={{
                          p: 1,
                          borderRadius: "5px",
                          "&:hover": { backgroundColor: "#fafafa" },
                        }}
                        variant="body1"
                        component="button"
                        onClick={() => handleNavigation("profile")}
                      >
                        Profile
                      </Typography>
                    </ListItem>
                    <ListItem component="li" sx={{ marginBottom: -2 }}>
                      <Typography
                        sx={{
                          p: 1,
                          borderRadius: "5px",
                          "&:hover": { backgroundColor: "#fafafa" },
                        }}
                        variant="body1"
                        component="button"
                        onClick={() => handleNavigation("my-blogs")}
                      >
                        My Blogs
                      </Typography>
                    </ListItem>
                  </>
                )}

                <ListItem component="li" sx={{ marginBottom: 0 }}>
                  {currentUser ? (
                    <Typography
                      sx={{
                        p: 1,
                        borderRadius: "5px",
                        "&:hover": { backgroundColor: "#fafafa" },
                      }}
                      variant="body1"
                      onClick={handleClick}
                      component="button"
                    >
                      Logout
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        p: 1,
                        borderRadius: "5px",
                        "&:hover": { backgroundColor: "#fafafa" },
                      }}
                      variant="body1"
                      onClick={() => handleNavigation("login")}
                      component="button"
                    >
                      Login
                    </Typography>
                  )}
                </ListItem>
              </List>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
