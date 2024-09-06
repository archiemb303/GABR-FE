import Loading from "app/components/MatxLoading";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
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
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/system";
import {
  getAllCitiesByStateAction,
  getAllStatesByCountryAction,
} from "app/redux/actions/LocationActions";
import { setUpdateUserProfileModal } from "app/redux/actions/ModalActions";
import {
  deactivateTenancyAction,
  getpayloadAction,
  updateBasicPropertyDetailsAction,
} from "app/redux/actions/PropertyActions";
import { Form, Formik } from "formik";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { propertyTypeItems } from "./items/propertyTypes";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { updateUserProfileAction } from "app/redux/actions/UserProfileActions";

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

const UpdateUserProfileModal = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.openUpdateUserProfile);
  const { individualProperty, newTenancy, addTenancyParties } = useSelector(
    (state) => state.property
  );
  const { prelogin, userProfile } = useSelector((state) => state);

  // const { deactivateTenancyLoading } = useSelector(
  //     (store) => store.loadingAndError
  // );

  const handleClose = () => {
    dispatch(setUpdateUserProfileModal(false));
  };

  const handleOpen = () => {
    dispatch(setUpdateUserProfileModal(true));
  };

  const handleSubmit = () => {
    const params = {
      user_profile_id: prelogin.userProfileId,
      updated_user_fname: addTenancyParties?.first_name,
      updated_user_lname: addTenancyParties?.last_name,
      updated_user_email: addTenancyParties?.email_id,
      updated_user_phone: addTenancyParties?.phone_no,
      updated_user_dob: addTenancyParties?.dob,
      profile_pic: "",
    };

    dispatch(updateUserProfileAction(params));
    handleClose();
  };

  return (
    <>
      {false ? (
        <Box sx={{ height: 100 }}>
          <Loading />
        </Box>
      ) : (
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
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
              >
                <CloseIcon />
              </IconButton>
              <Typography
                id="modal-modal-title"
                variant="h5"
                textAlign={"center"}
              >
                We noticed that you have entered different name while creating
                the agreement do you wish to update your current profile name
                too ?
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  No
                </Button>
              </Box>
            </Card>
          </Modal>
        </>
      )}
    </>
  );
};

export default UpdateUserProfileModal;
