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
  setOpenPayMonthlyRentRecieptModal,
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
import { CheckCircleOutline, Height } from "@mui/icons-material";
import PayMonthlyRent from "./PayMonthlyRent";
import { useTheme } from "@emotion/react";

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

const PayMonthlyRentReciptModal = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userProfile);
  const preloginState = useSelector((state) => state.prelogin);
  const { individualProperty, verifyRentalPayment } = useSelector(
    (state) => state.property
  );
  const { VERIFY_RENTAL_PAYMENT } = useSelector(
    (state) => state?.loadingAndError?.loader
  );
  const { custom } = useTheme();

  const open = useSelector(
    (state) => state.modal.openPayMonthlyRentReceiptModal
  );
  const handleClose = () => {
    dispatch(setOpenPayMonthlyRentRecieptModal(false));
    dispatch({
      type: "INITIATE_RENTAL_PAYMENT",
      payload: null,
    });
    dispatch({
      type: "VERIFY_RENTAL_PAYMENT",
      payload: null,
    });
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
          <Box display="flex" flexDirection={"column"} alignItems="center">
            <CheckCircleOutline color="success" sx={{ fontSize: "12rem" }} />
            <Typography
              textAlign="center"
              id="modal-modal-title"
              variant="h5"
              color={custom.c13}
            >
              Payment Successfull !
            </Typography>
            <Typography
              textAlign="center"
              mt={1}
              id="modal-modal-title"
              variant="body1"
              color="GrayText"
            >
              Transaction Number:{" "}
              {verifyRentalPayment?.fetch_transaction_data?.rent_payment_id}
            </Typography>
          </Box>
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
                {/* <Grid item xs={12}>
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
                </Grid> */}
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                      Payments Towards Year
                    </Typography>
                    <Typography variant="inherit">
                      {
                        verifyRentalPayment?.fetch_transaction_data
                          ?.payment_towards_year
                      }
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                      Payment Towards Month
                    </Typography>
                    <Typography variant="inherit">
                      {
                        verifyRentalPayment?.fetch_transaction_data
                          ?.payment_towards_month
                      }
                    </Typography>
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

              {/* <Grid
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
              </Grid> */}
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
                      <TableRow>
                        <TableCell sx={{ paddingLeft: 2 }} align="left">
                          Rental Payment
                        </TableCell>
                        <TableCell align="center">
                          {verifyRentalPayment?.fetch_transaction_data?.tax}
                        </TableCell>
                        <TableCell sx={{ paddingRight: 2 }} align="right">
                          {
                            verifyRentalPayment?.fetch_transaction_data
                              ?.rent_amount
                          }
                        </TableCell>
                      </TableRow>
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
                  {/* <Typography variant="body1">
                    Subtotal: ₹ {subtotal}
                  </Typography> */}
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    Total: ₹{" "}
                    {verifyRentalPayment?.fetch_transaction_data?.amount_paid}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
          </Box>
        </Card>
      </Modal>
    </>
  );
};

export default PayMonthlyRentReciptModal;
