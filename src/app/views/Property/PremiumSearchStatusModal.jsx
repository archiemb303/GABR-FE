import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Loading from "app/components/MatxLoading";
import {
  setListingConfirmationModal,
  setPackagePreferenceModal,
  setPackagePreferenceSuccessModal,
  setPremiumPackageStatusModal,
  setPremiumSearchStatusModal,
  setPremiumSearchSuccessModal,
} from "app/redux/actions/ModalActions";
import {
  addPremiumSeekerAction,
  publishListingAction,
  selectPackagePreferenceAction,
} from "app/redux/actions/PropertyActions";
import { FetchMyWalletTransactionsAction } from "app/redux/actions/WalletActions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Order from "../Order/Order";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "92%",
  maxHeight: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const PremiumSearchStatusModal = ({ individualProperty }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.openPremiumSearchStatusModal);
  const { fetchMyWalletTransactions } = useSelector((state) => state.wallet);

  const handlePackagePreference = () => {
    // dispatch(
    //   selectPackagePreferenceAction({
    //     listing_id: individualProperty?.listing_details?.listing_id
    //       ? individualProperty?.listing_details?.listing_id
    //       : "",
    //     property_id: individualProperty?.basic_details?.property_id,
    //     package_type: "P",
    //   })
    // );
    // fetchMyWalletTransactions?.wallet_transaction?.wallet_transaction_id
    dispatch(
      addPremiumSeekerAction({
        premium_purchase_transaction_id:
          fetchMyWalletTransactions?.wallet_transactions[0].wallet_transaction_id,
      })
    );;
    handleClose();
    dispatch(setPremiumSearchSuccessModal(true));
  };

  const handleClose = () => {
    // dispatch((false));
    dispatch(setPremiumSearchStatusModal(false));
  };

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
          <Grid container justifyContent="center">
            {fetchMyWalletTransactions?.credit_point_balance < 2 && (
              <Typography variant="h5">
                You don't have enough credits to make this purchase.
              </Typography>
            )}
          </Grid>
          <Order />
          <Grid container justifyContent="flex-end" gap={3}>
            <Grid>
              {fetchMyWalletTransactions?.credit_point_balance >= 2 && (
                <Button
                  onClick={() => handlePackagePreference()}
                  variant="contained"
                >
                  Continue
                </Button>
              )}
            </Grid>
            <Grid>
              <Button onClick={() => handleClose()} variant="contained">
                Close
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </>
  );
};

export default PremiumSearchStatusModal;
