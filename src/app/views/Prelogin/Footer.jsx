import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Card, Grid, TextField } from "@mui/material";
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
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  generateOtpAction,
  verifyOtpAction,
} from "app/redux/actions/PreloginActions";
import Contact from "./Contact";
import CssBaseline from '@mui/material/CssBaseline';
import Aboutus from "./Aboutus";
import NavBar from "./NavBar";
import Home from "./Home";
export default function Footer() {
    const {custom} =useTheme();
 
  const Copyright=()=>{
    return (
      <>
      <Typography color="text.secondary" sx={{mt:5,ml:{md:10,xs:2}}}>
      {'Copyright © '}
      <Link color="inherit" to="/login">
        TenantOwner
      </Link>{' '}
      {/* {new Date().getFullYear()} */}
      2022-23
    </Typography>
      </>
    )
  }
    return (
        <>
        <Box component="footer">
          <Box
          align="center"
          display="flex"
          sx={{
            backgroundColor:custom.heading.tertiary,
            width:"100%",
            height:{md:"100px",xs:"150px"},
            justifyContent:"space-between",
          }}>
            <Copyright/>
            <Typography sx={{mt:4,display:"flex",flexDirection:{md:"row",xs:"column"}}}>
              <Link to="/session/signin"><Box component="span" sx={{mx:{md:4}}}>Home</Box></Link>
              <Link to="/session/aboutus"><Box component="span" sx={{mx:{md:4}}}>About us</Box></Link>
              <Link to="/session/termsandconditions"><Box component="span" sx={{mx:{md:4}}}>Terms and Conditions</Box></Link>
              <Link to="/session/privacypolicy"><Box component="span" sx={{mx:{md:4}}}>Privacy Policy</Box></Link>
            </Typography>
          </Box>
        </Box>
        </>
      )
}
