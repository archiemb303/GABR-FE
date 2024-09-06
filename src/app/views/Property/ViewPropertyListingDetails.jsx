import EditIcon from '@mui/icons-material/Edit';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import {
    Box,
    Button,
    Card,
    Checkbox,
    FormControlLabel,
    FormLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    Menu,
    IconButton,
    Snackbar,
    Alert,
    Tooltip,
} from '@mui/material';
import { Container, useTheme } from '@mui/system';
import { H4, Span } from 'app/components/Typography';
import { addNewPropertyAction } from 'app/redux/actions/PropertyActions';
import { Form, Formik, validateYupSchema } from 'formik';
import { useDropzone } from 'react-dropzone';
import { propertyTypeItems, PropertyTypeItems } from './items/propertyTypes';
import { useEffect, useState } from 'react';
import {
    getAllCitiesByStateAction,
    getAllStatesByCountryAction,
} from 'app/redux/actions/LocationActions';

import React from 'react';
import {
    setAgreementSigningWarningModal,
    setEditPropertyListingDetailsModal,
    setVideoTutorialModal,
} from 'app/redux/actions/ModalActions';
import EditPropertyListingDetailsModal from './EditPropertyListingDetailsModal';
import {
    CheckCircle,
    InfoOutlined,
    PlayCircleOutline,
} from '@mui/icons-material';
import Loading from 'app/components/MatxLoading';
import CustomSnackbar from 'app/components/CustomSnackbar';

const ViewPropertyListingDetails = ({ isIntoView }) => {
    const dispatch = useDispatch();
    const { custom } = useTheme();
    const location = useSelector((state) => state.location);
    const { individualProperty } = useSelector((state) => state.property);
    const { openEditPropertyListingDetails } = useSelector(
        (state) => state.modal
    );
    const { ADD_OR_UPDATE_LISTING } = useSelector(
        (store) => store.loadingAndError.loader
    );
    const { palette } = useTheme();

    const openEditModal = () => {
        if (individualProperty?.tenancy_details?.agreement_details[0]?.document_id) {
            dispatch(setAgreementSigningWarningModal(true));
        } else {
            dispatch(setEditPropertyListingDetailsModal(true));
        }


    };

    const EditComponent = ({ size }) => {
        if (size === 'small') {
            return (
                <IconButton
                    sx={{ padding: 0, marginLeft: '10px' }}
                    aria-label="edit"
                    onClick={openEditModal}
                >
                    <EditIcon sx={{ fontSize: 14 }} />
                </IconButton>
            );
        }
        return (
            <IconButton sx={{marginLeft: '10px'}} aria-label="edit" onClick={openEditModal}>
                <EditIcon />
            </IconButton>
        );
    };

    return (
        <>
            {
                ADD_OR_UPDATE_LISTING?.isLoading === false
                &&
                <CustomSnackbar
                    loaderChild={ADD_OR_UPDATE_LISTING}
                    successMessage="Listing Details updated Successfully !"
                />
            }

            {individualProperty && openEditPropertyListingDetails && (
                <EditPropertyListingDetailsModal
                    payload={individualProperty}
                />
            )}
            <Card

                id="listingDetails"
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h5">
                            Listing Details
                        </Typography>

                        <Tooltip
                            title="Once you put your property up for rent to find tenants, this is the information that will be visible to home-seekers."
                            arrow
                        >
                            <IconButton sx={{ padding: 0, ml: 0.5 }}>
                                <InfoOutlined
                                    sx={{
                                        fontSize: '1em',
                                        color: custom.c4,
                                    }}
                                />
                            </IconButton>
                        </Tooltip>

                        <IconButton
                            sx={{ padding: 0, ml: 0.5 }}
                            onClick={() =>
                                dispatch(
                                    setVideoTutorialModal({
                                        flag: true,
                                        tutorialLink:
                                            'https://www.youtube.com/embed/CV8cBKgPZrs',
                                    })
                                )
                            }
                        >
                            <PlayCircleOutline
                                sx={{
                                    fontSize: '1em',
                                    color: custom.c4,
                                }}
                            />
                        </IconButton>
                    </Box>
                    <Box display='flex' marginBottom='10px' alignItems='center'>
                        {(individualProperty?.listing_details?.listing_status === 5
                            ||
                            individualProperty?.listing_details?.listing_status === 6)
                            &&
                            <Typography
                                sx={{
                                    whiteSpace: 'nowrap',
                                    color: 'white',
                                    padding: 0.5,
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    backgroundColor: custom.unverified,
                                }}
                            >
                                Listing Closed
                            </Typography>
                        }
                        {(individualProperty?.listing_details?.listing_status === 2
                            ||
                            individualProperty?.listing_details?.listing_status === 3)
                            &&
                            <Typography
                                sx={{
                                    whiteSpace: 'nowrap',
                                    color: 'white',
                                    padding: 0.5,
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    backgroundColor: custom.c6,
                                }}
                            >
                                Active-Listed
                            </Typography>
                        }
                        {individualProperty?.listing_details?.listing_status === 1
                            &&
                            <Typography
                                sx={{
                                    whiteSpace: 'nowrap',
                                    color: 'white',
                                    padding: 0.5,
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    backgroundColor: custom.c1,
                                }}
                            >
                                Active-Draft
                            </Typography>
                        }
                        <EditComponent />
                    </Box>


                </Box>
                {ADD_OR_UPDATE_LISTING?.isLoading === true ? (
                    <Box sx={{ height: 130 }}>
                        <Loading />
                    </Box>
                ) :
                    <Grid
                        container
                        // columnSpacing={5}
                        rowSpacing={1}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignContent="stretch"
                        wrap="wrap"
                    >
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                alignItems="stretch"
                                flexWrap='wrap'
                                gap={1}
                            >
                                <Typography
                                    variant="body1"
                                    color="GrayText"
                                    sx={{ whiteSpace: 'nowrap' }}
                                >
                                    Property Description:
                                </Typography>
                                <Typography variant="body1" color="primary">
                                    {
                                        individualProperty?.listing_details
                                            ?.property_description
                                    }
                                </Typography>
                                {/* <EditComponent size={'small'} /> */}
                            </Box>
                        </Grid>
                        <Grid item sm={12}>
                            <Box
                                display="flex"
                                alignItems="stretch"
                                gap={1}
                            >
                                <Typography
                                    variant="body1"
                                    color="GrayText"
                                >
                                    Furnishing:
                                </Typography>
                                <Typography variant="body1" color="primary">
                                    {
                                        individualProperty?.listing_details?.furnishing_details?.filter(
                                            (item) => {
                                                return (
                                                    item.furnishing_id ===
                                                    individualProperty?.listing_details?.furnishing_id
                                                );
                                            }
                                        )[0]?.furnishing_name

                                    }
                                </Typography>
                                {/* <EditComponent size={'small'} /> */}
                            </Box>
                        </Grid>

                        <Grid item sm={4}>
                            <Box
                                display="flex"
                                alignItems="stretch"
                                gap={1}
                            >
                                <Typography
                                    variant="body1"
                                    color="GrayText"
                                >
                                    Monthly Rent:
                                </Typography>
                                <Typography variant="body1" color="primary">
                                    {
                                        individualProperty?.listing_details
                                            ?.rent_per_month
                                    }
                                </Typography>
                                {/* <EditComponent size={'small'} /> */}
                            </Box>
                        </Grid>
                        <Grid item sm={4}>
                            <Box
                                display="flex"
                                alignItems="stretch"
                                gap={1}
                            >
                                <Typography
                                    variant="body1"
                                    color="GrayText"
                                >
                                    Security Deposit:
                                </Typography>
                                <Typography variant="body1" color="primary">
                                    {
                                        individualProperty?.listing_details
                                            ?.security_deposit
                                    }
                                </Typography>
                                {/* <EditComponent size={'small'} /> */}
                            </Box>
                        </Grid>
                        <Grid item sm={4}>
                            <Box
                                display="flex"
                                alignItems="stretch"
                                gap={1}
                            >
                                <Typography
                                    variant="body1"
                                    color="GrayText"
                                >
                                    Maintenance:
                                </Typography>
                                <Typography variant="body1" color="primary">
                                    {individualProperty?.listing_details?.maintenance_included?.toString() ==
                                        'true'
                                        ? 'Included'
                                        : 'Additional'}
                                </Typography>
                                {/* <EditComponent size={'small'} /> */}
                            </Box>
                        </Grid>
                        <Grid item sm={12}>
                            {/* <Typography variant="body1" color="GrayText">
                            Amenities:
                        </Typography>
                        // <EditComponent size={'small'} /> */}

                            <Box
                                display="flex"
                                alignItems="stretch"
                                gap={1}
                            >
                                <Typography
                                    variant="body1"
                                    color="GrayText"
                                >
                                    Amenities:
                                </Typography>
                                {/* <EditComponent size={'small'} /> */}
                            </Box>
                        </Grid>

                        {individualProperty?.listing_details?.amenities?.map(
                            (item) => {
                                if (item.availability !== 1) {
                                    return null;
                                }
                                return (
                                    <Grid
                                        item
                                        xs={6}
                                        md={3}
                                        sx={{
                                            display: 'flex',
                                        }}
                                    >
                                        <CheckCircle
                                            sx={{
                                                color: 'green',
                                                fontSize: '18px',
                                                mr: 1,
                                            }}
                                        />
                                        <Typography
                                            variant="body1"
                                            color="GrayText"
                                        >
                                            {item.amenity_name}
                                        </Typography>
                                    </Grid>
                                );
                            }
                        )}
                    </Grid>
                }
            </Card>
        </>
    );
};

export default ViewPropertyListingDetails;
