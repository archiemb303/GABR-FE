import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "@mui/material";
import { getFaqQuestionsAction } from "app/redux/actions/FAQActions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Faq() {
  const faqLabels = [
    // {
    //   name: "All FAQs",
    // },
    {
      name: "Rental Agreement - FAQ",
      type: "1",
    },
    {
      name: "Tenancy Terms - FAQ",
      type: "2",
    },
    {
      name: "Premium-Package - FAQ",
      type: "3",
    },
    {
      name: "Free-Package - FAQ",
      type: "4",
    },
    {
      name: "Listing Details - FAQ",
      type: "5",
    },
    {
      name: "Communication with the tenant - FAQ",
      type: "6",
    },
    {
      name: "Basic Details - FAQ",
      type: "7",
    },
    {
      name: "Tenant Preference - FAQ",
      type: "8",
    },
    {
      name: "Contact Details - FAQ",
      type: "9",
    },
    {
      name: "Property Images - FAQ",
      type: "10",
    },
    {
      name: "Package Preference - FAQ",
      type: "11",
    },
    {
      name: "Renting/Tenancy Details - FAQ",
      type: "12",
    },
    {
      name: "Package Preference - FAQ",
      type: "13",
    },
    {
      name: "Parties in Rent Agreement - FAQ",
      type: "14",
    },
    
  ];
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{ display: "flex", "justify-content": "center" }}
        backgroundColor="white"
        fontSize="1.6rem"
      >
        <Grid container>
          <Grid item md={3}></Grid>
          <Grid
            item
            md={6}
            sx={{ paddingX: { md: 0, xs: "10px" }, paddingTop: "1%" }}
          >
            <Box paddingY="10px">
              <Typography paddingLeft={3}>
                Search For Help with{" "}
                <span style={{ color: "#0073b1" }}>Tenant Owner</span>
              </Typography>
            </Box>
            <Box sx={{ paddingLeft: { md: 3 } }}>
              {faqLabels.map((item, index) => {
                return (
                  <>
                    <Box paddingY="20px">
                      <Link
                        underline="hover"
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          let l = "/faq/" + item.type;
                          navigate(l);
                        }}
                      >
                        <Typography color="#0073b1" fontSize="1.2rem">
                          {item.name}
                        </Typography>
                      </Link>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Molestiae adipisci repellat libero nihil quam hic,
                        earum ipsum maiores ea. Beatae sint similique laboriosam
                        non quae! Illum, alias molestiae. Modi suscipit ipsa
                        aut, eum architecto tempore sed ipsum cumque. Commodi
                        blanditiis doloribus suscipit neque ad.
                      </Typography>
                    </Box>
                  </>
                );
              })}
            </Box>
          </Grid>

          <Grid item md={2}></Grid>
        </Grid>
      </Box>
    </>
  );
}
