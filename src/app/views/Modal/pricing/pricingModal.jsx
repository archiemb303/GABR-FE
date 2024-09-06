import React from "react";
import PricingDetails from "./PricingDetails";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  Icon,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { setPricingModal } from "app/redux/actions/ModalActions";
import { useDispatch, useSelector } from "react-redux";

const PricingPage = () => {
  const dispatch = useDispatch();
  return (
    <>
      <PricingDetails />
      <Button
        variant="text"
        color="primary"
        onClick={() => {
          dispatch(setPricingModal(true));
        }}
      >
        Show Pricing
      </Button>
    </>
  );
};

export default PricingPage;
