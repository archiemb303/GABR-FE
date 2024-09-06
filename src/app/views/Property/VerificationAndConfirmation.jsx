import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Grid,
  Typography,
  Tooltip,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";

import React from "react";
import {
  Cancel,
  Check,
  Close,
  InfoOutlined,
  PlayCircleOutline,
  Verified,
} from "@mui/icons-material";
import { useState } from "react";
import { themeColors } from "app/components/MatxTheme/themeColors";
import {
  setAgreementSigningConfirmationModal,
  setVideoTutorialModal,
} from "app/redux/actions/ModalActions";
import { useTheme } from "@emotion/react";

import {
  verifyAgreementAction,
  initiateAgreementSigningAction,
} from "app/redux/actions/PropertyActions";
import Loading from "app/components/MatxLoading";
import moment from "moment";

const VerificationAndConfirmation = ({ isIntoView }) => {
  const { individualProperty } = useSelector((state) => state.property);
  const {
    VERIFY_AGREEMENT,
    INITIATE_AGREEMENT_SIGNING,
    ADD_STAMP_PAPER_REQUEST,
  } = useSelector((store) => store.loadingAndError.loader);
  const [checkboxOptions, setCheckboxOptions] = useState({
    verifiedConfirmation: false,
    correctConfirmation: false,
  });
  const dispatch = useDispatch();
  const [agreementDraftFlag, setDraftFlag] = useState(false);
  const agreementFlag =
    individualProperty?.tenancy_details?.agreement_details?.length > 0;
  const { red } = themeColors;
  const { custom } = useTheme();

  const handleVerification = () => {
    dispatch(
      verifyAgreementAction({
        property_id: individualProperty?.basic_details?.property_id,
        agreement_verification_id:
          individualProperty?.tenancy_details?.agreement_verification_details
            ?.agreement_verification_id,
      })
    );
  };

  const handleCheckboxSelection = (e) => {
    setCheckboxOptions({
      ...checkboxOptions,
      [e.target.name]: e.target.checked,
    });
  };
  return (
    <Box position="relative">
      <Box
        sx={{
          display: agreementFlag ? "none" : "block",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 2,
        }}
      />
      <Card
        id="verificationAndConfirmation"
        sx={{
          filter: agreementFlag ? "unset" : "blur(2.5px) grayscale(60%)",
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
          <Typography variant="h5"></Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5">Verification and confirmation</Typography>

            <Tooltip
              title="All Parties Verification” ensures that every party involved in the rental agreement has reviewed and confirmed the accuracy of the information provided in the agreement."
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
        {VERIFY_AGREEMENT?.isLoading === true ||
        ADD_STAMP_PAPER_REQUEST?.isLoading === true ? (
          <Box sx={{ height: "150px" }}>
            <Loading></Loading>
          </Box>
        ) : (
          <>
            <Grid marginBottom={3} paddingX={5}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginBottom: "18px",
                }}
                variant="body1"
                color="grayText"
              >
                Rental agreement has been verified by:
              </Typography>
              <Grid
                container
                flexWrap="nowrap"
                justifyContent="space-between"
                xs={12}
              >
                {individualProperty?.tenancy_details?.agreement_verification_details?.verification_parties?.map(
                  (party, i) => (
                    <Typography
                      color="grayText"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                      variant="body1"
                    >
                      {party.party_name}
                      {party.status_id == 1 ? (
                        <Check
                          sx={{ fontSize: "20px" }}
                          color="success"
                        ></Check>
                      ) : (
                        <Close
                          sx={{
                            fontSize: "20px",
                            color: red.palette.primary.main,
                          }}
                        ></Close>
                      )}
                    </Typography>
                  )
                )}
              </Grid>
            </Grid>
            <Grid container>
              {individualProperty?.tenancy_details
                ?.agreement_verification_details?.verification_status == 1 ? (
                <>
                  <Grid xs={12} container justifyContent="center">
                    <FormGroup>
                      <FormControlLabel
                        sx={{ fontStyle: "italic" }}
                        control={
                          <Checkbox
                            name="verifiedConfirmation"
                            onChange={(e) => handleCheckboxSelection(e)}
                          />
                        }
                        label={
                          <Typography variant="body1" color="GrayText">
                            I confirm that I have verified the above
                            information.
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        sx={{ fontStyle: "italic" }}
                        control={
                          <Checkbox
                            name="correctConfirmation"
                            onChange={(e) => handleCheckboxSelection(e)}
                          />
                        }
                        label={
                          <Typography variant="body1" color="GrayText">
                            I confirm that the above information is correct.
                          </Typography>
                        }
                      />
                    </FormGroup>
                  </Grid>
                  <Grid marginTop={3} container justifyContent="start" xs={12}>
                    Last Modified:{" "}
                    {moment(
                      individualProperty?.tenancy_details
                        ?.agreement_details?.[0]?.last_modification_details
                        ?.modifications?.[
                        individualProperty?.tenancy_details
                          ?.agreement_details?.[0]?.last_modification_details
                          ?.modifications?.length - 1
                      ]?.last_modified_date
                    ).format("YYYY-MM-DD")}
                    <br />
                    Last Action:{" "}
                    {
                      individualProperty?.tenancy_details
                        ?.agreement_details?.[0]?.last_modification_details
                        ?.modifications?.[
                        individualProperty?.tenancy_details
                          ?.agreement_details?.[0]?.last_modification_details
                          ?.modifications?.length - 1
                      ]?.last_action
                    }
                  </Grid>
                  <Grid marginTop={3} container justifyContent="center" xs={12}>
                    <Button
                      disabled={
                        !(
                          checkboxOptions.verifiedConfirmation &&
                          checkboxOptions.correctConfirmation
                        )
                      }
                      onClick={() => handleVerification()}
                      variant="contained"
                    >
                      Verify Now
                    </Button>
                  </Grid>
                </>
              ) : (
                ""
              )}
              {individualProperty?.tenancy_details
                ?.agreement_verification_details?.verification_status == 2 ? (
                <Grid marginTop={3} container justifyContent="center" xs={12}>
                  <Button disabled variant="contained">
                    Awaiting others to verify
                  </Button>
                </Grid>
              ) : (
                ""
              )}
              {individualProperty?.tenancy_details
                ?.agreement_verification_details?.verification_status == 3 ? (
                <>
                  {!individualProperty?.tenancy_details?.agreement_details?.[0]
                    ?.stamp_request_status ? (
                    <Grid
                      marginTop={3}
                      container
                      justifyContent="center"
                      xs={12}
                    >
                      <Button
                        variant="contained"
                        onClick={() =>
                          dispatch(setAgreementSigningConfirmationModal(true))
                        }
                      >
                        Initiate Agreement Signing
                      </Button>
                    </Grid>
                  ) : (
                    <Grid
                      marginTop={3}
                      container
                      justifyContent="center"
                      xs={12}
                    >
                      <Button disabled variant="contained">
                        Procurement is in progress 
                      </Button>
                    </Grid>
                  )}
                </>
              ) : (
                ""
              )}
            </Grid>
          </>
        )}
      </Card>
    </Box>
  );
};

export default VerificationAndConfirmation;
