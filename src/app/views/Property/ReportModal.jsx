import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  Icon,
  IconButton,
  ImageList,
  MenuItem,
  Modal,
  TextField,
  styled,
} from "@mui/material";

import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import { FlexAlignCenter, FlexBox } from "app/components/FlexBox";
import {
  setReportModal,
  setUploadPropertyImagesModal,
} from "app/redux/actions/ModalActions";
import { convertHexToRGB } from "app/utils/utils";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { Clear, FlashAutoTwoTone, Send } from "@mui/icons-material";
import Compress from "compress.js";
import Loading from "app/components/MatxLoading";
import { sentTicketMessageAction } from "app/redux/actions/SupportCenterActions";
import JoditEditor from "jodit-react";
import { Form, Formik } from "formik";
import {
  addReportedListingAction,
  getReportTypeAction,
} from "app/redux/actions/PropertyActions";
import CustomSnackbar from "app/components/CustomSnackbar";

const DropZone = styled(FlexAlignCenter)(({ isDragActive, theme }) => ({
  height: 200,
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

const ReportModal = () => {
  const [content, setContent] = useState("");
  const [values, setValues] = useState("");

  const editor = useRef(null);

  const {
    searchedProperties,
    individualSearchedPropertiesDetails,
    pastSavedSearches,
    shortlistedProperties,
    getReportType,
    contactlisted,
  } = useSelector((store) => store.property);

  const dispatch = useDispatch();

  const { ADD_REPORTED_lISTING, ADD_LISTING_IMAGES, GET_REPORT_TYPE } =
    useSelector((store) => store.loadingAndError);

  const open = useSelector((state) => state.modal.openReportModal);
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;
  const [imageList, setImageList] = useState([]);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: "image/*",
  });

  const handleClose = () => {
    dispatch(setReportModal(false));
  };

  const handleUpload = () => {
    dispatch(
      
      addReportedListingAction({
        search_id:
          searchedProperties?.search_id ??
          individualSearchedPropertiesDetails?.user_source?.saved_search_id,
        shortlisted_search_id:
          shortlistedProperties?.[0]?.shortlisted_search_id ?? null,
        listing_id:
          individualSearchedPropertiesDetails?.listing_details?.listing_id,
        report_type: getReportType?.[0]?.type_id,
        saved_search: null,
        comment: content,
        report_attachements: imageList,
      })
    );

    handleClose();
    setImageList([]);
    setContent("");
  };

  const handleRemove = (index) => {
    const newImageList = imageList.filter((value, i) => i !== index);
    setImageList(newImageList);
  };

  const imgToBase64 = (img) => {
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(img);
    });
  };

  useEffect(() => {
    const compressor = new Compress();
    const b64_images = [];
    if (acceptedFiles.length > 0) {
      compressor
        .compress(acceptedFiles, {
          maxSizeKB: 120,
          useWebWorker: true,
        })
        .then((compressedFiles) => {
          compressedFiles.map((img, i) => {
            b64_images.push({
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
              document_id: i + 1,
            });
          });
          setImageList([...imageList, ...b64_images]);
        });
    }
  }, [acceptedFiles]);

  return (
    <>
      <Modal
        open={open}
        onClose={() => dispatch(setUploadPropertyImagesModal(false))}
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
            marginBottom={3}
          >
            Add a Report
          </Typography>

          <Formik
            sx={{ width: "100%" }}
            initialValues={{
              reportType: "",
            }}
            // onSubmit={handleSubmit}
            enableReinitialize={true}
            // validationSchema={validationSchema}
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
              setValues,
            }) => (
              <Form>
                <Box
                  sx={{
                    width: "100%",
                    mx: "auto",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      sx={{ marginBottom: "20px", width: "100%" }}
                    >
                      <Box sx={{ width: "100%" }}>
                        <TextField
                          select
                          sx={{ mr: 1 }}
                          name="reportType"
                          label="Report Type"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.reportType}
                          onChange={handleChange}
                          // helperText={touched.ReportType && errors.ReportType}
                          // error={Boolean(
                          //   touched.ReportType && errors.ReportType
                          // )}
                        >
                          {getReportType?.map((item) => (
                            <MenuItem key={item?.type_id} value={item?.type_id}>
                              {item?.type_name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>

          {ADD_LISTING_IMAGES?.isLoading === true ? (
            <Box
              height="200px"
              sx={{
                width: "200px",
                background: "white",
              }}
            >
              <Loading />
            </Box>
          ) : (
            <Grid container>
              <Grid item xs={12}>
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
                    {imageList.length ? (
                      <span>{imageList.length} images were selected</span>
                    ) : (
                      <span>Drop Your Report Attachment </span>
                    )}
                  </FlexBox>
                </DropZone>
                <Grid container spacing={2}>
                  {imageList.length > 0 &&
                    imageList.map((item, index) => {
                      return (
                        <>
                          <Grid key={index} item lg={6} md={4} sm={6} xs={12}>
                            <Card sx={{ position: "relative" }} fullWidth>
                              <CardMedia
                                component="img"
                                height="160"
                                image={item.b64_before_source + item.media_b64}
                              />
                              <Clear
                                onClick={() => handleRemove(index)}
                                sx={{
                                  position: "absolute",
                                  top: "0px",
                                  right: "0px",
                                  color: "gray",
                                  cursor: "pointer",
                                }}
                              ></Clear>
                            </Card>
                          </Grid>
                        </>
                      );
                    })}
                </Grid>

                {/* imageList.length > 0 && show the input box condition */}

                <Box sx={{ width: "100%", marginTop: "20px" }}>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    // config={{readOnly: false}}
                    config={{
                      readonly: false,
                      placeholder: "Start typing...",
                    }}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  />
                </Box>

                {/* <Box sx={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
                              <Button endIcon={<Send />} disabled={imageList.length === 0} onClick={handleUpload} variant="contained">
                                  Send   
                              </Button>
                          </Box> */}
                <Grid
                  container
                  justifyContent="center"
                  sx={{ marginTop: "23px" }}
                  item
                  xs={12}
                >
                  <Button
                    disabled={imageList.length === 0}
                    onClick={handleUpload}
                    sx={{ backgroundColor: "#FF3A45" }}
                    variant="contained"
                    color="success"
                  >
                    Add Report
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Card>
      </Modal>
    </>
  );
};

export default ReportModal;
