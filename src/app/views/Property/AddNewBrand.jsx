import { Box, Card, Grid, MenuItem, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from "@mui/material"
import { addNewBoard } from "app/redux/actions/ScrumBoardActions"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { createBrandAction, fetchBusinessNature } from "app/redux/actions/BrandSpecificActions";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountriesAction } from "app/redux/actions/LocationActions";
import { generateUnderstanding } from "app/redux/actions/BrandSpecificActions";

const AddNewBrand = ({setAdding, setGenerating}) => {
    const dispatch = useDispatch();
    const params = { text: "This is demo text" }
    const initialValues = {
        brandName: "",
        industry: "",
        compititors: "",
        business_id: "",
        country: "",
        targetClients: "",
        description: "",
    }
    const [open, setOpen] = useState(false);
    
    const handleSubmit = async (values) => {
        console.log(values)
        dispatch(
            createBrandAction({
                brand_name: values.brandName,
                industry: values.industry,
                competitors: [values.compititors],
                nature_of_business: [values.business_id],
                target_clients: [values.targetClients],
                target_countries: ["India", "USA"],
                brief_description: values.description,
                country_of_operation: "India"
            })
        );
    }
     
    // Function to open the modal
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      // Function to close the modal
      const handleClose = () => {
        setOpen(false);
      };
    const { nature_of_business} = useSelector(state => state.brandSpecific);
    const { location } = useSelector(state=>state);
    useEffect(() => {
        
        dispatch(fetchBusinessNature())
        dispatch(getAllCountriesAction());
    }, [])
    const currentUser = useSelector((state) => state.userProfile);
    console.log(currentUser);
    console.log(location);
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
                    // validationSchema={validationSchema}
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
                                            name="brandName"
                                            label="Brand Name"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            value={values.brandName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        // helperText={touched.brandName && errors.brandName}
                                        // error={Boolean(
                                        //     touched.brandName && errors.brandName
                                        // )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ mr: 1 }}
                                            name="industry"
                                            label="Industry"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            value={values.industry}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        // helperText={touched.brandName && errors.brandName}
                                        // error={Boolean(
                                        //     touched.brandName && errors.brandName
                                        // )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ mr: 1 }}
                                            name="compititors"
                                            label="Compititors"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            value={values.compititors}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        // helperText={touched.brandName && errors.brandName}
                                        // error={Boolean(
                                        //     touched.brandName && errors.brandName
                                        // )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
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
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ mr: 1 }}
                                            name="targetClients"
                                            label="Target Clients"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            value={values.targetClients}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.targetClients && errors.targetClients}
                                            error={Boolean(
                                                touched.targetClients && errors.targetClients
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
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
                                            {/* {target_countries?.map((item) => {
                                                return (
                                                    <MenuItem
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </MenuItem>
                                                );
                                            })} */}
                                        </TextField>
                                    </Grid>
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
                                            // disabled={ADD_NEW_PROPERTY?.isLoading}
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
                                                    setAdding(false);
                                                    setGenerating(true);
                                                    dispatch(generateUnderstanding(params))
                                                    // navigate("/property")  Close modal after submit
                                                }}
                                                color="primary"
                                                variant="contained"
                                                type="submit"
                                            >
                                                Proceed
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Grid>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Card>
        </>
    )
}

export default AddNewBrand;