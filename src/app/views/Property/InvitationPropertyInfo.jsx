import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Card, Grid, IconButton, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import Loading from "app/components/MatxLoading";
import { setInvitationPropertyInfoModal } from "app/redux/actions/ModalActions";
import { useDispatch, useSelector } from "react-redux";
import InvitationButton from "./InvitationButton";
import PropertyImages from "./PropertyImages";
import ViewPropertyBasicDetails from "./ViewPropertyBasicDetails";
import ViewPropertyParties from "./ViewPropertyParties";

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
  backgroundColor: "#f1f1f1",
};

const ModalHeader = ({ propertyInvitation }) => {
  const { custom } = useTheme();

  return propertyInvitation?.status_id === 3 ? null : (
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
        {propertyInvitation?.sender_fname &&
        propertyInvitation?.sender_lname ? (
          <>
            You have been invited by{" "}
            {propertyInvitation?.sender_fname +
              " " +
              propertyInvitation?.sender_lname}{" "}
            for this property
          </>
        ) : (
          <>You cannot see details of a property you are not a party of.</>
        )}
      </Typography>
      <Box marginTop={1}>
        <InvitationButton propertyInvitation={propertyInvitation} />
      </Box>
    </Box>
  );
};

const InvitationPropertyInfo = () => {
  const open = useSelector(
    (store) => store.modal.openInvitationPropertyInfoModal
  );

  const { GET_INDIVIDUAL_PROPERTY } = useSelector(
    (store) => store.loadingAndError.loader
  );

  const { fetchMyInvitations, individualProperty } = useSelector(
    (store) => store.property
  );

  const propertyInvitation = fetchMyInvitations?.filter((invitation) => {
    return (
      invitation.property_id_id ===
      individualProperty?.basic_details?.property_id
    );
  })[0];

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setInvitationPropertyInfoModal(false));
  };

  return (
    <>
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

          {GET_INDIVIDUAL_PROPERTY?.isLoading === true ? (
            <Box sx={{ height: "150px" }}>
              <Loading></Loading>
            </Box>
          ) : (
            <>
              <ModalHeader propertyInvitation={propertyInvitation} />
              <ViewPropertyBasicDetails pageCheck={"INVITATION_MODAL"} />
              <PropertyImages pageCheck={"INVITATION_MODAL"} />
              <ViewPropertyParties pageCheck={"INVITATION_MODAL"} />
              <ModalHeader propertyInvitation={propertyInvitation} />
            </>
          )}
        </Card>
      </Modal>
    </>
  );
};

export default InvitationPropertyInfo;
