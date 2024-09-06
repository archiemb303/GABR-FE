import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Icon,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { Fragment, useEffect, useState } from "react";

import React from "react";
import {
  setAgreementSigningWarningModal,
  setEditTenancyTermsModal,
  setVideoTutorialModal,
} from "app/redux/actions/ModalActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditTenancyTermsModal from "./EditTenancyTermsModal";
import { InfoOutlined, PlayCircleOutline } from "@mui/icons-material";
import Loading from "app/components/MatxLoading";
import CustomSnackbar from "app/components/CustomSnackbar";

const ViewTenancyTerms = ({ isIntoView }) => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const { individualProperty } = useSelector((state) => state.property);
  const { UPDATE_TENANCY_TERMS } = useSelector(
    (store) => store.loadingAndError.loader
  );
  const { custom } = useTheme();

  return (
    <>
      <EditTenancyTermsModal individualProperty={individualProperty} />
      <Box position="relative">
        <Box
          sx={{
            display: true ? "none" : "block",
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 2,
          }}
        />
        <Card
          id="tenancyTerms"
          sx={{
            filter: true ? "unset" : "blur(2.5px) grayscale(60%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alginItems: "center",
            padding: 2,
            margin: "0 auto",
            my: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5">Tenancy Terms</Typography>

              <Tooltip
                title="“Tenancy Terms” refer to the key conditions of the lease, including the duration of the lease, the amount of rent and deposits, and access to facilities."
                arrow
              >
                <IconButton sx={{ padding: 0, ml: 0.5 }}>
                  <InfoOutlined
                    sx={{
                      fontSize: "1em",
                      color: custom.c4,
                    }}
                  />
                </IconButton>
              </Tooltip>

              <IconButton
                sx={{ padding: 0, ml: 0.5 }}
                onClick={() =>
                  dispatch(
                    setVideoTutorialModal({
                      flag: true,
                      tutorialLink: "https://www.youtube.com/embed/l7Mb-UgNNj4",
                    })
                  )
                }
              >
                <PlayCircleOutline
                  sx={{
                    fontSize: "1em",
                    color: custom.c4,
                  }}
                />
              </IconButton>
            </Box>
            {individualProperty?.basic_details?.party_type_name !==
              "Witness" && (
              <IconButton
                aria-label="edit"
                onClick={() => {
                  if (
                    individualProperty?.tenancy_details?.agreement_details?.[0]
                      ?.document_id
                  ) {
                    dispatch(setAgreementSigningWarningModal(true));
                  } else {
                    dispatch(setEditTenancyTermsModal(true));
                  }
                }}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>
          {UPDATE_TENANCY_TERMS?.isLoading === true ? (
            <Grid height={{ height: "350px" }}>
              <Loading></Loading>
            </Grid>
          ) : (
            <>
              <CustomSnackbar
                loaderChild={UPDATE_TENANCY_TERMS}
                successMessage="Tenancy Terms updated successfully !"
              />
              <Grid container gap={2}>
                <Grid container xs={12}>
                  <Typography variant="body1" color="GrayText">
                    Term start date:
                  </Typography>
                  <Typography marginLeft={1} variant="body1" color="primary">
                    {
                      individualProperty?.tenancy_details?.tenancy_terms
                        ?.start_date
                    }
                  </Typography>
                </Grid>
                <Grid container xs={12}>
                  <Typography variant="body1" color="GrayText">
                    Term renewal/end date:
                  </Typography>
                  <Typography marginLeft={1} variant="body1" color="primary">
                    {
                      individualProperty?.tenancy_details?.tenancy_terms
                        ?.end_date
                    }
                  </Typography>
                </Grid>
                <Grid container xs={12}>
                  <Typography variant="body1" color="GrayText">
                    Rent per month:
                  </Typography>
                  <Typography marginLeft={1} variant="body1" color="primary">
                    {
                      individualProperty?.tenancy_details?.tenancy_terms
                        ?.rent_per_month
                    }
                  </Typography>
                </Grid>
                <Grid container xs={12}>
                  <Typography variant="body1" color="GrayText">
                    Security deposit:
                  </Typography>
                  <Typography marginLeft={1} variant="body1" color="primary">
                    {
                      individualProperty?.tenancy_details?.tenancy_terms
                        ?.security_deposit
                    }
                  </Typography>
                </Grid>

                <Grid container xs={12}>
                  <Typography variant="body1" color="GrayText">
                    Utlilities - Cooking gas:
                  </Typography>
                  <Typography marginLeft={1} variant="body1" color="primary">
                    {individualProperty?.tenancy_details?.tenancy_terms
                      ?.utilities?.[0]?.status === 1
                      ? "Included"
                      : "Additional"}
                  </Typography>
                </Grid>
                <Grid container xs={12}>
                  <Typography variant="body1" color="GrayText">
                    Utlilities - Water:
                  </Typography>
                  <Typography marginLeft={1} variant="body1" color="primary">
                    {individualProperty?.tenancy_details?.tenancy_terms
                      ?.utilities?.[1]?.status === 1
                      ? "Included"
                      : "Additional"}
                  </Typography>
                </Grid>
                <Grid container xs={12}>
                  <Typography variant="body1" color="GrayText">
                    Utlilities - Internet:
                  </Typography>
                  <Typography marginLeft={1} variant="body1" color="primary">
                    {individualProperty?.tenancy_details?.tenancy_terms
                      ?.utilities?.[2]?.status === 1
                      ? "Included"
                      : "Additional"}
                  </Typography>
                </Grid>
                <Grid container xs={12}>
                  <Typography variant="body1" color="GrayText">
                    Utlilities - Electricity:
                  </Typography>
                  <Typography marginLeft={1} variant="body1" color="primary">
                    {individualProperty?.tenancy_details?.tenancy_terms
                      ?.utilities?.[3]?.status === 1
                      ? "Included"
                      : "Additional"}
                  </Typography>
                </Grid>
                <Grid container xs={12}>
                  <Typography variant="body1" color="GrayText">
                    Utlilities - Waste management:
                  </Typography>
                  <Typography marginLeft={1} variant="body1" color="primary">
                    {individualProperty?.tenancy_details?.tenancy_terms
                      ?.utilities?.[4]?.status === 1
                      ? "Included"
                      : "Additional"}
                  </Typography>
                </Grid>

                <Grid container xs={12}>
                  <Typography variant="body1" color="GrayText">
                    Price of renewal (%age):
                  </Typography>
                  <Typography marginLeft={1} variant="body1" color="primary">
                    {
                      individualProperty?.tenancy_details?.tenancy_terms
                        ?.renewal_rate
                    }
                  </Typography>
                </Grid>
                <Grid container xs={12}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alginItems: "center",
                      padding: 2,
                      margin: "0 auto",
                      my: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "3px",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h5">
                        Mandatory deductions at time of vacancy
                      </Typography>
                      <Tooltip
                        color="primary"
                        sx={{ marginLeft: "5px" }}
                        title="Example: If the property is painted at the time of letting out, painting charges will be deducted at the end of tenancy."
                        arrow
                      >
                        <InfoOutlined></InfoOutlined>
                      </Tooltip>
                    </Box>
                    <TableContainer sx={{ paddingX: "2%" }} component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Heading</TableCell>
                            <TableCell
                              sx={{
                                paddingLeft: "35px",
                              }}
                            >
                              Description
                            </TableCell>
                            <TableCell align="right">Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {individualProperty?.tenancy_details?.tenancy_terms?.mandatory_deductions?.map(
                            (item, i) => {
                              return (
                                <TableRow
                                  key={i}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    paddingLeft={1}
                                    component="th"
                                    scope="row"
                                  >
                                    <Typography
                                      variant="body1"
                                      color="grayText"
                                    >
                                      {item.tenancy_deduction_head}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      paddingLeft: "35px",
                                    }}
                                  >
                                    <Typography
                                      variant="body1"
                                      color="grayText"
                                    >
                                      {item.tenancy_deduction_description}
                                    </Typography>
                                  </TableCell>
                                  <TableCell paddingRight={1} align="right">
                                    <Typography
                                      variant="body1"
                                      color="grayText"
                                    >
                                      {item.tenancy_deduction_value}
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {/* <Grid container>
                            s={12} md={4}>
                            pography variant='body1' color='GrayText'>
                             Heading
                            ypography>
                            
                            s={12} md={4}>
                            pography variant='body1' color='GrayText'>
                             Description
                            ypography>
                            
                            s={12} md={4}>
                            pography variant='body1' color='GrayText'>
                             Amount
                            ypography>
                            
                             */}
                  </Card>
                </Grid>
              </Grid>
            </>
          )}
        </Card>
      </Box>
    </>
  );
};

export default ViewTenancyTerms;
