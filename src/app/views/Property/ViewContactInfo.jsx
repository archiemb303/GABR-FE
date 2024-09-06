import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Typography,
  IconButton,
  Grid,
  Link,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/system";

import React from "react";
import {
  setAgreementSigningWarningModal,
  setEditContactInfoModal,
  setEmailOtpModal,
  setPhoneOtpModal,
  setVideoTutorialModal,
} from "app/redux/actions/ModalActions";
import {
  InfoOutlined,
  PlayCircleOutline,
} from "@mui/icons-material";
import { sendListingContactOtpAction } from "app/redux/actions/PropertyActions";
import EmailVerificationModal from "./EmailVerificationModal";
import MobileVerificationModal from "./MobileVerificationModal";
import Loading from "app/components/MatxLoading";
import CustomSnackbar from "app/components/CustomSnackbar";

const ViewContactInfo = ({ isIntoView }) => {
  const { ADD_OR_UPDATE_LISTING_CONTACT, VERIFY_LISTING_CONTACT_OTP } =
    useSelector((store) => store.loadingAndError.loader);
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const { individualProperty } = useSelector((state) => state.property);
  const { custom } = useTheme();

  const handleVerify = (contactType) => {
    dispatch(
      sendListingContactOtpAction({
        property_id: individualProperty?.basic_details?.property_id,
        listing_contact_ids: [
          individualProperty?.listing_details?.contact_info?.filter(
            (contact) => contact?.contact_type === contactType
          )?.[0]?.contact_id,
        ],
      })
    );
    if (contactType === 1) {
      dispatch(setEmailOtpModal(true));
    } else {
      dispatch(setPhoneOtpModal(true));
    }
  };

  return (
    <>
      <EmailVerificationModal individualProperty={individualProperty} />
      <MobileVerificationModal individualProperty={individualProperty} />
      {VERIFY_LISTING_CONTACT_OTP?.isLoading === false && (
        <CustomSnackbar
          loaderChild={VERIFY_LISTING_CONTACT_OTP}
          successMessage="Contact verified Successfully !"
        />
      )}
      <Card
        id="contactDetails"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alginItems: "center",
          padding: 2,
          // maxWidth: 400,
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
            <Typography variant="h5">Contact Details</Typography>

            <Tooltip
              title="Once you put your property up for rent to find tenants, this is the information that will be visible to home-seekers."
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
                    tutorialLink: "https://www.youtube.com/embed/3r4xSKqGIOo",
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
          <Box display="flex" alignItems="center">
            {(individualProperty?.listing_details?.listing_status === 5 ||
              individualProperty?.listing_details?.listing_status === 6) && (
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  color: "white",
                  padding: 0.5,
                  borderRadius: "4px",
                  fontSize: "12px",
                  backgroundColor: custom.unverified,
                }}
              >
                Listing Closed
              </Typography>
            )}
            {(individualProperty?.listing_details?.listing_status === 2 ||
              individualProperty?.listing_details?.listing_status === 3) && (
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  color: "white",
                  padding: 0.5,
                  borderRadius: "4px",
                  fontSize: "12px",
                  backgroundColor: custom.c6,
                }}
              >
                Active-Listed
              </Typography>
            )}
            {individualProperty?.listing_details?.listing_status === 1 && (
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  color: "white",
                  padding: 0.5,
                  borderRadius: "4px",
                  fontSize: "12px",
                  backgroundColor: custom.c1,
                }}
              >
                Active-Draft
              </Typography>
            )}
            <IconButton
              sx={{ marginLeft: "10px" }}
              aria-label="edit"
              onClick={() => {
                if (
                  individualProperty?.tenancy_details?.agreement_details[0]
                    ?.document_id
                ) {
                  dispatch(setAgreementSigningWarningModal(true));
                } else {
                  dispatch(setEditContactInfoModal(true));
                }
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </Box>

        {ADD_OR_UPDATE_LISTING_CONTACT?.isLoading === true ||
        VERIFY_LISTING_CONTACT_OTP?.isLoading === true ? (
          <Grid
            sx={{
              height: "85px",
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Loading></Loading>
          </Grid>
        ) : (individualProperty?.listing_details !== null) && ("contact_info" in individualProperty?.listing_details) &&
          (individualProperty?.listing_details?.contact_info?.length > 0) ? (
          <>
            <CustomSnackbar
              loaderChild={ADD_OR_UPDATE_LISTING_CONTACT}
              successMessage="Contact details updated Successfully !"
            />
            {individualProperty?.listing_details?.contact_info?.map(
              (contact) => {
                return (
                  <>
                    <Grid
                      container
                      alignItems="center"
                      mb={1}
                      justifyContent="space-between"
                    >
                      <Grid display="flex">
                        <Typography
                          variant="body1"
                          style={{
                            marginRight: "10px",
                          }}
                          color="GrayText"
                          marginBottom={1}
                        >
                          {contact.contact_type === 1 ? "Email:" : "Phone:"}
                        </Typography>
                        <Typography
                          sx={{ display: "flex", alignItems: "center" }}
                          variant="body1"
                          color="primary"
                          marginBottom={1}
                        >
                          {contact.contact_info}
                          {contact.contact_status === 1 ? (
                            <span
                              style={{
                                marginLeft: "5px",
                                backgroundColor: "rgba(23, 145, 25, 0.34)",
                                borderRadius: "8px",
                                padding: "4px",
                                fontSize: "10px",
                                color: custom.verified,
                              }}
                            >
                              Verified
                            </span>
                          ) : (
                            <span
                              style={{
                                marginLeft: "5px",
                                backgroundColor: "rgba(242, 31, 31, 0.33)",
                                borderRadius: "8px",
                                padding: "4px",
                                color: custom.unverified,
                                fontSize: "10px",
                              }}
                            >
                              Not verified
                            </span>
                          )}
                        </Typography>
                      </Grid>

                      <Grid display="flex" alignItems="flex-start">
                        {contact.contact_status === 2 && (
                          <Link
                            onClick={() => handleVerify(contact.contact_type)}
                            sx={{ cursor: "pointer" }}
                          >
                            Verify now
                          </Link>
                        )}
                      </Grid>

                      {/* <Grid xs={2} >
                                             <Typography variant="body1" color="GrayText" marginBottom={1}>
                                                 Email:
                                             </Typography>
                                         </Grid>
                                  
                                         <Grid container alignItems='flex-start' justifyContent='space-between' xs={10}>
                                             {
                                                 ("contact_info" in individualProperty?.listing_details) &&
                                                 <>
                                                     <Typography sx={{ display: 'flex', alignItems: 'center' }} variant="body1" color="primary" marginBottom={1}>
                                                         {individualProperty?.listing_details?.contact_info?.[1]?.contact_info}
                                                         {individualProperty?.listing_details?.contact_info?.[1]?.contact_status === 1
                                                             ?
                                                             <span style={{
                                                                 marginLeft: '5px',
                                                                 backgroundColor: 'rgba(23, 145, 25, 0.34)',
                                                                 borderRadius: '8px',
                                                                 padding: '4px',
                                                                 color: '#179119',
                                                                 fontSize: '10px'
                                                             }}>Verified</span>
                                                             :
                                                             <span style={{
                                                                 marginLeft: '5px',
                                                                 backgroundColor: 'rgba(242, 31, 31, 0.33)',
                                                                 borderRadius: '8px',
                                                                 padding: '4px',
                                                                 color: '#F21F1F',
                                                                 fontSize: '10px'
                                                             }}>Not verified</span>}
                                                     </Typography>
                                                     {
                                                         individualProperty?.listing_details?.contact_info?.[1]?.contact_status === 2 &&
                                                         <Link onClick={() => handleVerify('email')} sx={{ cursor: 'pointer' }}>Verify now</Link>
                                                     }
                                                 </>
                                             }
                                  
                                         </Grid> */}
                    </Grid>
                  </>
                );
              }
            )}
          </>
        ) : (
          <Grid container alignItems="center" mb={3}>
            <Grid xs={12}>
              <Typography variant="body1" color="GrayText" marginBottom={1}>
                Phone:{" "}
                <Typography
                  onClick={() => {
                    dispatch(setEditContactInfoModal(true));
                  }}
                  style={{ display: "inline", cursor: "pointer" }}
                >
                  <Link variant="subtitle2" style={{ textDecoration: "none" }}>
                    Add Phone Number
                  </Link>
                </Typography>
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Typography variant="body1" color="GrayText" marginBottom={1}>
                Email:{" "}
                <Typography
                  onClick={() => {
                    dispatch(setEditContactInfoModal(true));
                  }}
                  style={{ display: "inline", cursor: "pointer" }}
                >
                  <Link variant="subtitle2" style={{ textDecoration: "none" }}>
                    Add Email Address{" "}
                  </Link>
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        )}
      </Card>
    </>
  );
};

export default ViewContactInfo;
