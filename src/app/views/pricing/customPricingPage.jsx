import {
  Box,
  Button,
  Card,
  Grid,
  Icon,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import { H1, H3, H4 } from "app/components/Typography";
import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const PricingCard = styled(Card)(({ theme, plan }) => ({
  display: "flex",
  padding: "56px 24px",
  alignItems: "flex-start",
  flexDirection: "column",
  "& .icon": { fontSize: "72px", marginBottom: "56px" },
  background:
    plan && plan !== "monthly"
      ? "rgba(9, 182, 109, 1)"
      : plan && theme.palette.primary.main,
}));

const PriceBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginLeft: "30px",
  marginBottom: "10px",
  "& h1": { fontSize: "48px" },
}));

// const ContentBox = styled(Box)(() => ({
//   maxWidth: 280,
//   display: "flex",
//   overflow: "hidden",
//   marginBottom: "48px",
//   borderRadius: "300px",
//   boxShadow: themeShadows[1],
// }));

// const StyledButton = styled(Button)(({ plan }) => ({
//   flexGrow: 1,
//   borderRadius: "0px",
//   transition: "all 0.3s ease",
//   "&:hover": { boxShadow: themeShadows[12] },
//   background: plan !== "monthly" && plan !== "annual" && "#fff",
// }));

const RoundedButton = styled(Button)(() => ({
  fontSize: "18px",
  overflow: "hidden",
  paddingLeft: "28px",
  paddingRight: "28px",
  borderRadius: "300px",
  transition: "all 0.3s ease",
  "&:hover": { boxShadow: themeShadows[12] },
}));

const CustomPricingPage = () => {
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;
  const textPrimary = palette.primary.main;
  const [plan, setPlan] = useState("monthly");

  return (
    <Box mb={7} mx="auto" maxWidth={850}>
      <H4 sx={{ mb: 6, fontSize: 24, textAlign: "left" }}>
        Before we proceed please select a plan
      </H4>
      <H1 sx={{ mb: 6, fontSize: 32, textAlign: "center" }}>Pricing</H1>

      <div>
        <Grid
          container
          xs={12}
          spacing={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item md={6} sm={6} xs={6}>
            <PricingCard elevation={3}>
              <PriceBox>
                <CheckCircleIcon color={"success"} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>Free property listing ad</H4>
              </PriceBox>
              <PriceBox>
                <CheckCircleIcon color={"success"} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>Listing visible to all</H4>
              </PriceBox>
              <PriceBox>
                <CheckCircleIcon color={"success"} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>
                  Listing visible till property is let out*
                </H4>
              </PriceBox>
              <PriceBox>
                <CheckCircleIcon color={"success"} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>Free digital signing*</H4>
              </PriceBox>
              <PriceBox>
                <CheckCircleIcon color={"success"} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}> Renewal alerts</H4>
              </PriceBox>
              <PriceBox>
                <CheckCircleIcon color={"success"} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>Free communications</H4>
              </PriceBox>
              <PriceBox>
                <CheckCircleIcon color={"success"} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>Free document management</H4>
              </PriceBox>
              <PriceBox>
                <CheckCircleIcon color={"success"} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>Free document management</H4>
              </PriceBox>
              <PriceBox>
                <CheckCircleIcon color={"success"} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>Online rent payments*</H4>
              </PriceBox>
              <PriceBox>
                <CheckCircleIcon color={"success"} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>10% off on your next listing*</H4>
              </PriceBox>
              <Box
                sx={{
                  marginTop: "15px",
                  marginLeft: "25%",
                  marginRight: "10%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <RoundedButton variant="contained" color="primary">
                  Get Premium
                </RoundedButton>
                <h5> INR 1000 + GST</h5>
              </Box>
            </PricingCard>
          </Grid>

          <Grid item md={6} sm={6} xs={6}>
            <PricingCard elevation={3}>
              <PriceBox>
                <CheckCircleIcon color={"success"} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>
                  Listing visible only to premium seekers
                </H4>
              </PriceBox>
              <PriceBox>
                <CheckCircleIcon color={"success"} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>Listing visible for 7 days</H4>
              </PriceBox>
              <PriceBox>
                <CancelIcon style={{ color: "red" }} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>Free rental agreement</H4>
              </PriceBox>
              <PriceBox>
                <CancelIcon style={{ color: "red" }} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>Free digital signing</H4>
              </PriceBox>
              <PriceBox>
                <CancelIcon style={{ color: "red" }} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}> Renewal alerts</H4>
              </PriceBox>
              <PriceBox>
                <CancelIcon style={{ color: "red" }} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}> Free communications</H4>
              </PriceBox>
              <PriceBox>
                <CancelIcon style={{ color: "red" }} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}> Free rent receipts</H4>
              </PriceBox>
              <PriceBox>
                <CancelIcon style={{ color: "red" }} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>Listing visible for 7 days</H4>
              </PriceBox>
              <PriceBox>
                <CancelIcon style={{ color: "red" }} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>Online rent payments*</H4>
              </PriceBox>
              <PriceBox>
                <CancelIcon style={{ color: "red" }} /> &emsp;
                <H4 sx={{ fontSize: "15px" }}>10% off on your next listing*</H4>
              </PriceBox>
              <Box
                sx={{
                  marginTop: "15px",
                  marginLeft: "25%",
                  marginRight: "10%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <RoundedButton variant="contained" color="primary">
                  Choose Free
                </RoundedButton>
                <h5> INR 0</h5>
              </Box>
            </PricingCard>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default CustomPricingPage;
