import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Grid,
  Typography,
  IconButton,
  Button,
  CardMedia,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";

import React, { useState } from "react";
import {
  setEditPropertyInclusionModal,
  setPropertyImagesWarningModal,
  setUploadPropertyImagesModal,
  setVideoTutorialModal,
} from "app/redux/actions/ModalActions";
import EditPropertyInclusionModal from "./EditPropertyInclusionModal";
import {
  Add,
  Clear,
  InfoOutlined,
  PlayCircleOutline,
} from "@mui/icons-material";
import UploadPropertyImagesModal from "./uploadPropertyImagesModal";
import Loading from "app/components/MatxLoading";
import {
  removeListingImagesAction,
  REMOVE_LISTING_IMAGES,
  updatePropertyProfilePicAction,
} from "app/redux/actions/PropertyActions";
import { themeColors } from "app/components/MatxTheme/themeColors";
import PropertyImagesWarningModal from "./propertyImagesWarningModal";
import CustomSnackbar from "app/components/CustomSnackbar";

const PropertyImages = ({ props, pageCheck, isIntoView }) => {
  const { ADD_LISTING_IMAGES, UPDATE_PROPERTY_PROFILE_PIC } = useSelector(
    (store) => store.loadingAndError.loader
  );
  const [isSnakbarOpen, setSnackbarOpen] = useState(false);
  const { removedListingImages } = useSelector((state) => state.property);
  const dispatch = useDispatch();
  const { individualProperty } = useSelector((state) => state.property);
  const { custom } = themeColors.customTheme;

  const handleRemove = (imageId) => {
    dispatch(
      removeListingImagesAction({
        listing_id: individualProperty?.listing_details?.listing_id,
        tenancy_id:
          individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
        property_id: individualProperty?.basic_details?.property_id,
        image_id: [imageId],
      })
    );
  };

  const handleSetAsPropertyImg = (fileId) => {
    dispatch(
      updatePropertyProfilePicAction({
        property_id: individualProperty?.basic_details?.property_id,
        file_id: fileId,
      })
    );
    setSnackbarOpen(true);
  };

  return (
    <>
      {UPDATE_PROPERTY_PROFILE_PIC?.isLoading === false && (
        <CustomSnackbar
          loaderChild={UPDATE_PROPERTY_PROFILE_PIC}
          successMessage="Property profile image updated successfully!"
        />
      )}

      {/* { REMOVE_LISTING_IMAGES?.isLoading === false && 
        <CustomSnackbar
        loaderChild={REMOVE_LISTING_IMAGES}
        successMessage="Property images  remove  successfully"
      />} */}
      <PropertyImagesWarningModal></PropertyImagesWarningModal>
      <Card
        id="propertyImages"
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
          <Box sx={{ display: "flex" }}>
            <Typography variant="h5">Property Images</Typography>
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
                    tutorialLink: "https://www.youtube.com/embed/bhbRNXq3Omc",
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
          <Box display="flex" alignItems="center">
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
            {pageCheck !== "INVITATION_MODAL" && (
              <IconButton
                sx={{ marginLeft: "10px" }}
                aria-label="add"
                onClick={() => {
                  individualProperty?.listing_details?.listing_id
                    ? dispatch(setUploadPropertyImagesModal(true))
                    : dispatch(setPropertyImagesWarningModal(true));
                }}
              >
                <Add />
              </IconButton>
            )}
          </Box>
        </Box>
        {ADD_LISTING_IMAGES?.isLoading === true ? (
          <Box sx={{ height: "180px" }}>
            <Loading></Loading>
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {individualProperty?.listing_details?.listing_images?.length >
                0 &&
                individualProperty?.listing_details?.listing_images?.map(
                  (item, index) => {
                    return (
                      <Grid key={index} item xs={6}>
                        <Card sx={{ position: "relative" }} fullWidth>
                          <CardMedia
                            component="img"
                            height="160"
                            image={item.file_url}
                          />
                          {pageCheck !== "INVITATION_MODAL" && (
                            <Grid
                              gap={1}
                              padding={1}
                              container
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Typography
                                onClick={() =>
                                  handleSetAsPropertyImg(item.file_id_id)
                                }
                                variant="body2"
                                sx={{
                                  color: "#fff",
                                  padding: "2px 8px",
                                  borderRadius: "4px",
                                  backgroundColor: custom.c4,
                                  fontSize: "0.75em",
                                  cursor: "pointer",
                                }}
                              >
                                Set as property image
                              </Typography>
                              <Typography
                                onClick={() => handleRemove(item.image_id)}
                                variant="body2"
                                sx={{
                                  color: "#fff",
                                  padding: "2px 8px",
                                  borderRadius: "4px",
                                  fontSize: "0.75em",
                                  backgroundColor: custom.heading.secondary,
                                  cursor: "pointer",
                                }}
                              >
                                Remove
                              </Typography>
                            </Grid>
                          )}
                        </Card>
                      </Grid>
                    );
                  }
                )}
            </Grid>
            {(!individualProperty?.listing_details?.listing_images ||
              individualProperty?.listing_details?.listing_images.length ===
                0) && (
              <>
                {pageCheck !== "INVITATION_MODAL" && (
                  <>
                    <Typography
                      textAlign="center"
                      variant="body1"
                      color="GrayText"
                    >
                      You haven't added any property image yet.
                    </Typography>
                    <Grid container marginTop={2} justifyContent="center">
                      <Button
                        onClick={() => {
                          individualProperty?.listing_details?.listing_id
                            ? dispatch(setUploadPropertyImagesModal(true))
                            : dispatch(setPropertyImagesWarningModal(true));
                        }}
                        variant="contained"
                        startIcon={<Add />}
                      >
                        ADD
                      </Button>
                    </Grid>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Card>
      {/* {UPDATE_PROPERTY_PROFILE_PIC?.isLoading === false
                &&
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={isSnakbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                    {
                        UPDATE_PROPERTY_PROFILE_PIC?.error === null
                            ?
                            <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '50vw' }}>
                                Property profile image updated successfully!
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

export default PropertyImages;
