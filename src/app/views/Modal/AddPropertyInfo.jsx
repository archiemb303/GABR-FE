import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import {
    Card,
    Grid,
    TextField,
    IconButton,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@mui/material';
import { stubFalse } from 'lodash';
import { setAddPropertyInfoModal } from 'app/redux/actions/ModalActions';
import { useDispatch, useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    minWidth: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const AddPropertyInfo = (props) => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.openAddPropertyInfo);

    const handleClose = () => {
        dispatch(setAddPropertyInfoModal(false));
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
                {/* <Typography id="modal-modal-title" variant="h5" textAlign={'center'}>
                    Contact Information
                </Typography> */}

                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={1}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <Grid item xs={12} md={4}>
                        <FormLabel
                            sx={{ color: 'text.primary' }}
                            id="demo-row-radio-buttons-group-label"
                        >
                            Are you the owner of the property?
                        </FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormLabel
                            sx={{ color: 'text.primary' }}
                            id="demo-row-radio-buttons-group-label"
                        >
                            Are you an agent?
                        </FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormLabel
                            sx={{ color: 'text.primary' }}
                            id="demo-row-radio-buttons-group-label"
                        >
                            What do you intend to do?
                        </FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="Post an ad to get tenants and sign rent agreement"
                            />
                            <FormControlLabel
                                value="2"
                                control={<Radio />}
                                label="Tenants have aready been identified, I just want to create and sign a rental agreement"
                            />
                            <FormControlLabel
                                value="3"
                                control={<Radio />}
                                label="Post an ad to get tenants. Will think about rental agreement later"
                            />
                        </RadioGroup>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    mt={2}
                    display="flex"
                    justifyContent="center"
                    alignItems={'baseline'}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ textTransform: 'uppercase' }}
                    >
                        Proceed
                    </Button>
                </Grid>
            </Card>
        </Modal>
    );
};

export default AddPropertyInfo;
