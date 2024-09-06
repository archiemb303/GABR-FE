import React from "react";
import {
  Avatar,
  Button,
  Divider,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Box, styled, useTheme } from "@mui/system";
import { FlexBetween } from "app/components/FlexBox";
import { topBarHeight } from "app/utils/constant";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import "swiper/swiper-bundle.css";
import "swiper/swiper.min.css";
import "./swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import {
  AspectRatio,
  CenterFocusStrong,
  CheckBox,
  ConfirmationNumber,
} from "@mui/icons-material";
import Slider from "./Slider";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  generateOtpAction,
  verifyOtpAction,
} from "app/redux/actions/PreloginActions";
import Contact from "./Contact";
import CssBaseline from "@mui/material/CssBaseline";
import Aboutus from "./Aboutus";
import { MatxMenu } from "app/components";

const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnstyle = { margin: "8px 0" };
export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [otpsent, setotpsent] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleScroll = (scrollId) => {
    const anchor = document.querySelector(scrollId);
    anchor.scrollIntoView({ behavior: "smooth" });
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let pages = [
    { name: "HOME", path: "/session/signin" },
    { name: "ABOUT US", path: "/session/aboutus" },
    { name: "HOW IT WORKS", path: "/session/howwework" },
    { name: "CONTACT US", path: "/session/contactus" },
    { name: "LOG IN", path: "/session/signin" },
  ];
  let sett = [
    // { name: "Profile", path: "/login" },
    { name: "About us", path: "/session/aboutus" },
    // {"Dashboard"},
    // path: "/terms&cond"
    // path: "/privacypolicy"
    { name: "Terms & Conditions", path: "/session/termsandconditions" },
    { name: "Privacy Policy", path: "/session/privacypolicy" },
    // { name: "Logout", path: "/login" },
  ];
  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.primary,
  }));

  const StyledItem = styled(MenuItem)(({ theme }) => ({
    gap: 8,
    minWidth: 185,
    display: "flex",
    alignItems: "center",
    "& a": {
      gap: 8,
      width: "100%",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
    },
    "& span": {
      // marginRight: '10px',
      color: theme.palette.text.primary,
    },
  }));

  const TopbarRoot = styled("div")(({ theme }) => ({
    top: 0,
    zIndex: 96,
    height: topBarHeight,
    boxShadow: themeShadows[8],
    transition: "all 0.3s ease",
    background: "#ffffff",
    width: "100%",
    position: "fixed",
  }));

  const TopbarContainer = styled(FlexBetween)(({ theme }) => ({
    height: "100%",
    padding: "8px",
    paddingLeft: 18,
    paddingRight: 20,
    background: "#ffffff",
    [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
    [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 },
    // justifyContent:"center",
    // width:"70%"
  }));

  const IconBox = styled("div")(({ theme }) => ({
    display: "inherit",
    [theme.breakpoints.down("md")]: { display: "none !important" },
  }));

  const UserMenu = styled(Box)(() => ({
    padding: 4,
    display: "flex",
    borderRadius: 24,
    cursor: "pointer",
    alignItems: "center",
    "& span": { margin: "0 8px" },
  }));
  //  Components
  const location = useLocation();

  var index = 0;

  switch (location.pathname) {
    case "/session/signin":
      index = 0;
      break;
    case "/session/aboutus":
      index = 1;
      break;

    case "/session/howwework":
      index = 2;
      break;
    case "/session/contactus":
      index = 3;
      break;
    case "/session/login":
      index = 4;
      break;
    // case '/property/myInvitations':
    //     index = 5;
    //     break;
    default:
      index = null;
  }
  const navigate = useNavigate();

  return (
    <>
      {/* <Navbar /> */}
      <TopbarRoot id="topBar">
        <TopbarContainer>
          <Box sx={{display: { xs: "flex", md: "none" } }}>
          <UserMenu onClick={handleOpenNavMenu}>
              <MenuIcon />
            </UserMenu>
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
              {pages.map((page, index) => (
                <Link to={page.path}>
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <UserMenu onClick={handleOpenNavMenu}>
              <MenuIcon />
            </UserMenu>
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
              {pages.map((page, index) => (
                <Link to={page.path}>
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box> */}
          <Box
            component="img"
            src="http://34.36.127.104/tenantowner/twitter_header_photo_1.png"
            sx={{height: "inherit",width: "auto"}}
          />
          <Tabs
            value={index}
            aria-label="Navigation"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
            TabIndicatorProps={{
              sx: {
                backgroundColor: "#1565c0",
              },
            }}
          >
            <Tab
              sx={{ mx: 1 }}
              label={
                <span style={index === 0 ? { color: "#1565c0" } : {}}>
                  HOME
                </span>
              }
              component={Link}
              to={"/session/signin"}
            />
            <Tab
              sx={{ mx: 1 }}
              label={
                <span style={index === 1 ? { color: "#1565c0" } : {}}>
                  ABOUT US
                </span>
              }
              component={Link}
              to={"/session/aboutus"}
            />
            <Tab
              sx={{ mx: 1 }}
              label={
                <span style={index === 2 ? { color: "#1565c0" } : {}}>
                  HOW IT WORKS
                </span>
              }
              component={Link}
              to={"/session/howwework"}
            />
            <Tab
              sx={{ mx: 1 }}
              label={
                <span style={index === 3 ? { color: "#1565c0" } : {}}>
                  CONTACT US
                </span>
              }
              component={Link}
              to={"/session/contactus"}
            />
            <Tab
              sx={{ mx: 1 }}
              label={
                <span style={index === 4 ? { color: "#1565c0" } : {}}>
                  LOG IN
                </span>
              }
              component={Link}
              to={"/session/login"}
            />
            {/* <Tab
              label={
                <span style={index === 5 ? { color: "#1565c0" } : {}}>
                  My invitations
                </span>
              }
              component={Link}
              to={"/property/myInvitations"}
            /> */}
          </Tabs>
          <Box component="div">
            <Box display="flex" alignItems="center">
              {/* <MatxSearchBox /> */}
              {/* 
                    <NotificationProvider>
                        <NotificationBar />
                    </NotificationProvider> */}

              {/* <ShoppingCart /> */}

              <MatxMenu
                menuButton={
                  <UserMenu>
                    {/* <Avatar src={user?.avatar} /> */}
                    <MenuIcon />
                  </UserMenu>
                }
              >
                <StyledItem onClick={() => navigate("/session/aboutus")}>
                  {/* <Icon>home</Icon> */}
                  <span> About us </span>
                </StyledItem>
                <StyledItem
                  onClick={() => navigate("/session/termsandconditions")}
                >
                  {/* <Icon>holiday_village</Icon> */}
                  <span> Terms and Conditions </span>
                </StyledItem>
                <StyledItem onClick={() => navigate("/session/privacypolicy")}>
                  {/* <Icon>add_home</Icon> */}
                  <span> Privacy Policy </span>
                </StyledItem>
              </MatxMenu>
            </Box>
          </Box>
        </TopbarContainer>
      </TopbarRoot>
    </>
  );
}
