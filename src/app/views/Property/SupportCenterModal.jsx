import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  Grid,
  IconButton,
  Typography,
  Snackbar,
  Alert,
  TextField,
  Box,
  MenuItem,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { setSupportCenterMOdal } from "app/redux/actions/ModalActions";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useEffect } from "react";
import {
  getTicketCategoryAction,
  getTicketSubcategoryAction,
  raiseNewTicketAction,
} from "app/redux/actions/SupportCenterActions";
import AddPropertyImages from "./components/AddPropertyImages";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minWidth: 300,
  maxWidth: 400,
  maxHeight: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const SupportCenterModal = ({ individualProperty }) => {
  const { UPDATE_TENANCY_PREFERENCE } = useSelector(
    (store) => store.loadingAndError.loader
  );

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Required"),
    subCategory: Yup.string().required("Required"),
    summary: Yup.string().required("Required"),
  });

  const [isSnakbarOpen, setSnackbarOpen] = useState(false);
  const [imageList, setImageList] = useState([]);
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.openSupportCenterModal);
  const { getTicketCategory, getTicketSubcategory } = useSelector(
    (store) => store.supportCenter
  );

  const currentUser = useSelector((state) => state.userProfile);

  //Remove when API for category and sub catgory is ready
  const subCategoryArray = [];

  const handleClose = () => {
    dispatch(setSupportCenterMOdal(false));
  };

  const handleSubmit = (values) => {
    dispatch(
      raiseNewTicketAction({
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        ticket_query: values.summary,
        ticket_type: 1,
        ticket_category: values.category,
        ticket_subcategory: 2,
        image: imageList,
      })
    );
    handleClose();
    setImageList([]);
  };

  useEffect(() => {
    dispatch(getTicketCategoryAction());
  }, []);

  return (
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
            mb={3}
            id="modal-modal-title"
            variant="h5"
            textAlign={"center"}
          >
            Create A New Ticket
          </Typography>
          <Formik
            initialValues={{
              category: "",
              subCategory: "",
              summary: "",
            }}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validationSchema={validationSchema}
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
              <Form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    maxWidth: 400,
                    mx: "auto",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        InputProps={{ sx: { height: 60 } }}
                        select
                        name="category"
                        label="Category"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={(e) => {
                          setFieldValue("category", e.target.value);
                        }}
                        onBlur={handleBlur}
                        helperText={touched.category && errors.category}
                        error={Boolean(touched.category && errors.category)}
                      >
                        {getTicketCategory?.map((item) => (
                          <MenuItem
                            key={item.category_type_id}
                            value={item.category_type_id}
                            onClick={() => {
                              dispatch(
                                getTicketSubcategoryAction({
                                  category_type: item.category_type_id,
                                })
                              );
                            }}
                          >
                            {" "}
                            {item.category_type_name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        InputProps={{ sx: { height: 60 } }}
                        select
                        name="subCategory"
                        label="Sub-Category"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={(e) => {
                          setFieldValue(
                            "subCategory",
                            e.target.value.toString()
                          );
                        }}
                        onBlur={handleBlur}
                        helperText={touched.subCategory && errors.subCategory}
                        error={Boolean(
                          touched.subCategory && errors.subCategory
                        )}
                      >
                        {getTicketSubcategory?.map((item) => (
                          <MenuItem
                            key={item.subcategory_type_id}
                            value={item.subcategory_type_id}
                          >
                            {" "}
                            {item.subcategory_type_name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid container justifyContent="center" item xs={12}>
                      <TextField
                        sx={{ mr: 1 }}
                        name="summary"
                        label="Summary"
                        variant="outlined"
                        size="small"
                        fullWidth
                        multiline
                        rows={5}
                        value={values.summary}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.summary && errors.summary}
                        error={Boolean(touched.summary && errors.summary)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <AddPropertyImages
                        label="Add Attachments: "
                        imageList={imageList}
                        setImageList={setImageList}
                      />
                    </Grid>
                    <Grid container justifyContent="center" item xs={12}>
                      <Button
                        sx={{ backgroundColor: "#DBA30B" }}
                        variant="contained"
                        color="success"
                        type="submit"
                      >
                        Create
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Card>
      </Modal>
      {UPDATE_TENANCY_PREFERENCE?.isLoading === false && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={isSnakbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          {UPDATE_TENANCY_PREFERENCE?.error === null ? (
            <Alert
              onClose={() => setSnackbarOpen(false)}
              severity="success"
              sx={{ width: "50vw" }}
            >
              Tenant preference updated successfully!
            </Alert>
          ) : (
            <Alert
              onClose={() => setSnackbarOpen(false)}
              severity="error"
              sx={{ width: "50vw" }}
            >
              Some error occured!
            </Alert>
          )}
        </Snackbar>
      )}
    </>
  );
};

export default SupportCenterModal;
