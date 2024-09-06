import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Card, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";
import {
  setPropertyImagesWarningModal,
  setRentalAgreementWarningModal,
} from "app/redux/actions/ModalActions";
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

const RentalAgreementWarningModal = ({ individualProperty }) => {
  const [isUpdateButtonClicked, setUpdateButtonClicked] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const dispatch = useDispatch();

  const open = useSelector((state) => state.modal.openRentalAgreementWarning);

  const handleClose = () => {
    dispatch(setRentalAgreementWarningModal(false));
  };

  // const handleUpdateBtnClick = () => {
  //     setUpdateButtonClicked(true);
  //     handleClose();
  // }

  useEffect(() => {
    if (isUpdateButtonClicked) {
      const anchor = document.querySelector("#basicDetails");
      anchor.scrollIntoView({ behavior: "smooth" });
    }
    setUpdateButtonClicked(false);
  }, [isUpdateButtonClicked]);

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
          <Grid
            container
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              mb={3}
              id="modal-modal-title"
              variant="body"
              sx={{ fontSize: "15px" }}
            >Below parties are mandatorily required for intiating your agreement:

            </Typography>
          <Box paddingLeft={matches ? 15 : 3}>
              <Typography
                mb={1}
                id="modal-modal-title"
                variant="body1"
                sx={{ fontSize: "15px" }}
              >
                1. At least 1 Owner
              </Typography>
              <Typography

                mb={1}
                id="modal-modal-title"
                variant="body1"
                sx={{ fontSize: "15px" }}
              >
                2. At least 1 Tenant
              </Typography>
              <Typography

                mb={1}
                id="modal-modal-title"
                variant="body1"
                sx={{ fontSize: "15px" }}
              >
                3. At least 2 Witnesses. An Agent Witness is also considered as a Witness
              </Typography>
          </Box>
          </Grid>
          <Box textAlign={'center'}>
          <Typography
              mb={1}
              id="modal-modal-title"
              variant="body1"
              sx={{ fontSize: "15px" }}
              color={'GrayText'}
              marginBottom={2}
              marginTop={2}
            >
              Note: All required parties must accept the invitation.
            </Typography>
            <Button variant="contained" onClick={() => handleClose()}>
              Close
            </Button>
            {/* <Button variant='contained' onClick={() => handleUpdateBtnClick()}>Update details</Button> */}
          </Box>
        </Card>
      </Modal>
    </>
  );
};

export default RentalAgreementWarningModal;
