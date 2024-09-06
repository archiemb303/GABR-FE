import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Grid,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { Fragment } from "react";

import React from "react";
import {
  setAgreementSigningWarningModal,
  setEditTenantPreferenceModal,
  setVideoTutorialModal,
} from "app/redux/actions/ModalActions";
import EditTenantPreferenceModal from "./EditTenantPreferenceModal";
import { at } from "lodash";
import Loading from "app/components/MatxLoading";
import { InfoOutlined, PlayCircleOutline } from "@mui/icons-material";
import CustomSnackbar from "app/components/CustomSnackbar";

const ViewTenantPreference = ({ isIntoView }) => {
  const { UPDATE_TENANT_PREFERENCE } = useSelector(
    (store) => store.loadingAndError.loader
  );
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const { individualProperty } = useSelector((state) => state.property);
  const { custom } = useTheme();

  return (
    <>
      <EditTenantPreferenceModal individualProperty={individualProperty} />
      <Card
        id="tenantPreference"
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
            <Typography variant="h5">Tenant Preference</Typography>

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
                    tutorialLink: "https://www.youtube.com/embed/RqWSXlAhElw",
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
            <IconButton
              sx={{ marginLeft: "10px" }}
              aria-label="edit"
              onClick={() => {
                if (
                  individualProperty?.tenancy_details?.agreement_details[0]
                    ?.document_id
                ) {
                  dispatch(setAgreementSigningWarningModal(true));
                } else {
                  dispatch(setEditTenantPreferenceModal(true));
                }
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
        {UPDATE_TENANT_PREFERENCE?.isLoading === true ? (
          <Box sx={{ height: "100px" }}>
            <Loading></Loading>
          </Box>
        ) : (
          <>
            <CustomSnackbar
              loaderChild={UPDATE_TENANT_PREFERENCE}
              successMessage="Tenant Preference updated successfully !"
            />
            <Grid container alignItems="center" mb={3}>
              <Grid xs={4}>
                <Typography variant="body1" color="GrayText" marginBottom={1}>
                  Bachelors Allowed?
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1" color="primary" marginBottom={1}>
                  {individualProperty?.listing_details?.tenant_preference
                    ? individualProperty?.listing_details?.tenant_preference?.[0]?.preference_options.filter(
                        (option) => option.is_selected
                      )[0]?.option_name
                    : "Don't Care"}
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Typography variant="body1" color="GrayText" marginBottom={1}>
                  Pets Allowed?
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1" color="primary" marginBottom={1}>
                  {individualProperty?.listing_details?.tenant_preference
                    ? individualProperty?.listing_details?.tenant_preference?.[1]?.preference_options.filter(
                        (option) => option.is_selected
                      )[0]?.option_name
                    : "Don't Care"}
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Typography variant="body1" color="GrayText" marginBottom={1}>
                  Food Habits?
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1" color="primary" marginBottom={1}>
                  {individualProperty?.listing_details?.tenant_preference
                    ? individualProperty?.listing_details?.tenant_preference?.[2]?.preference_options.filter(
                        (option) => option.is_selected
                      )[0]?.option_name
                    : "Don't Care"}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Card>
    </>
  );
};

export default ViewTenantPreference;
