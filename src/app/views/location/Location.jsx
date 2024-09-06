// import { FlexAlignCenter, FlexBox } from "app/components/FlexBox";
// import { convertHexToRGB } from "app/utils/utils";
import { useTheme } from '@mui/system';
import {
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    Grid,
    MenuItem,
    styled,
    TextField,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import { H4, Paragraph } from 'app/components/Typography';
import React, { useEffect, useState } from 'react';
import { countries } from '../ecommerce/Country';
import { Form, Formik } from 'formik';
import BasicMap from '../map/BasicMap';
import { propertyData } from './locationData';

const StyledCard = styled(Card)(({ theme }) => ({
    margin: '30px',
    padding: '24px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

// const InputField = styled(TextField)(() => ({ marginBottom: '16px' }));
const initialValues = {
    existingProperty: '',
    country: '',
    state: '',
    city: '',
    zip: '',
    propertyName: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
};

const Location = () => {
    const { palette } = useTheme();
    const textMuted = palette.text.secondary;

    const [getProperty, setProperty] = useState([]);
    const [getPropertyName, setPropertyName] = useState('');
    // const [getPincodeNum, setPincodeNum] = useState("");

    useEffect(() => {
        const getData = async () => {
            const reqData = propertyData;
            // console.log(reqData);
            setProperty(reqData);
        };
        getData();
    }, []);

    const handlePropertyName = (event) => {
        const getPropertyName = event.target.value;
        // console.log(getPropertyName);
        setPropertyName(getPropertyName);
    };

    // useEffect(() => {
    //   const getPincode = async () => {
    //     const pincodeData = await propertyData.getPropertyName;
    //     // console.log(pincodeData);
    //     setPincodeNum(await pincodeData);
    //   };
    //   getPincode();
    // }, [getPropertyName]);

    const handleSubmit = async (values, { isSubmitting }) => {
        console.log(values);
    };

    return (
        <Accordion defaultExpanded={true}>
            {/* <StyledCard> */}
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">Location Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {/* <Box mx="auto" fullWidth> */}
                {getProperty && (
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
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
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            size="small"
                                            select
                                            name="property"
                                            label="Existing Property"
                                            variant="outlined"
                                            fullWidth
                                            value={getPropertyName}
                                            onChange={(e) => handlePropertyName(e)}
                                        >
                                            {getProperty.map((existingProperty) => (
                                                <MenuItem key={existingProperty.name} value={existingProperty.name}>
                                                    {existingProperty.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
                                            sx={{ mr: 0 }}
                                            name="zip"
                                            label="Pincode"
                                            variant="outlined"
                                            fullWidth
                                            value={values.zip}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
                                            select
                                            name="country"
                                            label="Country"
                                            variant="outlined"
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
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
                                            select
                                            name="state"
                                            label="State"
                                            variant="outlined"
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
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
                                            select
                                            name="city"
                                            label="City"
                                            variant="outlined"
                                            fullWidth
                                            value={values.city}
                                            onChange={handleChange}
                                        >
                                            {countries.map((country) => (
                                                <MenuItem key={country.name} value={country.name}>
                                                    {country.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
                                            name="propertyName"
                                            label="Property Name"
                                            variant="outlined"
                                            fullWidth
                                            value={values.propertyName}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
                                            name="addressLine1"
                                            label="Address Line 1 (e.g : House / Flat Number , Apartment/Building Name)"
                                            variant="outlined"
                                            fullWidth
                                            value={values.addressLine1}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
                                            name="addressLine2"
                                            label="Address Line 2 (e.g : Road / Street Name) "
                                            variant="outlined"
                                            fullWidth
                                            value={values.addressLine2}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
                                            name="addressLine3"
                                            label="Address Line 3 (e.g : Locality / Area Name)"
                                            variant="outlined"
                                            fullWidth
                                            value={values.addressLine3}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <BasicMap />
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button
                                                sx={{
                                                    color: '#1976D2',
                                                    backgroundColor: 'white',
                                                    width: '100%',
                                                }}
                                                color="primary"
                                                variant="outlined"
                                            >
                                                Locate on map
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button sx={{ mt: 2 }} color="primary" variant="contained" type="submit">
                                        Proceed
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                )}
                {/* </Box> */}
            </AccordionDetails>
            {/* </StyledCard> */}
        </Accordion>
    );
};

export default Location;
