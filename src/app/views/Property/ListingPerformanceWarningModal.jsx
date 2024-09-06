import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import {
    Box,
    Button,
    Card,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { textAlign } from '@mui/system';
import Loading from 'app/components/MatxLoading';
import { setEditContactInfoModal, setEditPropertyListingDetailsModal, setListingPerformanceWarningModal, setPropertyImagesWarningModal } from 'app/redux/actions/ModalActions';
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

  

const ListingPerformanceWarningModal = ({ individualProperty, message }) => {
    const { ADD_OR_UPDATE_LISTING_CONTACT, ADD_OR_UPDATE_LISTING} =
    useSelector((store) => store.loadingAndError.loader);
    const {closeWarningModal,setCloseWarningModal} = useState()
    useEffect(()  => {
    
        if (( (individualProperty?.listing_details?.listing_id !== null )&&
        ( individualProperty?.listing_details?.property_description !== null
        || individualProperty?.listing_details?.rent_per_month !== 0 ) &&
        ( individualProperty?.listing_details?.contact_info?.length !== 0)

        )) 

        {
    
    handleClose();
   }

    },[individualProperty?.listing_details?.listing_id,
        individualProperty?.listing_details?.property_description,
        individualProperty?.listing_details?.rent_per_month,
        individualProperty?.listing_details?.contact_info?.length
    ])

    const dispatch = useDispatch();

    const open = useSelector(
        (state) => state.modal.openListingPerformanceWarningModal
    );

    const handleClose = () => {
        dispatch(setListingPerformanceWarningModal(false));
    };

    const handleUpdateBtnClick = (action) => {
        if (action === 'updateListingDetails') {
            dispatch(setEditPropertyListingDetailsModal(true));
        } else {
            dispatch(setEditContactInfoModal(true));
        }
             
       
    }


    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            
                 
                {
                     ADD_OR_UPDATE_LISTING_CONTACT?.isLoading === true || ADD_OR_UPDATE_LISTING?.isLoading === true ? 
                     <Box sx={style} style={{
                        maxWidth:'450px',
                        padding:'85px',
                        borderRadius:'5px'
                     }}  height='178px'>
                     <Loading />
                   </Box>
                     :
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
                            sx={{ fontSize: '15px',textAlign:'center' }}
                        >
                           
                           <Typography variant='subtitle1'>You need to fill the below information to list the property</Typography>
                        
                               <Typography variant='subtitle2' sx={{marginTop:'10px', display:'flex',justifyItems:'center',justifyContent:'center'}}> 1) Listing details 
                               {
                                (individualProperty?.listing_details?.listing_id !== null
                                    && 
                                    individualProperty?.listing_details?.property_description !== null
                                    && 
                                    individualProperty?.listing_details?.rent_per_month !== 0) 
                                    ?
                                    <DoneIcon sx={{color:'#0CC243'}} /> 
                               
                                    :
                                    <CloseIcon sx={{color:'red'}} />
                               }
                              
                               </Typography>
                       
                        
                           <Typography variant='subtitle2' sx={{marginTop:'5px', display:'flex',justifyItems:'center',justifyContent:'center'}}>2) Contact details 
                           {
                           ( individualProperty?.listing_details?.listing_id !== null
                               &&
                               individualProperty?.listing_details?.contact_info?.length !== 0)
                               ?
                               <DoneIcon sx={{color:'#0CC243'}} />
                              :
                              
                              <CloseIcon sx={{color:'red'}}/>
                          }
                          
                           </Typography>
                       
                           
                         </Typography>
                        
                    </Grid>
                    <Grid container gap={3} justifyContent='center' alignItems='center'>

                    
                          
                            <Button disabled={
                                individualProperty?.listing_details?.listing_id !== null
                                && 
                                individualProperty?.listing_details?.property_description !== null
                                && 
                                individualProperty?.listing_details?.rent_per_month !== 0
                            } variant='contained' onClick={() => handleUpdateBtnClick('updateListingDetails')}>Update Listing Details</Button>
                          
                       
                            <Button disabled={
                                individualProperty?.listing_details?.listing_id !== null
                                &&
                                individualProperty?.listing_details?.contact_info?.length !== 0
                            } variant='contained' onClick={() => handleUpdateBtnClick('updateContactDetails')}>Update Contact Details</Button>
                       
                        
                       
                    </Grid>


                </Card>
                }
               
            </Modal>
        </>
    );
};

export default ListingPerformanceWarningModal;
