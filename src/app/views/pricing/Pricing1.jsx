import { Box, Button, Card, Grid, lighten, styled, Typography } from "@mui/material";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import { H1, H5 } from "app/components/Typography";
import React from "react";

const Container = styled(Box)(({ theme }) => ({
  margin: "30px",
  position: "relative",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  padding: "24px",
  boxShadow: "none",
  marginBottom: "44px",
  background: lighten(theme.palette.error.main, 0.85),
}));

const GridContent = styled(Card)(({ theme }) => ({
  borderRadius: 0,
  textAlign: "center",
  transition: "all 0.3s ease",
  padding: "24px !important",
  "&:hover": { boxShadow: themeShadows[12] },
  [theme.breakpoints.down("sm")]: { padding: "16px !important" },
}));

const Pricing = (props) => {
  return (
    <Container sx={{marginX: '0', padding: '0'}}>

      <Grid container spacing={3}>
        {planList.map((item, i) => (
          <Grid key={item.point} item md={3} sm={6} xs={12}>
            <GridContent elevation={6} sx={{borderRadius: "5px", minWidth: '210px'}}>

              <Box mb={2} height={100}>

                <H1
                  sx={{
                    fontSize: "30px",
                    color: "primary.main",
                    textTransform: "uppercase",
                  }}
                >
               {item.point} Points
                </H1>
              

                <Typography fontSize='20px' variant='body1' color="text.secondary">₹{item.price}</Typography>
                <Typography  variant='body1' color="text.secondary">{(i !== 0) ?(<><s>₹{item.total}</s>  ({item.discount}% off)</>): ''}</Typography>
              </Box>

              <Button
              onClick={() => props.onClick(item.point)}
                variant="contained"
                color="primary"
                sx={{ textTransform: "uppercase" }}
              >
                Buy now
              </Button>
            </GridContent>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const planList = [
  {
    point: 2,
    total: 999,
    price: 999,
    discount:0,
    logo: "/assets/images/illustrations/baby.svg",
  },
  {
    point: 6,
    total: 3000,
    price: 2699,
    discount: 10,
    logo: "/assets/images/illustrations/upgrade.svg",
  },
  {
    point: 10,
    total: 5000,
    price: 4249,
    discount: 15,
    logo: "/assets/images/illustrations/upgrade.svg",
  },
  {
    point: 20,
    total: 10000,
    price: 7999,
    discount: 20,
    logo: "/assets/images/illustrations/business_deal.svg",
  },
];
export default Pricing;
