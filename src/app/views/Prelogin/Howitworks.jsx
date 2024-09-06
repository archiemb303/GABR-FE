import React from 'react';
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
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import Footer from './Footer';
import img4 from './images/img4.png';
import img5 from './images/img5.png';
import img6 from './images/img6.png';
export default function Howitworks() {
    const a = useLocation().pathname;
    //   console.log(a);
    const { custom } = useTheme();
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])
    return (
        <>
            {a === '/session/howwework' ? <NavBar /> : ''}
            <Typography
                align="center"
                sx={{
                    fontSize: '34px',
                    color: custom.heading.preloginheading,
                    mt: 10,
                }}
            >
                HOW IT WORKS?
            </Typography>
            <Box
                sx={{
                    px: { md: 30 },
                    py: { md: 10 },
                    alignContent: 'center',
                }}
                id="HOME"
            >
                <Container
                    sx={{
                        height: { md: 300, xs: 200 },
                        width: { md: 600 },
                        // ml:"-10%"
                    }}
                >
                    <iframe
                        src="https://www.youtube.com/embed/J828uvG8xC4"
                        title="Intel Humbles Nvidia"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    ></iframe>
                </Container>
                <Link to="/session/login">
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            ml: { md: '47%', xs: 20 },
                            mt: 4,
                            }}
                    >
                        LOG IN
                    </Button>
                </Link>
            </Box>
            <Container sx={{ display: { md: 'flex' }, p: 0 }} id="ABOUTUS">
                    <Card
                    sx={{
                        maxWidth: 345,
                        ml: { md: 0, xs: 3 },
                        my: { md: 0, xs: 10 },
                        height: '100%',
                    }}
                    elevation="24"
                >
                    <CardActionArea height="100%">
                        <CardMedia
                            component="img"
                            style={{ height: '140' }}
                            image={img4}
                            alt="green iguana"
                        />
                        <CardContent sx={{textAlign:"center"}}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="div"
                            >
                                FOR OWNER
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: { md: 16, xs: 10 } }}
                                fontFamily="Segoe UI Emoji"
                            >
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    fontWeight="normal"
                                >
                                    Post the property/post an ad
                                    <br />{' '}
                                </Typography>
                                • Fill in the details of your property <br />
                                • Post the add Digitally sign the agreement at
                                your convenience after finding the tenant
                                <br />• View all the required details of the
                                tenant <br />
                                • Digitally sign the agreement
                                <br />
                                • Get an e-stamped agreement
                                <br />
                                • The e-stamped agreement gets generated
                                <br />
                                • E-stamped agreement can be downloaded and
                                saved
                                <br />
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card
                    sx={{
                        maxWidth: 345,
                        ml: { md: 7, xs: 3 },
                        my: { md: 0, xs: 10 },
                    }}
                >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            style={{ height: '140' }}
                            image={img5}
                            alt="green iguana"
                        />
                        <CardContent sx={{textAlign:"center"}}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="div"
                            >
                                FOR TENANT
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: { md: 16, xs: 10 } }}
                                fontFamily="Segoe UI Emoji"
                            >
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    fontWeight="normal"
                                >
                                    Find a property that's best suited
                                    <br />
                                </Typography>
                                • Prepare the best search for yourself <br />
                                • Find best properties based on your searches
                                <br />
                                • Digitally sign the agreement at your
                                convenience
                                <br />
                                • Fill in all the required information <br />
                                • View all the required details of the tenant
                                <br />
                                • Digitally sign the agreement <br />
                                • Get an e-stamped agreement
                                <br />• E-stamped agreement can be downloaded
                                and saved
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card
                    sx={{
                        maxWidth: 345,
                        ml: { md: 7, xs: 3 },
                        my: { md: 0, xs: 10 },
                    }}
                >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            style={{ height: '140' }}
                            image={img6}
                            alt="green iguana"
                        />
                        <CardContent sx={{ height: '100%', pb:"21px",textAlign:"center"}}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="div"
                            >
                                FOR AGENT
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: { md: 16, xs: 10 } }}
                                fontFamily="Segoe UI Emoji"
                            >
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    fontWeight="normal"
                                >
                                    Find best properties for tenant
                                    <br />
                                </Typography>
                                • Help tenants find the best property with
                                required searches
                                <br />
                                • Find best tenant for owners
                                <br />
                                • Find the tenants that match the owner’s
                                requirement
                                <br />• Make the best matches of owners and
                                tenants
                                <br />
                                • Add the tenant to the party when the owner’s
                                and tenant’s requirement matches
                                <br />• Add the tenant to the party when the
                                owner’s and tenant’s requirement matches.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Container>
            <Link to="/session/login">
                <Button
                    variant="contained"
                    color="primary"
                    // alignItems="center"

                    sx={{
                        // alignItems:"center",
                        ml: { md: '47%', xs: 20 },
                        mt: 4,
                        mb: 10,
                    }}
                >
                    LOG IN
                </Button>
            </Link>
            {a === '/session/howwework' ? <Footer /> : ''}
        </>
    );
}
