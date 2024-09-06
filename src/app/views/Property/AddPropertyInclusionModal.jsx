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
  Container,
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
import * as Yup from "yup";
import Compress from "compress.js";

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

function AddPropertyInclusionModal({ individualProperty }) {
  const { addTenancyInclusionLoading } = useSelector(
    (store) => store.loadingAndError
  );

  const open = useSelector((state) => state.modal.openAddPropertyInclusion);
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState([]);
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: "image/*",
  });

  const { custom } = useTheme();

  const [showError, setShowError] = useState(false);

  const handleClose = () => {
    dispatch(setAddPropertyInclusionModal(false));
  };

  const handleSubmit = async (values, { isSubmitting }) => {
    if (
      initialValues.some((value) => {
        return !(value.inclusion_name && value.inclusion_description);
      })
    ) {
      setShowError(true);
      return;
    }
    dispatch(
      addTenancyInclusionsAction({
        tenancy_id:
          individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
        property_id: individualProperty?.basic_details?.property_id,
        images: initialValues,
      })
    );
    dispatch(setAddPropertyInclusionModal(false));
    setInitialValues([]);
  };

  const imgToBase64 = (img) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(img);
    });

  const handleRemove = (index) => {
    const newSchema = initialValues.filter((value, i) => i !== index);
    setInitialValues(newSchema);
  };

  useEffect(() => {
    const compressor = new Compress();
    const formSchema = [];
    if (acceptedFiles.length > 0) {
      compressor
        .compress(acceptedFiles, {
          maxSizeKB: 120,
          useWebWorker: true,
        })
        .then((compressedFiles) => {
          compressedFiles.map((img, i) => {
            formSchema.push({
              media_b64: img.data,
              b64_before_source: img.prefix,
              file_name: acceptedFiles[i].name.substring(
                0,
                acceptedFiles[i].name.lastIndexOf(".")
              ),
              file_extension: acceptedFiles[i].name.substring(
                acceptedFiles[i].name.lastIndexOf("."),
                acceptedFiles[i].name.length
              ),
              document_type: acceptedFiles[i].type.substring(
                0,
                acceptedFiles[i].type.indexOf("/")
              ),
              inclusion_name: "",
              inclusion_description: "",
            });
          });
          setInitialValues([...initialValues, ...formSchema]);
        });
    }
  }, [acceptedFiles]);

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
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-title" variant="h5" textAlign={"center"}>
          Add property inclusions
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
          }) => (
            <Form onSubmit={handleSubmit}>
              <DropZone {...getRootProps()}>
                <input {...getInputProps()} />
                <FlexBox
                  alignItems="center"
                  flexDirection="column"
                  sx={{ m: 1 }}
                >
                  <Icon sx={{ color: textMuted, fontSize: "48px" }}>
                    publish
                  </Icon>
                  {values.length ? (
                    <span>{values.length} images were selected</span>
                  ) : (
                    <span>Drop property images</span>
                  )}
                </FlexBox>
              </DropZone>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <Grid container spacing={2}>
                  {values.map((item, index) => {
                    return (
                      <Grid key={index} item lg={6} md={4} sm={6} xs={12}>
                        <Card sx={{ position: "relative" }} fullWidth>
                          <CardMedia
                            component="img"
                            height="160"
                            image={item.b64_before_source + item.media_b64}
                            alt={item.file_name}
                          />
                          <Clear
                            onClick={() => handleRemove(index)}
                            sx={{
                              position: "absolute",
                              top: "0px",
                              right: "0px",
                              color: "gray",
                            }}
                          ></Clear>
                          <CardContent>
                            <InputField
                              name="inclusion_name"
                              fullWidth
                              size="small"
                              variant="outlined"
                              label="Name"
                              onChange={(el) => {
                                showError === true && setShowError(false);
                                setInitialValues((prevState) => {
                                  const newState = [...prevState];
                                  newState[index] = {
                                    ...newState[index],
                                    inclusion_name: el.target.value,
                                  };
                                  return newState;
                                });
                              }}
                            />
                            <InputField
                              name="inclusion_description"
                              fullWidth
                              size="small"
                              variant="outlined"
                              label="Description"
                              onChange={(el) => {
                                showError === true && setShowError(false);
                                setInitialValues((prevState) => {
                                  const newState = [...prevState];
                                  newState[index] = {
                                    ...newState[index],
                                    inclusion_description: el.target.value,
                                  };
                                  return newState;
                                });
                              }}
                            />
                          </CardContent>
                          <CardActions></CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
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

              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  disabled={values.length === 0}
                  sx={{ mr: 2 }}
                  size="small"
                  variant="contained"
                  type="submit"
                >
                  Upload and Save
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </Modal>
  );
}

export default AddPropertyInclusionModal;
