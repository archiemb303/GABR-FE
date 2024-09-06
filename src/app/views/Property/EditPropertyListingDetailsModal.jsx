import CloseIcon from '@mui/icons-material/Close';
import {
    Alert,
    Box,
    Button,
    Card,
    Checkbox,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/system';
import { setEditPropertyListingDetailsModal } from 'app/redux/actions/ModalActions';
import { addOrUpdateListingAction } from 'app/redux/actions/PropertyActions';
import { Form, Formik } from 'formik';
import _ from 'lodash';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useMouseSensor } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    minWidth: 300,
    maxWidth: 600,
    maxHeight: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
};

const EditPropertyListingDetailsModal = ({ payload }) => {
    const dispatch = useDispatch();
    const open = useSelector(
        (state) => state.modal.openEditPropertyListingDetails
    );
    const location = useSelector((state) => state.location);
    const { custom } = useTheme();
    const [initialValues, setInitialValues] = useState({}); // used in formik

    const validationSchema = Yup.object().shape({
        furnishing: Yup.string().required('Furnishing is required field'),
        description: Yup.string()
            .required('Description is required field')
            .max(1000, 'Character limit reached')
            .nullable(),
        rent: Yup.string()
            .required('Rent per month is required field')
            .matches(/^[0-9][0-9]*$/, 'Only positive numbers are allowed')
            .nullable(),
        security: Yup.string()
            .required('Security deposit is required field')
            .matches(/^[0-9][0-9]*$/, 'Only positive numbers are allowed')
            .nullable(),
        maintenance: Yup.string().required('Maintenance is required field'),
        // amenities: Yup.array().required('amenities is required field'),
    });

    const handleSubmit = async (values, { isSubmitting }) => {
        const amenityList = values?.amenities
            ?.filter((item) => item.availability == 1)
            ?.map((item) => item.amenity_id);

        const params = {
            property_id: payload?.listing_details?.property_id?.toString(),
            property_description: values?.description?.toString(),
            furnishing_type: values?.furnishing?.toString(),
            rent_currency: payload?.listing_details?.rent_currency?.toString(),
            rent_amount: values?.rent?.toString(),
            security_deposit_currency:
                payload?.listing_details?.security_deposit_currency?.toString(),
            security_deposit_amount: values?.security?.toString(),
            maintenance_included: values?.maintenance,
            listing_amenities_ids: amenityList,
        };
        dispatch(addOrUpdateListingAction(params));
        handleClose();
    };

    const handleClose = () => {
        dispatch(setEditPropertyListingDetailsModal(false));
    };

    useEffect(() => { }, []);

    useEffect(() => {
        if (payload) {
            //    Creating the dynamic spaces object to be used in initialValues
            let initialValues = {
                furnishing: payload?.listing_details?.furnishing_id,
                description: payload?.listing_details?.property_description,
                rent: payload?.listing_details?.rent_per_month,
                security: payload?.listing_details?.security_deposit,
                maintenance: _.startCase(
                    payload?.listing_details?.maintenance_included?.toString()
                ),
                amenities: payload?.listing_details?.amenities,
            };
            setInitialValues(initialValues);
        }
    }, [payload]);

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
                            position: 'absolute',
                            right: 0,
                            top: 0,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        textAlign={'center'}
                    >
                        Edit Property Listing Details
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
                            setValues,
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Box
                                    sx={{
                                        maxWidth: 400,
                                        mx: 'auto',
                                        my: 4,
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel id="furnishing-label">
                                                    Furnishing
                                                </InputLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="furnishing-label"
                                                    id="furnishing"
                                                    label="Furnishing"
                                                    value={values.furnishing}
                                                    onChange={(ev) => {
                                                        setFieldValue(
                                                            'furnishing',
                                                            ev.target.value
                                                        );
                                                    }}
                                                >
                                                    {payload.listing_details?.furnishing_details?.map(
                                                        (item) => {
                                                            return (
                                                                <MenuItem
                                                                    key={
                                                                        item.furnishing_id
                                                                    }
                                                                    value={
                                                                        item.furnishing_id
                                                                    }
                                                                >
                                                                    {
                                                                        item.furnishing_name
                                                                    }
                                                                </MenuItem>
                                                            );
                                                        }
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                sx={{ mr: 1 }}
                                                name="description"
                                                label="Description"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                multiline
                                                rows={5}
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={
                                                    touched.description &&
                                                    errors.description
                                                }
                                                error={Boolean(
                                                    touched.description &&
                                                    errors.description
                                                )}
                                            />
                                            <Typography
                                                textAlign="right"
                                                color="GrayText"
                                                variant="body1"
                                            >
                                                {values?.description
                                                    ? values?.description
                                                        ?.length
                                                    : 0}
                                                /1000
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                sx={{ mr: 1 }}
                                                name="rent"
                                                label="Rent per month"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                value={values.rent}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={
                                                    touched.rent && errors.rent
                                                }
                                                error={Boolean(
                                                    touched.rent && errors.rent
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                sx={{ mr: 1 }}
                                                name="security"
                                                label="Security Deposit"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                value={values.security}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={
                                                    touched.security &&
                                                    errors.security
                                                }
                                                error={Boolean(
                                                    touched.security &&
                                                    errors.security
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControl sx={{ my: 1 }}>
                                                <FormLabel
                                                    id="maintenance-radio-buttons-group-label"
                                                    sx={{ textAlign: 'left' }}
                                                >
                                                    Maintenance Included:
                                                </FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="maintenance-radio-buttons-group-label"
                                                    value={values.maintenance}
                                                    name="radio-buttons-group"
                                                    onChange={(ev) => {
                                                        setFieldValue(
                                                            'maintenance',
                                                            ev.target.value
                                                        );
                                                    }}
                                                    onBlur={handleBlur}
                                                    helperText={
                                                        touched.maintenance &&
                                                        errors.maintenance
                                                    }
                                                    error={Boolean(
                                                        touched.maintenance &&
                                                        errors.maintenance
                                                    )}
                                                >
                                                    <FormControlLabel
                                                        value="True"
                                                        control={<Radio />}
                                                        label="Yes"
                                                    />
                                                    <FormControlLabel
                                                        value="False"
                                                        control={<Radio />}
                                                        label="No"
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormLabel
                                                sx={{ textAlign: 'left' }}
                                            >
                                                Amenities:
                                            </FormLabel>
                                            {/* Create a new list that will contain all the amenities along with unselected amenities 🟢 */}
                                            {values?.amenities?.map(
                                                (item, index) => {
                                                    return (
                                                        <Grid item xs={6}>
                                                            <FormControlLabel
                                                                key={
                                                                    item.amenity_id
                                                                }
                                                                label={
                                                                    item.amenity_name
                                                                }
                                                                onChange={(
                                                                    ev
                                                                ) => {
                                                                    const amenities =
                                                                        [
                                                                            ...values.amenities,
                                                                        ];

                                                                    // Toggle the checkbox, If checked then uncheck
                                                                    if (
                                                                        amenities[
                                                                            index
                                                                        ]
                                                                            .availability ==
                                                                        1
                                                                    ) {
                                                                        amenities[
                                                                            index
                                                                        ].availability = 2;
                                                                    } else {
                                                                        //  unchecked -> checked
                                                                        amenities[
                                                                            index
                                                                        ].availability = 1;
                                                                    }

                                                                    setValues({
                                                                        ...values,
                                                                        amenities,
                                                                    });
                                                                }}
                                                                control={
                                                                    item.availability ==
                                                                        1 ? (
                                                                        <Checkbox
                                                                            checked
                                                                        />
                                                                    ) : (
                                                                        <Checkbox />
                                                                    )
                                                                }
                                                            />
                                                        </Grid>
                                                    );
                                                }
                                            )}
                                        </Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            display="flex"
                                            justifyContent="center"
                                        >
                                            <Button
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

export default EditPropertyListingDetailsModal;
