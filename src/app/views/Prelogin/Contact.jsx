import React from "react";
// import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Card,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import contactimgbackg from "./images/contact.png";
import { addContactFormAction } from "app/redux/actions/PreloginActions";
import { useDispatch } from "react-redux";
import { values } from "lodash";

export default function Contact() {
  const a = useLocation().pathname;
  const [open, setOpen] = React.useState(false);
  const { custom } = useTheme();
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  });
  const handleClickOpen = async (values, { isSubmitting }) => {
    dispatch(
      addContactFormAction({
        user_first_name: values.name.split(" ")[0],
        user_last_name: values.name.split(" ")[1],
        user_email: values.email,
        user_phone_code: "+91",
        user_contact_number: values.phone,
        query_message: values.query,
      })
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      // handleClickOpen();
      return true;
    }
    return false;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const phoneRegExp = /^[6-9]\d{9}$/gi;
  const emailRegEXP =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const NameRegExp = /^[a-zA-Z ]+$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      // .min(3, "Must be greater then 3 characters")
      .required("Name is Required!")
      .matches(NameRegExp, "No special characters and numbers are allowed.")
      .nullable(),
    phone: Yup.string()
      .min(9)
      .required("Phone Number is required!")
      .matches(
        phoneRegExp,
        "Enter a valid 10-digit phone number without country code."
      )
      .nullable(),
    email: Yup.string()
      // .email("Invalid email address")
      .required("Email is Required!")
      .matches(emailRegEXP, "Enter Correct Email.")
      .nullable(),
    query: Yup.string()
      .min(3, "Must be greater then 3 characters")
      .required("Query is Required!"),
  });
  return (
    <>
      {a === "/session/contactus" ? <NavBar /> : ""}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleClickOpen}
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
            <Box sx={{ mt: 8 }}>
              <div style={{ position: "relative" }}>
                <img
                  style={{ width: "100%", height: "700px" }}
                  src="https://images.unsplash.com/photo-1669247164834-2f09bc4ed72b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
                />
                <Box
                  style={{
                    position: "absolute",
                    "border-radius": "5px",
                  }}
                  sx={{
                    backgroundColor: "white",
                    ml: { md: "20%", xs: "10%" },
                    top: "100px",
                    height: { md: "70%", xs: "auto" },
                    width: { md: "min-content", sm: "auto", xs: "auto" },
                    marginRight: { xs: "10%" },
                    paddingRight: { xs: 0, md: "3%" },
                    paddingBottom: { xs: "10%" },
                  }}
                >
                  <Typography
                    variant="h4"
                    align="center"
                    sx={{
                      pt: 2,
                      color: "custom.heading.preloginheading",
                      mb: 4,
                    }}
                  >
                    CONTACT US
                  </Typography>

                  <Grid container spacing={5}>
                    <Grid item>
                      <TextField
                        sx={{
                          width: { md: 344, xs: 1 },
                          ml: { md: 6, xs: 3 },
                          height: { md: 12, xs: 2 },
                          mb: 3,
                        }}
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        helperText={touched.name && errors.name}
                        error={Boolean(touched.name && errors.name)}
                        name="name"
                        label="Name"
                        type="name"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        sx={{
                          width: { md: 344, xs: 1 },
                          ml: { md: 6, xs: 3 },
                          height: { md: 12, xs: 2 },
                          mb: 3,
                        }}
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
                    <Grid item>
                      <TextField
                        sx={{
                          width: { md: 344, xs: 1 },
                          ml: { md: 6, xs: 3 },
                          height: { md: 12, xs: 2 },
                          mb: 3,
                        }}
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
                    <Grid item>
                      <TextField
                        // disabled={disableClick}
                        sx={{
                          width: { md: 344, xs: 1 },
                          ml: { md: 6, xs: 3 },
                          height: { md: 12, xs: 2 },
                          mb: 3,
                        }}
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.query}
                        helperText={touched.query && errors.query}
                        error={Boolean(touched.query && errors.query)}
                        label="Query"
                        name="query"
                        type="text"
                      />
                    </Grid>
                    <Grid
                      item
                      align="center"
                      sx={{
                        justifyContent: "center",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <Button variant="contained" color="primary" type="submit">
                        SUBMIT
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Query Sent!"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    We will get Back to you as soon as we can.
                    <br />
                    Thank you.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Form>
        )}
      </Formik>
      {a === "/session/contactus" ? <Footer /> : ""}
    </>
  );
}
