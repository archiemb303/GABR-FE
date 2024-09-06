import Loading from "app/components/MatxLoading";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
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
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/system";
import {
  getAllCitiesByStateAction,
  getAllStatesByCountryAction,
} from "app/redux/actions/LocationActions";
import {
  setEditPropertyBasicDetailsModal,
  setCreateNewTenancyModal,
  setAddPropertyPartiesModal,
  setUpdateUserProfileModal,
  setAddPartyConfirmModal,
  setAddUserPartyModal,
} from "app/redux/actions/ModalActions";
import {
  createNewTenancyAction,
  getpayloadAction,
  updateBasicPropertyDetailsAction,
} from "app/redux/actions/PropertyActions";
import { Form, Formik } from "formik";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment";
import { fetchUserProfileAction } from "app/redux/actions/UserProfileActions";
// import { propertyPartyTypeItems } from "./items/propertyTypes";
import { LOADING_CREATE_NEW_TENANCY } from "app/redux/actions/LoadingAndErrorAction";

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

const AddUserPartyModal = () => {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.modal.openAddUserParty);
  const { individualProperty, newTenancy } = useSelector(
    (state) => state.property
  );
  const { GET_ALL_CITIES_BY_STATE, CREATE_NEW_TENANCY } = useSelector(
    (state) => state.loadingAndError.loader
  );
  const { userProfile, preloginState } = useSelector((state) => state);
  const isAccountCreatorRef = useRef();
  const location = useSelector((state) => state.location);
  const [initialValues, setInitialValues] = useState(null);
  const fNameRegExp = /^[a-zA-Z ]+$/;
  const lNameRegExp = /^[a-zA-Z ]+$/;
  const phoneRegExp = /^[6-9]\d{9}$/gi;

  const validationSchema = Yup.object().shape({
    property_id: Yup.string().required("Property Id is required field"),
    first_name: Yup.string()
      .required("First Name is required field")
      .matches(fNameRegExp, "No special characters and numbers are allowed."),
    last_name: Yup.string()
      .required("Last Name is required field")
      .matches(lNameRegExp, "No special characters and numbers are allowed."),
    party_type_id: Yup.string().required("Party Type is required field"),
    address_line_1: Yup.string()
      .required("Address Line 1 is required field")
      .max(30, "Address Line 1 should be between 0 to 30 characters"),
    address_line_2: Yup.string()
      .required("Address Line 2 is required field")
      .max(15, "Address Line 2 should be between 0 to 15 characters"),
    address_line_3: Yup.string()
      .required("Address Line 3 is required field")
      .max(10, "Address Line 3 should be between 0 to 10 characters"),
    city_id: Yup.string().required("City is required field"),
    pincode: Yup.string()
      .required("Pincode is required field")
      .typeError("Pincode should only contain digits")
      .matches(
        /^[1-9][0-9]{5}$/,
        "Pincode should contain exactly 6 digits and should not start with 0"
      ),
    email_id: Yup.string().required("Email is required field"),
    phone_no: Yup.string()
      .required("Enter a 10-digit phone number without country code")
      .matches(
        phoneRegExp,
        "Enter valid a 10-digit phone number without country code."
      ),
    phone_code: Yup.number().required("Phone Code is required field"),
    dob: Yup.date()
      .required("Date Of Birth is required field")
      .typeError("Enter Date in Correct Format - MMMM DD,YY"),
    isAccountCreator: Yup.boolean().required("Required"),
  });

  const propertyPartyTypeItems = [
    {
      name: "Owner",
      code: 1,
    },
    {
      name: "Tenant",
      code: 2,
    },
    {
      name: "Agency",
      code: 3,
    },
    {
      name: "Agency Member",
      code: 4,
    },
  ];

  const setFormInitialValues = () => {
    if (individualProperty)
      setInitialValues({
        property_id: individualProperty?.basic_details?.property_id,
        first_name: "",
        last_name: "",
        address_line_1: "",
        address_line_2: "",
        address_line_3: "",
        state_id: "",
        city_id: "",
        pincode: "",
        email_id: userProfile.email_id,
        phone_no: "",
        phone_code: 91,
        party_type_id: "",
        dob: "",
        // party_type_id: individualProperty.basic_details.property_creator,
        isAccountCreator: "",
      });
  };

  useEffect(() => {
    setFormInitialValues();
  }, [individualProperty]);
  useEffect(() => {
    // console.log("Inside UseEffect...");
    // console.log(individualProperty?.tenancy_details?.party_details.length);
    // if (individualProperty?.tenancy_details?.party_details.length === 1)
    //   dispatch(setAddPropertyPartiesModal(true));
  }, [individualProperty]);

  const handleClose = () => {
    dispatch(setAddUserPartyModal(false));
    // dispatch(setAddPropertyPartiesModal(true));
    // setFormInitialValues();
  };

  const handleOpen = () => {
    dispatch(setAddUserPartyModal(true));
  };

  const handleSubmit = async (values, { isSubmitting }) => {
    const params = {
      property_id: values.property_id,
      first_name: values.first_name,
      last_name: values.last_name,
      address_line_1: values.address_line_1,
      address_line_2: values.address_line_2,
      address_line_3: values.address_line_3,
      city_id: values.city_id,
      party_type: values.party_type_id,
      state_id: values.state_id,
      pincode: values.pincode.toString(),
      email_id: values.email_id,
      phone_no: values.phone_no.toString(),
      phone_code: 91,
      dob:
        values.dob.getFullYear() +
        "-" +
        (values.dob.getMonth() + 1) +
        "-" +
        values.dob.getDate(),
    };
    // dispatch(createNewTenancyAction(params));
    dispatch(setAddPropertyPartiesModal(true));
    handleClose();
  };

  useEffect(() => {
    if (newTenancy && isAccountCreatorRef.current) {
      if (
        CREATE_NEW_TENANCY?.isLoading === false &&
        (newTenancy?.tenancy_party_details[0]?.first_name !==
          userProfile?.first_name ||
          newTenancy?.tenancy_party_details[0]?.last_name !==
            userProfile?.last_name)
      ) {
        dispatch(setUpdateUserProfileModal(true));
      }
    }
  }, [newTenancy]);

  return (
    <>
      {false ? (
        <Box sx={{ height: 100 }}>
          <Loading />
        </Box>
      ) : (
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
              <Typography
                id="modal-modal-title"
                variant="h5"
                textAlign={"center"}
              >
                Create New Tenancy
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="body1"
                sx={{ textAlign: "center", mt: 2 }}
              >
                Congratulations for finding your new tenants/house. The process
                of generating and signing rental agreement will begin.
              </Typography>
              {/* <Typography
                id="modal-modal-title"
                variant="body1"
                sx={{ textAlign: "center", mt: 2 }}
              >
                Congratulations for finding your new tenants/house. The ad
                listing pertaining to this property will now be taken down, and
                process of generating and signing rental agreement will begin.
              </Typography> */}

              {/* <Typography
                variant="h6"
                sx={{
                  mt: 4,
                  mb: 2,
                }}
              >
                Please fill the form to proceed
              </Typography> */}

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
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            sx={{ mr: 1 }}
                            disabled
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
                            >
                              {propertyPartyTypeItems.map((item) => {
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
                          <TextField
                            sx={{ mr: 1 }}
                            disabled
                            name="property_id"
                            label="Property Id"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={values.property_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.property_id && errors.property_id
                            }
                            error={Boolean(
                              touched.property_id && errors.property_id
                            )}
                          />
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
                              type="number"
                              value={values.phone_code}
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
                              label="Phone Number"
                              variant="outlined"
                              size="small"
                              fullWidth
                              value={values.phone_no}
                              type="number"
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
                            {location?.states &&
                              location?.states.map((item) => (
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
                              location?.city.map((item) => (
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
                            value={values.pincode}
                            onChange={handleChange}
                            type="number"
                            onBlur={handleBlur}
                            helperText={touched.pincode && errors.pincode}
                            error={Boolean(touched.pincode && errors.pincode)}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <LocalizationProvider
                            fullWidth
                            dateAdapter={AdapterDateFns}
                          >
                            <DatePicker
                              onOpen={() =>
                                setInitialValues({
                                  ...values,
                                  dob: values.dob
                                    ? values.dob
                                    : moment().subtract(18, "years"),
                                })
                              }
                              minDate={moment().subtract(150, "years")}
                              maxDate={moment().subtract(18, "years")}
                              value={values.dob}
                              inputFormat="MMMM dd, yyyy"
                              onChange={(date) => setFieldValue("dob", date)}
                              disabledKeyboardNavigation={true}
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
                        <Grid item xs={12}>
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
                                // console.log(ev.target.value);
                                isAccountCreatorRef.current =
                                  ev.target.value === "false" ? false : true;
                                setFieldValue(
                                  "isAccountCreator",
                                  ev.target.value
                                );
                              }}
                              onBlur={handleBlur}
                              helperText={
                                touched.isAccountCreator &&
                                errors.isAccountCreator
                              }
                              error={Boolean(
                                touched.isAccountCreator &&
                                  errors.isAccountCreator
                              )}
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
                            {touched.isAccountCreator &&
                              errors.isAccountCreator && (
                                <Typography
                                  variant="body1"
                                  color="#d32f2f"
                                  fontSize={"0.75rem"}
                                >
                                  Required
                                </Typography>
                              )}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: 2,
                              mt: 2,
                            }}
                          >
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={handleClose}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                            >
                              Proceed to Add Another Party
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Form>
                )}
              </Formik>

              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleClose();
                    dispatch(setAddPartyConfirmModal(true));
                  }}
                >
                  Proceed to Add Party
                </Button>
              </Box> */}
            </Card>
          </Modal>
        </>
      )}
    </>
  );
};

export default AddUserPartyModal;
