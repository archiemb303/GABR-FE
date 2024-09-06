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
  CardContent,
  CardActions,
  Tooltip,
} from "@mui/material";

import React from "react";
import {
  setAddPropertyInclusionModal,
  setEditPropertyInclusionModal,
  setInclusionWarningModal,
  setVideoTutorialModal,
} from "app/redux/actions/ModalActions";
import { Add, InfoOutlined, PlayCircleOutline } from "@mui/icons-material";
import AddPropertyInclusionModal from "./AddPropertyInclusionModal";
import EditPropertyInclusionModal from "./EditPropertyInclusionModal";
import Loading from "app/components/MatxLoading";
import InclusionWarningModal from "./InclusionWarningModal";
import {
  removeListingImagesAction,
  removeTenancyInclusionsAction,
  updatePropertyProfilePicAction,
} from "app/redux/actions/PropertyActions";
import { themeColors } from "app/components/MatxTheme/themeColors";

const PropertyInclusion = ({ isIntoView }) => {
  const dispatch = useDispatch();
  const { individualProperty } = useSelector((state) => state.property);
  const { UPDATE_TENANCY_INCLUSIONS, ADD_TENANCY_INCLUSIONS } = useSelector(
    (store) => store.loadingAndError.loader
  );
  const { custom } = themeColors.customTheme;

  const handleRemove = (inclusionId) => {
    dispatch(
      removeTenancyInclusionsAction({
        tenancy_id:
          individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
        property_id: individualProperty?.basic_details?.property_id,
        tenancy_inclusion_ids: [inclusionId],
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
  };

  return (
    <>
      <InclusionWarningModal></InclusionWarningModal>
      <AddPropertyInclusionModal individualProperty={individualProperty} />
      <EditPropertyInclusionModal individualProperty={individualProperty} />
      <Card
        id="propertyInclusion"
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
            <Typography variant="h5">Property Inclusions</Typography>

            <Tooltip
              title="Property Inclusions refer to the specific features, fixtures, and amenities that are included as part of the rental property and are available for the tenant’s use."
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
                    tutorialLink: "https://www.youtube.com/embed/l7Mb-UgNNj4",
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
          {individualProperty?.basic_details?.party_type_name !== "Witness" && (
            <IconButton
              aria-label="add"
              onClick={() => {
                individualProperty?.tenancy_details?.tenancy_terms
                  ? dispatch(setAddPropertyInclusionModal(true))
                  : dispatch(setInclusionWarningModal(true));
              }}
            >
              <Add />
            </IconButton>
          )}
        </Box>
        {UPDATE_TENANCY_INCLUSIONS?.isLoading === true ||
        ADD_TENANCY_INCLUSIONS?.isLoading === true ? (
          <Grid sx={{ height: "150px" }}>
            <Loading></Loading>
          </Grid>
        ) : (
          <>
            <Grid container spacing={2}>
              {individualProperty?.tenancy_details?.tenancy_inclusions?.map(
                (item, index) => {
                  return (
                    <Grid key={index} item xs={6}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.media_url}
                          alt={item.inclusion_name}
                        />
                        <CardContent>
                          <Typography
                            sx={{ fontSize: "18px" }}
                            gutterBottom
                            variant="h5"
                            component="div"
                          >
                            {item.inclusion_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.inclusion_description}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Grid
                            gap={1}
                            padding={1}
                            container
                            alignItems="center"
                          >
                            {/* <Typography
                                                            onClick={() => handleSetAsPropertyImg(item.file_id_id)}
                                                            variant="body2"
                                                            sx={{
                                                                color: '#fff',
                                                                padding: '2px 8px',
                                                                borderRadius: '4px',
                                                                backgroundColor: custom.c4,
                                                                fontSize: '0.75em',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            Set as property image
                                                        </Typography> */}
                            <Typography
                              onClick={() =>
                                handleRemove(item.tenancy_inclusion_id)
                              }
                              variant="body2"
                              sx={{
                                color: "#fff",
                                padding: "2px 8px",
                                borderRadius: "4px",
                                fontSize: "0.75em",
                                backgroundColor: 'red',
                                cursor: "pointer",
                              }}
                            >
                              Remove
                            </Typography>
                            <Typography
                              onClick={() =>
                                dispatch(
                                  setEditPropertyInclusionModal({
                                    flag: true,
                                    inclusionModalData: item,
                                  })
                                )
                              }
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
                              Update
                            </Typography>
                          </Grid>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                }
              )}
            </Grid>

            {individualProperty?.tenancy_details?.tenancy_inclusions === null ||
            individualProperty?.tenancy_details?.tenancy_inclusions?.length ===
              0 ? (
              <>
                <Typography textAlign="center" variant="body1" color="GrayText">
                  You haven't added any property inclusion yet.
                </Typography>
                <Grid container marginTop={2} justifyContent="center">
                  {individualProperty?.basic_details?.party_type_name !==
                    "Witness" && (
                    <Button
                      onClick={() => {
                        individualProperty?.tenancy_details?.tenancy_terms
                          ? dispatch(setAddPropertyInclusionModal(true))
                          : dispatch(setInclusionWarningModal(true));
                      }}
                      variant="contained"
                      startIcon={<Add />}
                    >
                      ADD
                    </Button>
                  )}
                </Grid>
              </>
            ) : (
              <>
                {/* <Grid container marginTop={2} justifyContent="center"> */}

                {/* </Grid> */}
                {individualProperty?.basic_details?.party_type_name !==
                  "Witness" && (
                  <Grid container marginTop={2} justifyContent="center">
                    <Box sx={{ paddingRight: 4 }}>
                      <Button
                        onClick={() => {
                          individualProperty?.tenancy_details?.tenancy_terms
                            ? dispatch(setAddPropertyInclusionModal(true))
                            : dispatch(setInclusionWarningModal(true));
                        }}
                        variant="contained"
                        startIcon={<Add />}
                      >
                        ADD
                      </Button>
                    </Box>
                    {/* <Box>
                      <Button
                        onClick={() =>
                          dispatch(setEditPropertyInclusionModal(true))
                        }
                        variant="contained"
                      >
                        Update
                      </Button>
                    </Box> */}
                  </Grid>
                )}
              </>
            )}
          </>
        )}
      </Card>
    </>
  );
};

export default PropertyInclusion;
