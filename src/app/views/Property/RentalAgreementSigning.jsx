import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Grid,
  Typography,
  Tooltip,
  Button,
  IconButton,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import { InfoOutlined, PlayCircleOutline, Refresh } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@emotion/react";
import { setVideoTutorialModal } from "app/redux/actions/ModalActions";
import {
  updateAgreementSigningStatusAction,
  checkAgreementSigningAction,
} from "app/redux/actions/PropertyActions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "gray",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const RentalAgreementSigning = ({ isIntoView }) => {
  // const [isPremiumUser, setIsPremiumUser] = useState(false);
  const { individualProperty, agreementSignatureURL, agreementSignatureFlag } =
    useSelector((state) => state.property);
  const signingVisibleFlag = individualProperty?.tenancy_details
    ?.agreement_details?.[0]?.stamp_request_status
    ? true
    : false;
  const persistentState = JSON.parse(localStorage.getItem("persistentState"));
  const { custom } = useTheme();
  const dispatch = useDispatch();
  const handleSigning = (partyId) => {
    dispatch(
      checkAgreementSigningAction({
        property_id: individualProperty?.basic_details?.property_id,
        tenancy_party_id: partyId,
      })
    );
  };
  // const handleDownload = () => {
  //     const link = document.createElement('a');
  //     link.href = individualProperty?.tenancy_details
  //     ?.agreement_details[0].agreement_file_url;
  //     link.setAttribute(
  //       'download',
  //       individualProperty?.tenancy_details
  //     ?.agreement_details[0].agreement_file_name
  //     );
  //     // Append to html link element page
  //     document.body.appendChild(link);

  //     // Start download
  //     link.click();

  //     // Clean up and remove the link
  //     link.parentNode.removeChild(link);

  // };
  const handleRefresh = () => {
    dispatch(
      updateAgreementSigningStatusAction({
        property_id: individualProperty?.basic_details?.property_id,
        tenancy_id:
          individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
        tenancy_agreement_id:
          individualProperty?.tenancy_details?.agreement_details?.length == 0
            ? ""
            : individualProperty?.tenancy_details?.agreement_details?.[0]
                ?.tenancy_agreement_id,
      })
    );
  };
  useEffect(() => {
    if (agreementSignatureFlag == false) {
      console.log(agreementSignatureURL);
      window.open(agreementSignatureURL, "_blank");
    }
  }, [agreementSignatureURL]);

  return (
    <Box position="relative">
      <Box
        sx={{
          display: signingVisibleFlag ? "none" : "block",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 2,
        }}
      />
      <Card
        id="signingOfRentalAgreement"
        sx={{
          filter: signingVisibleFlag ? "unset" : "blur(2.5px) grayscale(60%)",
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
            gap: "2",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5">Signing of Rental Agreement</Typography>

            <Tooltip
              title="Signature Requirement ensures that all parties involved in the rental agreement have legally acknowledged and accepted the terms and conditions by signing the agreement."
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
        </Box>

        <Grid container gap={2}>
          <Grid xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableBody>
                  {individualProperty?.tenancy_details?.party_details
                    ?.filter(
                      (party) =>
                        party.is_signing_party == true &&
                        (party.status === 3 || party.status === 4)
                    )
                    .map((party, i) => (
                      <StyledTableRow key={party.email_id}>
                        <StyledTableCell
                          sx={{ paddingLeft: "5%" }}
                          component="th"
                          scope="row"
                        >
                          {party.first_name} {party.last_name}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ paddingLeft: "10%" }}
                          align="left"
                        >
                          {party.party_type_name}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ paddingRight: "5%" }}
                          align="right"
                        >
                          {party.is_signed_flag ? (
                            <Typography>Signed</Typography>
                          ) : (
                            <>
                              {" "}
                              {party.party_profile_id ==
                              persistentState.userProfileId ? (
                                <>
                                  {individualProperty?.tenancy_details
                                    ?.agreement_details?.[0]
                                    ?.stamp_request_status === 3 ? (
                                    <Button
                                      sx={{ padding: "2px" }}
                                      onClick={() =>
                                        handleSigning(party.tenancy_party_id)
                                      }
                                    >
                                      Sign Now
                                    </Button>
                                  ) : (
                                    "Awaiting Procurement"
                                  )}
                                </>
                              ) : (
                                "Not Signed"
                              )}
                            </>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid container xs={12}>
            <a
              href={
                individualProperty?.tenancy_details?.agreement_details?.[0]
                  ?.agreement_file_url
              }
              withot
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button
                sx={{ marginRight: "10px" }}
                disabled={
                  individualProperty?.tenancy_details?.agreement_details?.[0]
                    ?.agreement_file_id == null
                }
                variant="contained"
              >
                Download
              </Button>
            </a>
            {individualProperty?.tenancy_details?.agreement_details?.[0]
              ?.agreement_file_id == null ? (
              <Button onClick={() => handleRefresh()} variant="contained">
                Refresh
              </Button>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default RentalAgreementSigning;
