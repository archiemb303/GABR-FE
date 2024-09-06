import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Card, Grid, TextField } from '@mui/material';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.min.css';
import './swiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import {
    AspectRatio,
    CenterFocusStrong,
    CheckBox,
    ConfirmationNumber,
} from '@mui/icons-material';
import Slider from './Slider';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@emotion/react';
import {
    generateOtpAction,
    verifyOtpAction,
} from 'app/redux/actions/PreloginActions';
import Contact from './Contact';
import CssBaseline from '@mui/material/CssBaseline';
import Aboutus from './Aboutus';
import NavBar from './NavBar';
import Home from './Home';
import Howitworks from './Howitworks';
import Testimonials from './Testimonials';
import Footer from './Footer';
import Loading from 'app/components/MatxLoading';
import Login from './Login';

export default function Signup() {
    const { prelogin } = useSelector((state) => state);

    return !prelogin.isLoggedIn ? (
        <>
            {/* <NavBar /> */}
            <Home />
            {/* <Login />
            <Howitworks />
            <Testimonials /> */}
            {/* <Aboutus/> */}
            {/* <Contact id="CONTACT" />
            <Footer /> */}
        </>
    ) : (
        <>
            <Loading />
            <Navigate replace to="/dashboard" />
        </>
    );
}
// export default Signup
