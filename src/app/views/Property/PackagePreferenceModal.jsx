import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
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
} from "app/redux/actions/ModalActions";
import {
  markPremiumTenancyAction,
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

const PackagePreferenceModal = () => {
  const { individualProperty, newTenancy } = useSelector(
    (state) => state.property
  );
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.openPackagePreference);
  const { fetchMyWalletTransactions } = useSelector((state) => state.wallet);
  const preloginState = useSelector((state) => state.prelogin);

  const handleClose = () => {
    dispatch(setPackagePreferenceModal(false));
  };

  const handlePackagePreference = () => {
    dispatch(
      markPremiumTenancyAction({
        property_id: individualProperty?.basic_details?.property_id,
        tenancy_id:
          individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
        user_profile_id: preloginState.userProfileId,
      })
    );
    dispatch(setPackagePreferenceSuccessModal(true));
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
            Thanks for choosing premium.
          </Typography>

          <Grid container justifyContent="center">
            <Grid>
              {/* <Typography variant='body1' marginBottom={3} fontSize={12} color="GrayText">
                                1. Free property listing ad
                            </Typography>
                            <Typography variant='body1' marginBottom={3} fontSize={12} color="GrayText">
                                2. Listing visible to all
                            </Typography> */}
              <Box textAlign={"center"}>
                <Typography
                  variant="body1"
                  marginBottom={3}
                  fontSize={12}
                  color="GrayText"
                >
                  You can now generate your rental agreement{" "}
                  <strong> @ 2 Wallet Point (Rs 999)</strong>.
                </Typography>
                <Typography
                  variant="body1"
                  marginBottom={3}
                  fontSize={12}
                  color="GrayText"
                >
                  Get Online Copy of signed agreement on e-stamp paper{" "}
                  <strong>immediately</strong>.
                </Typography>
                <Typography
                  variant="body1"
                  marginBottom={3}
                  fontSize={12}
                  color="GrayText"
                >
                  Get Physical copy of signed agreement on stamp paper shipped
                  to owner (if within India) or Tenant (at property location){" "}
                  <strong>through registered post</strong>.
                </Typography>
                <Typography
                  variant="body1"
                  marginBottom={3}
                  fontSize={12}
                  color="GrayText"
                >
                  Any one of the signing parties can purchase the credit points
                  and utilize them to generate and sign the rental agreement.
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#0000ff08",
                  borderRadius: "50px",
                  padding: "42px",
                }}
              >
                <Typography
                  textAlign={"center"}
                  variant="body1"
                  marginBottom={3}
                  fontSize={12}
                  color="GrayText"
                >
                  <strong>Process of creating rental agreement</strong>
                </Typography>
                <Typography
                  variant="body1"
                  marginBottom={3}
                  fontSize={12}
                  color="GrayText"
                >
                  1. Any party makes the tenancy premium by consuming one point
                  from their wallet
                </Typography>
                {/* <Typography variant='body1' marginBottom={3} fontSize={12} color="GrayText">
                                   2. Listing visible till property is let out
                               </Typography> */}
                <Typography marginBottom={3} fontSize={12} color="GrayText">
                  2. Every Party gets to see the detailed and autogenerated
                  agreement draft
                </Typography>
                <Typography marginBottom={3} fontSize={12} color="GrayText">
                  3. Any party can update clauses and details as desired and
                  mutually agreed
                </Typography>
                <Typography marginBottom={3} fontSize={12} color="GrayText">
                  4. Every party reviews the draft and consents to print the
                  draft on an e-stamp paper
                </Typography>
                <Typography marginBottom={3} fontSize={12} color="GrayText">
                  5. e-stamp paper procured and signing link sent to every
                  signing party
                </Typography>
                <Typography marginBottom={3} fontSize={12} color="GrayText">
                  6. Signing Party visits the signing page, and signs using
                  Adhaar based OTP
                </Typography>
                <Typography marginBottom={3} fontSize={12} color="GrayText">
                  7. Adhaar signed copy available to every signed party on email
                  and in the portal
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" gap={4} marginTop={4}>
            <Button
              onClick={() => {
                if (fetchMyWalletTransactions?.credit_point_balance >= 2) {
                  handlePackagePreference();
                } else {
                  dispatch(setPremiumPackageStatusModal(true));
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

export default PackagePreferenceModal;
