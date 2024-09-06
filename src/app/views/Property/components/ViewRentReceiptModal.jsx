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
import { setOpenViewReceiptModal } from "app/redux/actions/ModalActions";
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
  width: "90%",
  maxHeight: "97%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2.5,
  overflow: "auto",
};

const invoiceBtnHiddenSm = makeStyles((theme) => ({
  hiddenSmInvoice: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

const smallScreenTable = makeStyles((theme) => ({
  hiddenSm: {
    [theme.breakpoints.down("sm")]: {
      width: "335px",
    },
  },
}));

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

// const [subtotal, setSubtotal] = useState(0);

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [createRow("Rent Amount ")];

// const invoiceSubtotal = subtotal(rows);
// const gst = subtotal * 0.2;
// const total = subtotal + gst;

const ViewRentReceiptModal = () => {
  const dispatch = useDispatch();
  const ref = React.createRef();
  const currentUser = useSelector((state) => state.userProfile);
  const preloginState = useSelector((state) => state.prelogin);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [user, setUser] = useState({
    first_name: currentUser?.first_name,
    last_name: currentUser?.last_name,
    email: currentUser?.email_id,
    phone_no: currentUser?.phone_no,
  });

  useEffect(() => {
    const params = {
      user_profile_id: preloginState.userProfileId,
      to_view_profile_id: preloginState.userProfileId,
      desired_output: "full",
    };

    dispatch(fetchUserProfileAction(params));
  }, []);

  const open = useSelector((state) => state.modal.openViewRentReceiptModal);
  const { fetchMyWalletTransactions } = useSelector((state) => state.wallet);
  const { individualRentalPaymentReceipt } = useSelector(
    (state) => state.property
  );

  const handleClose = () => {
    dispatch(setOpenViewReceiptModal({ flag: false, type: "" }));
  };

  const invoiceTotal = () => {
    const gst =
      fetchMyWalletTransactions?.wallet_transactions[open.index]
        ?.transaction_amount * 0.18;
    const total =
      fetchMyWalletTransactions?.wallet_transactions[open.index]
        ?.transaction_amount + gst;
    return {
      gst: gst,
      total: total,
    };
  };

  const totalAmount = invoiceTotal();

  const invoiceBtnClasses = invoiceBtnHiddenSm();
  const smallScreenTableCall = smallScreenTable();
  const classes = useStyles();
  const userCopy = { ...user };
  return (
    <>
      <Modal
        open={open.flag}
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

          <Grid container justifyContent="center" sx={{ width: "100%" }}>
            <Paper
              ref={ref}
              className={classes.root}
              sx={{
                border: "2px solid #378cf552",
                padding: "15px",
                marginTop: "20px",
              }}
            >
              <Typography>
                <img
                  style={{ width: "100%", height: "150px" }}
                  src="https://i.ibb.co/F4WvXP9/Tan-wonner.jpg"
                  alt=""
                />
                {/* <img style={{width:'100%', height:'150px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStKbI0JYZFAXrGNHlamCl4dnYSmopYS1bBfw&usqp=CAU" alt="" /> */}
              </Typography>
              <Typography
                variant="h4"
                className={classes.sectionHeader}
                sx={{ textAlign: "center", color: "#8c8cf1" }}
              >
                {open.type}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant="inherit">
                    <span style={{ fontSize: "16px", fontWeight: 700 }}>
                      Rent Payment ID :
                    </span>{" "}
                    {individualRentalPaymentReceipt?.rent_payment_id}
                  </Typography>

                  <Typography variant="inherit">
                    <span style={{ fontSize: "16px", fontWeight: 700 }}>
                      Property ID:
                    </span>{" "}
                    {individualRentalPaymentReceipt?.property_id.slice(-5)}
                  </Typography>

                  <Typography variant="inherit">
                    <span style={{ fontSize: "16px", fontWeight: 700 }}>
                      Property Name:
                    </span>{" "}
                    {individualRentalPaymentReceipt?.property_name}
                  </Typography>

                  <Typography variant="inherit">
                    <span style={{ fontSize: "16px", fontWeight: 700 }}>
                      Tenancy ID:
                    </span>{" "}
                    {individualRentalPaymentReceipt?.tenancy_id.slice(-5)}
                  </Typography>
                  <Typography variant="inherit">
                    <div style={{ fontSize: "16px", fontWeight: 700 }}>
                      Tenancy Date:
                    </div>{" "}
                    {moment(
                      individualRentalPaymentReceipt?.tenancy_start_date
                    ).format("DD-MMM-YYYY")}{" "}
                    to{" "}
                    {moment(
                      individualRentalPaymentReceipt?.tenancy_end_date
                    ).format("DD-MMM-YYYY")}
                  </Typography>
                  <Typography variant="inherit">
                    <span style={{ fontSize: "16px", fontWeight: 700 }}>
                      Address:
                    </span>{" "}
                    Tenant Owner , Bangalore
                  </Typography>
                  <Typography variant="inherit">
                    <span style={{ fontSize: "16px", fontWeight: 700 }}>
                      Email:
                    </span>{" "}
                    support@amrrtechsols.com
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant="inherit">
                    <span style={{ fontSize: "16px", fontWeight: 700 }}>
                      Payment Status:
                    </span>{" "}
                    {individualRentalPaymentReceipt?.payment_status === 1
                      ? "Paid"
                      : individualRentalPaymentReceipt?.payment_status === 2
                      ? "Pending"
                      : "Failure"}
                  </Typography>
                  <Typography variant="inherit">
                    <span style={{ fontSize: "16px", fontWeight: 700 }}>
                      Payment towards Month:
                    </span>{" "}
                    {
                      monthNames.slice(
                        individualRentalPaymentReceipt?.payment_towards_month -
                          1,
                        individualRentalPaymentReceipt?.payment_towards_month
                      )[0]
                    }
                    /{individualRentalPaymentReceipt?.payment_towards_year}
                  </Typography>
                  <Typography variant="inherit">
                    <span style={{ fontSize: "16px", fontWeight: 700 }}>
                      Payment Mode:
                    </span>{" "}
                    Online - RazorPay
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
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
                <Typography variant="inherit">
                  <span style={{ fontSize: "16px", fontWeight: 700 }}>
                    Customer Name:
                  </span>{" "}
                  {individualRentalPaymentReceipt?.receipt_details?.full_name}
                </Typography>
                <Typography variant="inherit">
                  <span style={{ fontSize: "16px", fontWeight: 700 }}>
                    Phone:
                  </span>{" "}
                  {individualRentalPaymentReceipt?.receipt_details?.phone_no}
                </Typography>
                <Typography variant="inherit">
                  <span style={{ fontSize: "16px", fontWeight: 700 }}>
                    Email:
                  </span>{" "}
                  {individualRentalPaymentReceipt?.receipt_details?.email_id}
                </Typography>
              </Grid>

              <Grid item xs={12} className={classes.smallScreenTableCall}>
                <TableContainer component={Paper}>
                  <Table aria-label="spanning table">
                    <TableHead>
                      <TableRow
                        sx={{
                          borderBottom: "2px solid #bbbbbb",

                          textAlign: "center",
                        }}
                      >
                        <TableCell colSpan={3}>Description</TableCell>
                        <TableCell colSpan={2} align="center">
                          Rent
                        </TableCell>
                        <TableCell colSpan={4} align="right">
                          Payment Towards Month
                        </TableCell>

                        <TableCell colSpan={3} align="right">
                          Amount
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          sx={{ borderBottom: "1px solid #bbbbbb" }}
                          key={row.desc}
                        >
                          <TableCell
                            colSpan={3}
                            sx={{ borderBottom: "1px solid #bbbbbb" }}
                          >
                            {row.desc}
                          </TableCell>
                          <TableCell
                            sx={{ borderBottom: "1px solid #bbbbbb" }}
                            align="center"
                            colSpan={2}
                          >
                            {individualRentalPaymentReceipt?.rent_amount}
                          </TableCell>
                          <TableCell
                            sx={{ borderBottom: "1px solid #bbbbbb" }}
                            align="right"
                            colSpan={4}
                          >
                            {/* 18% */}
                            {
                              monthNames.slice(
                                individualRentalPaymentReceipt?.payment_towards_month -
                                  1,
                                individualRentalPaymentReceipt?.payment_towards_month
                              )[0]
                            }{" "}
                            /{" "}
                            {
                              individualRentalPaymentReceipt?.payment_towards_year
                            }
                          </TableCell>
                          <TableCell
                            sx={{ borderBottom: "1px solid #bbbbbb" }}
                            align="right"
                            colSpan={3}
                            // className={classes.TableSmallScreenSize}
                          >
                            ₹ {individualRentalPaymentReceipt?.rent_amount}
                          </TableCell>
                        </TableRow>
                      ))}

                      <TableRow sx={{ borderBottom: "2px solid white" }}>
                        <TableCell colSpan={4}></TableCell>
                        <TableCell align="right" colSpan={3}></TableCell>
                        <TableCell align="center" colSpan={3}>
                          Subtotal:
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "13px" }}
                          align="right"
                          colSpan={2.5}
                        >
                          ₹ {individualRentalPaymentReceipt?.rent_amount}
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ borderBottom: "2px solid white" }}>
                        <TableCell colSpan={4}></TableCell>
                        <TableCell align="right" colSpan={3}></TableCell>
                        <TableCell align="center" colSpan={3}>
                          Tax :
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "13px" }}
                          align="right"
                          colSpan={2.5}
                        >
                          ₹ {individualRentalPaymentReceipt?.tax}
                        </TableCell>
                      </TableRow>

                      <TableRow sx={{ borderBottom: "2px solid white" }}>
                        <TableCell colSpan={4}></TableCell>
                        <TableCell align="right" colSpan={3}></TableCell>
                        <TableCell
                          align="center"
                          colSpan={3}
                          sx={{ fontSize: "22px" }}
                        >
                          Total:
                        </TableCell>
                        <TableCell align="right" colSpan={2.5}>
                          ₹ {individualRentalPaymentReceipt?.amount_paid}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Paper>
          </Grid>

          <Box
            sx={{
              textAlign: "center",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <Pdf targetRef={ref} x={27} size="A4" y={26} filename="invoice">
              {({ toPdf }) => (
                <Button
                  className={`${classes.classNameBtn} ${invoiceBtnClasses.hiddenSmInvoice}`}
                  variant="contained"
                  onClick={toPdf}
                >
                  Download Order
                </Button>
              )}
            </Pdf>
          </Box>

          <Grid container justifyContent="flex-end" gap={3}>
            <Button
              onClick={() => handleClose()}
              sx={{ marginTop: "20px" }}
              variant="contained"
            >
              Close
            </Button>
          </Grid>
        </Card>
      </Modal>
    </>
  );
};

export default ViewRentReceiptModal;
