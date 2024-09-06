import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/system";
import CustomSnackbar from "app/components/CustomSnackbar";
import {
  getAllCitiesByStateAction,
  getAllStatesByCountryAction,
} from "app/redux/actions/LocationActions";
import { setEditPropertyBasicDetailsModal } from "app/redux/actions/ModalActions";
import {
  getpayloadAction,
  updateBasicPropertyDetailsAction,
} from "app/redux/actions/PropertyActions";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { propertyTypeItems } from "./items/propertyTypes";

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

const EditPropertyBasicDetailsModal = ({ payload }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.openEditPropertyBasicDetails);

  const { userProfile } = useSelector((state) => state);

  const { individualProperty } = useSelector((state) => state.property);
  const location = useSelector((state) => state.location);
  const { palette } = useTheme();
  const [initialValues, setInitialValues] = useState({}); // used in formik

  const validationSchema = Yup.object().shape({
    propertyName: Yup.string().required("property Name is required field"),
    pincode: Yup.string()
      .required("Pincode is required field")
      .matches(
        /^[1-9][0-9]{5}$/,
        "Pincode should contain exactly 6 digits and should not start with 0"
      ),
    stateId: Yup.string().required("State is required field"),
    cityId: Yup.string().required("City is required field"),
    addressLine1: Yup.string().required("Address Line 1 is required field"),
    // .max(30, "Address Line 1 should be between 0 to 30 characters"),
    addressLine2: Yup.string().required("Address Line 2 is required field"),
    // .max(15, "Address Line 2 should be between 0 to 15 characters"),
    addressLine3: Yup.string().required("Address Line 3 is required field"),
    // .max(10, "Address Line 3 should be between 0 to 10 characters"),
    userStatus: Yup.string().required("User Status is required field"),
    rooms: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    kitchens: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    balconies: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    halls: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    openParkings: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    coveredParkings: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
  });

  const handleSubmit = async (values, { isSubmitting }) => {
    const params = {
      property_id: payload.basic_details.property_id.toString(),
      property_name: values.propertyName,
      address_line_1: values.addressLine1,
      address_line_2: values.addressLine2,
      address_line_3: values.addressLine3,
      city_id: values.cityId.toString(),
      pincode: values.pincode.toString(),
      location_coordinates_x: payload?.basic_details?.location_coordinates_x,
      location_coordinates_y: payload?.basic_details?.location_coordinates_y,
      property_type: values.propertyType.toString(),
      creator_type: parseInt(values.userStatus, 10),
      space_details: [
        {
          space_id: 1,
          space_count: values.rooms ? parseInt(values.rooms, 10) : 0,
        },
        {
          space_id: 2,
          space_count: values.kitchens ? parseInt(values.kitchens, 10) : 0,
        },
        {
          space_id: 3,
          space_count: values.balconies ? parseInt(values.balconies, 10) : 0,
        },
        {
          space_id: 4,
          space_count: values.halls ? parseInt(values.halls, 10) : 0,
        },
        {
          space_id: 5,
          space_count: values.coveredParkings
            ? parseInt(values.coveredParkings, 10)
            : 0,
        },
        {
          space_id: 6,
          space_count: values.openParkings
            ? parseInt(values.openParkings, 10)
            : 0,
        },
      ],
      furnishing_type: values.furnishing_id,
    };

    dispatch(updateBasicPropertyDetailsAction(params));
    handleClose();
  };

  const handleClose = () => {
    dispatch(setEditPropertyBasicDetailsModal(false));
  };

  useEffect(() => {
    // Get all the states
    if (!location?.states) {
      dispatch(
        getAllStatesByCountryAction({
          country_id: "1",
        })
      );
    }

    // get the current city for the state
    dispatch(
      getAllCitiesByStateAction({
        state_id: payload?.basic_details?.state_id?.toString(),
      })
    );
    let initialValues = {
      propertyName: payload?.basic_details?.property_name,
      pincode: payload?.basic_details?.pincode,
      stateId: payload?.basic_details?.state_id,
      cityId: payload?.basic_details?.city_id,
      addressLine1: payload?.basic_details?.address_line_1,
      addressLine2: payload?.basic_details?.address_line_2,
      addressLine3: payload?.basic_details?.address_line_3,
      userStatus: payload?.basic_details?.property_creator,
      propertyType: payload?.basic_details?.property_type,
      rooms: payload?.basic_details?.space_details?.[0]?.space_count,
      kitchens: payload?.basic_details?.space_details?.[1]?.space_count,
      balconies: payload?.basic_details?.space_details?.[2]?.space_count,
      halls: payload?.basic_details?.space_details?.[3]?.space_count,
      coveredParkings: payload?.basic_details?.space_details?.[4]?.space_count,
      openParkings: payload?.basic_details?.space_details?.[5]?.space_count,
      furnishing_id: payload?.basic_details?.furnishing_type,
    };
    setInitialValues(initialValues);
  }, []);

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
          <Typography id="modal-modal-title" variant="h5" textAlign={"center"}>
            Edit Property Basic Details
          </Typography>
          <Box
            marginY={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <Box
              component="img"
              alt="green iguana"
              sx={{
                height: "50px",
                width: "100px",
                // borderRadius: "100%",
                objectFit: "cover",
              }}
              src={
                individualProperty?.basic_details?.file_url ||
                "http://34.36.127.104/tenantowner/twitter_header_photo_1.png"
              }
            />
            <Typography textAlign={"center"}>
              {individualProperty?.basic_details?.property_name}
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize={true}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setSubmitting,
              setFieldValue,
              setValues,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    maxWidth: 400,
                    mx: "auto",
                    my: 4,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        sx={{ mr: 1 }}
                        name="propertyName"
                        label="Property Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={values.propertyName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.propertyName && errors.propertyName}
                        error={Boolean(
                          touched.propertyName && errors.propertyName
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="number"
                        sx={{ mr: 1 }}
                        name="pincode"
                        label="Pincode"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={values.pincode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.pincode && errors.pincode}
                        error={Boolean(touched.pincode && errors.pincode)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        select
                        sx={{ mr: 1 }}
                        name="stateId"
                        label="State"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={values.stateId}
                        onChange={(e) => {
                          setFieldValue("stateId", e.target.value);
                          setFieldValue("cityId", "");
                          // call the cities api
                          dispatch(
                            getAllCitiesByStateAction({
                              state_id: e.target.value.toString(),
                            })
                          );
                        }}
                        onBlur={handleBlur}
                        helperText={touched.stateId && errors.stateId}
                        error={Boolean(touched.stateId && errors.stateId)}
                      >
                        {location?.states &&
                          location?.states.map((item) => (
                            <MenuItem key={item.state_id} value={item.state_id}>
                              {item.state_name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        select
                        sx={{ mr: 1 }}
                        name="cityId"
                        label="City"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={values.cityId}
                        onChange={(e) => {
                          setFieldValue("cityId", e.target.value);
                        }}
                        onBlur={handleBlur}
                        helperText={touched.cityId && errors.cityId}
                        error={Boolean(touched.cityId && errors.cityId)}
                      >
                        {location?.city &&
                          location?.city.map((item) => (
                            <MenuItem key={item.city_id} value={item.city_id}>
                              {item.city_name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        sx={{ mr: 1 }}
                        name="addressLine1"
                        label="Address Line 1"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={values.addressLine1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.addressLine1 && errors.addressLine1}
                        error={Boolean(
                          touched.addressLine1 && errors.addressLine1
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        sx={{ mr: 1 }}
                        name="addressLine2"
                        label="Address Line 2"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={values.addressLine2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.addressLine2 && errors.addressLine2}
                        error={Boolean(
                          touched.addressLine2 && errors.addressLine2
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        sx={{ mr: 1 }}
                        name="addressLine3"
                        label="Address Line 3"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={values.addressLine3}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.addressLine3 && errors.addressLine3}
                        error={Boolean(
                          touched.addressLine3 && errors.addressLine3
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        select
                        sx={{ mr: 1 }}
                        name="propertyType"
                        label="PropertyType"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={values.propertyType}
                        onChange={handleChange}
                        // onChange={(e) => {
                        //   // handleChange(e);
                        //   setFieldValue("propertyType", e.target.value);
                        // }}
                        //   onBlur={handleBlur}
                        //   helperText={touched.propertyType && errors.propertyType}
                        //   error={Boolean(
                        //     touched.propertyType && errors.propertyType
                        //   )}
                      >
                        {propertyTypeItems?.map((item) => (
                          <MenuItem key={item.code} value={item.code}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        select
                        sx={{ mr: 1 }}
                        name="furnishingType"
                        label="Furnishing Type"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={values.furnishing_id}
                        onChange={(e) => {
                          // console.log(e.target.value);
                          setFieldValue("furnishing_id", e.target.value);
                        }}
                        // onChange={(e) => {
                        //   // handleChange(e);
                        //   setFieldValue("propertyType", e.target.value);
                        // }}
                        //   onBlur={handleBlur}
                        //   helperText={touched.propertyType && errors.propertyType}
                        //   error={Boolean(
                        //     touched.propertyType && errors.propertyType
                        //   )}
                      >
                        {individualProperty?.listing_details?.furnishing_details?.map(
                          (item) => {
                            return (
                              <MenuItem
                                key={item.furnishing_id}
                                value={item.furnishing_id}
                              >
                                {item.furnishing_name}
                              </MenuItem>
                            );
                          }
                        )}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <FormLabel
                        sx={{ color: "text.primary" }}
                        id="demo-row-radio-buttons-group-label"
                      >
                        Please provide count of each space:
                      </FormLabel>
                    </Grid>

                    <Grid container item xs={12} spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          type="number"
                          name="rooms"
                          label="Rooms"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.rooms}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.rooms && errors.rooms}
                          error={Boolean(touched.rooms && errors.rooms)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          type="number"
                          name="kitchens"
                          label="Kitchens"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.kitchens}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.kitchens && errors.kitchens}
                          error={Boolean(touched.kitchens && errors.kitchens)}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          type="number"
                          name="balconies"
                          label="Balconies"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.balconies}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.balconies && errors.balconies}
                          error={Boolean(touched.balconies && errors.balconies)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          type="number"
                          name="halls"
                          label="Halls"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.halls}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.halls && errors.halls}
                          error={Boolean(touched.halls && errors.halls)}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          type="number"
                          name="openParkings"
                          label="Open Parkings"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.openParkings}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched.openParkings && errors.openParkings
                          }
                          error={Boolean(
                            touched.openParkings && errors.openParkings
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          type="number"
                          name="coveredParkings"
                          label="Covered Parkings"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.coveredParkings}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched.coveredParkings && errors.coveredParkings
                          }
                          error={Boolean(
                            touched.coveredParkings && errors.coveredParkings
                          )}
                        />
                      </Grid>
                    </Grid>

                    {individualProperty.basic_details.added_by ===
                      userProfile.profile_id && (
                      <Grid item xs={12}>
                        <FormLabel
                          sx={{ color: "text.primary" }}
                          id="radio-group"
                        >
                          Please select what defines you best:
                        </FormLabel>

                        <RadioGroup
                          column
                          aria-labelledby="radio-group"
                          name="userStatus"
                          value={values.userStatus}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label="I am the owner of this property"
                          />
                          <FormControlLabel
                            value={2}
                            control={<Radio />}
                            label="I am a tenant trying to get my rent agreement prepared and signed"
                          />
                          <FormControlLabel
                            value={3}
                            control={<Radio />}
                            label="I am an agent trying to find tenant for my client"
                          />
                          <FormControlLabel
                            value={4}
                            control={<Radio />}
                            label="I am just helping someone manage their property "
                          />
                        </RadioGroup>
                      </Grid>
                    )}
                    <Grid item xs={12} display="flex" justifyContent="center">
                      <Button variant="contained" color="primary" type="submit">
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Card>
      </Modal>
    </>
  );
};

export default EditPropertyBasicDetailsModal;
