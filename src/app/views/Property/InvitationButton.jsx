import { useTheme } from "@emotion/react";
import { setInvitationPropertyInfoModal } from "app/redux/actions/ModalActions";
import {
  GET_INDIVIDUAL_PROPERTY,
  RESET_PROPERTY,
  getIndividualPropertyAction,
  managePartyInvitationsAction,
  removeTenancyPartiesAction,
} from "app/redux/actions/PropertyActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Grid, Typography } = require("@mui/material");

const InvitationButton = ({ propertyInvitation }) => {
  const { custom } = useTheme();
  const dispatch = useDispatch();
  const { fetchMyInvitations, individualProperty } = useSelector(
    (store) => store.property
  );

  const handleInvitations = (action) => {
    dispatch(
      managePartyInvitationsAction({
        property_id: propertyInvitation?.property_id_id,
        tenancy_party_id: propertyInvitation?.tenancy_party_id,
        tenancy_id: propertyInvitation?.tenancy_id_id,
        party_action: action,
      })
    );
    dispatch(setInvitationPropertyInfoModal(false));

    if (
      action === "reject" &&
      propertyInvitation?.property_id_id ===
        individualProperty?.basic_details?.property_id
    ) {
      dispatch({
        type: GET_INDIVIDUAL_PROPERTY,
        payload: null
      });
    }
  };

  if (propertyInvitation?.status_id === 1) {
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

  if (propertyInvitation?.status_id === 2) {
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

  if (propertyInvitation?.status_id === 3) {
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

  if (propertyInvitation?.status_id === 4) {
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

  if (propertyInvitation?.status_id === 5) {
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

  return null;
};

export default InvitationButton;
