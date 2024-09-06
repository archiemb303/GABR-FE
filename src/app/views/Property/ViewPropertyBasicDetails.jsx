import EditIcon from "@mui/icons-material/Edit";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Menu,
  IconButton,
  Chip,
} from "@mui/material";
import { Container, useTheme } from "@mui/system";
import { H4 } from "app/components/Typography";
import { addNewPropertyAction } from "app/redux/actions/PropertyActions";
import { Form, Formik, validateYupSchema } from "formik";
import { useDropzone } from "react-dropzone";
import {
  propertyCreatorItems,
  propertyTypeItems,
  PropertyTypeItems,
} from "./items/propertyTypes";
import { useEffect, useState } from "react";
import {
  getAllCitiesAction,
  getAllCitiesByStateAction,
  getAllStatesByCountryAction,
} from "app/redux/actions/LocationActions";

import React from "react";
import EditPropertyBasicDetailsModal from "./EditPropertyBasicDetailsModal";
import {
  setAgreementSigningWarningModal,
  setEditPropertyBasicDetailsModal,
  setRentalAgreementWarningModal,
} from "app/redux/actions/ModalActions";
import Loading from "app/components/MatxLoading";
import { resetLoadingStateFor } from "app/redux/actions/LoadingAndErrorAction";
import CustomSnackbar from "app/components/CustomSnackbar";

const ViewPropertyBasicDetails = ({ props, pageCheck, isIntoView }) => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const { individualProperty, fetchMyProperty } = useSelector(
    (state) => state.property
  );
  const { openEditPropertyBasicDetails } = useSelector((state) => state.modal);
  const { UPDATE_BASIC_PROPERTY_DETAILS } = useSelector(
    (store) => store.loadingAndError.loader
  );
  const { palette } = useTheme();

  useEffect(() => {
    dispatch(getAllCitiesAction({}));
  }, []);

  const openEditModal = () => {
    if (
      individualProperty?.tenancy_details?.agreement_details?.[0]?.document_id
    ) {
      dispatch(setAgreementSigningWarningModal(true));
    } else {
      dispatch(setEditPropertyBasicDetailsModal(true));
    }
  };

  const EditComponent = ({ size }) => {
    if (size === "small") {
      return (
        <IconButton
          sx={{ padding: 0 }}
          aria-label="edit"
          onClick={openEditModal}
        >
          <EditIcon sx={{ fontSize: 14 }} />
        </IconButton>
      );
    }
    return (
      fetchMyProperty.party_type_name !== "Witness" && (
        <IconButton aria-label="edit" onClick={openEditModal}>
          <EditIcon />
        </IconButton>
      )
    );
  };

  return (
    <>
      {UPDATE_BASIC_PROPERTY_DETAILS?.isLoading === false && (
        <CustomSnackbar
          loaderChild={UPDATE_BASIC_PROPERTY_DETAILS}
          successMessage="Basic Details updated Successfully !"
        />
      )}

      {individualProperty && openEditPropertyBasicDetails && (
        <EditPropertyBasicDetailsModal payload={individualProperty} />
      )}

      <Card
        id="basicDetails"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alginItems: "center",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            mb: 2,
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: "3",
              alignItems: "center",
              gap: "5px",
              flexWrap: "wrap",
            }}
          >
            <Typography sx={{ whiteSpace: "nowrap" }} variant="h5">
              Basic Details
            </Typography>
            {pageCheck !== "INVITATION_MODAL" && (
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  color: "#000000c2",
                  padding: 0.5,
                  borderRadius: "4px",
                  fontSize: "12px",
                  backgroundColor: "#1976d21a",
                }}
              >
                Property Id:&nbsp;
                {individualProperty?.basic_details?.property_id.substring(
                  individualProperty?.basic_details?.property_id.length - 5,
                  individualProperty?.basic_details?.property_id.length
                )}
              </Typography>
            )}
            <Typography
              sx={{
                whiteSpace: "nowrap",
                color: "#000000c2",
                padding: 0.5,
                borderRadius: "4px",
                fontSize: "12px",
                backgroundColor: "#1976d21a",
              }}
            >
              Relationship:&nbsp;
              {individualProperty?.basic_details?.party_type_name ||
                individualProperty?.basic_details?.property_creator_type_name}
            </Typography>
          </Box>
          {pageCheck !== "INVITATION_MODAL" &&
            individualProperty?.basic_details?.party_type_name !==
              "Witness" && (
              <Box display="flex" justifyContent="flex-end" sx={{ flex: "1" }}>
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    openEditModal();
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Box>
            )}
        </Box>
        {UPDATE_BASIC_PROPERTY_DETAILS?.isLoading === true ? (
          <Box sx={{ height: 150 }}>
            <Loading />
          </Box>
        ) : (
          <Grid
            container
            rowSpacing={1}
            // columnSpacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignContent="stretch"
            wrap="wrap"
          >
            <Grid item xs={12}>
              <Box display="flex" alignItems="stretch" gap={1}>
                <Typography
                  variant="body1"
                  color="GrayText"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  Property Name:
                </Typography>
                <Typography variant="body1" color="primary">
                  {individualProperty?.basic_details?.property_name}
                </Typography>
              </Box>
              {/* <EditComponent size={'small'} /> */}
            </Grid>
            <Grid item sm={6}>
              <Box display="flex" alignItems="stretch" gap={1}>
                {/* <EditComponent size={'small'} /> */}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="stretch" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Property Type:
                </Typography>
                <Typography variant="body1" color="primary">
                  {individualProperty?.basic_details?.property_type_name}
                </Typography>
                {/* <EditComponent size={'small'} /> */}
              </Box>
            </Grid>

            <Grid item sm={4} xs={12}>
              <Box display="flex" alignItems="stretch" gap={1}>
                <Typography variant="body1" color="GrayText">
                  City:
                </Typography>
                <Typography variant="body1" color="primary">
                  {individualProperty?.basic_details?.city_name}
                </Typography>
                {/* <EditComponent size={'small'} /> */}
              </Box>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Box display="flex" alignItems="stretch" gap={1}>
                <Typography variant="body1" color="GrayText">
                  State:
                </Typography>
                <Typography variant="body1" color="primary">
                  {individualProperty?.basic_details?.state_name}
                </Typography>
                {/* <EditComponent size={'small'} /> */}
              </Box>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Box display="flex" alignItems="stretch" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Pincode:
                </Typography>
                <Typography variant="body1" color="primary">
                  {individualProperty?.basic_details?.pincode}
                </Typography>
                {/* <EditComponent size={'small'} /> */}
              </Box>
            </Grid>

            {individualProperty?.basic_details?.space_details.map((item) => {
              return (
                <Grid item sm={4} xs={6}>
                  <Box display="flex" alignItems="stretch" gap={1}>
                    <Typography variant="body1" color="GrayText">
                      {item?.space_type}:
                    </Typography>
                    <Typography variant="body1" color="primary">
                      {item?.space_count}
                    </Typography>
                    {/* <EditComponent size={'small'} /> */}
                  </Box>
                </Grid>
              );
            })}
            {individualProperty?.basic_details?.furnishing_type && (
              <Grid item sm={8} xs={12}>
                <Box display="flex" alignItems="stretch" gap={1}>
                  <Typography variant="body1" color="GrayText">
                    Furnishing Type:
                  </Typography>
                  <Typography variant="body1" color="primary">
                    {
                      individualProperty?.listing_details?.furnishing_details.filter(
                        (m) =>
                          m.furnishing_id ===
                          individualProperty?.basic_details?.furnishing_type
                      )[0].furnishing_name
                    }
                  </Typography>
                  {/* <EditComponent size={'small'} /> */}
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Card>
    </>
  );
};

export default ViewPropertyBasicDetails;
