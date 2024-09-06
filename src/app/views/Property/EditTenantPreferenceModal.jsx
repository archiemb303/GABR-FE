import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    Card,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Typography,
    // Snackbar,
    Alert,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { H5 } from 'app/components/Typography';
import { setEditTenantPreferenceModal } from 'app/redux/actions/ModalActions';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTenancyPreferenceAction } from 'app/redux/actions/PropertyActions';
import * as Yup from 'yup';
import { useEffect } from 'react';
import CustomSnackbar from 'app/components/CustomSnackbar';

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

const EditTenantPreferenceModal = ({ individualProperty }) => {
    const { UPDATE_TENANT_PREFERENCE } = useSelector(
        (store) => store.loadingAndError.loader
    );

    // const [isSnakbarOpen, setSnackbarOpen] = useState(false);
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.openEditTenantPreference);


    const [initialValues, setInitialValues] = useState();

    const handleSubmit = async (values, { isSubmitting }) => {
        dispatch(
            updateTenancyPreferenceAction({
                property_id: individualProperty?.basic_details?.property_id,
                preference_options: [
                    parseInt(values.bachelorsAllowed),
                    parseInt(values.petsAllowed),
                    parseInt(values.foodHabits),
                ],
            })
        );
        dispatch(setEditTenantPreferenceModal(false));
        // setSnackbarOpen(true);
    };

    const handleClose = () => {
        dispatch(setEditTenantPreferenceModal(false));
    };

    useEffect(() => {

        var initialPreferences;
        if(individualProperty?.listing_details?.tenant_preference){
            initialPreferences = {
                bachelorsAllowed: individualProperty
                ?.listing_details
                ?.tenant_preference
                ?.[0]?.preference_options?.filter((option) => option.is_selected)[0]?.option_id,
                petsAllowed: individualProperty
                ?.listing_details
                ?.tenant_preference
                ?.[1]?.preference_options?.filter((option) => option.is_selected)[0]?.option_id,
                foodHabits: individualProperty
                ?.listing_details
                ?.tenant_preference
                ?.[2]?.preference_options?.filter((option) => option.is_selected)[0]?.option_id
            }
        }else{
            initialPreferences = {
                bachelorsAllowed: 3,
                petsAllowed: 6,
                foodHabits: 9
            }
        }
        setInitialValues(initialPreferences);
    }, [individualProperty])

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
                        mb={3}
                        id="modal-modal-title"
                        variant="h5"
                        textAlign={'center'}
                    >
                        Edit tenant preference
                    </Typography>
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
                                <Grid container columnSpacing={2}>
                                    <Grid container rowGap={3} item md={12}>
                                        <Grid xs={4}>
                                            <H5
                                                sx={{
                                                    display: 'block',
                                                    mr: 3,
                                                    mb: 0.5,
                                                }}
                                            >
                                                Bachelors Allowed
                                            </H5>
                                        </Grid>
                                        <Grid xs={8}>
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    row
                                                    name="bachelorsAllowed"
                                                    value={
                                                        values.bachelorsAllowed
                                                    }
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel
                                                        label="Yes"
                                                        value="1"
                                                        control={
                                                            <Radio
                                                                size="small"
                                                                color="primary"
                                                            />
                                                        }
                                                        sx={{
                                                            mr: 3,
                                                            height: 20,
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        label="No"
                                                        value="2"
                                                        control={
                                                            <Radio
                                                                size="small"
                                                                color="primary"
                                                            />
                                                        }
                                                        sx={{ height: 20 }}
                                                    />
                                                    <FormControlLabel
                                                        label="Dont'care"
                                                        value="3"
                                                        control={
                                                            <Radio
                                                                size="small"
                                                                color="primary"
                                                            />
                                                        }
                                                        sx={{ height: 20 }}
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>

                                        <Grid xs={4}>
                                            <H5
                                                sx={{
                                                    display: 'block',
                                                    mr: 3,
                                                    mb: 0.5,
                                                }}
                                            >
                                                Pets Allowed
                                            </H5>
                                        </Grid>
                                        <Grid xs={8}>
                                            <FormControl
                                                component="fieldset"
                                                sx={{}}
                                            >
                                                <RadioGroup
                                                    row
                                                    name="petsAllowed"
                                                    value={values.petsAllowed}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel
                                                        label="Yes"
                                                        value="4"
                                                        control={
                                                            <Radio
                                                                size="small"
                                                                color="primary"
                                                            />
                                                        }
                                                        sx={{
                                                            mr: 3,
                                                            height: 20,
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        label="No"
                                                        value="5"
                                                        control={
                                                            <Radio
                                                                size="small"
                                                                color="primary"
                                                            />
                                                        }
                                                        sx={{ height: 20 }}
                                                    />
                                                    <FormControlLabel
                                                        label="Don't care"
                                                        value="6"
                                                        control={
                                                            <Radio
                                                                size="small"
                                                                color="primary"
                                                            />
                                                        }
                                                        sx={{ height: 20 }}
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>

                                        <Grid xs={4}>
                                            <H5
                                                sx={{
                                                    display: 'block',
                                                    mr: 3,
                                                    mb: 0.5,
                                                }}
                                            >
                                                Food Habits
                                            </H5>
                                        </Grid>
                                        <Grid xs={8}>
                                            <FormControl
                                                component="fieldset"
                                                sx={{}}
                                            >
                                                <RadioGroup
                                                    row
                                                    name="foodHabits"
                                                    value={values.foodHabits}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel
                                                        label="Veg"
                                                        value="7"
                                                        control={
                                                            <Radio
                                                                size="small"
                                                                color="primary"
                                                            />
                                                        }
                                                        sx={{
                                                            mr: 3,
                                                            height: 20,
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        label="Non-Veg"
                                                        value="8"
                                                        control={
                                                            <Radio
                                                                size="small"
                                                                color="primary"
                                                            />
                                                        }
                                                        sx={{ height: 20 }}
                                                    />
                                                    <FormControlLabel
                                                        label="Don't care"
                                                        value="9"
                                                        control={
                                                            <Radio
                                                                size="small"
                                                                color="primary"
                                                            />
                                                        }
                                                        sx={{ height: 20 }}
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    marginY={3}
                                    container
                                    justifyContent="center"
                                >
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                    >
                                        Update
                                    </Button>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </Modal>
            {/* {UPDATE_TENANCY_PREFERENCE?.isLoading === false && (
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={isSnakbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                >
                    {UPDATE_TENANCY_PREFERENCE?.error === null ? (
                        <Alert
                            onClose={() => setSnackbarOpen(false)}
                            severity="success"
                            sx={{ width: '50vw' }}
                        >
                            Tenant preference updated successfully!
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

export default EditTenantPreferenceModal;
