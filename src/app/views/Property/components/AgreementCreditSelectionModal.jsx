import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import {
  setAgreementSigningConfirmationModal,
  setOpenAgreementCreditSelectionModal,
  setPackagePreferenceSuccessModal,
} from "app/redux/actions/ModalActions";
import {
  addStampPaperRequestsAction,
  initiateAgreementSigningAction,
  markPremiumTenancyBySeekerIDAction,
} from "app/redux/actions/PropertyActions";
import { useEffect, useState } from "react";
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

const AgreementCreditSelectionModal = () => {
  const { individualProperty } = useSelector((state) => state.property);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [idType, setIdType] = useState("");
  const open = useSelector(
    (state) => state.modal.openAgreementCreditSelectionModal
  );

  const handleClose = () => {
    dispatch(setOpenAgreementCreditSelectionModal(false));
  };
  const { generatedAgreementDraft } = useSelector((state) => state.property);

  const handleSubmit = () => {
    dispatch(
      markPremiumTenancyBySeekerIDAction({
        listing_id: idType === "listing" ? id : "",
        seeker_id: idType === "seeker" ? id : "",
        tenancy_id:
          individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
      })
    );
    handleClose();
    dispatch(setPackagePreferenceSuccessModal(true));
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
          <Grid container justifyContent="center" alignItems="center" gap={2}>
            <Typography>
              Seems like you have a free rental agreement that came along with
              your below mentioned packages. Please select the package whose
              rental agreement credit you want to use
            </Typography>
            <FormControl>
              <FormLabel
                id="demo-radio-buttons-group-label"
                sx={{ fontWeight: "500", color: "black" }}
              ></FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                {generatedAgreementDraft?.premium_listing_seeker_ids?.listing_ids?.map(
                  (listing) => (
                    <FormControlLabel
                      value={listing}
                      control={<Radio />}
                      label={listing}
                      onChange={(e) => {
                        setId(e.target.value);
                        setIdType("listing");
                      }}
                    />
                  )
                )}
                {generatedAgreementDraft?.premium_listing_seeker_ids?.seeker_ids?.map(
                  (seeker) => (
                    <FormControlLabel
                      value={seeker}
                      control={<Radio />}
                      label={seeker}
                      onChange={(e) => {
                        setId(e.target.value);
                        setIdType("seeker");
                      }}
                    />
                  )
                )}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            container
            gap={3}
            marginTop={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" onClick={handleSubmit}>
              View Standard Draft
            </Button>
          </Grid>
        </Card>
      </Modal>
    </>
  );
};

export default AgreementCreditSelectionModal;
