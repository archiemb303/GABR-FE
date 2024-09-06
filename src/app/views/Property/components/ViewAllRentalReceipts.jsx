import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import {
  setOpenViewAllReceiptModal,
  setOpenViewReceiptModal,
} from "app/redux/actions/ModalActions";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { sendBulkStampRequestAction } from "app/redux/actions/SupportCenterActions";
import InvitationButton from "../InvitationButton";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  fetchAllRentalPaymentReceipts,
  fetchIndividualPaymentReceipts,
} from "app/redux/actions/PropertyActions";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "70vw",
  maxWidth: "95vw",
  maxHeight: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const ViewAllRentalReceipts = () => {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.modal.openViewAllRentReceiptsModal);
  const { individualProperty, rentalReceipts } = useSelector(
    (state) => state.property
  );
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;
  const handleClose = () => {
    dispatch(setOpenViewAllReceiptModal(false));
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
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" width={"30%"}>
                    Rent Payment ID
                  </TableCell>
                  <TableCell align="center" width={"25%"}>
                    Tenancy ID
                  </TableCell>
                  <TableCell align="center" width={"15%"}>
                    Date
                  </TableCell>
                  <TableCell align="center" width={"15%"}>
                    Amount Paid
                  </TableCell>
                  <TableCell align="center" width={"15%"}>
                    Payment Status
                  </TableCell>
                  <TableCell align="center" width={"15%"}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rentalReceipts?.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {/* {row.property_name} */}
                      {row.rent_payment_id}
                    </TableCell>
                    <TableCell align="center">{row?.tenancy_id}</TableCell>
                    <TableCell align="center">
                      {/* {row?.sender_fname + " " + row?.sender_lname} */}
                      {moment(row?.added_date).format("DD-MMM-YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      {/* {row?.sender_fname + " " + row?.sender_lname} */}
                      {row?.amount_paid}
                    </TableCell>
                    <TableCell align="center">
                      {row?.payment_status === 1
                        ? "Paid"
                        : row?.payment_status === 2
                        ? "Pending"
                        : "Failure"}
                    </TableCell>
                    <TableCell align="center">
                      {/* <InvitationButton propertyInvitation={row} /> */}
                      <Button
                        onClick={() => {
                          dispatch(
                            fetchIndividualPaymentReceipts({
                              rent_payment_id: row.rent_payment_id,
                            })
                          );
                          dispatch(
                            setOpenViewReceiptModal({
                              flag: true,
                              type: "Rental Payment Receipt",
                            })
                          );
                        }}
                      >
                        View Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </Modal>
  );
};

export default ViewAllRentalReceipts;
