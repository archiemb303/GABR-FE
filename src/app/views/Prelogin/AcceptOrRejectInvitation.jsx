import {
  CheckCircleOutline,
  InfoOutlined,
  PlayCircleOutline,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Chip,
  Fade,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { acceptOrRejectInviteAction } from "app/redux/actions/PreloginActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";

import Loading from "app/components/MatxLoading";
import { useTheme } from "@emotion/react";
import InvitationButton from "../Property/InvitationButton";
import { managePartyInvitationsAction } from "app/redux/actions/PropertyActions";
import {
  setInvitationPropertyInfoModal,
  setVideoTutorialModal,
} from "app/redux/actions/ModalActions";
import moment from "moment";

export default function AcceptorRejectInvitation() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { custom } = useTheme();

  const invitationStatus = useSelector(
    (state) => state.prelogin.invitationStatus
  );
  const { DIRECT_ACCEPT_OR_REJECT_INVITE } = useSelector(
    (store) => store.loadingAndError.loader
  );
  const tenancy_party_id = searchParams.get("tenancy_party_id");
  useEffect(() => {
    // const party_action = searchParams.get("party_action");
    dispatch(
      acceptOrRejectInviteAction({
        tenancy_party_id: tenancy_party_id,
        party_action: null,
      })
    );
  }, []);
  const handleInvitations = (action) => {
    dispatch(
      acceptOrRejectInviteAction({
        tenancy_party_id: tenancy_party_id,
        party_action: action,
      })
    );
  };
  useEffect(() => {
    if (DIRECT_ACCEPT_OR_REJECT_INVITE?.isLoading)
      return (
        <Grid
          item
          md={9}
          sm={12}
          sx={{ height: 100 }}
          justifyContent="center"
          alignItems="center"
        >
          <Loading />
        </Grid>
      );
  }, [DIRECT_ACCEPT_OR_REJECT_INVITE?.isLoading]);

  const InviteButton = ({ propertyInvitation }) => {
    if (propertyInvitation?.invite_status === 1) {
      return (
        <Grid
          padding={1}
          gap={1}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            onClick={() => handleInvitations("accept")}
            variant="body2"
            sx={{
              color: "#fff",
              padding: "5px 11px",
              borderRadius: "4px",
              backgroundColor: custom.c4,
              fontSize: "0.98em",
              cursor: "pointer",
            }}
          >
            Accept
          </Typography>
          <Typography
            onClick={() => handleInvitations("reject")}
            variant="body2"
            sx={{
              color: "#fff",
              padding: "5px 11px",
              borderRadius: "4px",
              fontSize: "0.98em",
              backgroundColor: custom.c8,
              cursor: "pointer",
            }}
          >
            Reject
          </Typography>
        </Grid>
      );
    }

    if (propertyInvitation?.invite_status === 2) {
      return (
        <Grid padding={1} container justifyContent="center" alignItems="center">
          <Typography
            variant="body2"
            sx={{
              color: "#fff",
              padding: "5px 11px",
              borderRadius: "4px",
              backgroundColor: custom.c8,
              fontSize: "0.75em",
            }}
          >
            Invitation Rejected
          </Typography>
        </Grid>
      );
    }

    if (propertyInvitation?.invite_status === 3) {
      return (
        <Grid padding={1} container justifyContent="center" alignItems="center">
          <Typography
            onClick={() => handleInvitations("withdraw")}
            variant="body2"
            sx={{
              color: "#fff",
              padding: "5px 11px",
              borderRadius: "4px",
              backgroundColor: custom.c4,
              fontSize: "0.75em",
              cursor: "pointer",
            }}
          >
            Withdraw
          </Typography>
        </Grid>
      );
    }

    if (propertyInvitation?.invite_status === 4) {
      return (
        <Grid padding={1} container justifyContent="center" alignItems="center">
          <Typography
            variant="body2"
            sx={{
              color: "#fff",
              padding: "5px 11px",
              borderRadius: "4px",
              backgroundColor: custom.c4,
              fontSize: "0.75em",
            }}
          >
            Invitation Accepted
          </Typography>
        </Grid>
      );
    }

    if (propertyInvitation?.invite_status === 5) {
      return (
        <Grid padding={1} container justifyContent="center" alignItems="center">
          <Typography
            variant="body2"
            sx={{
              color: "#fff",
              padding: "5px 11px",
              borderRadius: "4px",
              backgroundColor: custom.c8,
              fontSize: "0.75em",
            }}
          >
            No longer a party
          </Typography>
        </Grid>
      );
    }
  };

  const ModalHeader = ({ propertyInvitation }) => {
    const { custom } = useTheme();

    return propertyInvitation?.invite_status === 3 ? null : (
      <Box
        sx={{
          borderRadius: "5px",
          padding: "10px 0px",
          backgroundColor: custom.c7,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "15px",
            margin: 0,
            whiteSpace: "nowrap",
          }}
          variant="h5"
        >
          {propertyInvitation?.inviting_party_name &&
          propertyInvitation?.inviting_party_name ? (
            <>
              You have been invited by {propertyInvitation?.inviting_party_name}{" "}
              for this property
            </>
          ) : (
            <>You cannot see details of a property you are not a party of.</>
          )}
        </Typography>
        <Box marginTop={1}>
          <InviteButton propertyInvitation={propertyInvitation} />
        </Box>
        {propertyInvitation?.invite_status === 4 && (
          <Box display={"flex"} justifyContent={"center"}>
            <Typography>
              Please{" "}
              <Link to={"/dashboard"}>
                <span style={{ color: "blue" }}>Login</span>
              </Link>{" "}
              to Continue
            </Typography>
          </Box>
        )}
      </Box>
    );
  };
  const BasicDetails = ({ individualProperty, pageCheck }) => {
    return (
      <>
        <Card
          id="basicDetails"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alginItems: "center",
            padding: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              mb: 2,
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flex: "3",
                alignItems: "center",
                gap: "5px",
                flexWrap: "wrap",
              }}
            >
              <Typography sx={{ whiteSpace: "nowrap" }} variant="h5">
                Basic Details
              </Typography>
              {pageCheck !== "INVITATION_MODAL" && (
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    color: "#000000c2",
                    padding: 0.5,
                    borderRadius: "4px",
                    fontSize: "12px",
                    backgroundColor: "#1976d21a",
                  }}
                >
                  Property Id:&nbsp;
                  {individualProperty?.property_basic_details?.property_id.substring(
                    individualProperty?.property_basic_details?.property_id
                      .length - 5,
                    individualProperty?.property_basic_details?.property_id
                      .length
                  )}
                </Typography>
              )}
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  color: "#000000c2",
                  padding: 0.5,
                  borderRadius: "4px",
                  fontSize: "12px",
                  backgroundColor: "#1976d21a",
                }}
              >
                Relationship:&nbsp;
                {individualProperty?.property_basic_details?.party_type_name ||
                  individualProperty?.property_basic_details
                    ?.property_creator_type_name}
              </Typography>
            </Box>
          </Box>
          <Grid
            container
            rowSpacing={1}
            // columnSpacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignContent="stretch"
            wrap="wrap"
          >
            <Grid item xs={12}>
              <Box display="flex" alignItems="stretch" gap={1}>
                <Typography
                  variant="body1"
                  color="GrayText"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  Property Name:
                </Typography>
                <Typography variant="body1" color="primary">
                  {individualProperty?.property_basic_details?.property_name}
                </Typography>
              </Box>
              {/* <EditComponent size={'small'} /> */}
            </Grid>
            <Grid item sm={6}>
              <Box display="flex" alignItems="stretch" gap={1}>
                {/* <EditComponent size={'small'} /> */}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="stretch" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Property Type:
                </Typography>
                <Typography variant="body1" color="primary">
                  {
                    individualProperty?.property_basic_details
                      ?.property_type_name
                  }
                </Typography>
                {/* <EditComponent size={'small'} /> */}
              </Box>
            </Grid>

            <Grid item sm={4} xs={12}>
              <Box display="flex" alignItems="stretch" gap={1}>
                <Typography variant="body1" color="GrayText">
                  City:
                </Typography>
                <Typography variant="body1" color="primary">
                  {individualProperty?.property_basic_details?.city_name}
                </Typography>
                {/* <EditComponent size={'small'} /> */}
              </Box>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Box display="flex" alignItems="stretch" gap={1}>
                <Typography variant="body1" color="GrayText">
                  State:
                </Typography>
                <Typography variant="body1" color="primary">
                  {individualProperty?.property_basic_details?.state_name}
                </Typography>
                {/* <EditComponent size={'small'} /> */}
              </Box>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Box display="flex" alignItems="stretch" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Pincode:
                </Typography>
                <Typography variant="body1" color="primary">
                  {individualProperty?.property_basic_details?.pincode}
                </Typography>
                {/* <EditComponent size={'small'} /> */}
              </Box>
            </Grid>

            {individualProperty?.property_basic_details?.space_details.map(
              (item) => {
                return (
                  <Grid item sm={4} xs={6}>
                    <Box display="flex" alignItems="stretch" gap={1}>
                      <Typography variant="body1" color="GrayText">
                        {item?.space_type}:
                      </Typography>
                      <Typography variant="body1" color="primary">
                        {item?.space_count}
                      </Typography>
                      {/* <EditComponent size={'small'} /> */}
                    </Box>
                  </Grid>
                );
              }
            )}
            {individualProperty?.property_basic_details?.furnishing_type && (
              <Grid item sm={8} xs={12}>
                {/* <Box display="flex" alignItems="stretch" gap={1}>
                  <Typography variant="body1" color="GrayText">
                    Furnishing Type:
                  </Typography>
                  <Typography variant="body1" color="primary">
                    {
                      individualProperty?.listing_details?.furnishing_details.filter(
                        (m) =>
                          m.furnishing_id ===
                          individualProperty?.property_basic_details
                            ?.furnishing_type
                      )[0].furnishing_name
                    }
                  </Typography>
                </Box> */}
              </Grid>
            )}
          </Grid>
        </Card>
      </>
    );
  };

  const PartyItem = ({ data, index }) => {
    const { userProfile } = useSelector((state) => state);
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

    return (
      <>
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
          </Grid>
        </Card>
      </>
    );
  };
  const TenancyParties = ({ individualProperty, pageCheck }) => {
    // return individualProperty.tenancy_party_details.map((item, index) => {
    // return <PartyItem data={item} index={index} />;
    let order = [
      "Owner",
      "Tenant",
      "Witness",
      "Agent-Witness",
      "Agency Member",
      "Agency",
    ];

    individualProperty?.tenancy_party_details?.sort(
      (a, b) =>
        order.indexOf(a.party_type_name) - order.indexOf(b.party_type_name)
    );
    return (
      <>
        <Card
          id="parties"
          sx={{
            // filter: isPremiumUser ? "unset" : "blur(2.5px) grayscale(60%)",
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

          {/* {CREATE_NEW_TENANCY?.isLoading === true ||
            DEACTIVATE_TENANCY?.isLoading === true ||
            ADD_TENANCY_PARTIES?.isLoading === true ||
            REMOVE_TENANCY_PARTIES?.isLoading === true ||
            EDIT_TENANCY_PARTIES?.isLoading === true ? (
              <Box sx={{ height: 100 }}>
                <Loading />
              </Box>
            ) : ( */}
          <>
            {individualProperty.tenancy_party_details?.map((item, i) => {
              return <PartyItem data={item} index={i} />;
            })}
            {/* <>
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
                </> */}
          </>
          {/* )} */}
        </Card>
      </>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <CheckCircleOutline
                  color="success"
                  sx={{ fontSize: "15rem" }}
                /> */}

      {/* {invitationStatus?.invite_status === 1 ? (
        <Box>
          <Typography
            textAlign="center"
            mb={2}
            id="modal-modal-title"
            variant="h5"
          >
            You have been invited to join {invitationStatus?.property_name} as{" "}
            {invitationStatus?.party_type_name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleInvitation("accept");
              }}
            >
              Accept
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                handleInvitation("reject");
              }}
            >
              Reject
            </Button>
          </Box>
        </Box>
      ) : invitationStatus?.invite_status === 4 ? (
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
              <CheckCircleOutline color="success" sx={{ fontSize: "15rem" }} />
              <Typography
                textAlign="center"
                mt={2}
                id="modal-modal-title"
                variant="h5"
              >
                Invitation has Been Accepted. Please{" "}
                <Link to={"/dashboard"}>
                  <span style={{ color: "blue" }}>Login</span>
                </Link>{" "}
                to continue!
              </Typography>
            </Box>
          </Box>
        </Fade>
      ) : invitationStatus?.invite_status === 2 ? (
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
              <ErrorIcon color="error" sx={{ fontSize: "15rem" }} />
              <Typography
                textAlign="center"
                mt={2}
                id="modal-modal-title"
                variant="h5"
              >
                Invitation has been Rejected!
              </Typography>
            </Box>
          </Box>
        </Fade>
      ) : invitationStatus?.invite_status === 5 ? (
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
              <ErrorIcon color="error" sx={{ fontSize: "15rem" }} />
              <Typography
                textAlign="center"
                mt={2}
                id="modal-modal-title"
                variant="h5"
              >
                You are no longer a Party
              </Typography>
            </Box>
          </Box>
        </Fade>
      ) : invitationStatus?.invite_status === 6 ? (
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
              <ErrorIcon color="error" sx={{ fontSize: "15rem" }} />
              <Typography
                textAlign="center"
                mt={2}
                id="modal-modal-title"
                variant="h5"
              >
                The Invitation has been Withdrawn, Please contact the owner of
                this Property
              </Typography>
            </Box>
          </Box>
        </Fade>
      ) : (
        <Grid
          item
          md={9}
          sm={12}
          sx={{ height: 100 }}
          justifyContent="center"
          alignItems="center"
        >
          <Loading />
        </Grid>
      )}
       */}
      {invitationStatus?.property_basic_details && (
        <Box
          component={"div"}
          display="flex"
          flexDirection="column"
          width="60%"
          gap={2}
        >
          <ModalHeader propertyInvitation={invitationStatus} />
          <BasicDetails individualProperty={invitationStatus} />
          {/* <ViewPropertyBasicDetails pageCheck={"INVITATION_MODAL"} />
      <PropertyImages pageCheck={"INVITATION_MODAL"} />
    <ViewPropertyParties pageCheck={"INVITATION_MODAL"} /> */}
          <TenancyParties
            individualProperty={invitationStatus}
            pageCheck={"INVITATION_MODAL"}
          />
          <ModalHeader propertyInvitation={invitationStatus} />
        </Box>
      )}
    </Box>
  );
}
