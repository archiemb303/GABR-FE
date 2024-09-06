import AdapterDateFns from "@mui/lab/AdapterDateFns";
import PickDate from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import CustomSnackbar from "app/components/CustomSnackbar";
import { H5 } from "app/components/Typography";
import { getProductList } from "app/redux/actions/EcommerceActions";
import { logoutAction } from "app/redux/actions/PreloginActions";
import {
  fetchUserProfileAction,
  updateUserProfileAction,
} from "app/redux/actions/UserProfileActions";
import { Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const DatePicker = styled(PickDate)(() => ({
  margin: "8px !important",
  "& label": { fontSize: "14px" },
  "& .MuiOutlinedInput-input": {
    fontSize: "14px",
    padding: "10px 14px !important",
  },
  "& button": { padding: "6px" },
}));

const EditProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userProfile);
  const preloginState = useSelector((state) => state.prelogin);
  const { UPDATE_USER_PROFILE } = useSelector(
    (store) => store.loadingAndError.loader
  );
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    profilePic: "",
    phoneCode: "",
  });
  const navigate = useNavigate();

  // useEffect(() => {
  //   const params = {
  //     user_profile_id: preloginState.userProfileId,
  //     to_view_profile_id: preloginState.userProfileId,
  //     desired_output: "full",
  //   };

  //   dispatch(fetchUserProfileAction(params));
  // }, []);

  useEffect(() => {
    if (currentUser) {
      setInitialValues({
        firstName: currentUser.first_name,
        lastName: currentUser.last_name,
        email: currentUser.email_id,
        phone: currentUser.phone_no,
        dob: new Date(currentUser.dob) || new Date(),
        profilePic: "",
        phoneCode: currentUser.phone_code,
      });
    }
  }, [currentUser]);

  const phoneRegExp = /^[6-9]\d{9}$/gi;
  const fNameRegExp = /^[a-zA-Z ]+$/;
  const lNameRegExp = /^[a-zA-Z ]+$/;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      // .min(3, "Must be greater then 3 characters")
      .required("First Name is Required!")
      .matches(fNameRegExp, "No special characters and numbers are allowed.")
      .nullable(),

    lastName: Yup.string()
      .required("Last Name is Required!")
      .matches(lNameRegExp, "No special characters and numbers are allowed.")
      .nullable(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required!"),

    phone: Yup.string()
      .min(10)
      .required("Phone Number is required!")
      .matches(
        phoneRegExp,
        "Enter a valid 10-digit phone number without country code."
      )
      .nullable(),
    // profilePic: Yup.string(),
    // dob: Yup.date().required('Date of Birth is required!'),
  });

  const handleSubmit = async (values, { isSubmitting }) => {
    const params = {
      user_profile_id: preloginState.userProfileId,
      updated_user_fname: values.firstName,
      updated_user_lname: values.lastName,
      updated_user_email: values.email,
      updated_user_phone: values.phone,
      updated_user_dob: values.dob,
      profile_pic: values.profilePic,
    };

    dispatch(updateUserProfileAction(params));
  };

  return (
    <>
      {UPDATE_USER_PROFILE?.isLoading === false && (
        <CustomSnackbar
          loaderChild={UPDATE_USER_PROFILE}
          successMessage="User Profile updated Successfully !"
        />
      )}
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
          <Card sx={{ mt: 3 }}>
            <H5 padding={3}>Basic Information</H5>
            <Divider />

            <Form onSubmit={handleSubmit}>
              <Box margin={3}>
                <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First Name"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      helperText={touched.firstName && errors.firstName}
                      error={Boolean(touched.firstName && errors.firstName)}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      helperText={touched.lastName && errors.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      helperText={touched.email && errors.email}
                      error={Boolean(touched.email && errors.email)}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField
                      type="number"
                      fullWidth
                      name="phone"
                      label="Phone"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setFieldValue(
                          "phone",
                          e.target.value.replace(/^0+/, "")
                        );
                      }}
                      value={values.phone}
                      helperText={touched.phone && errors.phone}
                      error={Boolean(touched.phone && errors.phone)}
                    />
                  </Grid>

                  {/* <Grid item sm={6} xs={12}>
                                    <LocalizationProvider
                                        fullWidth
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DatePicker
                                            value={values.dob}
                                            inputFormat="MMMM dd, yyyy"
                                            onChange={(date) =>
                                                setFieldValue('dob', date)
                                            }
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    variant="outlined"
                                                    label="Date Of Birth"
                                                    sx={{
                                                        mb: 2,
                                                        width: '100%',
                                                    }}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid> */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </Button>
                    {/* <Button variant="outlined" sx={{ ml: 2 }}>
                                        Cancel
                                    </Button> */}
                  </Grid>
                </Grid>
              </Box>
            </Form>
          </Card>
        )}
      </Formik>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 3,
        }}
      >
        <Typography>Want to login with another email?</Typography>
        <Button
          onClick={() => {
            dispatch(logoutAction());
            navigate("/session/signin");
          }}
          color="primary"
        >
          Log out
        </Button>
      </Box>
    </>
  );
};

export default EditProfile;
