import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TableBody,
  TableHead,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Loading from "app/components/MatxLoading";
import {
  setAgreementSigningWarningModal,
  setOpenLeegalityViewAllRequestsModal,
} from "app/redux/actions/ModalActions";
import { fetchResendStampRequestAction } from "app/redux/actions/SupportCenterActions";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minWidth: "70vw",
  maxWidth: "95vw",
  maxHeight: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const LeegalityViewAllRequestsModal = () => {
  const dispatch = useDispatch();
  const { fetchResendStampRequests } = useSelector(
    (store) => store.supportCenter
  );

  const open = useSelector(
    (state) => state.modal.openLeegalityViewAllRequestsModal
  );

  const { FETCH_RESEND_STAMP_REQUESTS } = useSelector(
    (state) => state?.loadingAndError?.loader
  );

  const handleClose = () => {
    dispatch(setOpenLeegalityViewAllRequestsModal(false));
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
          {FETCH_RESEND_STAMP_REQUESTS?.isLoading === true ? (
            <Box sx={{ height: "500px" }}>
              <Loading></Loading>
            </Box>
          ) : (
            <Box>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" width={"28%"}>
                        Request Id
                      </TableCell>
                      <TableCell align="center" width={"7%"}>
                        Date
                      </TableCell>
                      {/* <TableCell align="center" width={"15%"}>
                        Status
                      </TableCell> */}
                      <TableCell align="center" width={"25%"}>
                        Parties
                      </TableCell>
                      {/* <TableCell align="center" width={"25%"}>
                      Action
                    </TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fetchResendStampRequests?.map((request, index) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            {request?.request_id}
                          </TableCell>
                          <TableCell align="center">
                            {moment(request?.added_date).format("YYYY-MM-DD")}
                          </TableCell>
                          {/* <TableCell align="center">
                            {request?.request_status_name}
                          </TableCell> */}
                          <TableCell align="center">
                            Primary -&nbsp;
                            {request?.parties?.primary
                              ?.map((party) => party.party_name)
                              ?.join(" + ")}
                            <br /> Secondary -&nbsp;
                            {request?.parties?.secondary
                              ?.map((party) => party.party_name)
                              ?.join(" + ")}
                          </TableCell>
                          {/* <TableCell align="center">
                          {request?.request_status === 1 && (
                            <Button
                              onClick={() => handlePlaceRequest(request)}
                              variant="text"
                              color="primary"
                            >
                              Place Request With Leegality
                            </Button>
                          )}

                          {request?.request_status === 2 && (
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                rowGap: 1,
                                flexWrap: "wrap",
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                onClick={() => handlePlaceRequest(request)}
                                variant="text"
                                color="primary"
                              >
                                Resend Request
                              </Button>
                              <Button
                                onClick={() => {
                                  dispatch(
                                    setOpenMarkProcuredModal({
                                      flag: true,
                                      request: request,
                                    })
                                  );
                                }}
                                variant="text"
                                color="primary"
                              >
                                Mark Procured
                              </Button>
                            </Box>
                          )}
                          {request?.request_status === 3 && (
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                rowGap: 1,
                                flexWrap: "wrap",
                                justifyContent: "center",
                              }}
                            >
                              <Button variant="text" color="primary">
                                View Stamp Paper
                              </Button>
                              <Button
                                onClick={() =>
                                  dispatch(
                                    setOpenProcurementDetailsModal({
                                      flag: true,
                                      request: request,
                                    })
                                  )
                                }
                                variant="text"
                                color="primary"
                              >
                                Inform user of procurement
                              </Button>
                            </Box>
                          )}
                        </TableCell> */}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Card>
      </Modal>
    </>
  );
};

export default LeegalityViewAllRequestsModal;
