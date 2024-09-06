import { Add } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    Card,
    CardMedia,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import Loading from 'app/components/MatxLoading';
import {  setPropertyImagesWarningModal, setUpdatePropertyModal, setUploadPropertyImagesModal } from 'app/redux/actions/ModalActions';
import { updatePropertyProfilePicAction } from 'app/redux/actions/PropertyActions';
import { useDispatch, useSelector } from 'react-redux';
import PropertyImages from './PropertyImages';
import UpdatePropertyImages from './UpdatePropartyImages';

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
   
};
const styles = {
   
    overflow:'auto',
    maxHeight:'500px'
   
};



const UpdatePropertyModal = ({ props, pageCheck, isIntoView}) => {
    const { ADD_LISTING_IMAGES, UPDATE_PROPERTY_PROFILE_PIC } = useSelector(
        (store) => store.loadingAndError.loader
    );

    const { individualProperty } = useSelector((state) => state.property);
    
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.openUpdatePropertyModal);

    const handleSetAsPropertyImg = (fileId) => {
        dispatch(updatePropertyProfilePicAction({
            property_id: individualProperty?.basic_details?.property_id,
            file_id: fileId,
        }));
        
    }

    const handleClose = () => {
        dispatch(setUpdatePropertyModal(false));
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
                
                   <Card>
                   <Typography variant="h5" sx={{padding:'6px'}}>Property Images</Typography>
                   
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
                      
                   </Card>
                 
                   <Card style={styles}>
                   <UpdatePropertyImages></UpdatePropertyImages>
                   <Grid container justifyContent='center' gap={4} marginTop={4}>
                    <>
                                            
                                            <Grid container marginTop={2} justifyContent='center'>
                                                <Button onClick={() => {
                                                    individualProperty?.listing_details?.listing_id
                                                        ?
                                                        dispatch(setUploadPropertyImagesModal(true))
                                                        :
                                                        dispatch(setPropertyImagesWarningModal(true));

                                                }} variant='contained' startIcon={<Add />}>Add Images</Button>
                                            </Grid>
                                        </>
                    </Grid>
                   </Card>

                </Card>
              
            </Modal>
            
        </>
    );
};

export default UpdatePropertyModal;
