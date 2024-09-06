import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";

import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import CustomErrorListForForm from "app/components/CustomErrorListForForm";
import {
  getAllCitiesByStateAction,
  getAllStatesByCountryAction,
} from "app/redux/actions/LocationActions";
import {
  setAddPropertyPartiesModal,
  setEditPropertyBasicDetailsModal,
  setUpdateUserProfileModal,
} from "app/redux/actions/ModalActions";
import {
  addTenancyPartiesAction,
  getpayloadAction,
  updateBasicPropertyDetailsAction,
} from "app/redux/actions/PropertyActions";
import { Form, Formik, useFormikContext } from "formik";
import moment from "moment";
import { useCallback, useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  propertyPartyTypeItems,
  propertyTypeItems,
  propertyPartySalutation,
  propertyPartyDocuments,
} from "./items/propertyTypes";
import Loading from "app/components/MatxLoading";

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

const AddPropertyPartiesModal = ({ addOwnerasParty, setAddingParty }) => {
  const dispatch = useDispatch();
  const { individualProperty, addTenancyParties } = useSelector(
    (state) => state.property
  );
  const open = useSelector((state) => state.modal.openAddPropertyParties);
  const { GET_ALL_CITIES_BY_STATE, ADD_TENANCY_PARTIES } = useSelector(
    (state) => state.loadingAndError.loader
  );

  const isAccountCreatorRef = useRef();
  const location = useSelector((state) => state.location);
  const { userProfile } = useSelector((state) => state);
  const [showError, setShowError] = useState(false);
  const { custom } = useTheme();
  const [initialValues, setInitialValues] = useState({}); // used in formik
  const [documentList, setDocumentList] = useState(propertyPartyDocuments); //All the available document list
  const { CREATE_NEW_TENANCY } = useSelector(
    (store) => store.loadingAndError.loader
  );
  const fNameRegExp = /^[a-zA-Z ]+$/;
  const lNameRegExp = /^[a-zA-Z ]+$/;
  const phoneRegExp = /^[6-9]\d{9}$/gi;

  const validationSchema = Yup.object().shape({
    property_id: Yup.string().required("Property Id is required field"),
    tenancy_id: Yup.string().required("Tenancy Id is required field"),
    salutation: Yup.string().required("Salutation is required field"),
    first_name: Yup.string()
      .required("First Name is required field")
      .matches(fNameRegExp, "No special characters and numbers are allowed.")
      .nullable(),
    last_name: Yup.string()
      .required("Last Name is required field")
      .matches(lNameRegExp, "No special characters and numbers are allowed.")
      .nullable(),
    address_line_1: Yup.string().required("Address Line 1 is required field"),
    // .max(30, "Address Line 1 should be between 0 to 30 characters"),
    address_line_2: Yup.string().required("Address Line 2 is required field"),
    // .max(15, "Address Line 2 should be between 0 to 15 characters"),
    address_line_3: Yup.string().required("Address Line 3 is required field"),
    // .max(10, "Address Line 3 should be between 0 to 10 characters"),
    city_id: Yup.string().required("City is required field"),
    pincode: Yup.string()
      .required("Pincode is required field")
      .typeError("Pincode should only contain digits")
      .matches(
        /^[1-9][0-9]{5}$/,
        "Pincode should contain exactly 6 digits and should not start with 0"
      ),
    party_type_id: Yup.string().required("Party Type is required field"),
    email_id: Yup.string()
      .required("Email is required field")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email ID is Incorrect"),
    phone_no: Yup.string()
      .required("Phone Number is required field")
      .matches(
        phoneRegExp,
        "Enter a valid 10-digit phone number without country code."
      )
      .nullable(),
    phone_code: Yup.string().required("Phone Code is required field"),
    dob: Yup.date()
      .required("Date Of Birth is required field")
      .typeError("Enter Date in Correct Format - MMMM DD,YY"),
    // isAccountCreator: Yup.boolean().required("Required"),
  });

  // const useStyles = makeStyles((theme) => ({
  //     reverseYear: {
  //         '&.MuiYearPicker-root': {
  //             flexDirection: 'row-reverse !important',
  //             flexWrap: 'wrap-reverse !important'
  //         },
  //     },
  // }));

  // const classes = useStyles();

  const handleSubmit = async (values, { isSubmitting }) => {
    let newDob = new Date(values.dob);
    setShowError(true);

    // Create the array of provided documents
    let filteredDocuments = [];
    Object.keys(values.ids)?.map((key) => {
      if (
        // values.ids[key].imgFile.length > 10 &&
        values.ids[key].id_value.length > 0
      ) {
        filteredDocuments.push({
          id_type: values.ids[key].id_type,
          id_type_name: values.ids[key].id_type_name,
          id_value: values.ids[key].id_value,
          media_b64: values.ids[key].imgBase64SplitString,
          file_name: values.ids[key].id_type_name,
          file_extension: values.ids[key].file_extension,
          document_type: values.ids[key].document_type,
        });
      }
    });

    const params = {
      property_id: values.property_id,
      tenancy_id: values.tenancy_id,
      salutation: values.salutation,
      first_name: values.first_name,
      last_name: values.last_name,
      address_line_1: values.address_line_1,
      address_line_2: values.address_line_2,
      address_line_3: values.address_line_3,
      city_id: values.city_id,
      state_id: values.state_id,
      pincode: values.pincode.toString(),
      party_type_id: values.party_type_id,
      email_id: values.email_id,
      phone_no: values.phone_no,
      phone_code: values.phone_code,
      is_signing_party:
        values?.party_type_id === 1 ||
        values?.party_type_id === 2 ||
        values?.party_type_id === 5 ||
        values?.party_type_id === 6
          ? true
          : values?.party_type_id == 3 || values?.party_type_id == 4
          ? false
          : values.is_signing_party,
      dob:
        newDob.getFullYear() +
        "-" +
        (newDob.getMonth() + 1) +
        "-" +
        newDob.getDate(),
      ids: filteredDocuments,
    };
    dispatch(addTenancyPartiesAction(params));
    handleClose();
  };

  const imgToBase64 = (img) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(img);
    });

  const setFormInitialValues = () => {
    let initialValues = {};
    let selectedIds = {};
    // Commented for New Add Party Flow
    // if (individualProperty?.tenancy_details?.tenancy_terms?.property_id) {
    // creating the dynamic ids array
    documentList?.map((item) => {
      return (selectedIds["id" + item.id_type] = { ...item });
    });
    console.log(userProfile);
    initialValues = {
      property_id:
        individualProperty?.tenancy_details?.tenancy_terms?.property_id,
      tenancy_id:
        individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
      salutation: "",
      first_name: addOwnerasParty ? userProfile.first_name : "",
      last_name: addOwnerasParty ? userProfile.last_name : "",
      address_line_1: "",
      address_line_2: "",
      address_line_3: "",
      state_id: "",
      city_id: "",
      pincode: "",
      party_type_id: addOwnerasParty
        ? individualProperty.basic_details.party_type_id ||
          individualProperty.basic_details.property_creator
        : "",
      email_id: addOwnerasParty ? userProfile.email_id : "",
      phone_no: addOwnerasParty ? userProfile.phone_no : "",
      phone_code: 91,
      is_signing_party: "",
      dob: "",
      ids: selectedIds,
      isAccountCreator: "",
    };
    setInitialValues(initialValues);
    // }
  };

  const handleClose = () => {
    dispatch(setAddPropertyPartiesModal(false));

    setFormInitialValues();
  };

  useEffect(() => {
    console.log(addOwnerasParty);
    setFormInitialValues();
  }, [individualProperty, addOwnerasParty]);

  useEffect(() => {
    if (
      addOwnerasParty &&
      ADD_TENANCY_PARTIES?.isLoading === false &&
      (addTenancyParties?.first_name !== userProfile?.first_name ||
        addTenancyParties?.last_name !== userProfile?.last_name)
    ) {
      dispatch(setUpdateUserProfileModal(true));
    }
  }, [ADD_TENANCY_PARTIES?.isLoading, addTenancyParties]);

  // useEffect(() => {
  //   if (addTenancyParties && isAccountCreatorRef.current) {
  //     if (
  //       ADD_TENANCY_PARTIES?.isLoading === false
  //       &&
  //       (addTenancyParties?.first_name !==
  //         userProfile.first_name ||
  //         addTenancyParties?.last_name !==
  //         userProfile.last_name)
  //     ) {
  //       dispatch(setUpdateUserProfileModal(true));
  //     }
  //   }
  // }, [addTenancyParties]);

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
          {CREATE_NEW_TENANCY?.isLoading === true ||
          CREATE_NEW_TENANCY?.isLoading === false ? (
            <Box sx={{ height: 100 }}>
              <Loading />
            </Box>
          ) : (
            <>
              <Typography
                id="modal-modal-title"
                variant="h5"
                textAlign={"center"}
              >
                Add Party
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
                            name="email_id"
                            label="Email"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={values.email_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.email_id && errors.email_id}
                            error={Boolean(touched.email_id && errors.email_id)}
                            disabled={addOwnerasParty}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl
                            fullWidth
                            error={
                              touched.party_type_id &&
                              Boolean(errors.party_type_id)
                                ? true
                                : false
                            }
                          >
                            <InputLabel id="party-type-select-label">
                              Party Type
                            </InputLabel>
                            <Select
                              labelId="party-type-select-label"
                              id="party-type-select"
                              size="small"
                              value={values.party_type_id}
                              label="party_type_id"
                              onChange={(ev) => {
                                setFieldValue("party_type_id", ev.target.value);
                              }}
                              disabled={addOwnerasParty}
                            >
                              {propertyPartyTypeItems?.map((item) => {
                                return (
                                  <MenuItem key={item.code} value={item.code}>
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>

                            {touched.party_type_id &&
                            Boolean(errors.party_type_id) ? (
                              <FormHelperText>
                                {errors.party_type_id}
                              </FormHelperText>
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl
                            fullWidth
                            error={
                              touched.salutation && Boolean(errors.salutation)
                                ? true
                                : false
                            }
                          >
                            <InputLabel id="salutation-select-label">
                              Salutation
                            </InputLabel>
                            <Select
                              labelId="salutation-select-label"
                              id="salutation-select"
                              size="small"
                              value={values.salutation}
                              label="Salutation"
                              onChange={(ev) => {
                                setFieldValue("salutation", ev.target.value);
                              }}
                            >
                              {propertyPartySalutation?.map((item) => {
                                return (
                                  <MenuItem key={item.id} value={item.name}>
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>

                            {touched.salutation &&
                            Boolean(errors.salutation) ? (
                              <FormHelperText>
                                {errors.salutation}
                              </FormHelperText>
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            sx={{ mr: 1 }}
                            name="first_name"
                            label="First Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={values.first_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.first_name && errors.first_name}
                            error={Boolean(
                              touched.first_name && errors.first_name
                            )}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            sx={{ mr: 1 }}
                            name="last_name"
                            label="Last Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={values.last_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.last_name && errors.last_name}
                            error={Boolean(
                              touched.last_name && errors.last_name
                            )}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            sx={{ mr: 1 }}
                            name="address_line_1"
                            label="Address Line 1"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={values.address_line_1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.address_line_1 && errors.address_line_1
                            }
                            error={Boolean(
                              touched.address_line_1 && errors.address_line_1
                            )}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            sx={{ mr: 1 }}
                            name="address_line_2"
                            label="Address Line 2"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={values.address_line_2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.address_line_2 && errors.address_line_2
                            }
                            error={Boolean(
                              touched.address_line_2 && errors.address_line_2
                            )}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            sx={{ mr: 1 }}
                            name="address_line_3"
                            label="Address Line 3"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={values.address_line_3}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.address_line_3 && errors.address_line_3
                            }
                            error={Boolean(
                              touched.address_line_3 && errors.address_line_3
                            )}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            select
                            required
                            sx={{ mr: 1 }}
                            name="state_id"
                            label="State"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={values.state_id}
                            onChange={(e) => {
                              // Set the state
                              setFieldValue(
                                "state_id",
                                e.target.value.toString()
                              );
                              //Reset the city
                              setFieldValue("city_id", "");
                              // call the cities api
                              dispatch(
                                getAllCitiesByStateAction({
                                  state_id: e.target.value.toString(),
                                })
                              );
                            }}
                            onBlur={handleBlur}
                            helperText={touched.state_id && errors.state_id}
                            error={Boolean(touched.state_id && errors.state_id)}
                          >
                            {location?.statesList &&
                              location?.statesList?.map((item) => (
                                <MenuItem
                                  key={item.state_id}
                                  value={item.state_id}
                                >
                                  {item.state_name}
                                </MenuItem>
                              ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            select
                            required
                            sx={{
                              mr: 1,
                            }}
                            name="city_id"
                            label="City"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={values.city_id}
                            onChange={(e) => {
                              setFieldValue(
                                "city_id",
                                e.target.value.toString()
                              );
                              // call the state api
                              // dispatch(
                              //     getAllCitiesByStateAction(
                              //         {
                              //             state_id:
                              //                 e.target.value.toString(),
                              //         }
                              //     )
                              // );
                            }}
                            onBlur={handleBlur}
                            helperText={touched.city_id && errors.city_id}
                            error={Boolean(touched.city_id && errors.city_id)}
                          >
                            {location?.city &&
                              location?.city?.map((item) => (
                                <MenuItem
                                  key={item.city_id}
                                  value={item.city_id}
                                >
                                  {item.city_name}
                                </MenuItem>
                              ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            sx={{ mr: 1 }}
                            name="pincode"
                            label="Pincode"
                            variant="outlined"
                            size="small"
                            fullWidth
                            type="number"
                            value={values.pincode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.pincode && errors.pincode}
                            error={Boolean(touched.pincode && errors.pincode)}
                          />
                        </Grid>
                        <Grid item container sx={{ display: "flex" }}>
                          <Grid item xs={2}>
                            <TextField
                              sx={{ mr: 1 }}
                              disabled
                              name="phone_code"
                              label="Phone Code"
                              variant="outlined"
                              size="small"
                              // fullWidth
                              value={values.phone_code}
                              type="number"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                touched.phone_code && errors.phone_code
                              }
                              error={Boolean(
                                touched.phone_code && errors.phone_code
                              )}
                            />
                          </Grid>
                          <Grid item xs={10}>
                            <TextField
                              sx={{ mr: 1 }}
                              name="phone_no"
                              label="Phone"
                              variant="outlined"
                              size="small"
                              fullWidth
                              value={values.phone_no}
                              input="number"
                              onChange={(e) => {
                                setFieldValue(
                                  "phone_no",
                                  e.target.value.replace(/^0+/, "")
                                );
                              }}
                              onBlur={handleBlur}
                              helperText={touched.phone_no && errors.phone_no}
                              error={Boolean(
                                touched.phone_no && errors.phone_no
                              )}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <LocalizationProvider
                            fullWidth
                            dateAdapter={AdapterMoment}
                          >
                            <DatePicker
                              onOpen={() =>
                                setInitialValues({
                                  ...values,
                                  dob: values?.dob
                                    ? values?.dob
                                    : moment().subtract(18, "years"),
                                })
                              }
                              minDate={moment().subtract(150, "years")}
                              maxDate={moment().subtract(18, "years")}
                              value={values.dob}
                              inputFormat="MMMM DD, yyyy"
                              onChange={(date) => setFieldValue("dob", date)}
                              renderInput={(props) => (
                                <TextField
                                  {...props}
                                  sx={{
                                    mr: 1,
                                  }}
                                  size="small"
                                  fullWidth
                                  variant="outlined"
                                  label="Date Of Birth"
                                  onBlur={handleBlur}
                                  helperText={touched.dob && errors.dob}
                                  error={Boolean(touched.dob && errors.dob)}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        </Grid>
                        {/* <Grid item xs={12}>
                          <Typography
                            variant="body1"
                            color="initial"
                          ></Typography>

                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Is it you?
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="radio-buttons-group"
                              value={values.isAccountCreator}
                              onChange={(ev) => {
                                console.log(ev.target.value);
                                isAccountCreatorRef.current =
                                  ev.target.value === "false"
                                    ? false : true
                                setFieldValue(
                                  "isAccountCreator",
                                  ev.target.value
                                );
                              }}
                              onBlur={handleBlur}
                              helperText={touched.isAccountCreator && errors.isAccountCreator}
                              error={Boolean(touched.isAccountCreator && errors.isAccountCreator)}
                            >
                              <FormControlLabel
                                value={true}
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value={false}
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                            {touched.isAccountCreator && errors.isAccountCreator &&
                              <Typography
                                variant="body1"
                                color="#d32f2f"
                                fontSize={'0.75rem'}
                              >Required</Typography>
                            }

                          </FormControl>
                        </Grid> */}
                        <Grid item xs={12}>
                          <Typography
                            variant="body1"
                            color="initial"
                          ></Typography>

                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Will this party be signing the rental agreement?
                            </FormLabel>
                            {values?.party_type_id === 1 ||
                            values?.party_type_id === 2 ||
                            values?.party_type_id === 5 ||
                            values?.party_type_id === 6 ? (
                              <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={true}
                              >
                                <FormControlLabel
                                  disabled
                                  value={true}
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  disabled
                                  value={false}
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                            ) : (
                              <>
                                {values?.party_type_id === 3 ||
                                values?.party_type_id === 4 ? (
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={false}
                                  >
                                    <FormControlLabel
                                      disabled
                                      value={true}
                                      control={<Radio />}
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      disabled
                                      value={false}
                                      control={<Radio />}
                                      label="No"
                                    />
                                  </RadioGroup>
                                ) : (
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={values?.is_signing_party}
                                    onChange={(ev) => {
                                      setFieldValue(
                                        "is_signing_party",
                                        ev.target.value == "true"
                                      );
                                    }}
                                  >
                                    <FormControlLabel
                                      value={true}
                                      control={<Radio />}
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      value={false}
                                      control={<Radio />}
                                      label="No"
                                    />
                                  </RadioGroup>
                                )}
                              </>
                            )}
                          </FormControl>
                        </Grid>

                        {Object.keys(values?.ids)?.map((key) => {
                          return (
                            <Grid
                              container
                              item
                              xs={12}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <TextField
                                sx={{ mr: 1 }}
                                required={values.ids[key].required}
                                name={values.ids[key].id_type_name}
                                label={values.ids[key].id_type_name + " Number"}
                                variant="outlined"
                                size="small"
                                value={values.ids[key].id_value.toUpperCase()}
                                helperText={
                                  touched[values?.ids[key]?.id_type_name] &&
                                  errors[values?.ids[key]?.id_type_name]
                                }
                                error={Boolean(
                                  touched[values?.ids[key]?.id_type_name] &&
                                    errors[values?.ids[key]?.id_type_name]
                                )}
                                onChange={(ev) => {
                                  setFieldValue(
                                    "ids[" + key + "][id_value]",
                                    ev.target.value
                                  );
                                }}
                                onBlur={handleBlur}
                              />

                              {/* Image Preview */}
                              {values.ids[key].imgFile && (
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <img
                                    src={values.ids[key].imgFile}
                                    alt={values.ids[key].description}
                                    height={64}
                                    width={64}
                                  />
                                </Box>
                              )}

                              {/* User First enter the id number then show them image upload button */}
                              {values.ids[key].id_value.length > 1 && (
                                <Button
                                  variant="outlined"
                                  component="label"
                                  color={
                                    values.ids[key].imgFile ? "warning" : "info"
                                  }
                                >
                                  {values.ids[key].imgFile
                                    ? "Change"
                                    : "Choose Image"}
                                  <input
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    onChange={(ev) => {
                                      const img = ev.target.files[0];

                                      const type = "." + img.type.split("/")[1];

                                      imgToBase64(img).then((res) => {
                                        const imgBase64SplitString =
                                          res.split(",");

                                        setFieldValue(
                                          "ids[" + key + "][imgFile]",
                                          res
                                        );
                                        setFieldValue(
                                          "ids[" +
                                            key +
                                            "][imgBase64SplitString]",
                                          imgBase64SplitString[1]
                                        );
                                        setFieldValue(
                                          "ids[" + key + "][file_extension]",
                                          type
                                        );
                                      });
                                    }}
                                  />
                                </Button>
                              )}
                            </Grid>
                          );
                        })}

                        <Grid
                          item
                          xs={12}
                          display="flex"
                          justifyContent="center"
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={() => {
                              setShowError(true);
                            }}
                          >
                            Add Party
                          </Button>
                        </Grid>
                        {/* Error List - used for debugging, can be used in prod*/}
                        {/* {showError && (
                          <CustomErrorListForForm errorObject={errors} />
                        )} */}
                      </Grid>
                    </Box>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </Card>
      </Modal>
    </>
  );
};

export default AddPropertyPartiesModal;
