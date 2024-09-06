import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { H5 } from "app/components/Typography";
import {
  setDashboardVideoModal,
  setEditTenantPreferenceModal,
  setVideoTutorialModal,
} from "app/redux/actions/ModalActions";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTenancyPreferenceAction } from "app/redux/actions/PropertyActions";
import * as Yup from "yup";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minWidth: 300,
  maxWidth: 600,
  maxHeight: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const DashboardVideoModal = () => {
  const dispatch = useDispatch();
  const { flag, tutorialLink, src } = useSelector(
    (state) => state.modal.openDashboardVideoModal
  );

  const handleClose = () => {
    dispatch(
      setDashboardVideoModal({
        flag: false,
        tutorialLink: null,
        src: null,
      })
    );
  };
  const handleClick = () => {};

  return (
    <>
      <Modal
        open={flag}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <IconButton
            aria-label="close modal"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Grid
            marginTop={2}
            container
            justifyContent="center"
            alignItems="center"
          >
            {tutorialLink && (
              <iframe
                width={500}
                height={300}
                src={tutorialLink}
                title="Intel Humbles Nvidia"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            )}
            {src && (
              <Box component="img" src={src} alt="ERR" height={200}></Box>
            )}
          </Grid>
          <Grid
            marginTop={2}
            gap={3}
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            {src && (
              <Button variant="contained" onClick={handleClick}>
                <a href={src} target="blank" download>
                  Download
                </a>
              </Button>
            )}
            <Button variant="contained" onClick={() => handleClose()}>
              Close
            </Button>
          </Grid>
        </Card>
      </Modal>
    </>
  );
};

export default DashboardVideoModal;
