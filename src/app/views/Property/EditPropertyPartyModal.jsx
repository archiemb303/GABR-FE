import CloseIcon from "@mui/icons-material/Close";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
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
import CustomSnackbar from "app/components/CustomSnackbar";
import {
  getAllCitiesByStateAction,
  getAllStatesByCountryAction,
} from "app/redux/actions/LocationActions";
import {
  setDashboardVideoModal,
  setEditPropertyPartyModal,
} from "app/redux/actions/ModalActions";
import {
  editTenancyPartiesAction,
  getpayloadAction,
  updateBasicPropertyDetailsAction,
} from "app/redux/actions/PropertyActions";
import { Form, Formik } from "formik";
import moment from "moment";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import * as Yup from "yup";
import {
  propertyPartyDocuments,
  propertyPartySalutation,
  propertyPartyTypeItems,
  propertyTypeItems,
} from "./items/propertyTypes";
import DashboardVideoModal from "../Postlogin/DashboardVideoModal";

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
const EditPropertyPartyModal = ({ payload }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.openEditPropertyPartyModal);
  const { individualProperty } = useSelector((state) => state.property);
  const { UPDATE_BASIC_PROPERTY_DETAILS } = useSelector(
    (store) => store.loadingAndError.loader
  );
  const currentUser = useSelector((state) => state.userProfile);

  const phoneRegExp = /^[6-9]\d{9}$/gi;
  const emailRegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [initialValues, setInitialValues] = useState({}); // used in formik
  // const [isEditingSelf, setisEditingSelf] = useState();

  // useEffect(() => {
  //   if (open) {
  //     if (payload.party_profile_id === currentUser.profile_id)
  //       setisEditingSelf(true);
  //   }
  // }, [open]);

  const validationSchema = Yup.object().shape({
    tenancy_party_id: Yup.string().required(
      "tenancy_party_id is a required field"
    ),
    property_id: Yup.string().required("Property Id is a required field"),
    tenancy_id: Yup.string().required("Tenancy Id is a required field"),
    salutation: Yup.string().required("Salutation is a required field"),
    first_name: Yup.string().required("First Name is a required field"),
    last_name: Yup.string().required("Last Name is a required field"),
    party_type_id: Yup.string().required("Party Type is a required field"),
    email_id: Yup.string()
      .required("Email Id is a required field")
      .matches(emailRegExp, "Please enter a valid email address."),
    phone_no: Yup.string()
      .required("Phone Number is a required field")
      .matches(
        phoneRegExp,
        "Enter a valid 10-digit phone number without country code."
      ),
    phone_code: Yup.string().required("Phone Code is a required field"),
    dob: Yup.string().required("Date Of Birth is a required field"),
    // ids: Yup.string().required('ids is a required field'),
    // party_action: Yup.string().required('Party Action is a required field'),
  });

  const handleSubmit = async (values) => {
    // Create the array of provided documents
    let newDob = new Date(values.dob);
    let filteredDocuments = [];
    Object.keys(values.ids).map((key) => {
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
          file_url: values.ids[key].imgFile,
          file_extension: values.ids[key].file_extension,
          file_id: values.ids[key].file_id,
          document_type: values.ids[key].document_type,
        });
      }
    });

    const params = {
      tenancy_party_id: values.tenancy_party_id,
      property_id: values.property_id,
      tenancy_id: values.tenancy_id,
      salutation: values.salutation,
      first_name: values.first_name,
      last_name: values.last_name,
      party_type_id: values.party_type_id,
      email_id: values.email_id,
      phone_no: values.phone_no,
      phone_code: values.phone_code,
      dob:
        newDob.getFullYear() +
        "-" +
        (newDob.getMonth() + 1) +
        "-" +
        newDob.getDate(),
      is_signing_party:
        values?.party_type_id === 1 ||
        values?.party_type_id === 2 ||
        values?.party_type_id === 5 ||
        values?.party_type_id === 6
          ? true
          : values?.party_type_id == 3 || values?.party_type_id == 4
          ? false
          : values.is_signing_party,
      ids: filteredDocuments,
      party_action: values.party_action,
    };

    // console.log("🚀 ~ handleSubmit ~ params", params);
    dispatch(editTenancyPartiesAction(params));
    handleClose();
  };

  const handleClose = () => {
    dispatch(setEditPropertyPartyModal(false));
  };

  const imgToBase64 = (img) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(img);
    });

  useEffect(() => {
    // console.log("💏payload.ids = ", payload?.ids);
    let selectedIds = {};

    // creating the dynamic ids array
    propertyPartyDocuments.map((item) => {
      return (selectedIds["id" + item.id_type] = { ...item });
    });

    // find the payload ids  index to populate the initial values object
    payload?.ids?.map((el) => {
      // Find the current payload id index  in the selected id object
      // 🛑 In Future : add the image url and other data when they come from backend
      Object.keys(selectedIds).map((key) => {
        if (selectedIds[key].id_type === el.document_type_id) {
          selectedIds[key].id_value = el.party_document_value;
          selectedIds[key].file_id = el.file_id;
          selectedIds[key].imgFile = el.file_url;
        }
      });
    });

    let initialValues = {
      tenancy_party_id: payload?.tenancy_party_id,
      property_id: payload?.property_id,
      tenancy_id: payload?.tenancy_id,
      salutation: payload?.salutation,
      first_name: payload?.first_name,
      last_name: payload?.last_name,
      party_type_id: payload?.party_type_id,
      email_id: payload?.email_id,
      phone_no: payload?.phone_no,
      phone_code: payload?.phone_code,
      dob: new Date(payload?.dob),
      is_signing_party: payload?.is_signing_party,
      ids: selectedIds,
      party_action: "",
    };
    console.log("🚀 ~ useEffect ~ initialValues", initialValues.ids);
    setInitialValues(initialValues);

    return () => {};
  }, []);

  return (
    <>
      <DashboardVideoModal />
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
            Edit Party Details
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
              setFieldValue,
              dirty,
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
                    <>
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
                            disabled
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
                            {propertyPartySalutation.map((item) => {
                              return (
                                <MenuItem key={item.id} value={item.name}>
                                  {item.name}
                                </MenuItem>
                              );
                            })}
                          </Select>

                          {touched.salutation && Boolean(errors.salutation) ? (
                            <FormHelperText>{errors.salutation}</FormHelperText>
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
                          error={Boolean(touched.last_name && errors.last_name)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          sx={{ mr: 1 }}
                          name="email_id"
                          label="Email "
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.email_id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={true}
                          helperText={touched.email_id && errors.email_id}
                          error={Boolean(touched.email_id && errors.email_id)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          sx={{ mr: 1 }}
                          disabled
                          name="phone_code"
                          label="Phone Code "
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.phone_code}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.phone_code && errors.phone_code}
                          error={Boolean(
                            touched.phone_code && errors.phone_code
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          sx={{ mr: 1 }}
                          name="phone_no"
                          label="Phone Number"
                          variant="outlined"
                          size="small"
                          fullWidth
                          disabled={true}
                          value={values.phone_no}
                          onChange={(e) => {
                            setFieldValue(
                              "phone_no",
                              e.target.value.replace(/^0+/, "")
                            );
                          }}
                          onBlur={handleBlur}
                          helperText={touched.phone_no && errors.phone_no}
                          error={Boolean(touched.phone_no && errors.phone_no)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <LocalizationProvider
                          fullWidth
                          dateAdapter={AdapterMoment}
                        >
                          <DatePicker
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
                      <Grid item xs={12}>
                        <Typography
                          variant="body1"
                          color="initial"
                        ></Typography>

                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Will this party be signing the rental agreement?
                          </FormLabel>
                          {values.party_type_id === 1 ||
                          values.party_type_id === 2 ||
                          values.party_type_id === 5 ||
                          values.party_type_id === 6 ? (
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
                              {values?.party_type_id == 3 ||
                              values?.party_type_id == 4 ? (
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
                                  value={values.is_signing_party}
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
                    </>

                    {/* remove the false to show the component */}
                    {/* Testing the component */}
                    {true &&
                      Object.keys(values?.ids).map((key) => {
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
                              required={values?.ids[key]?.required}
                              name={values?.ids[key]?.id_type_name}
                              label={values?.ids[key]?.id_type_name + " Number"}
                              variant="outlined"
                              size="small"
                              value={values?.ids[key]?.id_value.toUpperCase()}
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
                            {values.ids?.[key]?.imgFile && (
                              <Box
                                display="flex"
                                justifyContent="center"
                                sx={{ cursor: "pointer" }}
                                alignItems="center"
                                onClick={() => {
                                  dispatch(
                                    setDashboardVideoModal({
                                      flag: true,
                                      tutorialLink: null,
                                      src: values?.ids[key]?.imgFile,
                                    })
                                  );
                                }}
                              >
                                <img
                                  src={values?.ids[key]?.imgFile}
                                  alt={values?.ids[key]?.description}
                                  height={64}
                                  width={64}
                                />
                              </Box>
                            )}

                            {/* User First enter the id number then show them image upload button */}
                            {values?.ids?.[key]?.id_value?.length > 1 && (
                              <Button
                                variant="outlined"
                                component="label"
                                color={
                                  values?.ids[key]?.imgFile ? "warning" : "info"
                                }
                              >
                                {values?.ids[key].imgFile
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
                      gap={2}
                    >
                      <Button
                        disabled={!dirty}
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
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

export default EditPropertyPartyModal;
