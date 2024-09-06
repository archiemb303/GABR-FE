import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { countries } from "../ecommerce/Country";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Box,
  Button,
  Card,
  Divider,
  Fab,
  Grid,
  Icon,
  Input,
  styled,
  TextField,
  MenuItem,
  Typography,
  useTheme,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import { H3, H4 } from "app/components/Typography";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: "30px",
  padding: "24px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const InputField = styled(TextField)(() => ({ marginBottom: "16px" }));

const GridContent = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  maxWidth: 400,
  textAlign: "center",
  transition: "all 0.3s ease",
  padding: "24px !important",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  margin: "0 auto",
  "&:hover": { boxShadow: themeShadows[12] },
  [theme.breakpoints.down("sm")]: { padding: "16px !important" },
}));

const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const FabIcon = styled(Fab)(() => ({
  textTransform: "capitalize",
  "& .icon": { marginRight: "8px" },
}));

const buttonGroupSwitch1 = (choice) => {
  switch (choice) {
    case "withdraw-invite":
      return (
        <Button
          sx={{ marginRight: 1, my: 1 }}
          color="primary"
          variant="contained"
        >
          Withdraw Invite
        </Button>
      );
    case "reject-invite":
      return (
        <Button
          sx={{ marginRight: 1, my: 1 }}
          color="primary"
          variant="contained"
        >
          Reject Invite
        </Button>
      );

    case "accept-invite":
      return (
        <Button
          sx={{ marginRight: 1, my: 1 }}
          color="primary"
          variant="contained"
        >
          Accept Invite
        </Button>
      );
    default:
      return (
        <Button
          sx={{ marginRight: 1, my: 1 }}
          color="primary"
          variant="contained"
        >
          Invite
        </Button>
      );
  }
};
// const buttonGroupSwitch2 = (choice) => {
//     switch (choice) {
//         case 'reject-invite':
//             return (
//                 <Button sx={{ marginRight: 1, my: 1 }} color="primary" variant="contained">
//                     Reject Invite
//                 </Button>
//             );

//         default:
//             return (
//                 <Button sx={{ marginRight: 1, my: 1 }} color="primary" variant="contained">
//                     Accept Invite
//                 </Button>
//             );
//     }
// };

const AddParty = () => {
  const partySchema = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    dob: new Date(),
    partyType: "tenant",
    documents: [
      { type: "", file: "" },
      { type: "", file: "" },
    ],
  };
  const { palette } = useTheme();
  const [allPartiesData, setAllPartiesData] = useState({
    owner: { ...partySchema, partyType: "owner" },
    tenant: { ...partySchema, partyType: "primary-tenant" },
    additional: [partySchema],
  });

  const OwnerComponent = (props) => {
    const { schema } = props;
    const initialValuesOwner = schema;

    const handleUpdateOwner = async (values, { isSubmitting }) => {
      console.log(values);
    };

    return (
      <Grid item xs={12}>
        <Accordion defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="h5"
              sx={{
                fontSize: "20px",
                color: palette.primary.main,
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Owner
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GridContent>
              {/* <Box mb={2}>
                                <H3
                                    sx={{
                                        fontSize: '20px',
                                        color: palette.primary.main,
                                        textTransform: 'uppercase',
                                        textAlign: 'center',
                                    }}
                                >
                                    Owner
                                </H3>
                            </Box> */}

              <Formik
                initialValues={initialValuesOwner}
                onSubmit={handleUpdateOwner}
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
                    <InputField
                      name="firstName"
                      label="First Name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={values.firstName}
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                    <InputField
                      name="lastName"
                      label="Last Name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={values.lastName}
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />

                    <InputField
                      name="email"
                      label="Email"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={values.email}
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                    <InputField
                      name="phone"
                      label="Phone"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={values.phone}
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        minDate={moment().subtract(150, "years")._d}
                        maxDate={moment().subtract(18, "years")._d}
                        value={values.dob}
                        onChange={(date) => setFieldValue("dob", date)}
                        renderInput={(props) => (
                          <TextField
                            {...props}
                            disabled
                            label="Date of Birth"
                            id="mui-pickers-date"
                            sx={{
                              mb: 2,
                              width: "100%",
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>

                    <InputField
                      name="address"
                      multiline
                      rows={4}
                      label="Address"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={values.address}
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />

                    <Box sx={{ my: 2 }}>
                      {buttonGroupSwitch1()}
                      {/* {buttonGroupSwitch2()} */}
                    </Box>

                    {values.documents.map((doc, index) => {
                      return (
                        <Box>
                          {doc.file === "" ? (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <TextField
                                select
                                sx={{
                                  mr: 1,
                                  width: "50%",
                                }}
                                name="type"
                                label="Document Type"
                                variant="outlined"
                                size="small"
                                value={doc.type}
                                onChange={(ev) => {
                                  setFieldValue(
                                    "documents[" + index + "].type",
                                    ev.target.value
                                  );
                                }}
                              >
                                {countries.map((country) => (
                                  <MenuItem
                                    key={country.name}
                                    value={country.name}
                                  >
                                    {country.name}
                                  </MenuItem>
                                ))}
                              </TextField>

                              <Button
                                size="small"
                                variant="outlined"
                                sx={{ m: 1 }}
                                disabled={doc.type === ""}
                              >
                                <label htmlFor={"upload-owner-doc-" + index}>
                                  Upload Document
                                </label>
                                <Input
                                  onChange={(event) => {
                                    setFieldValue(
                                      "documents[" + index + "].file",
                                      event.target.files[0]
                                    );
                                  }}
                                  id={"upload-owner-doc-" + index}
                                  type="file"
                                  sx={{
                                    display: "none",
                                  }}
                                />
                              </Button>
                              {index > 1 && (
                                <Button
                                  onClick={() => {
                                    const newDocuments = values.documents;
                                    newDocuments.splice(index, 1);
                                    setFieldValue("documents", newDocuments);
                                  }}
                                  size="small"
                                  variant="contained"
                                  sx={{
                                    m: 1,
                                  }}
                                >
                                  <Icon>close_circle_outline</Icon>
                                </Button>
                              )}
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                my: 1,
                              }}
                            >
                              <Typography variant="body2">
                                {doc.type.substring(0, 10)}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: "bold",
                                }}
                              >
                                {doc.file?.name.substring(0, 10) +
                                  doc.file?.name.substring(
                                    doc.file?.name.length - 4,
                                    doc.file?.name.length
                                  )}
                              </Typography>
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => {
                                  setFieldValue(
                                    "documents[" + index + "].file",
                                    ""
                                  );
                                }}
                              >
                                <Typography variant="body1">Remove</Typography>
                              </Button>
                            </Box>
                          )}
                        </Box>
                      );
                    })}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        mx: 1,
                      }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ my: 1 }}
                        onClick={() => {
                          setFieldValue("documents", [
                            ...values.documents,
                            {
                              type: "",
                              file: "",
                            },
                          ]);
                        }}
                      >
                        <Icon>add_circle_outline</Icon>
                      </Button>
                    </Box>

                    <Button
                      fullWidth
                      size="small"
                      variant="contained"
                      type="submit"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 2,
                      }}
                    >
                      <Icon sx={{ mr: 1 }}>update</Icon>
                      <Typography variant="body1">{"Update"}</Typography>
                    </Button>
                  </Form>
                )}
              </Formik>
            </GridContent>
          </AccordionDetails>
        </Accordion>
      </Grid>
    );
  };

  const TenantComponent = (props) => {
    const { schema } = props;
    const initialValuesTenant = schema;

    const handleUpdateTenant = async (values, { isSubmitting }) => {
      console.log(values);
    };
    return (
      <Grid item xs={12}>
        <GridContent variant="outlined">
          <Box mb={2}>
            <H3
              sx={{
                fontSize: "20px",
                color: palette.primary.main,
                textTransform: "uppercase",
              }}
            >
              Primary Tenant
            </H3>
          </Box>

          <Formik
            initialValues={initialValuesTenant}
            onSubmit={handleUpdateTenant}
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
                <InputField
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={values.firstName}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
                <InputField
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={values.lastName}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
                <InputField
                  name="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={values.email}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
                <InputField
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={values.phone}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    minDate={moment().subtract(150, "years")._d}
                    maxDate={moment().subtract(18, "years")._d}
                    value={values.dob}
                    onChange={(date) => setFieldValue("dob", date)}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        label="Date of Birth"
                        id="mui-pickers-date"
                        sx={{ mb: 2, width: "100%" }}
                      />
                    )}
                  />
                </LocalizationProvider>

                <InputField
                  name="address"
                  multiline
                  rows={4}
                  label="Address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={values.address}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />

                <Box sx={{ my: 2 }}>
                  {buttonGroupSwitch1()}
                  {/* {buttonGroupSwitch2()} */}
                </Box>

                {values.documents.map((doc, index) => {
                  return (
                    <Box>
                      {doc.file === "" ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            select
                            sx={{
                              mr: 1,
                              width: "50%",
                            }}
                            name="type"
                            label="Document Type"
                            variant="outlined"
                            size="small"
                            value={doc.type}
                            onChange={(ev) => {
                              setFieldValue(
                                "documents[" + index + "].type",
                                ev.target.value
                              );
                            }}
                          >
                            {countries.map((country) => (
                              <MenuItem key={country.name} value={country.name}>
                                {country.name}
                              </MenuItem>
                            ))}
                          </TextField>

                          <Button
                            size="small"
                            variant="outlined"
                            sx={{ m: 1 }}
                            disabled={doc.type === ""}
                          >
                            <label htmlFor={"upload-tenant-doc-" + index}>
                              Upload Document
                            </label>
                            <Input
                              onChange={(event) => {
                                setFieldValue(
                                  "documents[" + index + "].file",
                                  event.target.files[0]
                                );
                              }}
                              id={"upload-tenant-doc-" + index}
                              type="file"
                              sx={{
                                display: "none",
                              }}
                            />
                          </Button>
                          {index > 1 && (
                            <Button
                              onClick={() => {
                                const newDocuments = values.documents;
                                newDocuments.splice(index, 1);
                                setFieldValue("documents", newDocuments);
                              }}
                              size="small"
                              variant="contained"
                              sx={{ m: 1 }}
                            >
                              <Icon>close_circle_outline</Icon>
                            </Button>
                          )}
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            my: 1,
                          }}
                        >
                          <Typography variant="body2">
                            {doc.type.substring(0, 10)}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            {doc.file?.name.substring(0, 10) +
                              doc.file?.name.substring(
                                doc.file?.name.length - 4,
                                doc.file?.name.length
                              )}
                          </Typography>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => {
                              setFieldValue(
                                "documents[" + index + "].file",
                                ""
                              );
                            }}
                          >
                            <Typography variant="body1">Remove</Typography>
                          </Button>
                        </Box>
                      )}
                    </Box>
                  );
                })}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    mx: 1,
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ my: 1 }}
                    onClick={() => {
                      setFieldValue("documents", [
                        ...values.documents,
                        {
                          type: "",
                          file: "",
                        },
                      ]);
                    }}
                  >
                    <Icon>add_circle_outline</Icon>
                  </Button>
                </Box>
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  type="submit"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginY: 1,
                  }}
                >
                  <Icon sx={{ mr: 1 }}>update</Icon>
                  <Typography variant="body1">{"Update"}</Typography>
                </Button>
              </Form>
            )}
          </Formik>
        </GridContent>
      </Grid>
    );
  };

  const AdditionalComponent = (props) => {
    const { schema, index } = props;
    const initialValuesAdditional = schema;

    const handleUpdateAdditional = async (values, { isSubmitting }) => {
      console.log(values);
    };
    return (
      <Grid item xs={12}>
        <GridContent variant="outlined">
          <Box
            mb={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <H3
              sx={{
                fontSize: "20px",
                color: palette.primary.main,
                textTransform: "uppercase",
              }}
            >
              Additional
            </H3>

            <Button
              onClick={() => {
                setAllPartiesData((prevState) => {
                  return {
                    ...prevState,
                    additional: [
                      ...prevState.additional.filter((item, i) => i !== index),
                    ],
                  };
                });
              }}
              size="small"
              variant="contained"
              sx={{
                display: "flex",
                alignItems: "center",
                marginY: 1,
              }}
            >
              <Icon sx={{ mr: 1 }}>remove_circle_outline</Icon>
              <Typography variant="body1">Remove</Typography>
            </Button>
          </Box>

          <Formik
            initialValues={initialValuesAdditional}
            onSubmit={handleUpdateAdditional}
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
                <FormControl sx={{ my: 2 }}>
                  <FormLabel
                    id="party-type-radio-buttons-group-label"
                    sx={{ textAlign: "left" }}
                  >
                    Party Type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="party-type-radio-buttons-group-label"
                    value={values.partyType}
                    name="radio-buttons-group"
                    onChange={(ev) => {
                      setFieldValue("partyType", ev.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="tenant"
                      control={<Radio />}
                      label="Additional Tenant"
                    />
                    <FormControlLabel
                      value="agent"
                      control={<Radio />}
                      label="Agent"
                    />
                    <FormControlLabel
                      value="witness"
                      control={<Radio />}
                      label="Witness"
                    />
                    <FormControlLabel
                      value="inspector"
                      control={<Radio />}
                      label="Inspector"
                    />
                  </RadioGroup>
                </FormControl>

                <InputField
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={values.firstName}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
                <InputField
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={values.lastName}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
                <InputField
                  name="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={values.email}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
                <InputField
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={values.phone}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={values.dob}
                    onChange={(date) => setFieldValue("dob", date)}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        label="Date of Birth"
                        id="mui-pickers-date"
                        sx={{ mb: 2, width: "100%" }}
                      />
                    )}
                  />
                </LocalizationProvider>
                <InputField
                  name="address"
                  multiline
                  rows={4}
                  label="Address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={values.address}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />

                <Box sx={{ my: 2 }}>
                  {buttonGroupSwitch1()}
                  {/* {buttonGroupSwitch2()} */}
                </Box>

                {values.documents.map((doc, index) => {
                  return (
                    <Box key={"doc" + index}>
                      {doc.file === "" ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            select
                            sx={{
                              mr: 1,
                              width: "50%",
                            }}
                            name="type"
                            label="Document Type"
                            variant="outlined"
                            size="small"
                            value={doc.type}
                            onChange={(ev) => {
                              setFieldValue(
                                "documents[" + index + "].type",
                                ev.target.value
                              );
                            }}
                          >
                            {countries.map((country) => (
                              <MenuItem key={country.name} value={country.name}>
                                {country.name}
                              </MenuItem>
                            ))}
                          </TextField>

                          <Button
                            size="small"
                            variant="outlined"
                            sx={{ m: 1 }}
                            disabled={doc.type === ""}
                          >
                            <label htmlFor={"upload-additional-doc-" + index}>
                              Upload Document
                            </label>
                            <Input
                              onChange={(event) => {
                                setFieldValue(
                                  "documents[" + index + "].file",
                                  event.target.files[0]
                                );
                              }}
                              id={"upload-additional-doc-" + index}
                              type="file"
                              sx={{
                                display: "none",
                              }}
                            />
                          </Button>
                          {index > 1 && (
                            <Button
                              onClick={() => {
                                const newDocuments = values.documents;
                                newDocuments.splice(index, 1);
                                setFieldValue("documents", newDocuments);
                              }}
                              size="small"
                              variant="contained"
                              sx={{ m: 1 }}
                            >
                              <Icon>close_circle_outline</Icon>
                            </Button>
                          )}
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            my: 1,
                          }}
                        >
                          <Typography variant="body2">
                            {doc.type.substring(0, 10)}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            {doc.file?.name.substring(0, 10) +
                              doc.file?.name.substring(
                                doc.file?.name.length - 4,
                                doc.file?.name.length
                              )}
                          </Typography>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => {
                              setFieldValue(
                                "documents[" + index + "].file",
                                ""
                              );
                            }}
                          >
                            <Typography variant="body1">Remove</Typography>
                          </Button>
                        </Box>
                      )}
                    </Box>
                  );
                })}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    mx: 1,
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ my: 1 }}
                    onClick={() => {
                      setFieldValue("documents", [
                        ...values.documents,
                        {
                          type: "",
                          file: "",
                        },
                      ]);
                    }}
                  >
                    <Icon>add_circle_outline</Icon>
                  </Button>
                </Box>

                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  type="submit"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginY: 1,
                  }}
                >
                  <Icon sx={{ mr: 1 }}>update</Icon>
                  <Typography variant="body1">{"Update"}</Typography>
                </Button>
              </Form>
            )}
          </Formik>
        </GridContent>
      </Grid>
    );
  };

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">Add Parties</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={5}>
          <OwnerComponent schema={allPartiesData.owner} />
          <TenantComponent schema={allPartiesData.tenant} />
          {allPartiesData.additional.map((item, index) => (
            <AdditionalComponent
              schema={item}
              index={index}
              key={"additional" + index}
            />
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default AddParty;
