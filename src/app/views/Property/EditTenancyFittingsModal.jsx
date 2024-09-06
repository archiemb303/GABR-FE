import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { setEditTenancyFittingsModal } from "app/redux/actions/ModalActions";
import { addUpdateTenancyFittingsAction } from "app/redux/actions/PropertyActions";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
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
const EditTenancyFittingsModal = ({ individualProperty }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.openEditTenancyFittings);
  const validationSchema = Yup.object().shape({
    ceilingFan: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    standyFan: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    ledTubelight: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    cflTubelight: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    flourescentTubelight: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    ledBulb: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    cflBulb: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    incandescentBulb: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    bulbFancy: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    acTwoHalf: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    acTwo: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    acOneHalf: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    doorCurtain: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    windowCurtain: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    geyser: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    solarWaterHeater: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    kitchenHub: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    kitchenChimney: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    kitchenExhaust: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
    bathroomExhaust: Yup.string().matches(
      /^[0-9][0-9]*$/,
      "Only positive numbers are allowed"
    ),
  });
  const formSchema = {
    ceilingFan: "",
    standyFan: "",
    ledTubelight: "",
    cflTubelight: "",
    flourescentTubelight: "",
    ledBulb: "",
    cflBulb: "",
    incandescentBulb: "",
    bulbFancy: "",
    acTwoHalf: "",
    acTwo: "",
    acOneHalf: "",
    doorCurtain: "",
    windowCurtain: "",
    geyser: "",
    solarWaterHeater: "",
    kitchenHub: "",
    kitchenChimney: "",
    kitchenExhaust: "",
    bathroomExhaust: "",
  };
  const [initialValues, setInitialValues] = useState(formSchema);
  const handleSubmit = async (values, { isSubmitting }) => {
    dispatch(
      addUpdateTenancyFittingsAction({
        tenancy_id:
          individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
        property_id: individualProperty?.basic_details?.property_id,
        tenancy_fittings: [
          {
            fitting_id: 1,
            fitting_count: values.ceilingFan
              ? new String(values.ceilingFan)
              : "0",
          },
          {
            fitting_id: 2,
            fitting_count: values.standyFan
              ? new String(values.standyFan)
              : "0",
          },
          {
            fitting_id: 3,
            fitting_count: values.ledTubelight
              ? new String(values.ledTubelight)
              : "0",
          },
          {
            fitting_id: 4,
            fitting_count: values.cflTubelight
              ? new String(values.cflTubelight)
              : "0",
          },
          {
            fitting_id: 5,
            fitting_count: values.flourescentTubelight
              ? new String(values.flourescentTubelight)
              : "0",
          },
          {
            fitting_id: 6,
            fitting_count: values.ledBulb ? new String(values.ledBulb) : "0",
          },
          {
            fitting_id: 7,
            fitting_count: values.cflBulb ? new String(values.cflBulb) : "0",
          },
          {
            fitting_id: 8,
            fitting_count: values.incandescentBulb
              ? new String(values.incandescentBulb)
              : "0",
          },
          {
            fitting_id: 9,
            fitting_count: values.bulbFancy
              ? new String(values.bulbFancy)
              : "0",
          },
          {
            fitting_id: 10,
            fitting_count: values.acTwoHalf
              ? new String(values.acTwoHalf)
              : "0",
          },
          {
            fitting_id: 11,
            fitting_count: values.acTwo ? new String(values.acTwo) : "0",
          },
          {
            fitting_id: 12,
            fitting_count: values.acOneHalf
              ? new String(values.acOneHalf)
              : "0",
          },
          {
            fitting_id: 13,
            fitting_count: values.doorCurtain
              ? new String(values.doorCurtain)
              : "0",
          },
          {
            fitting_id: 14,
            fitting_count: values.windowCurtain
              ? new String(values.windowCurtain)
              : "0",
          },
          {
            fitting_id: 15,
            fitting_count: values.geyser ? new String(values.geyser) : "0",
          },
          {
            fitting_id: 16,
            fitting_count: values.solarWaterHeater
              ? new String(values.solarWaterHeater)
              : "0",
          },
          {
            fitting_id: 17,
            fitting_count: values.kitchenHub
              ? new String(values.kitchenHub)
              : "0",
          },
          {
            fitting_id: 18,
            fitting_count: values.kitchenChimney
              ? new String(values.kitchenChimney)
              : "0",
          },
          {
            fitting_id: 19,
            fitting_count: values.kitchenExhaust
              ? new String(values.kitchenExhaust)
              : "0",
          },
          {
            fitting_id: 20,
            fitting_count: values.bathroomExhaust
              ? new String(values.bathroomExhaust)
              : "0",
          },
        ],
      })
    );
    handleClose();
  };
  const handleClose = () => {
    dispatch(setEditTenancyFittingsModal(false));
  };
  useEffect(() => {
    if (individualProperty?.tenancy_details?.tenancy_fittings?.length > 0) {
      setInitialValues({
        ceilingFan:
          individualProperty?.tenancy_details?.tenancy_fittings?.[0]?.fitting_count.toString(),
        standyFan:
          individualProperty?.tenancy_details?.tenancy_fittings?.[1]?.fitting_count.toString(),
        ledTubelight:
          individualProperty?.tenancy_details?.tenancy_fittings?.[2]?.fitting_count.toString(),
        cflTubelight:
          individualProperty?.tenancy_details?.tenancy_fittings?.[3]?.fitting_count.toString(),
        flourescentTubelight:
          individualProperty?.tenancy_details?.tenancy_fittings?.[4]?.fitting_count.toString(),
        ledBulb:
          individualProperty?.tenancy_details?.tenancy_fittings?.[5]?.fitting_count.toString(),
        cflBulb:
          individualProperty?.tenancy_details?.tenancy_fittings?.[6]?.fitting_count.toString(),
        incandescentBulb:
          individualProperty?.tenancy_details?.tenancy_fittings?.[7]?.fitting_count.toString(),
        bulbFancy:
          individualProperty?.tenancy_details?.tenancy_fittings?.[8]?.fitting_count.toString(),
        acTwoHalf:
          individualProperty?.tenancy_details?.tenancy_fittings?.[9]?.fitting_count.toString(),
        acTwo:
          individualProperty?.tenancy_details?.tenancy_fittings?.[10]?.fitting_count.toString(),
        acOneHalf:
          individualProperty?.tenancy_details?.tenancy_fittings?.[11]?.fitting_count.toString(),
        doorCurtain:
          individualProperty?.tenancy_details?.tenancy_fittings?.[12]?.fitting_count.toString(),
        windowCurtain:
          individualProperty?.tenancy_details?.tenancy_fittings?.[13]?.fitting_count.toString(),
        geyser:
          individualProperty?.tenancy_details?.tenancy_fittings?.[14]?.fitting_count.toString(),
        solarWaterHeater:
          individualProperty?.tenancy_details?.tenancy_fittings?.[15]?.fitting_count.toString(),
        kitchenHub:
          individualProperty?.tenancy_details?.tenancy_fittings?.[16]?.fitting_count.toString(),
        kitchenChimney:
          individualProperty?.tenancy_details?.tenancy_fittings?.[17]?.fitting_count.toString(),
        kitchenExhaust:
          individualProperty?.tenancy_details?.tenancy_fittings?.[18]?.fitting_count.toString(),
        bathroomExhaust:
          individualProperty?.tenancy_details?.tenancy_fittings?.[19]?.fitting_count.toString(),
      });
    }
  }, [individualProperty]);
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
          Edit tenancy fittings
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
                  my: 4,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="ceilingFan"
                      label="Ceiling Fans"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.ceilingFan}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.ceilingFan && errors.ceilingFan}
                      error={Boolean(touched.ceilingFan && errors.ceilingFan)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="standyFan"
                      label="Standy/Table Fan"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.standyFan}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.standyFan && errors.standyFan}
                      error={Boolean(touched.standyFan && errors.standyFan)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="ledTubelight"
                      label="Tubelights - LED"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.ledTubelight}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.ledTubelight && errors.ledTubelight}
                      error={Boolean(
                        touched.ledTubelight && errors.ledTubelight
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="cflTubelight"
                      label="Tubelights - CFL"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.cflTubelight}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.cflTubelight && errors.cflTubelight}
                      error={Boolean(
                        touched.cflTubelight && errors.cflTubelight
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="flourescentTubelight"
                      label="Tubelights - Flourescent"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.flourescentTubelight}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.flourescentTubelight &&
                        errors.flourescentTubelight
                      }
                      error={Boolean(
                        touched.flourescentTubelight &&
                          errors.flourescentTubelight
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="ledBulb"
                      label="Light Bulbs - LED"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.ledBulb}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.ledBulb && errors.ledBulb}
                      error={Boolean(touched.ledBulb && errors.ledBulb)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="cflBulb"
                      label="Light Bulbs - CFL"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.cflBulb}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.cflBulb && errors.cflBulb}
                      error={Boolean(touched.cflBulb && errors.cflBulb)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="incandescentBulb"
                      label="Light Bulbs - Incandescent"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.incandescentBulb}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.incandescentBulb && errors.incandescentBulb
                      }
                      error={Boolean(
                        touched.incandescentBulb && errors.incandescentBulb
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="bulbFancy"
                      label="Light Bulbs - fancy"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.bulbFancy}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.bulbFancy && errors.bulbFancy}
                      error={Boolean(touched.bulbFancy && errors.bulbFancy)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="acTwoHalf"
                      label="AC - 2.5 tons"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.acTwoHalf}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.acTwoHalf && errors.acTwoHalf}
                      error={Boolean(touched.acTwoHalf && errors.acTwoHalf)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="acTwo"
                      label="AC - 2 tons"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.acTwo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.acTwo && errors.acTwo}
                      error={Boolean(touched.acTwo && errors.acTwo)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="acOneHalf"
                      label="AC - 1.5 tons"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.acOneHalf}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.acOneHalf && errors.acOneHalf}
                      error={Boolean(touched.acOneHalf && errors.acOneHalf)}
                    />
                  </Grid>
                  {/* <Grid
                                        item
                                        xs={6}
                                    >
                                        <TextField
                                            name='doorCurtain'
                                            label='Curtains - Doors'
                                            variant="outlined"
                                            size="small"
                                            type='number'
                                            fullWidth
                                            value={values.doorCurtain}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={
                                                touched.doorCurtain &&
                                                errors.doorCurtain
                                            }
                                            error={Boolean(
                                                touched.doorCurtain &&
                                                errors.doorCurtain
                                            )}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <TextField
                                            name='windowCurtain'
                                            label='Curtains - Windows'
                                            variant="outlined"
                                            size="small"
                                            type='number'
                                            fullWidth
                                            value={values.windowCurtain}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={
                                                touched.windowCurtain &&
                                                errors.windowCurtain
                                            }
                                            error={Boolean(
                                                touched.windowCurtain &&
                                                errors.windowCurtain
                                            )}
                                        />
                                    </Grid> */}
                  <Grid item xs={6}>
                    <TextField
                      name="geyser"
                      label="Geysers"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.geyser}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.geyser && errors.geyser}
                      error={Boolean(touched.geyser && errors.geyser)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="solarWaterHeater"
                      label="Solar Water Heater"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.solarWaterHeater}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.solarWaterHeater && errors.solarWaterHeater
                      }
                      error={Boolean(
                        touched.solarWaterHeater && errors.solarWaterHeater
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="kitchenHub"
                      label="Kitchen Hub/Stove"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.kitchenHub}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.kitchenHub && errors.kitchenHub}
                      error={Boolean(touched.kitchenHub && errors.kitchenHub)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="kitchenChimney"
                      label="Kitchen Chimney"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.kitchenChimney}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.kitchenChimney && errors.kitchenChimney
                      }
                      error={Boolean(
                        touched.kitchenChimney && errors.kitchenChimney
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="kitchenExhaust"
                      label="Exhaust Fan - Kitchen"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.kitchenExhaust}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.kitchenExhaust && errors.kitchenExhaust
                      }
                      error={Boolean(
                        touched.kitchenExhaust && errors.kitchenExhaust
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="bathroomExhaust"
                      label="Exhaust Fan - Bathroom"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={values.bathroomExhaust}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.bathroomExhaust && errors.bathroomExhaust
                      }
                      error={Boolean(
                        touched.bathroomExhaust && errors.bathroomExhaust
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    marginTop={2}
                  >
                    <Button variant="contained" color="primary" type="submit">
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </Modal>
  );
};
export default EditTenancyFittingsModal;
