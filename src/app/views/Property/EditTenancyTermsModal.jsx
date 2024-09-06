import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { getAllStatesByCountryAction } from "app/redux/actions/LocationActions";
import { setEditTenancyTermsModal } from "app/redux/actions/ModalActions";
import { Field, FieldArray, Form, Formik } from "formik";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { H5 } from "app/components/Typography";
import * as Yup from "yup";
import styled from "@emotion/styled";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { InfoOutlined } from "@mui/icons-material";
import { updateTenancyTermsAction } from "app/redux/actions/PropertyActions";
import moment from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

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

const EditTenancyTermsModal = ({ individualProperty }) => {
  const { UPDATE_TENANCY_TERMS } = useSelector(
    (store) => store.loadingAndError.loader
  );

  const [isSnakbarOpen, setSnackbarOpen] = useState(false);

  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.openEditTenancyTerms);
  const [initialValues, setInitialValues] = useState();
  const user = JSON.parse(localStorage.getItem("persistentState"));
  const [minDate, setMinDate] = useState("");

  const validationSchema = Yup.object().shape({
    rent: Yup.string()
      .required("Rent per month is required field")
      .matches(/^[0-9][0-9]*$/, "Only positive numbers are allowed")
      .nullable(),
    security: Yup.string()
      .required("Security deposit is required field")
      .matches(/^[0-9][0-9]*$/, "Only positive numbers are allowed")
      .nullable(),
    renewalPrice: Yup.string()
      .required("Renewal Price is required field")
      .matches(/^[0-9][0-9]*$/, "Only positive numbers are allowed")
      .nullable(),
    mandatoryDeduction: Yup.array().of(
      Yup.object().shape({
        head: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        amount: Yup.string().required("Required"),
      })
    ),
  });

  const handleSubmit = (values) => {
    // console.log(values);
    const apiParams = {
      property_id: individualProperty?.basic_details?.property_id,
      tenancy_id:
        individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
      start_date: moment(values.startDate, "DDMMMYYYY").format("YYYY-MM-DD"),
      end_date: moment(new Date(values.endDate), "DDMMMYYYY").format(
        "YYYY-MM-DD"
      ),
      tax: values.tax,
      renewal_rate: parseInt(values.renewalPrice),
      rent_per_month: parseInt(values.rent),
      security_deposit: parseInt(values.security),
      utilities: [
        {
          tenancy_utility_id:
            individualProperty?.tenancy_details?.tenancy_terms?.utilities?.[0]
              ?.tenancy_utility_id,
          utility_id: 1,
          is_included: values.utilitiesGas === "included" ? true : false,
        },
        {
          tenancy_utility_id:
            individualProperty?.tenancy_details?.tenancy_terms?.utilities?.[1]
              ?.tenancy_utility_id,
          utility_id: 2,
          is_included: values.utilitiesWater === "included" ? true : false,
        },
        {
          tenancy_utility_id:
            individualProperty?.tenancy_details?.tenancy_terms?.utilities?.[2]
              ?.tenancy_utility_id,
          utility_id: 3,
          is_included: values.utilitiesInternet === "included" ? true : false,
        },
        {
          tenancy_utility_id:
            individualProperty?.tenancy_details?.tenancy_terms?.utilities?.[3]
              ?.tenancy_utility_id,
          utility_id: 4,
          is_included:
            values.utilitiesElectricity === "included" ? true : false,
        },
        {
          tenancy_utility_id:
            individualProperty?.tenancy_details?.tenancy_terms?.utilities?.[4]
              ?.tenancy_utility_id,
          utility_id: 5,
          is_included:
            values.utilitiesWasteManagement === "included" ? true : false,
        },
      ],
      mandatory_deductions: values.mandatoryDeduction,
    };
    dispatch(updateTenancyTermsAction(apiParams));
    dispatch(setEditTenancyTermsModal(false));
    setSnackbarOpen(true);
  };

  const handleClose = () => {
    dispatch(setEditTenancyTermsModal(false));
  };

  useEffect(() => {
    const endDate11 = new Date();
    endDate11.setMonth(endDate11.getMonth() + 11);

    const formSchema = {
      startDate: individualProperty?.tenancy_details?.tenancy_terms?.start_date
        ? new Date(
            individualProperty?.tenancy_details?.tenancy_terms?.start_date
          )
        : new Date(),
      endDate: individualProperty?.tenancy_details?.tenancy_terms?.end_date
        ? new Date(individualProperty?.tenancy_details?.tenancy_terms?.end_date)
        : endDate11,
      rent: individualProperty?.tenancy_details?.tenancy_terms?.rent_per_month,
      utilitiesGas:
        individualProperty?.tenancy_details?.tenancy_terms?.utilities?.[0]
          ?.status === 1
          ? "included"
          : "additional",
      utilitiesWater:
        individualProperty?.tenancy_details?.tenancy_terms?.utilities?.[1]
          ?.status === 1
          ? "included"
          : "additional",
      utilitiesInternet:
        individualProperty?.tenancy_details?.tenancy_terms?.utilities?.[2]
          ?.status === 1
          ? "included"
          : "additional",
      utilitiesElectricity:
        individualProperty?.tenancy_details?.tenancy_terms?.utilities?.[3]
          ?.status === 1
          ? "included"
          : "additional",
      utilitiesWasteManagement:
        individualProperty?.tenancy_details?.tenancy_terms?.utilities?.[4]
          ?.status === 1
          ? "included"
          : "additional",
      security:
        individualProperty?.tenancy_details?.tenancy_terms?.security_deposit,
      renewalPrice:
        individualProperty?.tenancy_details?.tenancy_terms?.renewal_rate,
      mandatoryDeduction:
        individualProperty?.tenancy_details?.tenancy_terms?.mandatory_deductions
          ?.length === 0
          ? [
              {
                tenancy_deduction_id: null,
                head: "",
                description: "",
                amount: "",
              },
            ]
          : individualProperty?.tenancy_details?.tenancy_terms?.mandatory_deductions?.map(
              (deduction) => {
                return {
                  tenancy_deduction_id: deduction.tenancy_deduction_id,
                  head: deduction.tenancy_deduction_head,
                  description: deduction.tenancy_deduction_description,
                  amount: deduction.tenancy_deduction_value,
                };
              }
            ),
      tax: individualProperty?.tenancy_details?.tenancy_terms?.tax || 0,
    };
    setMinDate(formSchema.startDate);
    setInitialValues(formSchema);
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
            Edit tenancy terms
          </Typography>
          <Box
            marginY={2}
            display="flex"
            flexDirection="column"
            P
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
            enableReinitialize={true}
            validationSchema={validationSchema}
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
                <Grid container columnSpacing={2}>
                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={values.startDate}
                        onChange={(date) => {
                          setFieldValue("startDate", date);
                          var endDate = new Date(date);
                          setFieldValue(
                            "endDate",
                            endDate.setMonth(endDate.getMonth() + 11)
                          );
                          const minimumDate = new Date(date);
                          setMinDate(
                            minimumDate.setDate(minimumDate.getDate() + 1)
                          );
                        }}
                        renderInput={(props) => (
                          <TextField
                            {...props}
                            label="Term Start Date"
                            id="mui-pickers-date"
                            sx={{ mb: 2, width: "100%" }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        minDate={minDate}
                        value={values.endDate}
                        onChange={(date) => setFieldValue("endDate", date)}
                        renderInput={(props) => (
                          <TextField
                            {...props}
                            label="Term End Date"
                            id="mui-pickers-date"
                            sx={{ mb: 2, width: "100%" }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <InputField
                      type="number"
                      value={values.rent}
                      name="rent"
                      label="Rent per month (₹)"
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={(event) => {
                        handleChange(event);
                      }}
                      onBlur={handleBlur}
                      helperText={touched.rent && errors.rent}
                      error={Boolean(touched.rent && errors.rent)}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <InputField
                      type="number"
                      value={values.security}
                      name="security"
                      label="Security Deposit (₹)"
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={(event) => {
                        handleChange(event);
                      }}
                      onBlur={handleBlur}
                      helperText={touched.security && errors.security}
                      error={Boolean(touched.security && errors.security)}
                    />
                  </Grid>

                  <Grid container item xs={12} md={4}>
                    <Grid md={10} xs={5}>
                      <InputField
                        type="number"
                        name="renewalPrice"
                        label="Price of Renewal (%)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={values.renewalPrice}
                        onChange={(event) => {
                          handleChange(event);
                        }}
                        onBlur={handleBlur}
                        helperText={touched.renewalPrice && errors.renewalPrice}
                        error={Boolean(
                          touched.renewalPrice && errors.renewalPrice
                        )}
                      />
                    </Grid>
                    <Grid container md={2} xs={7}>
                      <Tooltip
                        color="primary"
                        sx={{ marginLeft: "5px", marginTop: "5px" }}
                        title="Typically price of renewal is the percentage by which the rent will be increased at the end of this tenancy contract."
                        arrow
                      >
                        <InfoOutlined></InfoOutlined>
                      </Tooltip>
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} md={4}>
                    <Grid md={10} xs={5}>
                      <InputField
                        type="number"
                        name="tax"
                        label="Tax (%)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={values.tax}
                        onChange={(event) => {
                          handleChange(event);
                        }}
                        onBlur={handleBlur}
                        helperText={touched.tax && errors.tax}
                        error={Boolean(touched.tax && errors.tax)}
                      />
                    </Grid>
                    <Grid container md={2} xs={7}>
                      <Tooltip
                        color="primary"
                        sx={{ marginLeft: "5px", marginTop: "5px" }}
                        title="Typically price of renewal is the percentage by which the rent will be increased at the end of this tenancy contract."
                        arrow
                      >
                        <InfoOutlined></InfoOutlined>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Grid container rowGap={3} item md={12}>
                    <Grid xs={4}>
                      <H5 sx={{ display: "block", mr: 3, mb: 0.5 }}>
                        Utilities - Gas
                      </H5>
                    </Grid>
                    <Grid xs={8}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          name="utilitiesGas"
                          value={values.utilitiesGas}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            label="Included"
                            value="included"
                            control={<Radio size="small" color="primary" />}
                            sx={{ mr: 3, height: 20 }}
                          />
                          <FormControlLabel
                            label="Additional"
                            value="additional"
                            control={<Radio size="small" color="primary" />}
                            sx={{ height: 20 }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid xs={4}>
                      <H5 sx={{ display: "block", mr: 3, mb: 0.5 }}>
                        Utilities - Water
                      </H5>
                    </Grid>
                    <Grid xs={8}>
                      <FormControl component="fieldset" sx={{}}>
                        <RadioGroup
                          row
                          name="utilitiesWater"
                          value={values.utilitiesWater}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            label="Included"
                            value="included"
                            control={<Radio size="small" color="primary" />}
                            sx={{ mr: 3, height: 20 }}
                          />
                          <FormControlLabel
                            label="Additional"
                            value="additional"
                            control={<Radio size="small" color="primary" />}
                            sx={{ height: 20 }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid xs={4}>
                      <H5 sx={{ display: "block", mr: 3, mb: 0.5 }}>
                        Utilities - Internet
                      </H5>
                    </Grid>
                    <Grid xs={8}>
                      <FormControl component="fieldset" sx={{}}>
                        <RadioGroup
                          row
                          name="utilitiesInternet"
                          value={values.utilitiesInternet}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            label="Included"
                            value="included"
                            control={<Radio size="small" color="primary" />}
                            sx={{ mr: 3, height: 20 }}
                          />
                          <FormControlLabel
                            label="Additional"
                            value="additional"
                            control={<Radio size="small" color="primary" />}
                            sx={{ height: 20 }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid xs={4}>
                      <H5 sx={{ display: "block", mr: 3, mb: 0.5 }}>
                        Utilities - Electricity
                      </H5>
                    </Grid>
                    <Grid xs={8}>
                      <FormControl component="fieldset" sx={{}}>
                        <RadioGroup
                          row
                          name="utilitiesElectricity"
                          value={values.utilitiesElectricity}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            label="Included"
                            value="included"
                            control={<Radio size="small" color="primary" />}
                            sx={{ mr: 3, height: 20 }}
                          />
                          <FormControlLabel
                            label="Additional"
                            value="additional"
                            control={<Radio size="small" color="primary" />}
                            sx={{ height: 20 }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid xs={4}>
                      <H5 sx={{ display: "block", mr: 3, mb: 0.5 }}>
                        Utilities - Waste management
                      </H5>
                    </Grid>
                    <Grid xs={8}>
                      <FormControl component="fieldset" sx={{}}>
                        <RadioGroup
                          row
                          name="utilitiesWasteManagement"
                          value={values.utilitiesWasteManagement}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            label="Included"
                            value="included"
                            control={<Radio size="small" color="primary" />}
                            sx={{ mr: 3, height: 20 }}
                          />
                          <FormControlLabel
                            label="Additional"
                            value="additional"
                            control={<Radio size="small" color="primary" />}
                            sx={{ height: 20 }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Card variant="outlined" sx={{ p: 1, mt: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    <H5 sx={{ display: "inline-block" }}>
                      Mandatory deductions at time of vacancy
                    </H5>

                    <Tooltip
                      sx={{ marginLeft: "5px" }}
                      color="primary"
                      title="Example: If the property is painted at the time of letting out, painting charges will be deducted at the end of tenancy."
                      arrow
                    >
                      <InfoOutlined></InfoOutlined>
                    </Tooltip>
                  </Box>

                  <FieldArray
                    name="mandatoryDeduction"
                    render={(arrayHelpers) => {
                      return (
                        <Grid container sx={{ my: 2, mx: 1 }} columnSpacing={2}>
                          {values?.mandatoryDeduction?.map((item, index) => {
                            return (
                              <>
                                <Grid container item xs={10}>
                                  <Grid container columnSpacing={1}>
                                    <Grid item md={6} xs={12}>
                                      <Field
                                        value={
                                          values.mandatoryDeduction?.[index]
                                            .head
                                        }
                                        as={InputField}
                                        label="Heading"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        name={`mandatoryDeduction.${index}.head`}
                                        onBlur={handleBlur}
                                        helperText={
                                          touched.mandatoryDeduction?.[index]
                                            ?.head &&
                                          errors.mandatoryDeduction?.[index]
                                            ?.head
                                        }
                                        error={Boolean(
                                          touched.mandatoryDeduction?.[index]
                                            ?.head &&
                                            errors.mandatoryDeduction?.[index]
                                              ?.head
                                        )}
                                      />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                      <Field
                                        value={
                                          values.mandatoryDeduction?.[index]
                                            ?.amount
                                        }
                                        as={InputField}
                                        type="number"
                                        label="Amount (₹)"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        name={`mandatoryDeduction.${index}.amount`}
                                        onBlur={handleBlur}
                                        helperText={
                                          touched.mandatoryDeduction?.[index]
                                            ?.amount &&
                                          errors.mandatoryDeduction?.[index]
                                            ?.amount
                                        }
                                        error={Boolean(
                                          touched.mandatoryDeduction?.[index]
                                            ?.amount &&
                                            errors.mandatoryDeduction?.[index]
                                              ?.amount
                                        )}
                                      />
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Field
                                        value={
                                          values.mandatoryDeduction?.[index]
                                            ?.description
                                        }
                                        as={InputField}
                                        label="Description"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        multiline
                                        name={`mandatoryDeduction.${index}.description`}
                                        onBlur={handleBlur}
                                        helperText={
                                          touched.mandatoryDeduction?.[index]
                                            ?.description &&
                                          errors.mandatoryDeduction?.[index]
                                            ?.description
                                        }
                                        error={Boolean(
                                          touched.mandatoryDeduction?.[index]
                                            ?.description &&
                                            errors.mandatoryDeduction?.[index]
                                              ?.description
                                        )}
                                      />
                                    </Grid>
                                    <Grid
                                      paddingLeft={1}
                                      marginBottom={2}
                                      xs={12}
                                    >
                                      <Divider />
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Grid item xs={1}>
                                  <IconButton
                                    onClick={(el) => {
                                      arrayHelpers.remove(index);
                                    }}
                                  >
                                    <Icon color="primary">
                                      remove_circle_outline
                                    </Icon>
                                  </IconButton>
                                </Grid>
                              </>
                            );
                          })}
                          <Button
                            sx={{ m: 2, float: "right" }}
                            color="primary"
                            variant="contained"
                            onClick={(el) => {
                              arrayHelpers.push({
                                tenancy_deduction_id: null,
                                head: "",
                                description: "",
                                amount: "",
                              });
                            }}
                          >
                            Add More
                            <Icon sx={{ ml: 1 }}>add_circle_outline</Icon>
                          </Button>
                        </Grid>
                      );
                    }}
                  ></FieldArray>
                </Card>

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
      {/* {UPDATE_TENANCY_TERMS?.isLoading === false
                &&
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={isSnakbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                    {
                        UPDATE_TENANCY_TERMS?.error === null
                            ?
                            <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '50vw' }}>
                                Tenancy terms updated successfully!
                            </Alert>
                            :
                            <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '50vw' }}>
                                Some error occured!
                            </Alert>
                    }
                </Snackbar>
            } */}
    </>
  );
};

export default EditTenancyTermsModal;
