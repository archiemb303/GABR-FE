import Loading from 'app/components/MatxLoading';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import {
    Alert,
    Box,
    Button,
    Card,
    FormControl,
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
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/system';
import {
    getAllCitiesByStateAction,
    getAllStatesByCountryAction,
} from 'app/redux/actions/LocationActions';
import {
    setEditPropertyBasicDetailsModal,
    setDeactivateTenancyModal,
    setRemoveListingModal,
} from 'app/redux/actions/ModalActions';
import {
    deactivateTenancyAction,
    getIndividualPropertyAction,
    getpayloadAction,
    removeActiveListingAction,
    updateBasicPropertyDetailsAction,
} from 'app/redux/actions/PropertyActions';
import { Form, Formik } from 'formik';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { propertyTypeItems } from './items/propertyTypes';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

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

const CloseListingModal = () => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.openCloseListingModal);
    const { individualProperty } = useSelector((state) => state.property);
    const [isPremiumUser, setIsPremiumUser] = useState(true);

    const handleClose = () => {
        dispatch(setRemoveListingModal(false));
    };

    const handleOpen = () => {
        dispatch(setRemoveListingModal(true));
    };

    const handleSubmit = () => {
        const params = {
            property_id: individualProperty?.basic_details?.property_id,
            listing_id: individualProperty?.listing_details?.listing_id
     
        };
    
        dispatch(removeActiveListingAction(params));
        dispatch(getIndividualPropertyAction({
            property_id: individualProperty?.basic_details?.property_id,
        }))
        handleClose();
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
                        id="modal-modal-title"
                        variant="h5"
                        textAlign={'center'}
                    >
                        Are you sure you want to remove the listing?
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 1,
                            mt: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Confirm
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Card>
            </Modal>
        </>
    );
};

export default CloseListingModal;
