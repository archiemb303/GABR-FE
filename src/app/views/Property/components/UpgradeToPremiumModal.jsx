import CloseIcon from "@mui/icons-material/Close";
import { Button, Card, Grid, IconButton, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import {
  setAgreementSigningWarningModal,
  setOpenMemberAlreadyPremiumModal,
  setOpenUpgradeToPremiumModal,
  setPackagePreferenceModal,
} from "app/redux/actions/ModalActions";
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

const UpgradeToPremiumModal = () => {
  const dispatch = useDispatch();
  const { generatedAgreementDraft } = useSelector((state) => state.property);

  const open = useSelector((state) => state.modal.openUpgardeToPremiumModal);

  const handleClose = () => {
    dispatch(setOpenUpgradeToPremiumModal(false));
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
          <Grid container justifyContent="center" alignItems="center">
            <Typography
              mb={3}
              id="modal-modal-title"
              variant="body1"
              sx={{ fontSize: "15px" }}
            >
              This is a premium only feature. Please upgrade to premium to use
              this feature
            </Typography>
          </Grid>
          <Grid container gap={3} justifyContent="center" alignItems="center">
            <Button
              onClick={() => {
                if (generatedAgreementDraft?.premium_party_present === 1)
                  dispatch(setOpenMemberAlreadyPremiumModal(true));
                else dispatch(setPackagePreferenceModal(true));
                handleClose();
              }}
              variant="contained"
            >
              Upgrade to premium to view standard draft
            </Button>
          </Grid>
        </Card>
      </Modal>
    </>
  );
};

export default UpgradeToPremiumModal;
