import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Card,
  Divider,
  Icon,
  MenuItem,
  Grid,
  styled,
  TextField,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import { FlexAlignCenter, FlexBox } from "app/components/FlexBox";
import { H4 } from "app/components/Typography";
import { convertHexToRGB } from "app/utils/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { countries } from "../ecommerce/Country";
import * as Yup from "yup";
import {
  addTenancyInclusionsAction,
  updateTenancyInclusionsAction,
} from "app/redux/actions/PropertyActions";
import { useDispatch, useSelector } from "react-redux";
import { Clear } from "@mui/icons-material";
import {
  setAddPropertyInclusionModal,
  setEditPropertyInclusionModal,
} from "app/redux/actions/ModalActions";

const InputField = styled(TextField)(() => ({ marginBottom: "16px" }));

const StyledCard = styled(Card)(({ theme }) => ({
  margin: "30px",
  padding: "24px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const DropZone = styled(FlexAlignCenter)(({ isDragActive, theme }) => ({
  height: 160,
  width: "100%",
  cursor: "pointer",
  borderRadius: "4px",
  marginBottom: "16px",
  transition: "all 350ms ease-in-out",
  border: `2px dashed rgba(${convertHexToRGB(
    theme.palette.text.primary
  )}, 0.3)`,
  "&:hover": {
    background: `rgb(${convertHexToRGB(
      theme.palette.text.primary
    )}, 0.2) !important`,
  },
  background: isDragActive ? "rgb(0, 0, 0, 0.15)" : "rgb(0, 0, 0, 0.01)",
}));

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

function EditPropertyInclusionModal({ individualProperty }) {
  const validationSchema = Yup.object().shape({
    inclusion_name: Yup.string().required("Required"),
    inclusion_description: Yup.string().required("Required"),
  });

  const { addTenancyInclusionLoading } = useSelector(
    (store) => store.loadingAndError
  );

  const propertyInclusionModalData = useSelector(
    (state) => state.modal.openEditPropertyInclusion
  );
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState(null);
  const { palette } = useTheme();
  const [showError, setShowError] = useState(false);
  const { custom } = useTheme();

  const handleClose = () => {
    dispatch(setEditPropertyInclusionModal(false));
  };

  const handleSubmit = async (values, { isSubmitting }) => {
    // if (
    //   values.some((value) => {
    //     return !(value.inclusion_name && value.inclusion_description);
    //   })
    // ) {
    //   setShowError(true);
    //   return;
    // }

    // const tenancyInclusions = values.map((value, i) => {
    //   return {
    //     tenancy_inclusion_id: value.tenancy_inclusion_id,
    //     inclusion_name: value.inclusion_name,
    //     inclusion_description: value.inclusion_description,
    //   };
    // });
    dispatch(
      updateTenancyInclusionsAction({
        tenancy_id:
          individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
        property_id: individualProperty?.basic_details?.property_id,
        tenancy_inclusions: [
          {
            tenancy_inclusion_id:
              propertyInclusionModalData?.inclusionModalData
                ?.tenancy_inclusion_id,
            inclusion_name: values.inclusion_name,
            inclusion_description: values.inclusion_description,
          },
        ],
      })
    );
    dispatch(setEditPropertyInclusionModal(false));
  };

  useEffect(() => {
    setInitialValues(propertyInclusionModalData?.inclusionModalData);
  }, [propertyInclusionModalData?.inclusionModalData]);

  return (
    <Modal
      open={propertyInclusionModalData.flag}
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
        <Typography id="modal-modal-title" variant="h5" textAlign={"center"}>
          Update property inclusions
        </Typography>
        <Box
          marginY={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <Box
            component="img"
            alt="green iguana"
            sx={{
              height: "50px",
              width: "100px",
              // borderRadius: "100%",
              objectFit: "cover",
            }}
            src={
              individualProperty?.basic_details?.file_url ||
              "http://34.36.127.104/tenantowner/twitter_header_photo_1.png"
            }
          />
          <Typography textAlign={"center"}>
            {individualProperty?.basic_details?.property_name}
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setSubmitting,
            setFieldValue,
            dirty,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  height={300}
                  width={"100%"}
                  style={{ objectFit: "cover", marginBottom: 20 }}
                  src={
                    propertyInclusionModalData?.inclusionModalData?.media_url
                  }
                />

                <InputField
                  name="inclusion_name"
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Name"
                  value={values?.inclusion_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.inclusion_name && errors.inclusion_name}
                  error={Boolean(
                    touched.inclusion_name && errors.inclusion_name
                  )}
                  //   onChange={(el) => {
                  //     showError === true && setShowError(false);
                  //     setInitialValues((prevState) => {
                  //       const newState = [...prevState];
                  //       newState[index] = {
                  //         ...newState[index],
                  //         inclusion_name: el.target.value,
                  //       };
                  //       return newState;
                  //     });
                  //   }}
                />
                <InputField
                  name="inclusion_description"
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Description"
                  value={values?.inclusion_description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    touched.inclusion_description &&
                    errors.inclusion_description
                  }
                  error={Boolean(
                    touched.inclusion_description &&
                      errors.inclusion_description
                  )}
                  //   onChange={(el) => {
                  //     showError === true && setShowError(false);
                  //     setInitialValues((prevState) => {
                  //       const newState = [...prevState];
                  //       newState[index] = {
                  //         ...newState[index],
                  //         inclusion_description: el.target.value,
                  //       };
                  //       return newState;
                  //     });
                  //   }}
                />

                <CardActions></CardActions>
              </Box>
              {showError === true && (
                <Typography
                  textAlign="center"
                  variant="body1"
                  sx={{ color: custom.c9, marginTop: "20px" }}
                >
                  Please specify name and description for each inclusion.
                </Typography>
              )}

              <Grid container justifyContent="center" sx={{ mt: 5 }}>
                <Button
                  disabled={!dirty}
                  size="small"
                  variant="contained"
                  type="submit"
                >
                  Update
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Card>
    </Modal>
  );
}

export default EditPropertyInclusionModal;
