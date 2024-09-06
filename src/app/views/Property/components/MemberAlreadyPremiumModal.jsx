import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";

import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  setOpenMemberAlreadyPremiumModal,
  setPackagePreferenceModal,
} from "app/redux/actions/ModalActions";

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

const MemberAlreadyPremiumModal = ({ handleStandard, fetchLatestDraft }) => {
  const dispatch = useDispatch();
  const { generatedAgreementDraft } = useSelector((state) => state.property);
  const open = useSelector(
    (state) => state.modal.openMemberAlreadyPremiumModal
  );
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;

  const handleClose = () => {
    dispatch(setOpenMemberAlreadyPremiumModal(false));
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
            One of the Party is already a Premium Member
          </Typography>
          <Typography
            textAlign="center"
            mb={3}
            id="modal-modal-title"
            variant="body1"
            // sx={{ fontSize: "14px" }}
          >
            One member of your party already has a premium package. You can
            either contact them or upgrade to premium.
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Party Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generatedAgreementDraft?.premium_party_details?.Payload?.map(
                  (party, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        {party?.salutation} {party?.first_name}{" "}
                        {party?.last_name}
                      </TableCell>
                      <TableCell align="center">{party?.email_id}</TableCell>
                      <TableCell align="center">{party?.phone_no}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" flexDirection="column" gap={2} marginTop={2}>
            <Button
              onClick={() => {
                handleClose();
              }}
              variant="contained"
            >
              I will contact the party
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                dispatch(setPackagePreferenceModal(true));
              }}
            >
              Upgrade to Premium
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

export default MemberAlreadyPremiumModal;
