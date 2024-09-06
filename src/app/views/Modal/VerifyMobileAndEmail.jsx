import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { Card, Grid, TextField, IconButton } from '@mui/material';
import { stubFalse } from 'lodash';
import { setContactInformationModal } from 'app/redux/actions/ModalActions';
import { useDispatch, useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    minWidth: 300,
    maxWidth: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const VerifyMobileAndEmail = (props) => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.openContactInformation);

    const handleClose = () => {
        dispatch(setContactInformationModal(false));
    };

    return (
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
                    Contact Information
                </Typography>

                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={2}
                    my={3}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <Typography ml={2} variant="subtitle2">
                        {'Enter the OTP received on the <<Phone>>'}
                    </Typography>
                    <Grid item xs={12} sm={8}>
                        <TextField fullWidth label="OTP" />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button variant="contained" color="primary">
                            Verify
                        </Button>
                    </Grid>
                </Grid>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={2}
                    my={3}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <Typography ml={2} variant="subtitle2">
                        {'Enter the OTP received on the <Email>'}
                    </Typography>
                    <Grid item xs={12} sm={8}>
                        <TextField fullWidth label="OTP" />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button variant="contained" color="primary">
                            Verify
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Modal>
    );
};

export default VerifyMobileAndEmail;
