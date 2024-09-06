import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Icon,
  IconButton,
  ImageList,
  ImageListItem,
  Modal,
  styled,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import { FlexAlignCenter, FlexBox } from "app/components/FlexBox";
import {
  setUpdatePropertyPicModal,
  setUploadPropertyImagesModal,
} from "app/redux/actions/ModalActions";
import { convertHexToRGB } from "app/utils/utils";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { Clear } from "@mui/icons-material";
import {
  addListingImagesAction,
  updateOnlyPropertyProfilePicAction,
  updatePropertyProfilePicAction,
} from "app/redux/actions/PropertyActions";
import Compress from "compress.js";
import Loading from "app/components/MatxLoading";

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

const UpdatePropertyPic = () => {
  const { individualProperty } = useSelector((state) => state.property);

  const { addListingImages } = useSelector((state) => state.property);

  const dispatch = useDispatch();

  const { addTenancyInclusionLoading, ADD_LISTING_IMAGES } = useSelector(
    (store) => store.loadingAndError
  );

  const open = useSelector((state) => state.modal.openUpdatePropertyPic);
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;
  const [imageList, setImageList] = useState([]);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    multiple: false,
  });

  const handleUpload = () => {
    dispatch(
      updateOnlyPropertyProfilePicAction({
        property_id: individualProperty?.basic_details?.property_id,
        image: imageList[0],
      })
    );
    // handleSetAsPropertyImg(imageList[0].file_id_id);

    dispatch(setUpdatePropertyPicModal(false));
    setImageList([]);
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
            console.log(img);
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
            });
          });
          setImageList([...imageList, ...b64_images]);
        });
    }
  }, [acceptedFiles]);

  const handleSetAsPropertyImg = (fileId) => {
    dispatch(
      updatePropertyProfilePicAction({
        property_id: individualProperty?.basic_details?.property_id,
        file_id: fileId,
      })
    );
    // setSnackbarOpen(true);
  };
  return (
    <Modal
      open={open}
      onClose={() => dispatch(setUpdatePropertyPicModal(false))}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <IconButton
          aria-label="close modal"
          onClick={() => dispatch(setUpdatePropertyPicModal(false))}
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
          Add property images
        </Typography>
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
              {imageList.length === 1 || (
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
                      <span>Drop property images</span>
                    )}
                  </FlexBox>
                </DropZone>
              )}
              <Grid container spacing={2}>
                {imageList.length > 0 &&
                  imageList.map((item, index) => {
                    return (
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
                    );
                  })}
              </Grid>

              <Box
                sx={{
                  marginTop: "50px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  disabled={imageList.length === 0}
                  onClick={handleUpload}
                  variant="contained"
                >
                  Upload
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Card>
    </Modal>
  );
};

export default UpdatePropertyPic;
