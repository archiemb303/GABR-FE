import {
  alpha,
  Box,
  Button,
  Card,
  styled,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { setViewInvoiceModal } from "app/redux/actions/ModalActions";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ViewInvoiceModal from "../Property/ViewInvoiceModal";
import { StyledTable } from "./InvoiceViewer";

const Container = styled(Box)(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

// const StyledTable = styled(Table)(({ theme }) => ({
//   minWidth: 750,
//   "& thead": {
//     "& tr": {
//       background: theme.palette.background.default,
//       "& th": {
//         paddingLeft: 0,
//         paddingRight: 0,
//       },
//       "& th:first-of-type": {
//         paddingLeft: "24px !important",
//         [theme.breakpoints.down("sm")]: {
//           paddingLeft: "16px !important",
//         },
//       },
//     },
//   },
//   "& tbody": {
//     "& tr": {
//       "& td": {
//         paddingLeft: 0,
//         textTransform: "capitalize",
//       },
//       "& td:first-of-type": {
//         textTransform: "capitalize",
//         paddingLeft: "24px !important",
//         [theme.breakpoints.down("sm")]: {
//           paddingLeft: "16px !important",
//         },
//       },
//     },
//   },
// }));

const Invoice = styled("small")(({ theme, status }) => ({
  borderRadius: "8px",
  padding: ".3rem .5rem",
  ...(status === "delivered" && {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  }),
  ...(status === "processing" && {
    color: theme.palette.secondary.main,
    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
  }),
  ...(status === "pending" && {
    color: theme.palette.error.main,
    backgroundColor: alpha(theme.palette.error.main, 0.1),
  }),
}));

const InvoiceList = ({ walletTransactions }) => {
  const dispatch = useDispatch();

  return (
    <>
      <ViewInvoiceModal></ViewInvoiceModal>

      <Container>
        <Card elevation={6} sx={{ width: "100%", overflow: "auto" }}>
          <StyledTable sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell>Wallet Transaction Id</TableCell>
                <TableCell>Transaction Date</TableCell>
                <TableCell>Details</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {walletTransactions?.map((transaction, i) => (
                <TableRow key={i}>
                  <TableCell align="left">
                    {transaction?.wallet_transaction_id?.substring(0, 8) +
                      "..."}
                  </TableCell>
                  <TableCell align="left">
                    {transaction?.added_date?.substring(0, 10)}
                  </TableCell>
                  {/* <Button onClick={() => dispatch(setViewInvoiceModal(true))}> */}
                  <TableCell
                    sx={{ cursor: "pointer", color: "#1976D2" }}
                    onClick={() =>
                      dispatch(setViewInvoiceModal({ flag: true, index: i }))
                    }
                    align="left"
                  >
                    {transaction.transaction_type === 1
                      ? "Purchase (View Invoice)"
                      : "Consumption (View Details)"}
                  </TableCell>
                  <TableCell align="center">
                    {transaction?.purchase_quantity}
                  </TableCell>
                  {/* </Button> */}
                  <TableCell align="center">
                    {" "}
                    ₹{transaction?.transaction_amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </Card>
      </Container>
    </>
  );
};

export default InvoiceList;
