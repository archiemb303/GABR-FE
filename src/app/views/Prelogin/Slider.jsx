import React from 'react'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Autoplay } from "swiper";
import { mt } from 'date-fns/locale';


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  variableWidth: true,
  swipeToSlide: true,
  edgeFriction: 0.15,
};
export default function slider(props) {
  return (
    <>
    <div style={{"position":"relative"}}>
      <Box component="img" src={props.el.backgroundimg}
      sx={{
        display: "block",
        height: "auto",
        objectFit: "contain",
        width:{xs:"100%"},

        // width:{md:"181%",xs:"50px"},
        height:{md:"700px",xs:"272px"},
        // height: {xs:"80%"},
        py:{md:"70px",xs:0}
      }}></Box>
      <Box
          sx={{
            position:"absolute",
            background:"#FFFFFF",
            borderRadius:"5px",
            top:"190px",
            // mt:"-13%",
            backgroundColor: "white",
            mt: { md: "-8%",xs:"-43%" },
            ml: { md: 5, xs: "8%" },
            height: { md: 400, xs: "77%" },
            width: { md: 800, xs: "84%" },
            display:"flex",
          }}
        >
          <Box alignItems="center">
          <Box component="img" src={props.el.url}
          sx={{
            width:{md:"200px",xs:"118px"},
            mt:{md:20},
            borderRadius:10,
            ml:{md:"32px"}
          }}
          />
          <Box sx={{ml:{md:10,xs:2}}}>
          <Typography sx={{justifyContent:"start",display:"flex"}}>
          <b>{props.el.name}</b>
          </Typography>
          <Typography sx={{justifyContent:"start",display:"flex"}}>
          {props.el.location}
          </Typography>
          </Box>
          </Box>
          <Typography
          alignContent="center"
          alignItems="center"
          sx={{
            mt:{md:10,xs:"3%"},
            fontSize:{md:"18px",xs:"10px"},
            px:{md:3},
            pr:{md:4}
          }}
          >
            {props.el.desc}
          </Typography>
        </Box>
    </div>
    </>
  )
}
