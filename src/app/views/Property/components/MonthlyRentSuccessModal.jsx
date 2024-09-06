import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import {
  setOpenPayMonthlyRentModal,
  setPayMonthlyRentDraftModal,
  setViewInvoiceModal,
} from "app/redux/actions/ModalActions";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { fetchUserProfileAction } from "app/redux/actions/UserProfileActions";
import Pdf from "react-to-pdf";
import moment from "moment";
import { Height } from "@mui/icons-material";
import PayMonthlyRent from "./PayMonthlyRent";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "600px",
  },
  section: {
    marginBottom: theme.spacing(1),
  },
  sectionHeader: {
    marginBottom: theme.spacing(1),
  },
  sectionItems: {
    marginBottom: theme.spacing(1),
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minWidth: "40vw",
  maxWidth: "95vw",
  maxHeight: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const paymentData = [
  {
    description: "Rent Payment",
    tax: 2000,
    amount: 30000,
  },
  // Add more payment data as needed
];

const calculateSubtotal = () => {
  return paymentData.reduce((acc, item) => acc + item.amount, 0);
};

const taxRate = 0.1; // 10% tax rate
const subtotal = calculateSubtotal();
const tax = subtotal * taxRate;
const total = subtotal + tax;

const MonthlyRentSuccessModal = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userProfile);
  const preloginState = useSelector((state) => state.prelogin);
  const { individualProperty } = useSelector((state) => state.property);

  useEffect(() => {
    dispatch(
      fetchUserProfileAction({
        user_profile_id: preloginState.userProfileId,
        to_view_profile_id: preloginState.userProfileId,
        desired_output: "full",
      })
    );
  }, []);

  const open = useSelector((state) => state.modal.openPayMonthlyRentModal);
  const handleClose = () => {
    dispatch(setOpenPayMonthlyRentModal(false));
  };

  const classes = useStyles();
  return (
    <>
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

          <Box display="flex" justifyContent="center" sx={{ width: "100%" }}>
            <Paper
              className={classes.root}
              sx={{
                border: "2px solid #378cf552",
                padding: "15px",
                marginTop: "20px",
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                      Property Name
                    </Typography>
                    <Typography variant="inherit">
                      {individualProperty?.basic_details?.property_name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                      Property Id
                    </Typography>
                    <Typography variant="inherit">
                      {individualProperty?.basic_details?.property_id}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                      Tenancy Id
                    </Typography>
                    <Typography variant="inherit">
                      {
                        individualProperty?.tenancy_details?.tenancy_terms
                          ?.tenancy_id
                      }
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                      Email
                    </Typography>
                    <Typography variant="inherit">
                      support@amrrtechsols.com
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                      Payments Towards Year
                    </Typography>
                    <Typography variant="inherit">2023</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                      Payment Towards Month
                    </Typography>
                    <Typography variant="inherit">10</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                      Date
                    </Typography>
                    <Typography variant="inherit">
                      {moment().format("MMM Do YY")}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Grid
                xs={12}
                sm={6}
                sx={{ marginTop: "15px", marginBottom: "15px" }}
                className={classes.section}
              >
                <Typography
                  sx={{ background: "#4957b773", marginBottom: "10px" }}
                  variant="h6"
                >
                  Bill To
                </Typography>
                <Box>
                  <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                    Name
                  </Typography>
                  <Typography variant="inherit">
                    {currentUser?.first_name + " " + currentUser?.last_name}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                    Phone
                  </Typography>
                  <Typography variant="inherit">
                    {currentUser?.phone_no}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                    Email
                  </Typography>
                  <Typography variant="inherit">
                    {currentUser?.email_id}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                    Payment Mode
                  </Typography>
                  <Typography variant="inherit">Online</Typography>
                </Box>
              </Grid>
              <Box>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ paddingLeft: 2 }}
                          align="left"
                          width={"33.33%"}
                        >
                          Description
                        </TableCell>
                        <TableCell align="center" width={"33.33%"}>
                          Tax (₹)
                        </TableCell>
                        <TableCell
                          sx={{ paddingRight: 2 }}
                          align="right"
                          width={"33.33%"}
                        >
                          Amount (₹)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paymentData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ paddingLeft: 2 }} align="left">
                            {row.description}
                          </TableCell>
                          <TableCell align="center">{row.tax}</TableCell>
                          <TableCell sx={{ paddingRight: 2 }} align="right">
                            {row.amount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    alignItems: "flex-end",
                    paddingRight: 2,
                  }}
                >
                  <Typography variant="body1">
                    Subtotal: ₹ {subtotal}
                  </Typography>
                  <Typography variant="body1">Tax: ₹ {tax}</Typography>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    Total: {total}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Card>
      </Modal>
    </>
  );
};

export default MonthlyRentSuccessModal;
