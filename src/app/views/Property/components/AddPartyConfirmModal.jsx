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
  FormHelperText,
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
import {
  setEditPropertyBasicDetailsModal,
  setCreateNewTenancyModal,
  setAddPropertyPartiesModal,
  setUpdateUserProfileModal,
  setAddPartyConfirmModal,
  setAddUserPartyModal,
} from "app/redux/actions/ModalActions";
import {
  createNewTenancyAction,
  getpayloadAction,
  updateBasicPropertyDetailsAction,
} from "app/redux/actions/PropertyActions";
import { Form, Formik } from "formik";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
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

const AddPartyConfirmModal = ({ addOwnerasParty, setAddingParty }) => {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.modal.openAddPartyConfirm);
  const { individualProperty, newTenancy } = useSelector(
    (state) => state.property
  );
  const { GET_ALL_CITIES_BY_STATE, CREATE_NEW_TENANCY } = useSelector(
    (state) => state.loadingAndError.loader
  );
  const { userProfile, preloginState } = useSelector((state) => state);
  const isAccountCreatorRef = useRef();
  const location = useSelector((state) => state.location);
  const [initialValues, setInitialValues] = useState(null);
  const fNameRegExp = /^[a-zA-Z ]+$/;
  const lNameRegExp = /^[a-zA-Z ]+$/;
  const phoneRegExp = /^[6-9]\d{9}$/gi;

  const validationSchema = Yup.object().shape({
    property_id: Yup.string().required("Property Id is required field"),
    first_name: Yup.string()
      .required("First Name is required field")
      .matches(fNameRegExp, "No special characters and numbers are allowed."),
    last_name: Yup.string()
      .required("Last Name is required field")
      .matches(lNameRegExp, "No special characters and numbers are allowed."),
    party_type_id: Yup.string().required("Party Type is required field"),
    address_line_1: Yup.string().required("Address Line 1 is required field"),
    // .max(30, "Address Line 1 should be between 0 to 30 characters"),
    address_line_2: Yup.string().required("Address Line 2 is required field"),
    // .max(15, "Address Line 2 should be between 0 to 15 characters"),
    address_line_3: Yup.string().required("Address Line 3 is required field"),
    // .max(10, "Address Line 3 should be between 0 to 10 characters"),
    city_id: Yup.string().required("City is required field"),
    pincode: Yup.string()
      .required("Pincode is required field")
      .typeError("Pincode should only contain digits")
      .matches(
        /^[1-9][0-9]{5}$/,
        "Pincode should contain exactly 6 digits and should not start with 0"
      ),
    email_id: Yup.string().required("Email is required field"),
    phone_no: Yup.string()
      .required("Enter a 10-digit phone number without country code")
      .matches(
        phoneRegExp,
        "Enter valid a 10-digit phone number without country code."
      ),
    phone_code: Yup.number().required("Phone Code is required field"),
    dob: Yup.date()
      .required("Date Of Birth is required field")
      .typeError("Enter Date in Correct Format - MMMM DD,YY"),
    isAccountCreator: Yup.boolean().required("Required"),
  });

  const propertyPartyTypeItems = [
    {
      name: "Owner",
      code: 1,
    },
    {
      name: "Tenant",
      code: 2,
    },
    {
      name: "Agency",
      code: 3,
    },
    {
      name: "Agency Member",
      code: 4,
    },
  ];

  //   const setFormInitialValues = () => {
  //     setInitialValues({
  //       property_id: individualProperty?.basic_details?.property_id,
  //       first_name: "",
  //       last_name: "",
  //       address_line_1: "",
  //       address_line_2: "",
  //       address_line_3: "",
  //       state_id: "",
  //       city_id: "",
  //       pincode: "",
  //       email_id: userProfile.email_id,
  //       phone_no: "",
  //       phone_code: 91,
  //       party_type_id: "",
  //       dob: "",
  //       party_type_id: individualProperty.basic_details.property_creator,
  //       isAccountCreator: "",
  //     });
  //   };

  //   useEffect(() => {
  //     setFormInitialValues();
  //   }, [individualProperty]);
  // useEffect(() => {
  //   // console.log("Inside UseEffect...");
  //   // console.log(individualProperty?.tenancy_details?.party_details.length);
  //   // if (individualProperty?.tenancy_details?.party_details.length === 1)
  //   //   dispatch(setAddPropertyPartiesModal(true));
  // }, [individualProperty]);

  const handleClose = () => {
    dispatch(setAddPartyConfirmModal(false));
    // dispatch(setAddPropertyPartiesModal(true));
    // setFormInitialValues();
  };

  const handleOpen = () => {
    dispatch(setCreateNewTenancyModal(true));
  };

  const handleSubmit = async (values, { isSubmitting }) => {
    const params = {
      property_id: values.property_id,
      first_name: values.first_name,
      last_name: values.last_name,
      address_line_1: values.address_line_1,
      address_line_2: values.address_line_2,
      address_line_3: values.address_line_3,
      city_id: values.city_id,
      party_type: values.party_type_id,
      state_id: values.state_id,
      pincode: values.pincode.toString(),
      email_id: values.email_id,
      phone_no: values.phone_no.toString(),
      phone_code: 91,
      dob:
        values.dob.getFullYear() +
        "-" +
        (values.dob.getMonth() + 1) +
        "-" +
        values.dob.getDate(),
    };
    // dispatch(createNewTenancyAction(params));
    dispatch(setAddPropertyPartiesModal(true));
    handleClose();
  };

  //   useEffect(() => {
  //     if (newTenancy && isAccountCreatorRef.current) {
  //       if (
  //         CREATE_NEW_TENANCY?.isLoading === false &&
  //         (newTenancy?.tenancy_party_details[0]?.first_name !==
  //           userProfile?.first_name ||
  //           newTenancy?.tenancy_party_details[0]?.last_name !==
  //             userProfile?.last_name)
  //       ) {
  //         dispatch(setUpdateUserProfileModal(true));
  //       }
  //     }
  //   }, [newTenancy]);

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
                Are you adding yourself as a party?
              </Typography>
              {/* <Typography
                id="modal-modal-title"
                variant="body1"
                sx={{ textAlign: "center", mt: 2 }}
              >
                Congratulations for finding your new tenants/house. The process
                of generating and signing rental agreement will begin.
              </Typography> */}
              {/* <Typography
                id="modal-modal-title"
                variant="body1"
                sx={{ textAlign: "center", mt: 2 }}
              >
                Congratulations for finding your new tenants/house. The ad
                listing pertaining to this property will now be taken down, and
                process of generating and signing rental agreement will begin.
              </Typography> */}

              {/* <Typography
                variant="h6"
                sx={{
                  mt: 4,
                  mb: 2,
                }}
              >
                Please fill the form to proceed
              </Typography> */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setAddingParty(true);
                    handleClose();
                    // dispatch(setAddUserPartyModal(true));
                    dispatch(setAddPropertyPartiesModal(true));
                  }}
                >
                  I am adding myself as a party
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setAddingParty(false);
                    handleClose();
                    dispatch(setAddPropertyPartiesModal(true));
                  }}
                >
                  I am adding someone else as a party
                </Button>
              </Box>
            </Card>
          </Modal>
        </>
      )}
    </>
  );
};

export default AddPartyConfirmModal;
