import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Card,
    Grid,
    Typography,
    IconButton,
    Button,
    CardMedia,
    Snackbar,
    Alert,
} from '@mui/material';

import React, { useState } from 'react';
import {
    setEditPropertyInclusionModal,
    setPropertyImagesWarningModal,
    setUploadPropertyImagesModal,
} from 'app/redux/actions/ModalActions';
import EditPropertyInclusionModal from './EditPropertyInclusionModal';
import { Add, Clear } from '@mui/icons-material';
import UploadPropertyImagesModal from './uploadPropertyImagesModal';
import Loading from 'app/components/MatxLoading';
import { removeListingImagesAction, updatePropertyProfilePicAction } from 'app/redux/actions/PropertyActions';
import { themeColors } from 'app/components/MatxTheme/themeColors';
import PropertyImagesWarningModal from './propertyImagesWarningModal';
import CustomSnackbar from 'app/components/CustomSnackbar';

const UpdatePropertyImages = ({ props, pageCheck, isIntoView }) => {
    const { ADD_LISTING_IMAGES, UPDATE_PROPERTY_PROFILE_PIC } = useSelector(
        (store) => store.loadingAndError.loader
    );
    const [isSnakbarOpen, setSnackbarOpen] = useState(false);
    const { removedListingImages } = useSelector((state) => state.property);
    const dispatch = useDispatch();
    const { individualProperty } = useSelector((state) => state.property);
    const { custom } = themeColors.customTheme;
   

    const handleRemove = (imageId) => {
        dispatch(
            removeListingImagesAction({
                listing_id: individualProperty?.listing_details?.listing_id,
                tenancy_id:
                    individualProperty?.tenancy_details?.tenancy_terms
                        ?.tenancy_id,
                property_id: individualProperty?.basic_details?.property_id,
                image_id: [imageId],
            })
        );
    };

    const handleSetAsPropertyImg = (fileId) => {
        dispatch(updatePropertyProfilePicAction({
            property_id: individualProperty?.basic_details?.property_id,
            file_id: fileId,
        }));
        setSnackbarOpen(true);
    }

    return (
        <>
           
           <PropertyImagesWarningModal></PropertyImagesWarningModal>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alginItems: 'center',
                    padding: 2,
                    // maxWidth: 400,
                    margin: '0 auto',
                    my: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                   
                </Box>
                {
                    ADD_LISTING_IMAGES?.isLoading === true
                        ?
                        <Box sx={{ height: '180px' }}>
                            <Loading></Loading>
                        </Box>
                        :
                        <>
                            <Grid container spacing={2}>
                                {individualProperty
                                    ?.listing_details?.listing_images?.length > 0
                                    &&
                                    individualProperty?.listing_details?.listing_images?.map((item, index) => {
                                        return (
                                            <Grid key={index} item xs={6}>
                                                <Card sx={{ position: 'relative' }} fullWidth>
                                                    <CardMedia

                                                        component="img"
                                                        height="160"
                                                        image={item.file_url}
                                                    />
                                                    {pageCheck !== "INVITATION_MODAL"
                                                        &&
                                                        <Grid gap={1} padding={1} container justifyContent='space-between' alignItems='center'>
                                                            <Typography
                                                                onClick={() => handleSetAsPropertyImg(item.file_id_id)}
                                                                variant="body2"
                                                                sx={{
                                                                    color: '#fff',
                                                                    padding: '2px 8px',
                                                                    borderRadius: '4px',
                                                                    backgroundColor: custom.c4,
                                                                    fontSize: '0.75em',
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                Set as property image
                                                            </Typography>
                                                           
                                                        </Grid>
                                                    }
                                                </Card>
                                            </Grid>
                                        )
                                    })}
                            </Grid>
                    
                        </>


                }

            </Card>
           
        </>
    );
};

export default UpdatePropertyImages;
