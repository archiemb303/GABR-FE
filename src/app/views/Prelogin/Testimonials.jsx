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
import img1 from "./images/img1.png"
import img2 from "./images/img2.png"
import img3 from "./images/img3.png"
export default function Testimonials() {
const { custom } = useTheme();
useEffect(() => {
  window.scrollTo(0, 0);
}, [])
    let categories = [
        {
          name: "NAINA SINGH",
          location: "Chennai",
          desc: '"I recently sold a house with Dave and while this can be a very stressful process, I felt 110% confident by partnering with Dave. He was candid, provided great feedback, helped explain clearly all details and managed the actual sale negotiation brilliantly. In addition, he was extremely responsive  to every one of my questions, no matter how small. As I move forward to now BUY my next house, I am extremely certain Dave will be the right partner to help me navigate this process."',
          url: "https://media.istockphoto.com/id/1304581885/photo/portrait-of-young-woman-smiling.jpg?b=1&s=170667a&w=0&k=20&c=_WaNgLqeJHEGbxbkxLxjJwxbuOQfps2t07jqLFwVcAQ=",
          backgroundimg:img1,

        },
        {
          name: "MANISH RATHORE",
          location: "Haryana",
          desc: '"My wife and I had a dream of downsizing from our house in Cape Elizabeth into a small condo closer to where we work and play in Portland. David and his skilled team helped make that dream a reality. The sale went smoothly, and we just closed on an ideal new place we are excited to call home. Nobody  knows Portland and the peninsula better than David. He really listens to clients and goes the extra mile with customer service, too."',
          url: "https://media.istockphoto.com/id/1409948464/photo/business-portrait.jpg?b=1&s=170667a&w=0&k=20&c=_n0G28AREp2lAWP00ybZjqlVt34O1peV8VKBw58AYiQ=",
          backgroundimg:img2,
        },
        {
          name: "ANIL NAIR",
          location: "Kerala",
          desc: '"My wife & I have moved 6 times in the last 25 years. Obviously, we have dealt with many realtors both on the buying and selling side. I have to say that David is by far the BEST realtor we have ever worked with, his professionalism, personality, attention to detail, responsiveness and his ability to close the deal was Outstanding!!! If you are buying or selling a home, do yourselves a favor and hire David Marsden!!"',
          url: "https://media.istockphoto.com/id/1384357176/photo/portrait-of-a-handsome-mexican-man.jpg?b=1&s=170667a&w=0&k=20&c=b-l65y0h0uFanA52KOCZ-iGEgL1kgHtbvPXrMkz8iUs=",
          backgroundimg:img3,
        },
      ];
    return (
        <>
        {/* <Container> */}
        <Box sx={{}}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              backgroundColor: "grey",
              pt: 2,
              mt: 2,
              color: custom.heading.preloginheading,
            }}
          >
            TESTIMONIALS
          </Typography>
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            // spaceBetween={10}
            className="mySwiper"
            loop={true}
            // autoplay={true}
          >
            {categories.map((el, index) => {
              return (
                <SwiperSlide key={index}>
                  <Slider el={el} key={index} />
                </SwiperSlide>
              );
            })}
          </Swiper>
          </Box>
          {/* </Container> */}
        </>
      );
}
