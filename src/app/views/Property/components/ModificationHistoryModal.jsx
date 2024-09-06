import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Card, Grid, IconButton, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import {
  setOpenLastModificationHistoryModal,
  setPropertyImagesWarningModal,
  setRentalAgreementWarningModal,
} from "app/redux/actions/ModalActions";
import moment from "moment";
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

const ModificationHistoryModal = () => {
  const dispatch = useDispatch();

  const { individualProperty } = useSelector((state) => state.property);

  const open = useSelector(
    (state) => state.modal.openLastModificationHistoryModal
  );

  const handleClose = () => {
    dispatch(setOpenLastModificationHistoryModal(false));
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
          <Typography
            marginBottom={2}
            id="modal-modal-title"
            variant="h5"
            textAlign={"center"}
          >
            Modifications History
          </Typography>
          {individualProperty?.tenancy_details?.agreement_details?.[0]?.last_modification_details?.modifications?.map(
            (modification) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "15px",
                    backgroundColor: "#0000ff08",
                    borderRadius: "20px",
                    padding: "32px",
                    marginBottom: 2,
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      id="modal-modal-title"
                      variant="body1"
                      sx={{ fontSize: "15px" }}
                    >
                      Last Modified: &nbsp;
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="body1"
                      sx={{ fontSize: "15px" }}
                      color={"GrayText"}
                    >
                      {moment(modification?.last_modified_date)?.format(
                        "YYYY-MM-DD"
                      )}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      id="modal-modal-title"
                      variant="body1"
                      sx={{ fontSize: "15px" }}
                    >
                      Last Action: &nbsp;
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="body1"
                      sx={{ fontSize: "15px" }}
                      color={"GrayText"}
                    >
                      {modification?.last_action}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    <Typography
                      id="modal-modal-title"
                      variant="body1"
                      sx={{ fontSize: "15px" }}
                    >
                      Last Modified By: &nbsp;
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="body1"
                      sx={{ fontSize: "15px" }}
                      color={"GrayText"}
                    >
                      {modification?.last_modified_by}
                    </Typography>
                  </Box>
                  {/* <Box sx={{ display: "flex" }}>
                    <Typography
                      id="modal-modal-title"
                      variant="body1"
                      sx={{ fontSize: "15px" }}
                    >
                      Browser: &nbsp;
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="body1"
                      sx={{ fontSize: "15px" }}
                      color={"GrayText"}
                    >
                      {individualProperty?.basic_details?.device_details
                        ?.split(",")[1]
                        ?.trim()
                        .split(";")[0]
                        ?.trim()
                        ?.replace(/"/g, "")}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      id="modal-modal-title"
                      variant="body1"
                      sx={{ fontSize: "15px" }}
                    >
                      Operating System: &nbsp;
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="body1"
                      sx={{ fontSize: "15px" }}
                      color={"GrayText"}
                    >
                      {individualProperty?.basic_details?.browser_os?.replace(
                        /"/g,
                        ""
                      )}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      id="modal-modal-title"
                      variant="body1"
                      sx={{ fontSize: "15px" }}
                    >
                      IP Address: &nbsp;
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="body1"
                      sx={{ fontSize: "15px" }}
                      color={"GrayText"}
                    >
                      {individualProperty?.basic_details?.ip_details?.replace(
                        /"/g,
                        ""
                      )}
                    </Typography>
                  </Box> */}
                </Box>
              );
            }
          )}
          <Box textAlign={"center"}>
            <Button variant="contained" onClick={() => handleClose()}>
              Close
            </Button>
          </Box>
        </Card>
      </Modal>
    </>
  );
};

export default ModificationHistoryModal;
