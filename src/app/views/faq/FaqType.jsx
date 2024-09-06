// FaqType

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import { getFaqQuestionsAction } from "app/redux/actions/FAQActions";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import moment from "moment";

export default function FaqType() {
  const a = useParams().id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { faqQuestions } = useSelector((store) => store.faq);
  const [showSidebar, setshowSidebar] = useState(false);
  const handleToggleSidebar = () => {
    setshowSidebar(!showSidebar);
  };
  // const [LastUpdated, setLastUpdated] = useState("0 days ago");
  const faqLabels = [
    // {
    //   name: "All FAQs",
    // },
    {
      name: "Rental Agreement - FAQ",
      type: 1,
    },
    {
      name: "Tenancy Terms - FAQ",
      type: 2,
    },
    {
      name: "Premium-Package - FAQ",
      type: 3,
    },
    {
      name: "Free-Package - FAQ",
      type: 4,
    },
    {
      name: "Listing Details - FAQ",
      type: 5,
    },
    {
      name: "Communication with the tenant - FAQ",
      type: 6,
    },
    {
      name: "Basic Details - FAQ",
      type: 7,
    },
    {
      name: "Tenant Preference - FAQ",
      type: 8,
    },
    {
      name: "Contact Details - FAQ",
      type: 9,
    },
    {
      name: "Property Images - FAQ",
      type: 10,
    },
    {
      name: "Package Preference - FAQ",
      type: 11,
    },
    {
      name: "Renting/Tenancy Details - FAQ",
      type: 12,
    },
    {
      name: "Package Preference - FAQ",
      type: 13,
    },
    {
      name: "Parties in Rent Agreement - FAQ",
      type: 14,
    },
  ];
  useEffect(() => {
    const type = +a;
    dispatch(getFaqQuestionsAction({ type_id: type }));
  }, [a]);
  // useEffect(() => {
  //   if (faqQuestions !== null && faqQuestions?.length > 0) {
  //     let ans = timeSince(new Date(faqQuestions[0].last_modified_date));
  //     setLastUpdated(ans);
  //   } else {
  //     setLastUpdated("0 days ago");
  //   }
  // }, [faqQuestions]);
  // const timeSince = (date) => {
  //   var seconds = Math.floor((new Date() - date) / 1000);
  //   var interval = seconds / 31536000;
  //   if (interval > 1) {
  //     if (Math.floor(interval) === 1) return Math.floor(interval) + " year ago";
  //     return Math.floor(interval) + " years ago";
  //   }
  //   interval = seconds / 2592000;
  //   if (interval > 1) {
  //     if (Math.floor(interval) === 1)
  //       return Math.floor(interval) + " month ago";
  //     return Math.floor(interval) + " months ago";
  //   }
  //   interval = seconds / 86400;
  //   if (interval > 1) {
  //     if (Math.floor(interval) === 1) return Math.floor(interval) + " day ago";
  //     return Math.floor(interval) + " days ago";
  //   }
  //   interval = seconds / 3600;
  //   if (interval > 1) {
  //     if (Math.floor(interval) === 1) return Math.floor(interval) + " hour ago";
  //     return Math.floor(interval) + " hours ago";
  //   }
  //   interval = seconds / 60;
  //   if (interval > 1) {
  //     if (Math.floor(interval) === 1)
  //       return Math.floor(interval) + " minute ago";
  //     return Math.floor(interval) + " minutes ago";
  //   }
  //   if (Math.floor(seconds) === 1) return Math.floor(seconds) + " second ago";
  //   return Math.floor(seconds) + " seconds ago";
  // };

  return (
    <>
      <Box
        backgroundColor="white"
        height="100%"
        width="100%"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            paddingTop: 4,
            backgroundColor: "white",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <Typography fontSize="1.8rem" fontWeight="400">
                {faqLabels.filter((m) => m.type === +a)[0]?.name}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", paddingBottom: 4 }}
            fontSize="14px"
          ></Box>
        </Box>

        <Divider variant="middle" orientation="horizontal" flexItem />
        <Box paddingY={2}>
          <Grid container sx={{ paddingLeft: "5%" }}>
            <Grid item md={3} sm={5} xs={8}>
              <Box
                sx={(themes) => ({
                  [themes.breakpoints.down("md")]: {
                    // border: 'medium dashed green',
                    position: "absolute",
                  },
                  position: "sticky",
                  top: "0",
                })}
              >
                <IconButton
                  id="burger-icon"
                  sx={(themes) => ({
                    [themes.breakpoints.down("md")]: {
                      // border: 'medium dashed green',
                      display: "block",
                      position: "fixed",
                      top: 10,
                      left: 10,
                      zIndex: 100,
                    },
                    display: "none",
                  })}
                  onClick={handleToggleSidebar}
                >
                  <MenuIcon />
                </IconButton>

                <Box
                  onClick={handleToggleSidebar}
                  id="dropdown-background"
                  sx={(themes) => ({
                    [themes.breakpoints.down("md")]: {
                      // border: 'medium dashed green',
                      display: showSidebar ? "block" : "none",
                      position: "fixed",
                      top: 0,
                      left: 0,
                      zIndex: 99,
                      backdropFilter: "blur(4px)",
                      height: "100%",
                      width: "100%",
                    },
                  })}
                ></Box>
                <Paper
                  sx={(themes) => ({
                    [themes.breakpoints.down("md")]: {
                      // border: 'medium dashed green',
                      display: showSidebar ? "flex" : "none",
                      position: "fixed",
                      top: 40,
                      left: 0,
                      width: "60%",
                      zIndex: 100,
                    },
                    top: "0",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 2,
                    height: "90vh",
                    overflow: "auto",
                  })}
                >
                  <Box
                    sx={{
                      paddingLeft: { md: "24%" },
                      paddingBottom: "10px",
                      fontSize: { md: "20px", sx: "14px" },
                    }}
                  >
                    Question Types
                  </Box>
                  {faqLabels.map((faq, index) => (
                    <Box
                      key={faq.type}
                      color="primary"
                      onClick={() => {
                        dispatch(
                          getFaqQuestionsAction({ type_id: +faq?.type })
                        );
                        handleToggleSidebar();
                        navigate("/faq/" + faq?.type);
                      }}
                      sx={{ color: "#5576d2", cursor: "pointer" }}
                    >
                      {faq.name}
                    </Box>
                  ))}
                </Paper>
              </Box>
            </Grid>

            {/* <Grid md={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    paddingLeft: "24%",
                    paddingBottom: "10px",
                    fontSize: "20px",
                  }}
                >
                  Question Types
                </Box>
                {faqLabels.map((faq) => (
                  <Button
                    onClick={() => {
                      let l = "/faq/" + faq?.type;
                      dispatch(getFaqQuestionsAction({ type_id: faq?.type }));
                      navigate(l);
                    }}
                    key={faq.type}
                    color="primary"
                    sx={{
                      "&.MuiButton-text": {
                        textAlign: "left",
                      },
                    }}
                  >
                    {faq.name}
                  </Button>
                ))}
              </Box>
            </Grid> */}
            <Divider orientation="vertical" flexItem />
            <Grid md={8} paddingX={4}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
              blanditiis modi dolores illum ex. Sit perspiciatis reiciendis
              laudantium aspernatur harum quasi odio unde repellat blanditiis
              minus esse consequatur tempora nemo officiis dolore at ipsam aut,
              earum autem nihil quisquam labore sequi debitis! Iusto modi harum
              quis doloremque. Incidunt temporibus ullam velit voluptatum vel!
              <br />
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Distinctio, nesciunt!
              <Box paddingY={5}>
                {faqQuestions?.map((item) => {
                  return (
                    <>
                      <Accordion square={true}>
                        <AccordionSummary
                          sx={{ fontWeight: "bold" }}
                          variant="outlined"
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                        >
                          {" "}
                          {item.faq_question}
                        </AccordionSummary>
                        <AccordionDetails variant="outlined">
                          {item.faq_answer}
                        </AccordionDetails>
                      </Accordion>
                    </>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
