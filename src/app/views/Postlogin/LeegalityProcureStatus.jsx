import { CheckCircle, CheckCircleOutline } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CustomSnackbar from "app/components/CustomSnackbar";
import Loading from "app/components/MatxLoading";
import {
  fetchProcurementPartyDetailsAction,
  fetchResendStampRequestAction,
  generateTestAgreementAction,
  informProcuredStatusToTenantOwnerAction,
  sendStampRequestToLeegalityAction,
} from "app/redux/actions/SupportCenterActions";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import LeegalityViewAllRequestsModal from "../Property/components/LeegalityViewAllRequestsModal";
import { setOpenLeegalityViewAllRequestsModal } from "app/redux/actions/ModalActions";
import { useTheme } from "@mui/material";

export default function LeegalityProcureStatus() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const params = [];
  for (let entry of searchParams.entries()) {
    params.push(entry);
  }
  const [document_id, setDocument_Id] = useState("");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  const {
    fetchProcurementPartyDetails,
    fetchResendStampRequests,
    generateTestAgreement,
  } = useSelector((store) => store.supportCenter);
  const {
    FETCH_PROCUREMENT_PARTY_DETAILS,
    INFORM_PROCURED_STATUS_TO_TENANTOWNER,
    GENERATE_TEST_AGREEMENT,
  } = useSelector((state) => state?.loadingAndError?.loader);

  useEffect(() => {
    dispatch(
      fetchProcurementPartyDetailsAction({
        payload: { request_id: params?.[0]?.[1] },
      })
    );
  }, []);

  return (
    <>
      <LeegalityViewAllRequestsModal />
      {/* <CustomSnackbar
        loaderChild={INFORM_PROCURED_STATUS_TO_TENANTOWNER}
        successMessage="Tenant Owner team has been notified successfully."
        errorMessage={INFORM_PROCURED_STATUS_TO_TENANTOWNER?.error}
      /> */}
      {FETCH_PROCUREMENT_PARTY_DETAILS?.isLoading === true ? (
        <Box sx={{ height: "500px" }}>
          <Loading></Loading>
        </Box>
      ) : (
        <>
          {fetchProcurementPartyDetails?.leegality_confirmation_status ===
          true ? (
            <Fade in={true}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "80vh",
                }}
              >
                <Box textAlign={"center"}>
                  <CheckCircleOutline
                    color="success"
                    sx={{ fontSize: "15rem" }}
                  />
                  <Typography
                    textAlign="center"
                    mt={2}
                    id="modal-modal-title"
                    variant="h5"
                  >
                    TenantOwner team has been informed successfully!
                  </Typography>
                </Box>
              </Box>
            </Fade>
          ) : (
            <Box
              sx={{
                padding: "2% 10%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card sx={{ padding: 10 }}>
                <Box
                  display="flex"
                  flexDirection={"column"}
                  paddingLeft={5}
                  gap={2}
                >
                  <Box textAlign={"right"}>
                    <Button
                      sx={{ marginRight: 2 }}
                      variant="contained"
                      onClick={() => {
                        dispatch(
                          generateTestAgreementAction({
                            payload: {
                              tenancy_id:
                                fetchProcurementPartyDetails?.tenancy_id,
                              tenancy_agreement_id:
                                fetchProcurementPartyDetails?.tenancy_agreement_id,
                            },
                          })
                        );
                      }}
                    >
                      Generate document id
                    </Button>
                    <Button
                      onClick={() => {
                        dispatch(
                          fetchResendStampRequestAction({
                            payload: { request_status: 2 },
                          })
                        );
                        dispatch(setOpenLeegalityViewAllRequestsModal(true));
                      }}
                      variant="contained"
                    >
                      View all requests
                    </Button>
                  </Box>
                  {(generateTestAgreement ||
                    GENERATE_TEST_AGREEMENT?.isLoading === true) && (
                    <Box textAlign={"right"}>
                      {GENERATE_TEST_AGREEMENT?.isLoading === true ? (
                        <Box sx={{ height: "80px" }}>
                          <Loading></Loading>
                        </Box>
                      ) : (
                        <Box>
                          <Typography>
                            Document Id:{" "}
                            <b>{generateTestAgreement?.document_id}</b>
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                  {/* <Typography
              variant="body1"
              color="GrayText"
              sx={{ whiteSpace: "nowrap" }}
              fontWeight={"bold"}
            >
              Tenancy Id: 1
            </Typography>
            <Typography
              variant="body1"
              color="GrayText"
              sx={{ whiteSpace: "nowrap" }}
              fontWeight={"bold"}
            >
              Stamp Series: 1
            </Typography> */}
                  <Box
                    sx={{ backgroundColor: "#1976d20d", padding: 3 }}
                    display="flex"
                    flexWrap={"wrap"}
                    gap={2}
                  >
                    <Typography
                      variant="body1"
                      color="GrayText"
                      sx={{ whiteSpace: "nowrap" }}
                      fontWeight={"bold"}
                      width={"100%"}
                    >
                      First Parties
                    </Typography>
                    {fetchProcurementPartyDetails?.primary_parties?.map(
                      (party, i) => {
                        return (
                          <Fragment key={i}>
                            <Typography
                              variant="body1"
                              color="GrayText"
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              <b>Name:</b> {party?.party_name}
                            </Typography>
                            <Typography variant="body1" color="GrayText">
                              <b>Address</b>: {party?.party_address}
                            </Typography>
                            <Typography
                              variant="body1"
                              color="GrayText"
                              sx={{ whiteSpace: "nowrap", width: "100%" }}
                            >
                              <b>Ids:</b>
                            </Typography>
                            {party?.document_details?.map((detail, i) => {
                              return (
                                <Box
                                  key={i}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "white",
                                    borderRadius: "15px",
                                    padding: "2px 10px",
                                    gap: 2,
                                  }}
                                >
                                  <Typography
                                    variant="body1"
                                    color="GrayText"
                                    sx={{ whiteSpace: "nowrap" }}
                                  >
                                    <b>ID</b>: {detail?.file_name}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    color="GrayText"
                                    sx={{ whiteSpace: "nowrap" }}
                                  >
                                    <b>ID Number</b>:{" "}
                                    {detail?.party_document_value}
                                  </Typography>
                                </Box>
                              );
                            })}
                          </Fragment>
                        );
                      }
                    )}
                  </Box>
                  <Box
                    sx={{ backgroundColor: "#1976d20d", padding: 3 }}
                    display="flex"
                    flexWrap={"wrap"}
                    gap={2}
                  >
                    <Typography
                      variant="body1"
                      color="GrayText"
                      sx={{ whiteSpace: "nowrap" }}
                      fontWeight={"bold"}
                      width={"100%"}
                    >
                      Second Parties
                    </Typography>
                    {fetchProcurementPartyDetails?.secondary_parties?.map(
                      (party, i) => {
                        return (
                          <Fragment key={i}>
                            <Typography
                              variant="body1"
                              color="GrayText"
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              <b>Name:</b> {party?.party_name}
                            </Typography>
                            <Typography variant="body1" color="GrayText">
                              <b>Address</b>: {party?.party_address}
                            </Typography>
                            <Typography
                              variant="body1"
                              color="GrayText"
                              sx={{ whiteSpace: "nowrap", width: "100%" }}
                            >
                              <b>Ids:</b>
                            </Typography>
                            {party?.document_details?.map((detail, i) => {
                              return (
                                <Box
                                  key={i}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "white",
                                    borderRadius: "15px",
                                    padding: "2px 10px",
                                    gap: 2,
                                  }}
                                >
                                  <Typography
                                    variant="body1"
                                    color="GrayText"
                                    sx={{ whiteSpace: "nowrap" }}
                                  >
                                    <b>ID</b>: {detail?.file_name}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    color="GrayText"
                                    sx={{ whiteSpace: "nowrap" }}
                                  >
                                    <b>ID Number</b>:{" "}
                                    {detail?.party_document_value}
                                  </Typography>
                                </Box>
                              );
                            })}

                            <Divider sx={{ width: "100%" }} />
                          </Fragment>
                        );
                      }
                    )}
                  </Box>
                  {/* <Typography
              variant="body1"
              color="GrayText"
              sx={{ whiteSpace: "nowrap" }}
              fontWeight={"bold"}
            >
              Stamp Paper Id: 234dfs
            </Typography> */}
                  <TextField
                    sx={{ marginRight: matches ? 0 : 80 }}
                    label="Document Id"
                    value={document_id}
                    onChange={(e) => {
                      setDocument_Id(e.target.value);
                    }}
                  />
                </Box>

                <Grid
                  marginTop={5}
                  container
                  gap={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    disabled={!document_id}
                    onClick={() => {
                      dispatch(
                        informProcuredStatusToTenantOwnerAction({
                          payload: {
                            ...fetchProcurementPartyDetails,
                            request_id: params?.[0]?.[1],
                            document_id: document_id,
                          },
                        })
                      );
                    }}
                    variant="contained"
                  >
                    Inform Status update to Procured to TenantOwner Team
                  </Button>
                </Grid>
              </Card>
            </Box>
          )}
        </>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={INFORM_PROCURED_STATUS_TO_TENANTOWNER?.isLoading === true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
