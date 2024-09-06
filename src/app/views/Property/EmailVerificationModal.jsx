import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    Card,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { setEmailOtpModal } from 'app/redux/actions/ModalActions';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { verifyListingContactOtpAction } from 'app/redux/actions/PropertyActions';
import { resetLoadingStateFor } from 'app/redux/actions/LoadingAndErrorAction';

const InputField = styled(TextField)(() => ({
    marginBottom: '16px',
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    "& input[type=number]": {
        MozAppearance: "textfield",
    }
}));

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

const EmailVerificationModal = ({ individualProperty }) => {

    const { VERIFY_LISTING_CONTACT_OTP } = useSelector((store) => store.loadingAndError.loader);

    const [isSnakbarOpen, setSnackbarOpen] = useState(false);

    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.openEmailOtp);
    const [initialValues, setInitialValues] = useState({
        emailOtp: ''
    });
    const user = JSON.parse(localStorage.getItem('persistentState'));

    const validationSchema = Yup.object().shape({
        emailOtp: Yup.number().typeError('OTP should be a number').required('Please enter OTP')
    });


    const handleSubmit = (values) => {
        dispatch(verifyListingContactOtpAction({
            property_id: individualProperty?.basic_details?.property_id,
            listing_contact_details: [
                {
                    listing_contact_id: individualProperty
                    ?.listing_details
                    ?.contact_info
                    ?.filter((contact) => contact.contact_type === 1)?.[0]?.contact_id?.toString(),
                    otp: parseInt(values.emailOtp)
                }
            ]
        }))
        setSnackbarOpen(true);
    }


    const handleClose = () => {
        dispatch(setEmailOtpModal(false));
        resetLoadingStateFor('verifyListingContactOtpLoading', dispatch)
    };

    useEffect(() => {
        if (VERIFY_LISTING_CONTACT_OTP?.isLoading === false && !VERIFY_LISTING_CONTACT_OTP?.error) {
            handleClose();
        }
    }, [VERIFY_LISTING_CONTACT_OTP])



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
                        Enter OTP sent to your email id  
                        <br />{individualProperty?.listing_details?.contact_info
                          ?.filter((contact) => contact.contact_type === 1)?.[0]?.contact_info}
                    </Typography>


                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                        enableReinitialize={true}>
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
                                <Grid container justifyContent='center' columnSpacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <InputField
                                            name="emailOtp"
                                            label="Email OTP"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            onChange={(event) => {
                                                handleChange(event);
                                            }}
                                            onBlur={handleBlur}
                                            helperText={
                                                touched.emailOtp &&
                                                errors.emailOtp
                                            }
                                            error={Boolean(
                                                touched.emailOtp &&
                                                errors.emailOtp
                                            )}
                                        />
                                    </Grid>
                                </Grid>


                                <Grid marginY={3} container justifyContent='center'>
                                    <Button color="primary" variant="contained" type="submit">
                                        Confirm
                                    </Button>
                                </Grid>
                                {
                                 VERIFY_LISTING_CONTACT_OTP?.error
                                 &&
                                    <Grid marginY={3} container justifyContent='center'>
                                        <Typography color="red" variant="contained" type="submit">
                                            OTP does not match.
                                        </Typography>
                                    </Grid>
                                }
                            </Form>
                        )}
                    </Formik>
                </Card>
            </Modal>
            {/* {VERIFY_LISTING_CONTACT_OTP?.isLoading === false
                &&
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={isSnakbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                   {
                    VERIFY_LISTING_CONTACT_OTP?.error === null 
                    &&
                    <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '50vw' }}>
                    Email verified successfully!
                </Alert>
                   }
                </Snackbar>
            } */}
        </>
    );
};

export default EmailVerificationModal;
