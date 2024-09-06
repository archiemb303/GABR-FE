import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Menu,
  IconButton,
  Tooltip,
  Icon,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container, useTheme } from "@mui/system";
import { H4 } from "app/components/Typography";
import {
  addNewPropertyAction,
  removeTenancyPartiesAction,
} from "app/redux/actions/PropertyActions";
import { Form, Formik, validateYupSchema } from "formik";
import { useDropzone } from "react-dropzone";
import {
  propertyCreatorItems,
  propertyTypeItems,
  PropertyTypeItems,
} from "./items/propertyTypes";
import { useEffect, useState } from "react";
import {
  getAllCitiesAction,
  getAllCitiesByStateAction,
  getAllStatesByCountryAction,
} from "app/redux/actions/LocationActions";

import React from "react";
import EditPropertyBasicDetailsModal from "./EditPropertyBasicDetailsModal";
import {
  setAddPartyConfirmModal,
  setAddPropertyPartiesModal,
  setAgreementSigningWarningModal,
  setCreateNewTenancyModal,
  setDeactivateTenancyModal,
  setEditPropertyBasicDetailsModal,
  setEditPropertyPartyModal,
  setPremiumPackageStatusModal,
  setUpdateUserProfileModal,
  setUtilityModal,
  setVideoTutorialModal,
} from "app/redux/actions/ModalActions";
import UtilityModal from "../Modal/UtilityModal";
import AddPropertyPartiesModal from "./AddPropertyParties";
import { InfoOutlined, PlayCircleOutline } from "@mui/icons-material";
import Loading from "app/components/MatxLoading";
import CustomSnackbar from "app/components/CustomSnackbar";
import UpdateUserProfileModal from "./UpdateUserProfileModal";
import EditPropertyPartyModal from "./EditPropertyPartyModal";

const ViewPropertyParties = ({
  pageCheck,
  isIntoView,
  addOwnerasParty,
  setAddingParty,
}) => {
  const dispatch = useDispatch();
  const { custom } = useTheme();
  const location = useSelector((state) => state.location);
  const { userProfile } = useSelector((state) => state);
  const { individualProperty, newTenancy } = useSelector(
    (state) => state.property
  );
  const { openEditPropertyPartyModal } = useSelector((state) => state.modal);
  const [isPremiumUser, setIsPremiumUser] = useState(true);
  const [utilityModalData, setUtilityModalData] = useState(null);
  const [numberOfPartyMembers, setNumberOfPartyMembers] = useState(null);
  const [maxNumberOfPartyMembers, setMaxNumberOfPartyMembers] = useState(6);
  const [selectedParty, setSelectedParty] = useState(null); // used in sending data for the edit party modal

  const {
    CREATE_NEW_TENANCY,
    ADD_TENANCY_PARTIES,
    DEACTIVATE_TENANCY,
    EDIT_TENANCY_PARTIES,
    REMOVE_TENANCY_PARTIES,
  } = useSelector((store) => store.loadingAndError.loader);

  async function downloadImage(imageSrc, imageName = "document") {
    const image = await fetch(imageSrc);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const openCreateNewTenancyModal = () => {
    dispatch(setCreateNewTenancyModal(true));
  };

  useEffect(() => {
    if (individualProperty?.tenancy_details?.party_details?.[0]) {
      const filteredList =
        individualProperty?.tenancy_details?.party_details.filter(
          (element) => element?.is_signing_party
        );
      setNumberOfPartyMembers(filteredList);
    }
  }, []);

  const PartyInvitationStatus = [
    {},
    { status_id: 1, status_name: "Invited", color: custom.c4 },
    { status_id: 2, status_name: "Invitation Rejected", color: custom.c8 },
    { status_id: 3, status_name: "Creator", color: custom.c1 },
    {
      status_id: 4,
      status_name: "Invitation Accepted",
      color: "#2bbc15",
    },
    { status_id: 5, status_name: "No longer a party", color: custom.c8 },
    { status_id: 6, status_name: "Invitation Withdrawn", color: custom.c7 },
  ];

  const PartyItem = ({ data, index }) => {
    return (
      <>
        {utilityModalData && <UtilityModal>{utilityModalData}</UtilityModal>}

        <Card
          variant="outlined"
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alginItems: "center",
            padding: 2,
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
            <Box display="flex">
              <Typography variant="h6">
                {data?.party_type_name}{" "}
                {data.party_profile_id === userProfile.profile_id ? (
                  <Chip
                    label="You"
                    sx={{
                      height: 25,
                      color: "white",
                      borderRadius: "10px",
                      backgroundColor: "success.main",
                    }}
                  />
                ) : null}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              {true && (
                <Chip
                  label={PartyInvitationStatus[data.status].status_name}
                  sx={{
                    height: 25,
                    color: "white",
                    borderRadius: "10px",
                    backgroundColor: PartyInvitationStatus[data.status].color,
                  }}
                />
              )}

              {pageCheck !== "INVITATION_MODAL" &&
                individualProperty?.basic_details?.party_type_name !==
                  "Witness" &&
                data.status !== 5 && (
                  <Box>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        setSelectedParty(data);
                        if (
                          individualProperty?.tenancy_details
                            ?.agreement_details?.[0]?.document_id
                        ) {
                          dispatch(setAgreementSigningWarningModal(true));
                        } else {
                          dispatch(setEditPropertyPartyModal(true));
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        // setSelectedParty(data);
                        // console.log("Clicked on Button");
                        dispatch(
                          removeTenancyPartiesAction({
                            tenancy_id: data?.tenancy_id,
                            property_id: data?.property_id,
                            tenancy_party_id: data?.tenancy_party_id,
                          })
                        );
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
            </Box>
          </Box>

          <Grid
            container
            columnSpacing={5}
            rowSpacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignContent="stretch"
            wrap="wrap"
          >
            <Grid item sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  First Name:
                </Typography>
                <Typography variant="body1" color="primary">
                  {data?.first_name}
                </Typography>
              </Box>
            </Grid>

            <Grid item sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Last Name:
                </Typography>
                <Typography variant="body1" color="primary">
                  {data?.last_name}
                </Typography>
              </Box>
            </Grid>

            <Grid item sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Email:
                </Typography>
                <Typography variant="body1" color="primary">
                  {data?.email_id}
                </Typography>
              </Box>
            </Grid>

            <Grid item sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Phone:
                </Typography>
                <Typography variant="body1" color="primary">
                  {data?.phone_no}
                </Typography>
              </Box>
            </Grid>

            <Grid item sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Date Of Birth:
                </Typography>
                <Typography variant="body1" color="primary">
                  {moment(data?.dob).format("DD-MMM-YYYY")}
                </Typography>
              </Box>
            </Grid>

            <Grid item sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Is Signing Party:
                </Typography>
                <Typography variant="body1" color="primary">
                  {data?.is_signing_party ? "Yes" : "No"}
                </Typography>
              </Box>
            </Grid>

            {/* <Grid item sm={6}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="body1" color="GrayText">
                                    Identification Name:
                                </Typography>
                                <Typography variant="body1" color="primary">
                                    {data?.party_type_name}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item sm={6}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="body1" color="GrayText">
                                    Identification Number:
                                </Typography>
                                <Typography variant="body1" color="primary">
                                    {data?.tenancy_party_id}
                                </Typography>
                            </Box>
                        </Grid> */}

            {data?.ids_fake?.map((item) => {
              return (
                <Grid item sm={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body1" color="GrayText">
                      {item.typeName}
                    </Typography>
                    <Typography
                      sx={{ cursor: "pointer" }}
                      variant="body1"
                      color="primary"
                      onClick={() => {
                        setUtilityModalData(
                          <>
                            <Box
                              component="img"
                              sx={{
                                height: "100%",
                                width: "100%",
                              }}
                              src={item?.doc}
                            />

                            {data?.party_type_id === 1 ||
                            data?.party_type_id === 2 ? (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  downloadImage(item.doc, item.typeName);
                                }}
                              >
                                Download
                              </Button>
                            ) : null}
                          </>
                        );
                        dispatch(setUtilityModal(true));
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            {/* {data?.party_type_id === 1 ? (
                            <>
                                {pageCheck !== 'INVITATION_MODAL' && (
                                    <Button variant="outlined" color="primary">
                                        Your Are the owner
                                    </Button>
                                )}
                            </>
                        ) : (
                            <>
                                {pageCheck !== 'INVITATION_MODAL' && (
                                    <>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Invite to Tenant Owner
                                        </Button>
                                        <Tooltip
                                            title="Typically price of renewal is the percentage by which the rent will be increased at the end of this tenancy contract"
                                            arrow
                                        >
                                            <IconButton>
                                                <Icon
                                                    sx={{
                                                        color: custom.heading
                                                            .secondary,
                                                    }}
                                                >
                                                    info_outline
                                                </Icon>
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                )}
                            </>
                        )} */}
          </Box>
        </Card>
      </>
    );
  };

  let order = [
    "Owner",
    "Tenant",
    "Witness",
    "Agent-Witness",
    "Agency Member",
    "Agency",
  ];

  individualProperty?.tenancy_details?.party_details?.sort(
    (a, b) =>
      order.indexOf(a.party_type_name) - order.indexOf(b.party_type_name)
  );

  const activeParties =
    individualProperty?.tenancy_details?.party_details?.filter((party) => {
      return party.status === 1 || party.status === 3 || party.status === 4;
    });

  const inactiveParties =
    individualProperty?.tenancy_details?.party_details?.filter((party) => {
      return party.status === 2 || party.status === 5 || party.status === 6;
    });

  return (
    <>
      {/* <CustomSnackbar
                loaderChild={CREATE_NEW_TENANCY}
                successMessage="New Tenancy Created Successfully !"
            /> */}
      <CustomSnackbar
        loaderChild={ADD_TENANCY_PARTIES}
        successMessage="New Party Added Successfully !"
        errorMessage={ADD_TENANCY_PARTIES?.error}
      />
      <CustomSnackbar
        loaderChild={DEACTIVATE_TENANCY}
        successMessage="Tenancy Deactivated Successfully !"
        errorMessage={DEACTIVATE_TENANCY?.error}
      />
      <CustomSnackbar
        loaderChild={EDIT_TENANCY_PARTIES}
        successMessage="Party Details Updated Successfully !"
        errorMessage={EDIT_TENANCY_PARTIES?.error}
      />

      {/* Modal for editing the part details */}
      {openEditPropertyPartyModal && selectedParty && (
        <>
          <EditPropertyPartyModal payload={selectedParty} />
        </>
      )}

      {/* 
                    Modal that will pop up when current user name is different from the party owner in tenancy details. 
                     When create new tenancy api finishes its execution and party is added to individual property
                    */}
      <UpdateUserProfileModal />

      {/* If Tenancy party doesn't exist   */}
      <Box sx={{ position: "relative" }}>
        <Box
          id="blank-overlapping-container"
          sx={{
            display: isPremiumUser ? "none" : "block",
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 2,
          }}
        />
        <Card
          id="parties"
          sx={{
            filter: isPremiumUser ? "unset" : "blur(2.5px) grayscale(60%)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
            my: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5">Parties in Rent Agreement</Typography>

            <Tooltip
              title="You can add and specify the details of all individuals or entities involved in the rental agreement."
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
                    tutorialLink: "https://www.youtube.com/embed/J828uvG8xC4",
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

          {CREATE_NEW_TENANCY?.isLoading === true ||
          DEACTIVATE_TENANCY?.isLoading === true ||
          ADD_TENANCY_PARTIES?.isLoading === true ||
          REMOVE_TENANCY_PARTIES?.isLoading === true ||
          EDIT_TENANCY_PARTIES?.isLoading === true ? (
            <Box sx={{ height: 100 }}>
              <Loading />
            </Box>
          ) : (
            <>
              {activeParties?.map((item, i) => {
                return <PartyItem data={item} index={i} />;
              })}
              <>
                {inactiveParties?.length > 0 && (
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "3px",
                      backgroundColor: "#f100002e",
                      padding: "3px",
                    }}
                  >
                    {inactiveParties?.map((party, i) => {
                      return <PartyItem data={party} index={i} />;
                    })}
                  </Card>
                )}
              </>
              {pageCheck !== "INVITATION_MODAL" && (
                <>
                  {/* Limit crossed for adding new signing parties */}
                  {false ? (
                    <>
                      <Typography
                        variant="caption"
                        color={custom.text.disabled}
                      >
                        NOTE : You have added {maxNumberOfPartyMembers} signing
                        party members, It will cost 1 credit point to add 3 more
                        party members
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          if (
                            individualProperty?.tenancy_details
                              ?.agreement_details?.[0]?.document_id
                          ) {
                            dispatch(setAgreementSigningWarningModal(true));
                          } else {
                            // Check if user has enough wallet points
                            if (false) {
                              setPremiumPackageStatusModal(true);
                            }
                            // Open add party modal here
                            dispatch(setAddPropertyPartiesModal(true));
                          }
                        }}
                      >
                        Add Party
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if (
                          individualProperty?.tenancy_details
                            ?.agreement_details?.[0]?.document_id
                        ) {
                          dispatch(setAgreementSigningWarningModal(true));
                        } else {
                          // If tenancy id is not present
                          // if (
                          //   !individualProperty?.tenancy_details
                          //     ?.party_details?.[0]
                          // ) {
                          //   openCreateNewTenancyModal();
                          // } else {
                          //   // Open add party modal here 🟢
                          //   dispatch(setAddPropertyPartiesModal(true));
                          // }
                          if (
                            !individualProperty?.tenancy_details?.is_party_flag
                          ) {
                            dispatch(setAddPartyConfirmModal(true));
                          } else {
                            setAddingParty(false);
                            dispatch(setAddPropertyPartiesModal(true));
                          }
                        }
                      }}
                    >
                      Add Party
                    </Button>
                  )}
                </>
              )}
            </>
          )}
        </Card>
      </Box>
    </>
  );
};

export default ViewPropertyParties;
