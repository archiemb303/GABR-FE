import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Container, useTheme } from "@mui/system";
import { H4 } from "app/components/Typography";
import {
  ADD_LISTING_IMAGES,
  addNewPropertyAction,
} from "app/redux/actions/PropertyActions";
import { Form, Formik, validateYupSchema } from "formik";
import { useDropzone } from "react-dropzone";
import { propertyTypeItems, PropertyTypeItems } from "./items/propertyTypes";
import { useEffect, useState } from "react";
import {
  getAllCitiesByStateAction,
  getAllStatesByCountryAction,
} from "app/redux/actions/LocationActions";
import { useNavigate } from "react-router-dom";
import { themeColors } from "app/components/MatxTheme/themeColors";
import Compress from "compress.js";
import { Clear } from "@mui/icons-material";
import { LOADING_ADD_LISTING_IMAGES } from "app/redux/actions/LoadingAndErrorAction";
import Loading from "app/components/MatxLoading";
import { FlexAlignCenter, FlexBox } from "app/components/FlexBox";
import { convertHexToRGB } from "app/utils/utils";
import CloseIcon from "@mui/icons-material/Close";
import AddPropertyImages from "./components/AddPropertyImages";

const InputField = styled(TextField)(() => ({ marginBottom: "16px" }));

const AddNewPropertyListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useSelector((state) => state.location);
  const { addNewProperty } = useSelector((state) => state.property);
  const [imageList, setImageList] = useState([]);
  const furnishing_details = [
    {
      furnishing_description: "semi-furnished homes",
      furnishing_id: 2,
      furnishing_name: "Semi-Furnished",
      is_selected: 1,
    },
    {
      furnishing_description: "unfurnished homes",
      furnishing_id: 3,
      furnishing_name: "Unfurnished",
      is_selected: 0,
    },
    {
      furnishing_description: "fully furnished homes",
      furnishing_id: 1,
      furnishing_name: "Fully Furnished",
      is_selected: 0,
    },
  ];

  const { GET_ALL_CITIES_BY_STATE, ADD_NEW_PROPERTY } = useSelector(
    (state) => state.loadingAndError.loader
  );
  const { custom } = themeColors.customTheme;
  const initialValues = {
    propertyName: "",
    pincode: "",
    state_id: "",
    city_id: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    userStatus: "",
    // locationCoordinatesX: "",
    // locationCoordinatesY: "",
    propertyType: "",
    rooms: "",
    kitchens: "",
    balconies: "",
    halls: "",
    coveredParkings: "",
    openParkings: "",
    furnishing_id: "",
  };

  // 🛑 FOR DEBUGGING ONLY  - can be deleted
  // const initialValues = {
  //     propertyName: '',
  //     pincode: '102930',
  //     state_id: '9',
  //     city_id: '9',
  //     addressLine1: 'a-21',
  //     addressLine2: 'karol bagh',
  //     addressLine3: 'street no 4',
  //     userStatus: '1',
  //     // locationCoordinatesX: "",
  //     // locationCoordinatesY: "",
  //     propertyType: '1',
  //     rooms: '2',
  //     kitchens: '2',
  //     balconies: '2',
  //     halls: '2',
  //     coveredParkings: '2',
  //     openParkings: '2',
  // };

  const validationSchema = Yup.object().shape({
    propertyName: Yup.string().required("Property Name is required field"),
    pincode: Yup.string()
      .required("Pincode is required field")
      .typeError("Pincode should only contain digits")
      .matches(
        /^[1-9][0-9]{5}$/,
        "Pincode should contain exactly 6 digits and should not start with 0"
      ),
    state_id: Yup.string().required("State is required field"),
    city_id: Yup.string().required("City is required field"),
    addressLine1: Yup.string().required("Address Line 1 is required field"),
    // .max(30, "Address Line 1 should be between 0 to 30 characters"),
    addressLine2: Yup.string().required("Address Line 2 is required field"),
    // .max(15, "Address Line 2 should be between 0 to 15 characters"),
    addressLine3: Yup.string().required("Locality is required field"),
    // .max(25, "Locality should be between 0 to 25 characters"),
    userStatus: Yup.string()
      .oneOf(["1", "2", "3", "4"])
      .required("Please select one from the above"),
    rooms: Yup.string()
      .required("Room is a required field")
      .matches(/^[0-9][0-9]*$/, "Only positive numbers are allowed"),
    kitchens: Yup.string()
      .required("Kitchens is a required field")
      .matches(/^[0-9][0-9]*$/, "Only positive numbers are allowed"),
    balconies: Yup.string()
      .required("Balconies is a required field")
      .matches(/^[0-9][0-9]*$/, "Only positive numbers are allowed"),
    halls: Yup.string()
      .required("Halls is a required field")
      .matches(/^[0-9][0-9]*$/, "Only positive numbers are allowed"),
    openParkings: Yup.string()
      .required("Open parkings is a required field")
      .matches(/^[0-9][0-9]*$/, "Only positive numbers are allowed"),
    coveredParkings: Yup.string()
      .required("Covered parkings is a required field")
      .matches(/^[0-9][0-9]*$/, "Only positive numbers are allowed"),
    propertyType: Yup.string().required("Property type is required field"),
    furnishing_id: Yup.number().required("Furnishing id is required field"),

    // firstName: Yup.string()
    //     .min(3, 'Must be greater then 3 characters')
    //     .required('First Name is Required!'),
    // lastName: Yup.string().required('Last Name is Required!'),
    // email: Yup.string()
    //     .email('Invalid email address')
    //     .required('Email is Required!'),
    // phone: Yup.number().min(9).required('Phone Number is required!'),
    // profilePic: Yup.string(),
  });

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: "image/*",
  });
  const DropZone = styled(FlexAlignCenter)(({ isDragActive, theme }) => ({
    height: 200,
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
  const handleSubmit = async (values, { isSubmitting }) => {
    // console.log(values);
    dispatch(
      addNewPropertyAction({
        property_name: values.propertyName,
        address_line_1: values.addressLine1,
        address_line_2: values.addressLine2,
        address_line_3: values.addressLine3,
        pincode: new String(values.pincode),
        creator_type: parseInt(values.userStatus, 10),
        city_id: values.city_id,
        property_type: values.propertyType,
        location_coordinates_x: 12.7681,
        location_coordinates_y: 77.1234,
        // status: "2",
        space_details: [
          {
            space_id: 1,
            space_count: parseInt(values.rooms, 10),
          },
          {
            space_id: 2,
            space_count: parseInt(values.kitchens, 10),
          },
          {
            space_id: 3,
            space_count: parseInt(values.balconies, 10),
          },
          {
            space_id: 4,
            space_count: parseInt(values.halls, 10),
          },
          {
            space_id: 5,
            space_count: parseInt(values.coveredParkings, 10),
          },
          {
            space_id: 6,
            space_count: parseInt(values.openParkings, 10),
          },
        ],
        image: imageList[0],
        furnishing_type: values.furnishing_id,
      })
    );
  };
  const style = {
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // width: "50%",
    // minWidth: 300,
    // maxWidth: 600,
    // maxHeight: "90%",
    // bgcolor: "background.paper",
    // boxShadow: 24,
    p: 2,
    overflow: "auto",
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
  }, []);

  useEffect(() => {
    if (addNewProperty) {
      // Navigate to property when property created successfully
      navigate("/property", {
        state: {
          property_id: addNewProperty.payload.property_id,
          imageList: imageList,
        },
      });
    }
  }, [addNewProperty]);

  useEffect(() => {
    const compressor = new Compress();
    const b64_images = [];
    if (acceptedFiles.length > 0) {
      compressor
        .compress(acceptedFiles, {
          maxSizeKB: 120,
          useWebWorker: true,
        })
        .then((compressedFiles) => {
          compressedFiles.map((img, i) => {
            console.log(img);
            b64_images.push({
              media_b64: img.data,
              b64_before_source: img.prefix,
              file_name: acceptedFiles[i].name.substring(
                0,
                acceptedFiles[i].name.lastIndexOf(".")
              ),
              file_extension: acceptedFiles[i].name.substring(
                acceptedFiles[i].name.lastIndexOf("."),
                acceptedFiles[i].name.length
              ),
              document_type: acceptedFiles[i].type.substring(
                0,
                acceptedFiles[i].type.indexOf("/")
              ),
            });
          });
          setImageList([...imageList, ...b64_images]);
        });
    }
  }, [acceptedFiles]);

  return (
    <>
      <Typography
        variant="h5"
        color="initial"
        my={4}
        textAlign="center"
        sx={{ color: "#0c5389" }}
      >
        Let's start by adding a few details about your property
      </Typography>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alginItems: "center",
          padding: 2,
          maxWidth: 400,
          margin: "0 auto",
        }}
      >
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
              <Box
                sx={{
                  maxWidth: 400,
                  mx: "auto",
                  my: 2,
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
                        setFieldValue("state_id", e.target.value.toString());
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
                          <MenuItem key={item.state_id} value={item.state_id}>
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
                        setFieldValue("city_id", e.target.value.toString());
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
                      label="Locality"
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
                      label="Property Type"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={values.propertyType}
                      onChange={handleChange}
                      helperText={touched.propertyType && errors.propertyType}
                      error={Boolean(
                        touched.propertyType && errors.propertyType
                      )}
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
                      {propertyTypeItems.map((item) => (
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
                      name="furnishing_id"
                      label="Furnishing Type"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={values.furnishing_id}
                      onChange={(e) => {
                        setFieldValue("furnishing_id", e.target.value);
                      }}
                      helperText={touched.furnishing_id && errors.furnishing_id}
                      error={Boolean(
                        touched.furnishing_id && errors.furnishing_id
                      )}
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
                      {furnishing_details.map((item) => {
                        return (
                          <MenuItem
                            key={item.furnishing_id}
                            value={item.furnishing_id}
                          >
                            {item.furnishing_name}
                          </MenuItem>
                        );
                      })}
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

                  {/* <Grid container spacing={2}> */}
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
                        helperText={touched.openParkings && errors.openParkings}
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
                  {/* </Grid> */}

                  <Grid item xs={12}>
                    <FormLabel
                      sx={{ color: "text.primary" }}
                      id="demo-row-radio-buttons-group-label"
                    >
                      Please select what defines you best:
                    </FormLabel>

                    <RadioGroup
                      column
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="userStatus"
                      value={values.userStatus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.userStatus && errors.userStatus}
                      error={Boolean(touched.userStatus && errors.userStatus)}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="I am the owner of this property"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="I am a tenant trying to get my rent agreement prepared and signed"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="I am an agent trying to find tenant for my client"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="I am just helping someone manage their property "
                      />
                      {touched.userStatus && errors.userStatus ? (
                        <Box sx={{ color: custom.c9 }} paddingLeft={2}>
                          {errors.userStatus}
                        </Box>
                      ) : null}
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <AddPropertyImages
                      label="Add Property Image:"
                      imageList={imageList}
                      setImageList={setImageList}
                    />
                  </Grid>

                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Button
                      disabled={ADD_NEW_PROPERTY?.isLoading}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Proceed
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default AddNewPropertyListing;
