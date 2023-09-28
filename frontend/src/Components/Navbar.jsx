import { React, useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../assets/icons/logo.png";
import Person from "../assets/icons/person.png";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { isLoggedIn, username, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const pages = [
    {
      title: "Checkup",
      handler: () => {
        navigate("/image");
      },
      mustBeLoggedIn: true,
    },
    {
      title: "Contact-Us",
      handler: () => {
        navigate("/contact-us");
      },
      mustBeLoggedIn: false,
    },
    {
      title: "Our team",
      handler: () => {
        navigate("/team");
      },
      mustBeLoggedIn: false,
    },
  ];

  const settings = [
    {
      title: "Profile",
      handler: () => {
        navigate("/profile");
      },
    },
    {
      title: "Logout",
      handler: () => {
        logout();
        navigate("/");
      },
    },
  ];

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

  return (
    <AppBar position="static" sx={{ background: "#FFFEFE" }}>
      <Container maxWidth="xl" sx={{ background: "#FFFEFE" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              // display: { xs: "none", md: "flex" },
              fontFamily: "lato",
              fontWeight: "600",
              letterSpacing: ".3rem",
              color: "#000000",
              textDecoration: "none",
            }}
          >
            <img
              src={Logo}
              alt="logo"
              height="inherit"
              width="200px"
              style={{
                transform: "scale(1.3)",
              }}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#000000"
            >
              <MenuIcon />
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
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                if (page.mustBeLoggedIn && !isLoggedIn) return null;

                return (
                  <MenuItem
                    key={page.title}
                    onClick={() => {
                      handleCloseNavMenu();
                      page.handler();
                    }}
                  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              // marginLeft: "auto",
              justifyContent: "flex-end",
              gap: "2rem",
              marginRight: 4,
            }}
          >
            {/* <Button
              sx={{
                background: "#118480",
                // fontFamily: "Lato",
                fontSize: "1em",
                color: "white",
                height: "5vh",
                padding: "1rem",
                margin: "1rem 0 1rem ",
                marginRight: "5vw",
                textTransform: "capitalize",
                "&:hover": {
                  background: "#0f6f68",
                },
              }}
            >
              Home
            </Button> */}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery)
                  navigate(`/disease-search?name=${searchQuery}`);
              }}
            >
              <TextField
                id="search"
                placeholder="Search"
                variant="outlined"
                size="medium"
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: "gray" }} />,
                }}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                sx={{
                  marginTop: "5%",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "2rem",
                  border: "none",
                  boxSizing: "0",
                }}
              />
            </form>

            {/* <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery) navigate(`/disease/name?name=${searchQuery}`);
              }}
              sx={{ margin: "1%" }}
            /> */}
            {pages.map((page) => {
              if (page.mustBeLoggedIn && !isLoggedIn) return null;

              return (
                <Button
                  key={page.title}
                  onClick={() => {
                    handleCloseNavMenu();
                    page.handler();
                  }}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    fontWeight: "600",
                    //   fontFamily: "Monteserrat",
                    fontSize: "1em",
                    textTransform: "capitalize",
                    "&:hover": { backgroundColor: "#C8E1D3" },
                  }}
                >
                  {page.title}
                </Button>
              );
            })}
          </Box>

          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <img src={Person} alt="icon" height="35px" /> */}
                  <Avatar
                    sx={{
                      bgcolor: "#038c13",
                      width: 50,
                      height: 50,
                      fontSize: 40,
                    }}
                  >
                    {username[0]}
                  </Avatar>
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
                  <MenuItem
                    key={setting.title}
                    onClick={() => {
                      handleCloseUserMenu();
                      setting.handler();
                    }}
                  >
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
