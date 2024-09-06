import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  Card,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { setEditContactInfoModal } from "app/redux/actions/ModalActions";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { addOrUpdateListingContactAction } from "app/redux/actions/PropertyActions";

const InputField = styled(TextField)(() => ({
  marginBottom: "16px",
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
}));

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

const EditContactInfoModal = () => {
  const { ADD_OR_UPDATE_LISTING_CONTACT } = useSelector(
    (store) => store.loadingAndError.loader
  );
  const [isSnakbarOpen, setSnackbarOpen] = useState(false);

  const { individualProperty } = useSelector((state) => state.property);

  const phoneRegExp = /^[6-9]\d{9}$/gi;
  const emailRegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Enter a 10-digit phone number without country code")
      .matches(
        phoneRegExp,
        "Enter a valid 10-digit phone number without country code."
      ),
    email: Yup.string()
      .required("Please enter your email")
      .matches(emailRegExp, "Please enter a valid email address."),
  });

  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.openEditContactInfo);
  const [initialValues, setInitialValues] = useState({
    phone: "",
    email: "",
  });
  const user = JSON.parse(localStorage.getItem("persistentState"));

  const handleSubmit = (values) => {
    dispatch(
      addOrUpdateListingContactAction({
        property_id: individualProperty?.basic_details?.property_id,
        listing_contact_details: [
          {
            listing_contact_id:
              "contact_info" in individualProperty?.listing_details
                ? individualProperty?.listing_details?.contact_info
                    ?.filter((contact) => contact?.contact_type === 2)?.[0]
                    ?.contact_id?.toString()
                : "",
            mobile_number: values.phone,
            country_code: "91",
          },
          {
            listing_contact_id:
              "contact_info" in individualProperty?.listing_details
                ? individualProperty?.listing_details?.contact_info
                    ?.filter((contact) => contact?.contact_type === 1)?.[0]
                    ?.contact_id?.toString()
                : "",
            email: values.email,
          },
        ],
      })
    );
    dispatch(setEditContactInfoModal(false));
    setSnackbarOpen(true);
  };

  const handleClose = () => {
    dispatch(setEditContactInfoModal(false));
  };

  useEffect(() => {
    setInitialValues({
      phone: individualProperty?.listing_details?.contact_info?.filter(
        (contact) => contact.contact_type === 2
      )?.[0]?.contact_info,
      email: individualProperty?.listing_details?.contact_info?.filter(
        (contact) => contact.contact_type === 1
      )?.[0]?.contact_info,
    });
  }, [individualProperty]);

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
          <Typography
            mb={3}
            id="modal-modal-title"
            variant="h5"
            textAlign={"center"}
          >
            Edit contact details
          </Typography>

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
            }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container justifyContent="center" columnSpacing={2}>
                  <Grid item xs={12} md={4}>
                    <InputField
                      value={values.phone}
                      name="phone"
                      label="Phone"
                      variant="outlined"
                      size="small"
                      fullWidth
                      // onChange={(event) => {
                      //   event.target.value = event.target.value.trim();
                      //   handleChange(event);
                      // }}
                      onChange={(e) => {
                        setFieldValue(
                          "phone",
                          e.target.value.replace(/^0+/, "")
                        );
                      }}
                      onBlur={handleBlur}
                      helperText={touched.phone && errors.phone}
                      error={Boolean(touched.phone && errors.phone)}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <InputField
                      value={values.email}
                      name="email"
                      label="Email"
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={(event) => {
                        event.target.value = event.target.value.trim();
                        handleChange(event);
                      }}
                      onBlur={handleBlur}
                      helperText={touched.email && errors.email}
                      error={Boolean(touched.email && errors.email)}
                    />
                  </Grid>
                </Grid>

                <Grid marginY={3} container justifyContent="center">
                  <Button color="primary" variant="contained" type="submit">
                    Update
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Card>
      </Modal>
      {/* {ADD_OR_UPDATE_LISTING_CONTACT?.isLoading === false && (
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={isSnakbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                >
                    {ADD_OR_UPDATE_LISTING_CONTACT?.error === null ? (
                        <Alert
                            onClose={() => setSnackbarOpen(false)}
                            severity="success"
                            sx={{ width: '50vw' }}
                        >
                            Contact details updated successfully!
                        </Alert>
                    ) : (
                        <Alert
                            onClose={() => setSnackbarOpen(false)}
                            severity="error"
                            sx={{ width: '50vw' }}
                        >
                            Some error occured!
                        </Alert>
                    )}
                </Snackbar>
            )} */}
    </>
  );
};

export default EditContactInfoModal;
