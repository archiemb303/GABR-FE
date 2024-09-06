import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/system";

import React, { useEffect, useState } from "react";
import {
  setListingConfirmationModal,
  setListingPerformanceWarningModal,
  setPackagePreferenceModal,
  setPackagePreferenceSuccessModal,
  setPremiumPackageStatusModal,
  setRemoveListingModal,
  setVideoTutorialModal,
} from "app/redux/actions/ModalActions";
import Loading from "app/components/MatxLoading";
import ListingConfirmationModal from "./ListingConfirmationModal";
import { FetchMyWalletTransactionsAction } from "app/redux/actions/WalletActions";
import ListingPerformanceWarningModal from "./ListingPerformanceWarningModal";
import {
  getListingPerformanceAction,
  removeActiveListingAction,
  selectPackagePreferenceAction,
} from "app/redux/actions/PropertyActions";
import { InfoOutlined, PlayCircleOutline } from "@mui/icons-material";
import CustomSnackbar from "app/components/CustomSnackbar";
import CloseListingModal from "./CloseListingModal";
import ViewContactInfo from "./ViewContactInfo";
import VerifyContactInfo from "./VerifyContactInfo";

const ListingPerformance = ({ isIntoView }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { individualProperty, listingPerformanceDetails } = useSelector(
    (state) => state.property
  );
  const { fetchMyWalletTransactions } = useSelector((state) => state.wallet);
  const { custom } = useTheme();
  const { PUBLISH_LISTING, REMOVE_ACTIVE_LISTING } = useSelector(
    (store) => store.loadingAndError.loader
  );

  const handleListingButtonClick = () => {
    if (
      individualProperty?.listing_details?.listing_id === null ||
      individualProperty?.listing_details?.property_description === null ||
      individualProperty?.listing_details?.rent_per_month === 0 ||
      individualProperty?.listing_details?.contact_info?.length === 0
    ) {
      dispatch(setListingPerformanceWarningModal(true));
    } else {
      dispatch(setListingConfirmationModal(true));
    }
  };

  // start

  const handleSubmit = async () => {
    dispatch(setRemoveListingModal(true));
  };

  useEffect(() => {
    dispatch(
      getListingPerformanceAction({
        listing_id: individualProperty?.listing_details?.listing_id,
        property_id: individualProperty?.basic_details?.property_id,
      })
    );
  }, []);

  // end
  return (
    <>
      {REMOVE_ACTIVE_LISTING?.isLoading === false && (
        <CustomSnackbar
          loaderChild={REMOVE_ACTIVE_LISTING}
          successMessage="Listing Removed  Successfully !"
        />
      )}

      {PUBLISH_LISTING?.isLoading === false &&
        individualProperty?.listing_details?.listing_status === 2 && (
          <CustomSnackbar
            loaderChild={PUBLISH_LISTING}
            successMessage="Your property has been listed for free."
          />
        )}

      {PUBLISH_LISTING?.isLoading === false &&
        individualProperty?.listing_details?.listing_status === 3 && (
          <CustomSnackbar
            loaderChild={PUBLISH_LISTING}
            successMessage="Your property has been listed as premium."
          />
        )}

      <CloseListingModal></CloseListingModal>
      <ListingPerformanceWarningModal individualProperty={individualProperty} />
      <ListingConfirmationModal individualProperty={individualProperty} />
      <Card
        id="listingPerformance"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alginItems: "center",
          padding: 2,
          // maxWidth: 400,
          margin: "0 auto",
          my: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5">Listing Performance</Typography>
            <Tooltip
              title="Once you put your property up for rent to find tenants, this is the information that will be visible to home-seekers."
              arrow
            >
              <IconButton sx={{ padding: 0, ml: 0.5 }}>
                <InfoOutlined
                  sx={{
                    fontSize: "1em",
                    color: custom.c4,
                  }}
                />
              </IconButton>
            </Tooltip>

            <IconButton
              sx={{ padding: 0, ml: 0.5 }}
              onClick={() =>
                dispatch(
                  setVideoTutorialModal({
                    flag: true,
                    tutorialLink: "https://www.youtube.com/embed/KuooXLlXyAA",
                  })
                )
              }
            >
              <PlayCircleOutline
                sx={{
                  fontSize: "1em",
                  color: custom.c4,
                }}
              />
            </IconButton>
          </Box>
          <Box display="flex" marginBottom="10px">
            {(individualProperty?.listing_details?.listing_status === 5 ||
              individualProperty?.listing_details?.listing_status === 6) && (
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  color: "white",
                  padding: 0.5,
                  borderRadius: "4px",
                  fontSize: "12px",
                  backgroundColor: custom.unverified,
                }}
              >
                Listing Closed
              </Typography>
            )}
            {(individualProperty?.listing_details?.listing_status === 2 ||
              individualProperty?.listing_details?.listing_status === 3) && (
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  color: "white",
                  padding: 0.5,
                  borderRadius: "4px",
                  fontSize: "12px",
                  backgroundColor: custom.c6,
                }}
              >
                Active-Listed
              </Typography>
            )}
            {individualProperty?.listing_details?.listing_status === 1 && (
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  color: "white",
                  padding: 0.5,
                  borderRadius: "4px",
                  fontSize: "12px",
                  backgroundColor: custom.c1,
                }}
              >
                Active-Draft
              </Typography>
            )}
          </Box>
        </Box>
        {PUBLISH_LISTING?.isLoading === true ? (
          <Grid sx={{ height: 120 }}>
            <Loading></Loading>
          </Grid>
        ) : (
          <Grid container gap={2}>
            <Grid container xs={12} md={4}>
              <Typography variant="body1" color="GrayText">
                Impressions:{" "}
                <Typography sx={{ color: "#1976D2", display: "inline" }}>
                  {" "}
                  {
                    listingPerformanceDetails?.impressions_count[0]
                      ?.impressions_count
                  }
                </Typography>
              </Typography>
            </Grid>
            <Grid container xs={12} md={6}>
              <Typography variant="body1" color="GrayText">
                Interested:{" "}
                <Typography sx={{ color: "#1976D2", display: "inline" }}>
                  {" "}
                  {listingPerformanceDetails?.interested_count}
                </Typography>
              </Typography>
            </Grid>
            <Grid container xs={12} md={4}>
              <Typography variant="body1" color="GrayText">
                Contact views:{" "}
                <Typography sx={{ color: "#1976D2", display: "inline" }}>
                  {listingPerformanceDetails?.contact_views_count}
                </Typography>
              </Typography>
            </Grid>
            <Grid container xs={12} md={4}>
              <Typography variant="body1" color="GrayText">
                Shortlisted:{" "}
                <Typography sx={{ color: "#1976D2", display: "inline" }}>
                  {listingPerformanceDetails?.shortlisted_count}
                </Typography>
              </Typography>
            </Grid>
            <Grid container xs={12} md={6}>
              <Typography variant="body1" color="GrayText">
                Posting date:
                <Typography sx={{ color: "#1976D2", display: "inline" }}>
                  {" "}
                  {moment(
                    individualProperty?.listing_details?.added_date
                  ).format("DD-MMM-YYYY")}
                </Typography>
              </Typography>
            </Grid>
            <Grid container xs={12} md={6}>
              <Typography variant="body1" color="GrayText">
                Ad expiry date:
                <Typography sx={{ color: "#1976D2", display: "inline" }}>
                  {" "}
                  {individualProperty?.listing_details?.listing_status === 2 &&
                    moment(individualProperty?.listing_details?.added_date)
                      .add(7, "days")
                      .format("DD-MMM-YYYY")}
                  <Typography sx={{ color: "#1976D2", display: "inline" }}>
                    {individualProperty?.listing_details?.listing_status ===
                      3 && "Unlimited till you find a tenant"}
                  </Typography>
                </Typography>
              </Typography>

              <Typography marginLeft={1} variant="body1" color="primary">
                {individualProperty?.listing_details?.listing_status === 1
                  ? "--"
                  : individualProperty?.listing_details?.listing_performance
                      ?.impressions}
              </Typography>
            </Grid>

            <Grid marginTop={2} xs={12} container justifyContent="center">
              {/* view contact info   */}
              <VerifyContactInfo></VerifyContactInfo>
              {/*  */}
              {(individualProperty?.listing_details?.listing_status === 0 ||
                individualProperty?.listing_details?.listing_status === 1 ||
                individualProperty?.listing_details?.listing_status === 5 ||
                individualProperty?.listing_details?.listing_status === 6) && (
                <Button
                  onClick={() => handleListingButtonClick()}
                  sx={{ width: "80%" }}
                  variant="contained"
                >
                  List property to view ad performance
                </Button>
              )}
              {individualProperty?.listing_details?.listing_status === 2 && (
                <Typography>
                  Upgrade to premium for unlimited expiry date and to get loads
                  of other benefits.
                </Typography>
              )}

              {(individualProperty?.listing_details?.listing_status === 2 ||
                individualProperty?.listing_details?.listing_status === 3) && (
                <Grid container justifyContent="center" gap={3} marginTop={5}>
                  {individualProperty?.listing_details?.listing_status ===
                    2 && (
                    <Button
                      onClick={() => {
                        dispatch(setPackagePreferenceModal(true));
                      }}
                      variant="contained"
                    >
                      Upgrade to premium
                    </Button>
                  )}
                  <Button onClick={handleSubmit} variant="contained">
                    Close listing
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
      </Card>
    </>
  );
};

export default ListingPerformance;
