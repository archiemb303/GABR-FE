import CloseIcon from "@mui/icons-material/Close";
import { Button, Card, Grid, IconButton, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { setAgreementSigningConfirmationModal } from "app/redux/actions/ModalActions";
import { addStampPaperRequestsAction, initiateAgreementSigningAction } from "app/redux/actions/PropertyActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
};

const AgreementSigningConfirmationModal = () => {
  const { individualProperty } = useSelector((state) => state.property);
  const { INITIATE_AGREEMENT_SIGNING } = useSelector(
    (store) => store.loadingAndError.loader
  );

  const dispatch = useDispatch();

  const open = useSelector(
    (state) => state.modal.openAgreementSigningConfirmationModal
  );

  const handleClose = () => {
    dispatch(setAgreementSigningConfirmationModal(false));
  };

  const initiateSigning = () => {
    var primaryParties = [];
      var secondaryParties = [];
      for (var party of individualProperty?.tenancy_details?.party_details) {
        if(party?.status === 3 || party?.status === 4){
          if (party?.party_type_id === 1) {
            primaryParties.push(party?.tenancy_party_id);
          } else {
            secondaryParties.push(party?.tenancy_party_id);
          }
        }
      }
      dispatch(
        addStampPaperRequestsAction({
          primary: primaryParties,
          secondary: secondaryParties,
          tenancy_id:
            individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
        })
      );
    // dispatch(
    //   initiateAgreementSigningAction({
    //     property_id: individualProperty?.basic_details?.property_id,
    //     tenancy_id:
    //       individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
    //     tenancy_agreement_id:
    //       individualProperty?.tenancy_details?.agreement_details.length == 0
    //         ? ""
    //         : individualProperty?.tenancy_details?.agreement_details[0]
    //             .tenancy_agreement_id,
    //   })
    // );
    handleClose();
  };

  // useEffect(() => {
  //   if (INITIATE_AGREEMENT_SIGNING?.isLoading === false) {
  //     var primaryParties = [];
  //     var secondaryParties = [];
  //     for (var party of individualProperty?.tenancy_details?.party_details) {
  //       if (party?.party_type_id === 1) {
  //         primaryParties.push(party?.tenancy_party_id);
  //       } else {
  //         secondaryParties.push(party?.tenancy_party_id);
  //       }
  //     }
  //     dispatch(
  //       addStampPaperRequestsAction({
  //         primary: primaryParties,
  //         secondary: secondaryParties,
  //         tenancy_id:
  //           individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
  //       })
  //     );
  //   }
  // }, [INITIATE_AGREEMENT_SIGNING?.isLoading]);

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
          <Grid container justifyContent="center" alignItems="center">
            <Typography
              textAlign="center"
              mb={2}
              id="modal-modal-title"
              variant="h5"
            >
              Are you sure?
            </Typography>
            <Typography
              textAlign="center"
              mb={3}
              id="modal-modal-title"
              variant="body1"
              sx={{ fontSize: "15px" }}
            >
              You won't be able to edit any information related to this property
              once you initiate the agreement signing process.
            </Typography>
          </Grid>
          <Grid container gap={3} justifyContent="center" alignItems="center">
            <Button variant="contained" onClick={() => initiateSigning()}>
              Confirm
            </Button>
          </Grid>
        </Card>
      </Modal>
    </>
  );
};

export default AgreementSigningConfirmationModal;
