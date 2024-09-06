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
import { setOpenMarkProcuredModal } from "app/redux/actions/ModalActions";
import { markProcurementStatusAction } from "app/redux/actions/SupportCenterActions";
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

const MarkProcuredModal = () => {
  const dispatch = useDispatch();
  const { flag, request } = useSelector(
    (state) => state.modal.openMarkProcuredModal
  );
  const handleClose = () => {
    dispatch(setOpenMarkProcuredModal({ flag: false, request: null }));
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

          {/* <Box display="flex" flexDirection={"column"} paddingLeft={5} gap={2}>
            <Typography
              variant="body1"
              color="GrayText"
              sx={{ whiteSpace: "nowrap" }}
              fontWeight={"bold"}
            >
              Tenancy Id: 1
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
                First Party
              </Typography>
              <Typography
                variant="body1"
                color="GrayText"
                sx={{ whiteSpace: "nowrap" }}
              >
                Name: John Doe
              </Typography>
              <Typography
                variant="body1"
                color="GrayText"
                sx={{ whiteSpace: "nowrap" }}
              >
                ID: PAN
              </Typography>
              <Typography
                variant="body1"
                color="GrayText"
                sx={{ whiteSpace: "nowrap" }}
              >
                ID Number: ABCDE1234F
              </Typography>
              <Typography
                variant="body1"
                color="GrayText"
                sx={{ whiteSpace: "nowrap" }}
              >
                Address: lorem ipsum dolor sit amet
              </Typography>
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
              <Typography
                variant="body1"
                color="GrayText"
                sx={{ whiteSpace: "nowrap" }}
              >
                Name: John Doe
              </Typography>
              <Typography
                variant="body1"
                color="GrayText"
                sx={{ whiteSpace: "nowrap" }}
              >
                ID: PAN
              </Typography>
              <Typography
                variant="body1"
                color="GrayText"
                sx={{ whiteSpace: "nowrap" }}
              >
                ID Number: ABCDE1234F
              </Typography>
              <Typography
                variant="body1"
                color="GrayText"
                sx={{ whiteSpace: "nowrap" }}
              >
                Address: lorem ipsum dolor sit amet
              </Typography>
              <Divider sx={{ width: "100%" }} />
              <Typography
                variant="body1"
                color="GrayText"
                sx={{ whiteSpace: "nowrap" }}
              >
                Name: John Doe
              </Typography>
              <Typography
                variant="body1"
                color="GrayText"
                sx={{ whiteSpace: "nowrap" }}
              >
                ID: PAN
              </Typography>
              <Typography
                variant="body1"
                color="GrayText"
                sx={{ whiteSpace: "nowrap" }}
              >
                ID Number: ABCDE1234F
              </Typography>
              <Typography
                variant="body1"
                color="GrayText"
                sx={{ whiteSpace: "nowrap" }}
              >
                Address: lorem ipsum dolor sit amet
              </Typography>
            </Box>
            <Typography
              variant="body1"
              color="GrayText"
              sx={{ whiteSpace: "nowrap" }}
              fontWeight={"bold"}
            >
              Stamp Paper Id: 234dfs
            </Typography>
          </Box> */}
          <Box textAlign={"center"}>
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
              Are you sure you want to mark it as stamp paper procured for the
              selected request id and parties in it.
            </Typography>
          </Box>

          <Grid container gap={3} justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              onClick={() => {
                dispatch(
                  markProcurementStatusAction({
                    request_id: request.request_id,
                  })
                );
                handleClose();
              }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
              }}
            >
              No
            </Button>
          </Grid>
        </Card>
      </Modal>
    </>
  );
};

export default MarkProcuredModal;
