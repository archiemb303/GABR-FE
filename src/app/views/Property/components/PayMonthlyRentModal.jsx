import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
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
import { sendRentPaymentInvoiceEmailAction } from "app/redux/actions/PropertyActions";

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

const PayMonthlyRentModal = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userProfile);
  const preloginState = useSelector((state) => state.prelogin);
  const { individualProperty,verifyRentalPayment } = useSelector((state) => state.property);
  const { VERIFY_RENTAL_PAYMENT } = useSelector(
    (state) => state?.loadingAndError?.loader
  );
  const tax =
    individualProperty?.tenancy_details?.tenancy_terms?.rent_per_month *
    (individualProperty?.tenancy_details?.tenancy_terms?.tax_percentage / 100);
  const { custom } = useTheme();
  const currentYear = parseInt(individualProperty?.tenancy_details?.tenancy_terms?.start_date?.split('-')[0])
  const years = Array.from({ length: 100 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const [paymentTowardsYear, setPaymentTowardsYear] = useState(moment().year());
  const [paymentTowardsMonth, setPaymentTowardsMonth] = useState(
    moment().month()
  );

  const open = useSelector((state) => state.modal.openPayMonthlyRentModal);
  const handleClose = () => {
    dispatch(setOpenPayMonthlyRentModal(false));
  };

  useEffect(() => {
    if(verifyRentalPayment){
      if(verifyRentalPayment?.verify_var === true){
        dispatch(setOpenPayMonthlyRentRecieptModal(true))
        dispatch(
          sendRentPaymentInvoiceEmailAction({
            transaction_id:
              verifyRentalPayment?.fetch_transaction_data?.rent_payment_id,
            email_id:
              verifyRentalPayment?.fetch_transaction_data?.receipt_details
                ?.email_id,
            full_name:
              verifyRentalPayment?.fetch_transaction_data?.receipt_details
                ?.full_name,
            phone:
              verifyRentalPayment?.fetch_transaction_data?.receipt_details
                ?.phone_no,
            date: verifyRentalPayment?.fetch_transaction_data?.added_date,
            amount: verifyRentalPayment?.fetch_transaction_data?.rent_amount,
            tax_amount: verifyRentalPayment?.fetch_transaction_data?.tax,
          })
        );
        handleClose();
      }
    }
  }, [verifyRentalPayment])
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
          <Typography
            mb={3}
            id="modal-modal-title"
            variant="h5"
            textAlign={"center"}
          >
            Rent Payment
          </Typography>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                {/* <Box>
                    <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                      Property Name
                    </Typography>
                    <Typography variant="inherit">
                      {individualProperty?.basic_details?.property_name}
                    </Typography>
                  </Box> */}
              </Grid>
              {/* <Grid item xs={12}>
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
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                    Payments Towards Year
                  </Typography>
                  <Select
                    onChange={(e) => setPaymentTowardsYear(e.target.value)}
                    fullWidth
                    value={paymentTowardsYear}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                    Payment Towards Month
                  </Typography>
                  <Select
                    onChange={(e) => setPaymentTowardsMonth(e.target.value)}
                    fullWidth
                    value={paymentTowardsMonth}
                  >
                    {months.map((month, index) => (
                      <MenuItem key={index} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
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
            <Box mt={2}>
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
                        Tax (%)
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
                        {
                          individualProperty?.tenancy_details?.tenancy_terms
                            ?.tax_percentage
                        }
                      </TableCell>
                      <TableCell sx={{ paddingRight: 2 }} align="right">
                        {
                          individualProperty?.tenancy_details?.tenancy_terms
                            ?.rent_per_month
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
                  Subtotal: ₹{" "}
                  {
                    individualProperty?.tenancy_details?.tenancy_terms
                      ?.rent_per_month
                  }
                </Typography> */}
                <Typography variant="body1">Tax: ₹ {tax}</Typography>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Total: ₹
                  {individualProperty?.tenancy_details?.tenancy_terms
                    ?.rent_per_month + tax}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                textAlign: "center",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <PayMonthlyRent
                paymentTowardsYear={paymentTowardsYear}
                paymentTowardsMonth={paymentTowardsMonth}
                tax={tax}
              />
            </Box>
          </Box>
        </Card>
      </Modal>
    </>
  );
};

export default PayMonthlyRentModal;
