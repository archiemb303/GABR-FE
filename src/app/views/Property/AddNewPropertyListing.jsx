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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [open, setOpen] = useState(false);
  const location = useSelector((state) => state.location);
  const { addNewProperty } = useSelector((state) => state.property);
  const [imageList, setImageList] = useState([]);
  
  // useEffect(()=>{
  //   dispatch(createNewBrand());
  // },[])
  // const { nature_of_business, target_countries } = useSelector(state=>state.brandSpecific);
  // // console.log(brandSpecific);
  // const business_details = [
  //   {id:1, name:"b2b"},{id:2, name:"b2c"}
  // ];

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
    business_id: "",
    country: "",
    description: "",
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
    propertyName: Yup.string().required("Brand Name is required field"),
    pincode: Yup.string()
      .required("Pincode is required field")
      .typeError("Pincode should only contain digits")
      .matches(
        /^[1-9][0-9]{5}$/,
        "Pincode should contain exactly 6 digits and should not start with 0"
      ),
    state_id: Yup.string().required("State is required field"),
    city_id: Yup.string().required("City is required field"),
    addressLine1: Yup.string().required("Industry is required field"),
    // .max(30, "Address Line 1 should be between 0 to 30 characters"),
    addressLine2: Yup.string().required("Competitors is required field"),
    // .max(15, "Address Line 2 should be between 0 to 15 characters"),
    addressLine3: Yup.string().required("Target Clients is required field"),
    // .max(25, "Locality should be between 0 to 25 characters"),
    country: Yup.string().required("Target Country is required field"),
    description: Yup.string().required("Target Country is required field"),
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
    business_id: Yup.number().required("business id is required field"),

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

  // Function to open the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values, /*{ isSubmitting }*/) => {
    // console.log(values);
    // dispatch(

    // )
    navigate("/property");
    //dispatch(
      //here add api call for adding brand
    //   addNewPropertyAction({
    //     property_name: values.propertyName,
    //     address_line_1: values.addressLine1,
    //     address_line_2: values.addressLine2,
    //     address_line_3: values.addressLine3,
    //     pincode: new String(values.pincode),
    //     creator_type: parseInt(values.userStatus, 10),
    //     city_id: values.city_id,
    //     property_type: values.propertyType,
    //     location_coordinates_x: 12.7681,
    //     location_coordinates_y: 77.1234,
    //     // status: "2",
    //     space_details: [
    //       {
    //         space_id: 1,
    //         space_count: parseInt(values.rooms, 10),
    //       },
    //       {
    //         space_id: 2,
    //         space_count: parseInt(values.kitchens, 10),
    //       },
    //       {
    //         space_id: 3,
    //         space_count: parseInt(values.balconies, 10),
    //       },
    //       {
    //         space_id: 4,
    //         space_count: parseInt(values.halls, 10),
    //       },
    //       {
    //         space_id: 5,
    //         space_count: parseInt(values.coveredParkings, 10),
    //       },
    //       {
    //         space_id: 6,
    //         space_count: parseInt(values.openParkings, 10),
    //       },
    //     ],
    //     image: imageList[0],
    //     business_type: values.business_id,
    //   })
    // );
    
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
        Let's start by adding a few details about your Brand
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
                      label="Brand Name"
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
                      sx={{ mr: 1 }}
                      name="addressLine1"
                      label="Industry"
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
                      label="Competitors"
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

                  {/* <Grid item xs={12}>
                    <TextField
                      select
                      sx={{ mr: 1 }}
                      name="business_id"
                      label="business Type"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={values.business_id}
                      onChange={(e) => {
                        setFieldValue("business_id", e.target.value);
                      }}
                      helperText={touched.business_id && errors.business_id}
                      error={Boolean(
                        touched.business_id && errors.business_id
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
                      {nature_of_business?.map((item) => {
                        return (
                          <MenuItem
                            key={item.id}
                            value={item.id}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid> */}


                  <Grid item xs={12}>
                    <TextField
                      sx={{ mr: 1 }}
                      name="addressLine3"
                      label="Target Clients"
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

                  {/* <Grid item xs={12}>
                    <TextField
                      select
                      sx={{ mr: 1 }}
                      name="country"
                      label="Target Countries"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={values.country}
                      onChange={(e) => {
                        setFieldValue("country", e.target.value);
                      }}
                      helperText={touched.country && errors.country}
                      error={Boolean(
                        touched.country && errors.country
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
                      {target_countries?.map((item) => {
                        return (
                          <MenuItem
                            key={item.id}
                            value={item.id}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid> */}

                  {/* <Grid item xs={12}>
                    <TextField
                      sx={{ mr: 1 }}
                      name="country"
                      label="Target Countries"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={values.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.country && errors.country}
                      error={Boolean(
                        touched.country && errors.country
                      )}
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      sx={{ mr: 1, minHeight: "120px" }} // Adjust the height using minHeight
                      name="description"
                      label="Description"
                      variant="outlined"
                      size="small"
                      fullWidth
                      multiline
                      rows={4} // Set the number of rows to increase the height
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.description && errors.description}
                      error={Boolean(touched.description && errors.description)}
                    />
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Button
                      disabled={ADD_NEW_PROPERTY?.isLoading}
                      variant="contained"
                      color="primary"
                      // type="submit"
                      onClick={handleClickOpen}
                    >
                      Proceed
                    </Button>
                  </Grid>

                  {/* Modal (Dialog) Implementation */}
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{"Confirm Your Details"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        {"WE will generate a brief understanding of your brand and industry ( < 200 characters). Once you are feel that description is satisfactory, you can proceed to generate the detail reports"}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          handleSubmit();
                          handleClose(); 
                          navigate("/property") // Close modal after submit
                        }}
                        color="primary"
                        variant="contained"
                        type="submit"
                      >
                        Proceed
                      </Button>
                    </DialogActions>
                  </Dialog>
                  {/* <Grid item xs={12}>
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
                  </Grid> */}

                  {/* <Grid item xs={12}>
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
                  </Grid> */}


                  {/* <Grid item xs={12}>
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
                  </Grid> */}


                  {/* <Grid item xs={12}>
                    <FormLabel
                      sx={{ color: "text.primary" }}
                      id="demo-row-radio-buttons-group-label"
                    >
                      Please provide count of each space:
                    </FormLabel>
                  </Grid> */}

                  {/* <Grid container spacing={2}> */}
                  {/* <Grid container item xs={12} spacing={2}>
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
                  </Grid> */}
                  {/* </Grid> */}

                  {/* <Grid item xs={12}>
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
                  </Grid> */}
                  {/* <Grid item xs={12}>
                    <AddPropertyImages
                      label="Add Property Image:"
                      imageList={imageList}
                      setImageList={setImageList}
                    />
                  </Grid> */}


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
