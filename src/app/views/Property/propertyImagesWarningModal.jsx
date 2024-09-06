import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    Card,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { setEditPropertyListingDetailsModal, setPropertyImagesWarningModal } from 'app/redux/actions/ModalActions';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


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

const PropertyImagesWarningModal = ({ individualProperty }) => {

    const [isUpdateButtonClicked, setUpdateButtonClicked] = useState(false);

    const dispatch = useDispatch();

    const open = useSelector(
        (state) => state.modal.openPropertyImagesWarningModal
    );

    const handleClose = () => {
        dispatch(setPropertyImagesWarningModal(false));
    };

    const handleUpdateBtnClick = () => {
        dispatch(setEditPropertyListingDetailsModal(true));
        handleClose();
    }
   
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
                    <Grid container justifyContent='center' alignItems='center'>
                        <Typography
                            mb={3}
                            id="modal-modal-title"
                            variant="body"
                            sx={{fontSize: '15px'}}
                        >
                            Seems like you have not updated any information with respect to property listing. So, please update the necessary details.
                        </Typography>
                    </Grid>
                    <Grid container gap={3} justifyContent='center' alignItems='center'>
                       <Button variant='contained' onClick={() => handleClose()}>Close</Button>
                       <Button variant='contained' onClick={() => handleUpdateBtnClick()}>Update details</Button>
                    </Grid>

                 
                </Card>
            </Modal>
        </>
    );
};

export default PropertyImagesWarningModal;
