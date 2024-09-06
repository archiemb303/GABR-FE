import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import img89 from "./images/image89.png"
import img9 from "./images/img9.png"
import img8 from "./images/img8.png"
import img1 from "./images/img1.png"
import img2 from "./images/img2.png"
import img3 from "./images/img3.png"
import img7 from "./images/img7.png"

const delay = 5000;

const useStyles = makeStyles({
  slideshow: {
    overflow: "hidden",
    minHeight: "100vh",
    width: "100%",
    position: "relative",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  slideshowSlider: {
    whiteSpace: "nowrap",
    transition: "ease 2000ms"
  },
  slide: {
    display: "inline-block",
    minHeight: "100vh",
    width: "100%"
    /* backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover" */
    /* backgroundAttachment: "fixed" */
  }
});

const MyCollection = [
  img89,
  img8,
  img9,
  img1,
  img2,
  img3,
  img7,

];
export default function SliderShow() {
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === MyCollection.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [index]);
  return (
    <div className={classes.slideshow}>
      <Paper
        className={classes.slideshowSlider}
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {MyCollection.map((i, index) => (
            <div
            key={index}
            className={classes.slide}
            style={{ backgroundImage: `url(${i})`,width:"100%" }}
            />
        ))}
      </Paper>
    </div>
  );
}
