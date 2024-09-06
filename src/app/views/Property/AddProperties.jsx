import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FlexAlignCenter, FlexBox } from "app/components/FlexBox";
import { convertHexToRGB } from "app/utils/utils";
import { useTheme } from "@mui/system";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  FormControlLabel,
  Grid,
  Icon,
  MenuItem,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { H4, H2, H3, Paragraph } from "app/components/Typography";
import React, { useEffect, useState } from "react";
import { countries } from "../ecommerce/Country";
import { Form, Formik } from "formik";
import { useDropzone } from "react-dropzone";
import * as yup from "yup";
import BasicMap from "../map/BasicMap";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: "30px",
  padding: "24px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const DropZone = styled(FlexAlignCenter)(({ isDragActive, theme }) => ({
  height: 160,
  width: "100%",
  cursor: "pointer",
  borderRadius: "4px",
  marginBottom: "16px",
  transition: "all 350ms ease-in-out",
  border: `2px dashed rgba(${convertHexToRGB(
    theme.palette.text.primary
  )}, 0.3)`,
  "&:hover": {
    background: `rgb(${convertHexToRGB(
      theme.palette.text.primary
    )}, 0.2) !important`,
  },
  background: isDragActive ? "rgb(0, 0, 0, 0.15)" : "rgb(0, 0, 0, 0.01)",
}));

const InputField = styled(TextField)(() => ({ marginBottom: "16px" }));
const numberRegex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
const initialValues = {
  mutualAgreement: "no", // owner and tenant
  userType: "", // owner , tenant , agent
  country: "",
  state: "",
  city: "",
  zip: "",
  propertyName: "",
  propertyDescription: "",
  addressLine1: "",
  addressLine2: "",
  addressLine3: "",
  pincode: "",
  propertyImage: "",
  propertyCoordinate: "",
  propertyRoom: 2,
  propertyKitchen: 1,
  propertyBalcony: 1,
  propertyHall: 1,
  propertyCoveredParking: 1,
  propertyOpenParking: 0,
  rentMonth: "",
  rentCurrency: "",
  rentAmount: "",
  securityDeposit: "",
  securityDepositCurrency: "",
  securityDepositAmount: "",
  maintenance: "additional",
  amenities: {
    clubhouse: "",
    kidsPlayground: "",
    joggerTrack: "",
    playSchool: "",
    swimmingPool: "",
    badmintonCourt: "",
    tableTennisCourt: "",
    powerBackup: "",
    gym: "",
    lawnTennis: "",
    sauna: "",
    miniTheatre: "",
    library: "",
    squashCourt: "",
    atm: "",
    yogaRoom: "",
    amphitheater: "",
    basketballCourt: "",
    supermarket: "",
    footballField: "",
  },
};

const buttonSwitch = (choice) => {
  switch (choice) {
    case "post-ad":
      return (
        <Button
          sx={{ marginRight: 1, my: 1 }}
          color="primary"
          variant="contained"
        >
          Post Ad
        </Button>
      );
    case "live-ad":
      return (
        <Button
          sx={{ marginRight: 1, my: 1 }}
          color="primary"
          variant="contained"
        >
          Your Ad is currently live
        </Button>
      );
    case "let-out":
      return (
        <Button
          sx={{ marginRight: 1, my: 1 }}
          color="primary"
          variant="contained"
        >
          Property is let out
        </Button>
      );
    case "signing-agreement":
      return (
        <Button
          sx={{ marginRight: 1, my: 1 }}
          color="primary"
          variant="contained"
        >
          Agreement is in progress
        </Button>
      );

    default:
      return (
        <Button
          sx={{ marginRight: 1, my: 1 }}
          color="primary"
          variant="contained"
        >
          Post Ad
        </Button>
      );
  }
};

const AddProperties = () => {
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;
  const [imageList, setImageList] = useState([]);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: "image/*",
  });
  const handleSubmit = async (values, { isSubmitting }) => {
    console.log(values);
    console.log("🧙‍♂️", imageList);
  };
  const hideListingDetails = false;

  useEffect(() => {
    setImageList(acceptedFiles);
  }, [acceptedFiles]);

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">Property Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
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
              <Grid container spacing={2} mb={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    sx={{ mr: 1 }}
                    name="propertyType"
                    label="Property Type"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.country}
                    onChange={handleChange}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.name} value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    sx={{ mr: 1 }}
                    name="furnishing"
                    label="Furnishing"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.state}
                    onChange={handleChange}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.name} value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Grid container columnSpacing={2}>
                <Grid item xs={6} md={4}>
                  <InputField
                    type="number"
                    name="rooms"
                    label="Rooms"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.propertyName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <InputField
                    type="number"
                    name="kitchens"
                    label="Kitchens"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.propertyName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <InputField
                    type="number"
                    name="balconies"
                    label="Balconies"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.propertyName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <InputField
                    type="number"
                    name="halls"
                    label="Halls"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.propertyName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <InputField
                    type="number"
                    name="coveredParking"
                    label="Covered Parking"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.propertyName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <InputField
                    type="number"
                    name="openParking"
                    label="Open Parking"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.propertyName}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Box display={hideListingDetails ? "none" : "block"}>
                <InputField
                  name="propertyDescription"
                  rows={4}
                  multiline
                  fullWidth
                  variant="outlined"
                  label="Property Description"
                  value={values.propertyDescription}
                  size="small"
                  onChange={handleChange}
                />
                {/*
                                <Box mb={2} display="flex">
                                    <TextField
                                        sx={{ mr: 1 }}
                                        type="number"
                                        name="propertyRoom"
                                        label="Rooms"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.propertyRoom}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        sx={{ mr: 1 }}
                                        type="number"
                                        name="propertyKitchen"
                                        label="Kitchens"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.propertyKitchen}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        sx={{ mr: 0 }}
                                        min="1"
                                        type="number"
                                        name="propertyBalcony"
                                        label="Balconies"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.propertyBalcony}
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box mb={2} display="flex">
                                    <TextField
                                        sx={{ mr: 1 }}
                                        min="1"
                                        type="number"
                                        name="propertyHall"
                                        label="Halls"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.propertyHall}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        sx={{ mr: 1 }}
                                        type="number"
                                        name="propertyCoveredParking"
                                        label="Covered Parking"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.propertyCoveredParking}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        sx={{ mr: 0 }}
                                        type="number"
                                        name="propertyOpenParking"
                                        label="Open Parking"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.propertyOpenParking}
                                        onChange={handleChange}
                                    />
                                </Box>
     */}
                {/* <Box mb={2} display="flex">
                                    <TextField
                                        sx={{ mr: 1 }}
                                        name="rentMonth"
                                        label="Rent per month"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.rentMonth}
                                        onChange={handleChange}
                                    />

                                    <TextField
                                        select
                                        sx={{ mr: 1 }}
                                        name="rentCurrency"
                                        label="Currency"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.rentCurrency}
                                        onChange={handleChange}
                                    >
                                        {countries.map((country) => (
                                            <MenuItem key={country.name} value={country.name}>
                                                {country.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        sx={{ mr: 0 }}
                                        name="rentAmount"
                                        label="Amount"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.rentAmount}
                                        onChange={handleChange}
                                    />
                                </Box>
                                <Box mb={2} display="flex">
                                    <TextField
                                        sx={{ mr: 1 }}
                                        name="securityDeposit"
                                        label="Security Deposit"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.securityDeposit}
                                        onChange={handleChange}
                                    />

                                    <TextField
                                        select
                                        sx={{ mr: 1 }}
                                        name="securityDepositCurrency"
                                        label="Currency"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.securityDepositCurrency}
                                        onChange={handleChange}
                                    >
                                        {countries.map((country) => (
                                            <MenuItem key={country.name} value={country.name}>
                                                {country.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        sx={{ mr: 0 }}
                                        name="securityDepositAmount"
                                        label="Amount"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.securityDepositAmount}
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Paragraph mb={0.5}>Maintenance</Paragraph>

                                    <FormControl component="fieldset" sx={{ mb: 2 }}>
                                        <RadioGroup
                                            row
                                            name="maintenance"
                                            value={values.maintenance}
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
                                </Box> */}

                <Grid container sx={{ mb: 2 }}>
                  <Grid item xs={12} md={12}>
                    <H4 mb={0.5}>Amenities :</H4>
                  </Grid>
                  {amenities.map((item, ind) => (
                    <Grid item xs={6} md={3}>
                      <FormControlLabel
                        key={ind}
                        label={item}
                        control={
                          true ? <Checkbox defaultChecked /> : <Checkbox />
                        }
                        // sx={{ height: 32, display: 'inline-block' }}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Grid
                  container
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                >
                  <Grid item xs={12} md={12}>
                    <H4 mb={0.5}>Preferences :</H4>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormLabel
                      sx={{ color: "text.primary" }}
                      id="demo-row-radio-buttons-group-label"
                    >
                      Bachelors allowed ?
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormLabel
                      sx={{ color: "text.primary" }}
                      id="demo-row-radio-buttons-group-label"
                    >
                      Pets Allowed?
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormLabel
                      sx={{ color: "text.primary" }}
                      id="demo-row-radio-buttons-group-label"
                    >
                      Food Habits
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Veg Only"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Don't Care"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
                <Grid container sx={{ mb: 2 }}>
                  <Grid item xs={12} md={12}>
                    <H4 mb={1}>Contact Information :</H4>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <InputField
                      name="phone"
                      label="Phone"
                      fullWidth
                      variant="outlined"
                      value={values.propertyDescription}
                      size="small"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <InputField
                      name="email"
                      label="Email"
                      fullWidth
                      variant="outlined"
                      value={values.propertyDescription}
                      size="small"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container sx={{ justifyContent: "center" }}>
                  <Button
                    sx={{ marginRight: 1, my: 1 }}
                    color="primary"
                    variant="contained"
                  >
                    Post Advertisement
                  </Button>
                  <Button sx={{ marginRight: 1, my: 1 }} variant="outlined">
                    Save draft
                  </Button>
                  <Button sx={{ marginRight: 1, my: 1 }} variant="outlined">
                    Add Tenant
                  </Button>
                  {/* {buttonSwitch()}
                                    <Button sx={{ my: 1 }} color="success" variant="contained" type="submit">
                                        Proceed and Add Tenant
                                    </Button> */}
                </Grid>
              </Box>
              <Grid
                container
                sx={{ justifyContent: "center" }}
                display={hideListingDetails ? "flex" : "none"}
              >
                <Button sx={{ marginRight: 1, my: 1 }} variant="contained">
                  Add Tenant
                </Button>
                <Button sx={{ marginRight: 1, my: 1 }} variant="outlined">
                  Save draft
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </AccordionDetails>
    </Accordion>
  );
};

const stayDurationList = [
  "Less than a week",
  "One week",
  "One month",
  "I'm not sure",
];

const amenities = [
  "Pool",
  "Gym",
  "Hot Tub",
  "Sauna",
  "Spa",
  "Bar",
  "Restaurant",
  "Wi-Fi",
  "Pool",
  "Gym",
  "Hot Tub",
  "Sauna",
  "Spa",
  "Bar",
  "Restaurant",
  "Wi-Fi",
];

const locationTypeList = [
  "Ocean View",
  "Beach Front",
  "Near Surf",
  "In Town",
  "Farm",
  "Other",
  "Doesn't Matter",
];

const budgetList = [
  "$0 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $500,000",
  "$500,000 - $1,000,000",
  "$1,000,000 Plus",
];

export default AddProperties;
