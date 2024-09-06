import { Box, Button, Card, Grid, IconButton, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import {
  setBulkRequestConsentModal,
  setViewUpdatedDraftModal,
} from "app/redux/actions/ModalActions";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { sendBulkStampRequestAction } from "app/redux/actions/SupportCenterActions";

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

const BulkRequestConsentModal = ({ handleStandard, fetchLatestDraft }) => {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.modal.openViewUpdatedDraftModal);
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;

  const handleClose = () => {
    dispatch(setViewUpdatedDraftModal(false));
  };

  return (
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
        <Box>
          <Typography
            textAlign="center"
            mb={2}
            id="modal-modal-title"
            variant="h5"
          >
            Latest draft exists
          </Typography>
          <Typography
            textAlign="center"
            mb={3}
            id="modal-modal-title"
            variant="body1"
            // sx={{ fontSize: "14px" }}
          >
            Do you want to see the latest draft instead of the standard draft?
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <Button
              onClick={() => {
                handleClose();
                handleStandard(true);
              }}
              variant="contained"
            >
              View standard draft
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                fetchLatestDraft();
              }}
            >
              View latest draft
            </Button>
          </Box>
          {/* {selectedRequests?.map((request) => {
            return (
              <Typography
                textAlign="center"
                mb={3}
                id="modal-modal-title"
                variant="body1"
                sx={{ fontSize: "15px" }}
              >
                {request} <br />
              </Typography>
            );
          })}
          <Box
            display={"flex"}
            gap={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              onClick={() => {
                dispatch(
                  sendBulkStampRequestAction({
                    bulk_requests: selectedRequests,
                  })
                );
                handleClose();
              }}
              variant="contained"
              color="primary"
            >
              Yes
            </Button>
            <Button onClick={handleClose} variant="contained" color="primary">
              No
            </Button>
          </Box> */}
        </Box>
      </Card>
    </Modal>
  );
};

export default BulkRequestConsentModal;
