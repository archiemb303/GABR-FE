import { Paper } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import {
  setOpenMarkProcuredModal,
  setOpenProcurementDetailsModal,
} from "app/redux/actions/ModalActions";
import {
  informTenanyPartiesForStampAction,
  markProcurementStatusAction,
} from "app/redux/actions/SupportCenterActions";
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

const ProcurementDetailsModal = () => {
  const dispatch = useDispatch();
  const { flag, request } = useSelector(
    (state) => state.modal.openProcurementDetailsModal
  );
  const handleClose = () => {
    dispatch(setOpenProcurementDetailsModal({ flag: false, request: null }));
  };

  return (
    <>
      <Modal
        open={flag}
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

          <Box display="flex" flexDirection={"column"} paddingLeft={5} gap={2}>
            <Typography
              variant="body1"
              color="GrayText"
              sx={{ whiteSpace: "nowrap" }}
              fontWeight={"bold"}
            >
              Tenancy Id: {request?.tenancy_id}
            </Typography>
            <Typography
              variant="body1"
              color="GrayText"
              sx={{ whiteSpace: "nowrap" }}
              fontWeight={"bold"}
            >
              Stamp Series: 1
            </Typography>
            <Box
              sx={{ backgroundColor: "#1976d20d", padding: 3 }}
              display="flex"
              flexWrap={"wrap"}
              gap={2}
            >
              <Typography
                variant="body1"
                color="GrayText"
                sx={{ whiteSpace: "nowrap" }}
                fontWeight={"bold"}
                width={"100%"}
              >
                First Parties
              </Typography>
              {request?.parties?.primary?.map((party) => {
                return (
                  <>
                    <Typography
                      variant="body1"
                      color="GrayText"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      <b>Name:</b> {party?.party_name}
                    </Typography>
                    <Typography variant="body1" color="GrayText">
                      <b>Address</b>: {party?.party_address}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="GrayText"
                      sx={{ whiteSpace: "nowrap", width: "100%" }}
                    >
                      <b>Ids:</b>
                    </Typography>
                    {party?.document_details?.map((detail) => {
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "white",
                            borderRadius: "15px",
                            padding: "2px 10px",
                            gap: 2,
                          }}
                        >
                          <Typography
                            variant="body1"
                            color="GrayText"
                            sx={{ whiteSpace: "nowrap" }}
                          >
                            <b>ID</b>: {detail?.file_name}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="GrayText"
                            sx={{ whiteSpace: "nowrap" }}
                          >
                            <b>ID Number</b>: {detail?.party_document_value}
                          </Typography>
                        </Box>
                      );
                    })}

                    <Divider sx={{ width: "100%", marginY: 3 }} />
                  </>
                );
              })}
            </Box>
            <Box
              sx={{ backgroundColor: "#1976d20d", padding: 3 }}
              display="flex"
              flexWrap={"wrap"}
              gap={2}
            >
              <Typography
                variant="body1"
                color="GrayText"
                sx={{ whiteSpace: "nowrap" }}
                fontWeight={"bold"}
                width={"100%"}
              >
                Second Parties
              </Typography>
              {request?.parties?.secondary?.map((party) => {
                return (
                  <>
                    <Typography
                      variant="body1"
                      color="GrayText"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      <b>Name:</b> {party?.party_name}
                    </Typography>
                    <Typography variant="body1" color="GrayText">
                      <b>Address</b>: {party?.party_address}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="GrayText"
                      sx={{ whiteSpace: "nowrap", width: "100%" }}
                    >
                      <b>Ids:</b>
                    </Typography>
                    {party?.document_details?.map((detail) => {
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "white",
                            borderRadius: "15px",
                            padding: "2px 10px",
                            gap: 2,
                          }}
                        >
                          <Typography
                            variant="body1"
                            color="GrayText"
                            sx={{ whiteSpace: "nowrap" }}
                          >
                            <b>ID</b>: {detail?.file_name}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="GrayText"
                            sx={{ whiteSpace: "nowrap" }}
                          >
                            <b>ID Number</b>: {detail?.party_document_value}
                          </Typography>
                        </Box>
                      );
                    })}

                    <Divider sx={{ width: "100%", marginY: 3 }} />
                  </>
                );
              })}
            </Box>
            <Typography
              variant="body1"
              color="GrayText"
              sx={{ whiteSpace: "nowrap" }}
              fontWeight={"bold"}
            >
              Stamp Paper Id: 234dfs
            </Typography>
          </Box>
          <Grid container gap={3} justifyContent="center" alignItems="center">
            <Button
              sx={{ marginTop: 2 }}
              onClick={() =>
                dispatch(
                  informTenanyPartiesForStampAction({
                    tenancy_id: request?.tenancy_id,
                  })
                )
              }
              variant="contained"
            >
              Inform tenancy parties
            </Button>
          </Grid>
        </Card>
      </Modal>
    </>
  );
};

export default ProcurementDetailsModal;
