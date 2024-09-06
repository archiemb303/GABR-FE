import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  Divider,
  Fab,
  Grid,
  Icon,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import React, { useMemo } from "react";
import AppChat from "../chat-box/AppChat";
import { useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import { useRef } from "react";
import { makeStyles } from "@mui/styles";
import { themeColors } from "app/components/MatxTheme/themeColors";
import { Container } from "@mui/system";
import JoditEditor from "jodit-react";
import { InfoOutlined, PlayCircleOutline, Send } from "@mui/icons-material";
import {
  generateAgreementDraftAction,
  updateAgreementDraftAction,
  fetchLatestAgreementDraftAction,
} from "app/redux/actions/PropertyActions";
import { useDispatch } from "react-redux";
import {
  setOpenAgreementCreditSelectionModal,
  setOpenLastModificationHistoryModal,
  setOpenMemberAlreadyPremiumModal,
  setOpenUpgradeToPremiumModal,
  setPackagePreferenceModal,
  setRentalAgreementWarningModal,
  setVideoTutorialModal,
  setViewUpdatedDraftModal,
} from "app/redux/actions/ModalActions";
import { useTheme } from "@emotion/react";
import RentalAgreementWarningModal from "./RentalAgreementWarningModal";
import Loading from "app/components/MatxLoading";
import CustomSnackbar from "app/components/CustomSnackbar";
import ModificationHistoryModal from "./components/ModificationHistoryModal";
import { GENERATE_AGREEMENT_DRAFT as GENERATE_AGREEMENT_DRAFT_ACTION } from "app/redux/actions/PropertyActions";
import ViewUpdatedDraftModal from "./components/ViewUpdatedDraftModal";
import UpgradeToPremiumModal from "./components/UpgradeToPremiumModal";
import AgreementCreditSelectionModal from "./components/AgreementCreditSelectionModal";
import MemberAlreadyPremiumModal from "./components/MemberAlreadyPremiumModal";
const RentalAgreement = ({ isIntoView }) => {
  const { individualProperty } = useSelector((state) => state.property);
  const fetchAgreementDraftFlagRef = useRef(true);
  const {
    GENERATE_AGREEMENT_DRAFT,
    UPDATE_AGREEMENT_DRAFT,
    FETCH_LATEST_AGREEMENT_DRAFT,
  } = useSelector((store) => store.loadingAndError.loader);

  //Jodit editor configuration
  const JoditConfig = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/doc/,
      placeholder: "",
      height: "500px",
    }),
    []
  );

  const dispatch = useDispatch();

  const editor = useRef(null);
  const [content, setContent] = useState("");
  // const [editorVisible, setVisible] = useState(false);

  const { custom } = useTheme();

  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const firstRenderRef = useRef(true);

  const {
    generatedAgreementDraft,
    updatedAgreementDraft,
    newTenancy,
    fetchLatestAgreementDraft,
  } = useSelector((state) => state.property);
  const agreementFlag =
    individualProperty?.tenancy_details?.agreement_details?.length > 0;
  const tenancyFlag =
    individualProperty?.tenancy_details?.tenancy_terms &&
    "tenancy_id" in individualProperty?.tenancy_details?.tenancy_terms;

  const handleStandard = (fetchAgreementDraftFlag) => {
    // setVisible(true);
    //filter tenancy party ids of the active parties
    // (parties who have accepted the invitation or party who is a creator)
    const tenancyPartyIds = [];
    for (var party of individualProperty?.tenancy_details?.party_details) {
      if (party?.status === 3 || party?.status === 4) {
        tenancyPartyIds.push(party?.tenancy_party_id);
      }
    }
    dispatch(
      generateAgreementDraftAction({
        property_id: individualProperty?.basic_details?.property_id,
        tenancy_id:
          individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
        fetch_agreement_draft: fetchAgreementDraftFlag,
        tenancy_party_id: tenancyPartyIds,
      })
    );
  };

  const checkForRequiredParties = () => {
    const partyTypeIds1 = [1, 2, 5, 6];
    const hasAllPartyTypes1 = partyTypeIds1.every((id) =>
      individualProperty?.tenancy_details?.party_details.some(
        (party) =>
          party.party_type_id === id &&
          (party.status === 3 || party.status === 4)
      )
    );
    const partyTypeIds2 = [1, 2, 6, 6];
    const partyTypeCounts = partyTypeIds2.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    const hasAllPartyTypes2 = Object.entries(partyTypeCounts).every(
      ([id, count]) => {
        const filteredArray =
          individualProperty?.tenancy_details?.party_details.filter(
            (party) =>
              party.party_type_id === Number(id) &&
              (party.status === 3 || party.status === 4)
          );
        return filteredArray.length >= count;
      }
    );

    if (hasAllPartyTypes1 || hasAllPartyTypes2) {
      return true;
    }
    return false;
  };

  const fetchLatestDraft = () => {
    // setVisible(true);
    dispatch(
      fetchLatestAgreementDraftAction({
        property_id: individualProperty?.basic_details?.property_id,
        tenancy_id:
          individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
      })
    );
  };

  const updateDraft = () => {
    dispatch(
      updateAgreementDraftAction({
        property_id: individualProperty?.basic_details?.property_id,
        tenancy_id:
          individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
        tenancy_agreement_id:
          individualProperty?.tenancy_details?.agreement_details?.[0]
            ?.tenancy_agreement_id ?? "",
        agreement_content: content,
      })
    );
  };

  useEffect(() => {
    if (generatedAgreementDraft) {
      if (generatedAgreementDraft?.is_premium_present === true) {
        //Premium logic
        if (
          generatedAgreementDraft?.is_latest_draft_present === true &&
          generatedAgreementDraft?.agreement_content === null
        ) {
          dispatch(setViewUpdatedDraftModal(true));
        } else {
          setContent(generatedAgreementDraft?.agreement_content);
        }
        if (
          generatedAgreementDraft?.is_latest_draft_present === false &&
          generatedAgreementDraft?.agreement_content === null
        ) {
          handleStandard(true);
        }
      } else {
        //Non-premium logic
        if (
          generatedAgreementDraft?.premium_listing_seeker_ids?.listing_ids
            ?.length === 0 &&
          generatedAgreementDraft?.premium_listing_seeker_ids?.seeker_ids
            ?.length === 0
        ) {
          dispatch(setOpenUpgradeToPremiumModal(true));
        } else if (generatedAgreementDraft?.premium_party_present === 1) {
          dispatch(setOpenMemberAlreadyPremiumModal(true));
        } else {
          dispatch(setOpenAgreementCreditSelectionModal(true));
        }
      }
    }
  }, [generatedAgreementDraft]);

  return (
    <>
      {UPDATE_AGREEMENT_DRAFT?.isLoading === false && (
        <CustomSnackbar
          loaderChild={UPDATE_AGREEMENT_DRAFT}
          successMessage="Agreement Draft Updated And Saved Successfully !"
        />
      )}
      <ViewUpdatedDraftModal
        handleStandard={handleStandard}
        fetchLatestDraft={fetchLatestDraft}
        setContent={setContent}
        generatedAgreementDraft={generatedAgreementDraft}
      />
      <AgreementCreditSelectionModal />
      <RentalAgreementWarningModal />
      <ModificationHistoryModal />
      <UpgradeToPremiumModal />
      <MemberAlreadyPremiumModal />
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
          id="rentalAgreement"
          sx={{
            filter: tenancyFlag ? "unset" : "blur(2.5px) grayscale(60%)",
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
              <Typography variant="h5">Rental Agreement</Typography>

              <Tooltip
                title="A “Rental Agreement” is a legal contract between a landlord and tenant, outlining the terms and conditions of renting a property, including duration, rent amount, responsibilities, and inclusions."
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
          {GENERATE_AGREEMENT_DRAFT?.isLoading === true ||
          UPDATE_AGREEMENT_DRAFT?.isLoading === true ||
          FETCH_LATEST_AGREEMENT_DRAFT?.isLoading === true ? (
            <Box sx={{ height: "500px" }}>
              <Loading></Loading>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                margin: "0 auto",
                width: "100%",
              }}
            >
              <Grid
                container
                gap={1}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                {/* <Box
                  item
                  marginTop={3}
                  container
                  justifyContent="start"
                  xs={12}
                > */}
                {individualProperty?.tenancy_details?.agreement_details?.[0]
                  ?.last_modification_details?.modifications?.length > 0 && (
                  <Box>
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
                  </Box>
                )}
                {/* </Box> */}
                <Box display="flex" gap={2}>
                  {/* {agreementFlag ? (
                    <Button
                      onClick={() => fetchLatestDraft()}
                      variant="contained"
                    >
                      View latest draft
                    </Button>
                  ) : (
                    ""
                  )} */}
                  {/* {individualProperty?.listing_details?.package_preference !==
                  2 ? (
                    <Button
                      onClick={() => dispatch(setPackagePreferenceModal(true))}
                      variant="contained"
                    >
                      Upgrade to premium to view standard draft
                    </Button>
                  ) : ( */}
                  <Button
                    onClick={() => {
                      // agreementFlag
                      //   ? dispatch(setViewUpdatedDraftModal(true))
                      //   : handleStandard();
                      if (checkForRequiredParties()) {
                        handleStandard(false);
                      } else {
                        dispatch(setRentalAgreementWarningModal(true));
                      }
                    }}
                    variant="contained"
                  >
                    View standard draft
                  </Button>
                  {/* )} */}
                  {individualProperty?.tenancy_details?.agreement_details?.[0]
                    ?.last_modification_details?.modifications?.length > 0 && (
                    <Button
                      onClick={() =>
                        dispatch(setOpenLastModificationHistoryModal(true))
                      }
                      variant="contained"
                    >
                      Modifications History
                    </Button>
                  )}
                </Box>
              </Grid>
              {content ? (
                <>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    // config={{readOnly: false}}
                    config={JoditConfig}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => {}}
                  />
                  {individualProperty?.tenancy_details?.agreement_details &&
                  individualProperty?.tenancy_details?.agreement_details[0]
                    ?.document_id == null ? (
                    <Grid
                      container
                      justifyContent="center"
                      onClick={() => updateDraft()}
                    >
                      <Button
                        disabled={
                          individualProperty?.tenancy_details
                            ?.agreement_details?.[0]?.stamp_request_status
                        }
                        variant="contained"
                      >
                        Update and save draft
                      </Button>
                    </Grid>
                  ) : (
                    <Grid container justifyContent="center">
                      <Button disabled variant="contained">
                        Agreement Signing is Initiated
                      </Button>
                    </Grid>
                  )}
                </>
              ) : (
                ""
              )}
            </Box>
          )}
        </Card>
      </Box>
    </>
  );
};

export default RentalAgreement;
