import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Card, Grid, TextField, IconButton } from "@mui/material";
import { stubFalse } from "lodash";
import { setPricingModal } from "app/redux/actions/ModalActions";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, lighten, styled } from "@mui/material";
import { H1, H3, H4, H5, Paragraph, Small } from "app/components/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minWidth: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const GridContent = styled(Box)(({ theme }) => ({
  borderRadius: 0,
  textAlign: "center",
  // transition: "all 0.3s ease",
  padding: "24px !important",
  // "&:hover": { boxShadow: themeShadows[12] },
  [theme.breakpoints.down("sm")]: { padding: "16px !important" },
}));

const PricingDetails = (props) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.openPricingDetails);

  const handleClose = () => {
    dispatch(setPricingModal(false));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <IconButton
          aria-label="close modal"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-title" variant="h7" textAlign={"center"}>
          Before we proceed please select a plan
        </Typography>
        <Typography
          id="modal-modal-description"
          variant="h6"
          textAlign={"center"}
        >
          Pricing
        </Typography>

        {/* <Grid container xs={12}> */}
        <Grid item xs={12} container>
          <Grid item xs={4} sm={4}>
            <h5>Free Property Listing ad</h5>
          </Grid>
          <Grid item xs={4} sm={4}>
            <h5>❌</h5>
          </Grid>
          <Grid item xs={4} sm={4}>
            <h5>✅</h5>
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={4} sm={4}>
            <h5>Free document management</h5>
          </Grid>
          <Grid item xs={4} sm={4}>
            <h5>❌</h5>
          </Grid>
          <Grid item xs={4} sm={4}>
            <h5>✅</h5>
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={4} sm={4}>
            <h5>Renewal alerts</h5>
          </Grid>
          <Grid item xs={4} sm={4}>
            <h5>❌</h5>
          </Grid>
          <Grid item xs={4} sm={4}>
            <h5>✅</h5>
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={4} sm={4}>
            <h5>10% off on your next listing</h5>
          </Grid>
          <Grid item xs={4} sm={4}>
            <h5>❌</h5>
          </Grid>
          <Grid item xs={4} sm={4}>
            <h5>✅</h5>
          </Grid>
        </Grid>
        {/* </Grid> */}

        <Box sx={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <Box>
            <Button
              sx={{ mt: 3 }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Choose Free
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ mt: 3 }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Get Premium
            </Button>
            <h5> INR 1000 + GST</h5>
          </Box>
        </Box>
      </Card>
    </Modal>
  );
};

export default PricingDetails;
