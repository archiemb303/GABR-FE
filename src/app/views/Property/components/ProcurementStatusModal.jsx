import CloseIcon from "@mui/icons-material/Close";
import { Button, Card, Grid, IconButton, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { setOpenProcurementStatusModal } from "app/redux/actions/ModalActions";
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

const ProcurementStatusModal = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.openProcurementStatusModal);
  const handleClose = () => {
    dispatch(setOpenProcurementStatusModal(false));
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
              Status is not yet procured. Do you want to mark it as procured?
            </Typography>
          </Grid>
          <Grid container gap={3} justifyContent="center" alignItems="center">
            <Button variant="contained" onClick={() => handleClose()}>
              Close
            </Button>
            <Button variant="contained" color="success">
              Mark as Procured
            </Button>
          </Grid>
        </Card>
      </Modal>
    </>
  );
};

export default ProcurementStatusModal;
