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
import {
  setListingConfirmationModal,
  setPackagePreferenceModal,
  setPackagePreferenceSuccessModal,
  setPremiumPackageStatusModal,
  setPremiumSearchModal,
  setPremiumSearchStatusModal,
  setPremiumSearchSuccessModal,
} from "app/redux/actions/ModalActions";
import {
  publishListingAction,
  selectPackagePreferenceAction,
} from "app/redux/actions/PropertyActions";
import { FetchMyWalletTransactionsAction } from "app/redux/actions/WalletActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minWidth: 300,
  maxWidth: 600,
  maxHeight: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const BuyPremiumSearchModal = ({ individualProperty }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.openPremiumSearchModal);
  const { fetchMyWalletTransactions } = useSelector((state) => state.wallet);

  const handleClose = () => {
    dispatch(setPremiumSearchModal(false));
  };

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
    dispatch(setPremiumSearchStatusModal(true));
    handleClose();
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
          <Typography mb={3} variant="h5" textAlign={"center"}>
            Seems like you have discovered a Premium feature.
          </Typography>

          <Typography mb={3} variant="body1" textAlign={"center"}>
            As a premium member you will get the below features.
          </Typography>
          <Grid container justifyContent="center">
            <Grid>
              <Typography marginBottom={3} fontSize={12} color="GrayText">
                1. Access to over 100s of Premium Properties
              </Typography>
              <Typography marginBottom={3} fontSize={12} color="GrayText">
                2.Check out some of our Verified Properties
              </Typography>
              <Typography marginBottom={3} fontSize={12} color="GrayText">
                3.Get Some Best Value for Money Deals
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" gap={4} marginTop={4}>
            <Button
              onClick={() => {
                if (fetchMyWalletTransactions?.credit_point_balance >= 2) {
                  handlePackagePreference();
                } else {
                  // dispatch(setPremiumPackageStatusModal(true));
                  dispatch(setPremiumSearchStatusModal(true));
                }
                handleClose();
              }}
              sx={{ width: "50%" }}
              variant="contained"
            >
              Continue
            </Button>
          </Grid>
        </Card>
      </Modal>
      {/* {publishListingLoading?.isLoading === false
                &&
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={isSnakbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                    {
                        publishListingLoading?.error === null
                            ?
                            <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '50vw' }}>
                               Thank you for choosing premium!
                            </Alert>
                            :
                            <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '50vw' }}>
                                Some error occured!
                            </Alert>
                    }
                </Snackbar>
            } */}
    </>
  );
};

export default BuyPremiumSearchModal;
