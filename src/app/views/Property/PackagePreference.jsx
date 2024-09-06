import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  InfoOutlined,
  PlayCircleOutline,
} from "@mui/icons-material";
import { useTheme } from "@mui/system";
import { Span } from "app/components/Typography";

import React, { useEffect, useState } from "react";
import {
  setListingConfirmationModal,
  setPackagePreferenceModal,
  setVideoTutorialModal,
} from "app/redux/actions/ModalActions";
import Loading from "app/components/MatxLoading";
import PackagePreferenceModal from "./PackagePreferenceModal";
import PremiumPackageStatus from "./PremiumPackageStatus";
import PackagePreferenceSuccessModal from "./PackagePreferenceSuccessModal";
import { FetchMyWalletTransactionsAction } from "app/redux/actions/WalletActions";

const PackagePreference = ({ isIntoView }) => {
  const { PUBLISH_LISTING } = useSelector(
    (store) => store.loadingAndError.loader
  );
  const dispatch = useDispatch();
  const { individualProperty } = useSelector((state) => state.property);
  const { custom } = useTheme();
  const open = useSelector((state) => state.modal.openPremiumPackageStatus);

  const handlePremium = () => {
    dispatch(setPackagePreferenceModal(true));
  };

  return (
    <>
      <PackagePreferenceSuccessModal />
      <PremiumPackageStatus individualProperty={individualProperty} />
      <PackagePreferenceModal individualProperty={individualProperty} />
      <Card
        id="packagePreference"
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
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5">Package Preference</Typography>

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
                    tutorialLink: "https://www.youtube.com/embed/epzsxUP8zWA",
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
          <Grid height={500} alignItems="center" justifyContent="center">
            <Loading></Loading>
          </Grid>
        ) : (
          <>
            {individualProperty?.listing_details?.listing_status !== 3 ? (
              <Grid container>
                {individualProperty?.listing_details?.package_preference !==
                  2 && (
                  <Grid container paddingBottom={2}>
                    <Typography variant="h6" fontSize={15} color="GrayText">
                      Upgrade to premium to unlock a box of benefits
                    </Typography>
                  </Grid>
                )}
                <Grid paddingLeft={3} xs={12} md={6}>
                  <Typography
                    paddingLeft={4}
                    paddingY={2}
                    variant="h6"
                    fontSize={12}
                    color="GrayText"
                  >
                    Premium features
                  </Typography>
                  <Grid container height={420}>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <CheckCircle
                        sx={{
                          color: "green",
                          fontSize: "18px",
                        }}
                      ></CheckCircle>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Free property listing ad
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <CheckCircle
                        sx={{
                          color: "green",
                          fontSize: "18px",
                        }}
                      ></CheckCircle>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Listing visible to all
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <CheckCircle
                        sx={{
                          color: "green",
                          fontSize: "18px",
                        }}
                      ></CheckCircle>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Listing visible till property is let out
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <CheckCircle
                        sx={{
                          color: "green",
                          fontSize: "18px",
                        }}
                      ></CheckCircle>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Free stamp paper rental agreement
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <CheckCircle
                        sx={{
                          color: "green",
                          fontSize: "18px",
                        }}
                      ></CheckCircle>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Free digital signing*
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <CheckCircle
                        sx={{
                          color: "green",
                          fontSize: "18px",
                        }}
                      ></CheckCircle>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Renewal alerts
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <CheckCircle
                        sx={{
                          color: "green",
                          fontSize: "18px",
                        }}
                      ></CheckCircle>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Free communications
                      </Span>
                    </Grid>
                    <Grid height={38} container alignItems="flex-start">
                      <CheckCircle
                        sx={{
                          color: "green",
                          fontSize: "18px",
                        }}
                      ></CheckCircle>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Free rent reciepts
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <CheckCircle
                        sx={{
                          color: "green",
                          fontSize: "18px",
                        }}
                      ></CheckCircle>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Free document management
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <CheckCircle
                        sx={{
                          color: "green",
                          fontSize: "18px",
                        }}
                      ></CheckCircle>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Online rent payments*
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <CheckCircle
                        sx={{
                          color: "green",
                          fontSize: "18px",
                        }}
                      ></CheckCircle>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        10% off on your next listing
                      </Span>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="center"
                    paddingLeft={2}
                    marginTop={1}
                  >
                    <Chip
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        fontSize: "15px",
                        position: "relative",
                        width: "150px",
                      }}
                      variant="outlined"
                      color="warning"
                      label="2 credit points"
                      icon={
                        <Tooltip
                          sx={{
                            position: "absolute",
                            right: "12px",
                          }}
                          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                          arrow
                        >
                          <InfoOutlined></InfoOutlined>
                        </Tooltip>
                      }
                    ></Chip>
                    {individualProperty?.listing_details?.package_preference ===
                      2 && (
                      <Typography
                        sx={{
                          fontSize: "12px",
                          paddingLeft: "20px",
                        }}
                        variant="body1"
                        color="GrayText"
                      >
                        (Current package)
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid paddingLeft={3} xs={12} md={6}>
                  <Typography
                    paddingLeft={5}
                    paddingY={2}
                    variant="h6"
                    fontSize={12}
                    color="GrayText"
                  >
                    Free features
                  </Typography>
                  <Grid container height={420}>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <CheckCircle
                        sx={{
                          color: "green",
                          fontSize: "18px",
                        }}
                      ></CheckCircle>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Free property listing ad
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <CheckCircle
                        sx={{
                          color: "green",
                          fontSize: "18px",
                        }}
                      ></CheckCircle>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Listing visible only to premium seekers
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <CheckCircle
                        sx={{
                          color: "green",
                          fontSize: "18px",
                        }}
                      ></CheckCircle>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Listing visible for 7 days
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <Cancel
                        sx={{
                          color: "red",
                          fontSize: "18px",
                        }}
                      ></Cancel>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Free rental agreement
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <Cancel
                        sx={{
                          color: "red",
                          fontSize: "18px",
                        }}
                      ></Cancel>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Free digital signing
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <Cancel
                        sx={{
                          color: "red",
                          fontSize: "18px",
                        }}
                      ></Cancel>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Renewal alerts
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <Cancel
                        sx={{
                          color: "red",
                          fontSize: "18px",
                        }}
                      ></Cancel>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Free communications
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <Cancel
                        sx={{
                          color: "red",
                          fontSize: "18px",
                        }}
                      ></Cancel>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Free rent reciepts
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <Cancel
                        sx={{
                          color: "red",
                          fontSize: "18px",
                        }}
                      ></Cancel>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Free document management
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <Cancel
                        sx={{
                          color: "red",
                          fontSize: "18px",
                        }}
                      ></Cancel>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        Online rent payments*
                      </Span>
                    </Grid>
                    <Grid
                      height={38}
                      container
                      alignItems="flex-start"
                      flexWrap="nowrap"
                    >
                      <Cancel
                        sx={{
                          color: "red",
                          fontSize: "18px",
                        }}
                      ></Cancel>
                      <Span marginLeft={1} fontSize={12} color="GrayText">
                        10% off on your next listing
                      </Span>
                    </Grid>
                  </Grid>
                  <Grid paddingLeft={3} marginTop={1}>
                    <Chip
                      sx={{
                        fontSize: "15px",
                        width: "138px",
                      }}
                      variant="outlined"
                      color="warning"
                      label="INR 0"
                    ></Chip>
                    {individualProperty?.listing_details?.package_preference !==
                      2 && (
                      <Typography
                        sx={{
                          fontSize: "12px",
                          paddingLeft: "20px",
                        }}
                        variant="body1"
                        color="GrayText"
                      >
                        (Current package)
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                {individualProperty?.listing_details?.package_preference !==
                  2 && (
                  <Grid container justifyContent="center" marginTop={3} xs={12}>
                    <Button
                      onClick={() => handlePremium()}
                      sx={{ width: "80%" }}
                      variant="contained"
                    >
                      Upgrade to premium
                    </Button>
                  </Grid>
                )}
              </Grid>
            ) : (
              <Grid container justifyContent="center">
                <Typography variant="h6" fontSize={15} color="green">
                  Your Property is currently listed as premium for home seekers
                  to view.
                </Typography>
              </Grid>
            )}
          </>
        )}
      </Card>
    </>
  );
};

export default PackagePreference;
