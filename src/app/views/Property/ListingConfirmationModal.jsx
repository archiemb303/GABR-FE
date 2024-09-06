import CloseIcon from '@mui/icons-material/Close';
import {
    Alert,
    Button,
    Card,
    Container,
    Grid,
    IconButton,
    Snackbar,
    Typography,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { setListingConfirmationModal, setPackagePreferenceModal, setPackagePreferenceSuccessModal, setPremiumPackageStatusModal } from 'app/redux/actions/ModalActions';
import { publishListingAction, selectPackagePreferenceAction } from 'app/redux/actions/PropertyActions';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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


const ListingConfirmationModal = ({ individualProperty }) => {

    const { PUBLISH_LISTING } = useSelector((store) => store.loadingAndError.loader);
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.openListingConfirmation);
    const [isSnakbarOpen, setSnackbarOpen] = useState(false);
    const { fetchMyWalletTransactions } = useSelector((state) => state.wallet);


    const handleListing = () => {
        const publishType = individualProperty?.listing_details?.package_preference === 1 ? 'F' : 'P'
        dispatch(publishListingAction({
            listing_id: individualProperty?.listing_details?.listing_id,
            property_id: individualProperty?.basic_details?.property_id,
            publish_type: publishType
        }));
        dispatch(setListingConfirmationModal(false));
        setSnackbarOpen(true);
    }


    const handleClose = () => {
        dispatch(setListingConfirmationModal(false));
    };


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
                        variant="h5"
                        textAlign={'center'}
                    >
                        {individualProperty?.listing_details?.package_preference === 1
                            ?
                            'Your ad will be listed for free'
                            :
                            'Your ad will now be listed for tenants to find'}
                    </Typography>
                    <Typography
                        mb={3}
                        variant="body1"
                        textAlign={'center'}
                    >
                        {individualProperty?.listing_details?.package_preference === 1
                            ?
                            'We recommend that you list for premium as it will provide you the below additional features.'
                            :
                            'As a premium member you will get the below features'}

                    </Typography>
                    <Grid container justifyContent='center'>


                        <Container sx={{
                            width: '50%'
                        }}>
                            <Typography variant='body1' marginBottom={3} fontSize={12} color="GrayText">
                                1. Free rental agreement
                            </Typography>


                            <Typography marginBottom={3} fontSize={12} color="GrayText">
                                2. Free digital signing
                            </Typography>


                            <Typography marginBottom={3} fontSize={12} color="GrayText">
                                3. Renewal alerts
                            </Typography>

                            <Typography marginBottom={3} fontSize={12} color="GrayText">
                                4. Free communications
                            </Typography>


                            <Typography marginBottom={3} fontSize={12} color="GrayText">
                                5. Free rent reciepts
                            </Typography>


                            <Typography marginBottom={3} fontSize={12} color="GrayText">
                                6. Free document management
                            </Typography>


                            <Typography marginBottom={3} fontSize={12} color="GrayText">
                                7. Online rent payments*
                            </Typography>

                        </Container>
                    </Grid>
                    <Grid container justifyContent='center' gap={4} marginTop={4}>
                        <Button
                            onClick={() => handleListing()}
                            sx={{ width: '160px' }}
                            variant='contained'>Continue</Button>
                        {individualProperty?.listing_details?.package_preference === 1
                            &&
                            <Button
                                onClick={() => {
                                    dispatch(setPackagePreferenceModal(true));
                                    handleClose();
                                }}
                                sx={{ width: '160px' }}
                                variant='contained'>Get premium</Button>
                        }
                    </Grid>

                </Card>
            </Modal>
            {/* {PUBLISH_LISTING?.isLoading === false
                &&
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={isSnakbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                    {
                        PUBLISH_LISTING?.error === null
                            ?
                            <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '50vw' }}>
                                {individualProperty?.listing_details?.listing_status === 2
                                    ?
                                    'Your property has been listed for free'
                                    :
                                    'your property has been listed as premium'}
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

export default ListingConfirmationModal;
