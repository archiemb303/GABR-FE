import {
    Button,
    Card,
    Grid,
    IconButton,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import { setPackagePreferenceSuccessModal, setPhoneOtpModal } from 'app/redux/actions/ModalActions';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { resetLoadingStateFor } from 'app/redux/actions/LoadingAndErrorAction';
import CloseIcon from '@mui/icons-material/Close';
import Loading from 'app/components/MatxLoading';

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

const PackagePreferenceSuccessModal = () => {

    const { SELECT_PACKAGE_PREFERENCE, MARK_PREMIUM_TENANCY  } = useSelector((store) => store.loadingAndError.loader);

    const dispatch = useDispatch();

    const open = useSelector((state) => state.modal.openPackagePreferenceSuccessModal);
   
    const handleClose = () => {
        dispatch(setPackagePreferenceSuccessModal(false));
    };
   


    return (
        <>
           <Modal
                open={open}
                onClose={() => handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={{
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
                }}>
                    <IconButton
                        aria-label="close modal"
                        onClick={() => handleClose()}
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {
                        MARK_PREMIUM_TENANCY?.isLoading === true
                            ?
                            <Loading />
                            :
                            <>
                                <Grid container justifyContent='center'>
                                    <Typography variant='h5' color='green'>Thanks for choosing our premium package.</Typography>
                                </Grid>
                                
                                <Grid marginTop={3} container justifyContent='center'>
                                    <Typography variant='body1' color='GrayText'>You will now be able to enjoy all the benefits for this property</Typography>
                                </Grid>
                                <Grid container justifyContent='center' marginTop={3}>
                                    <Button onClick={() => handleClose()} variant='contained'>Close</Button>
                                </Grid>
                            </>
                    }
                </Card>
            </Modal>
        </>
    );
};

export default PackagePreferenceSuccessModal;
