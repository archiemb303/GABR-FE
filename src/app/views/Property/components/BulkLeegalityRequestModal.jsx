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
  setBulkRequestConsentModal,
  setOpenBulkLeegalityRequestModal,
  setOpenMarkProcuredModal,
} from "app/redux/actions/ModalActions";
import {
  markProcurementStatusAction,
  sendBulkStampRequestAction,
} from "app/redux/actions/SupportCenterActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MultiSelectTable from "./MultiSelectTable";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Loading from "app/components/MatxLoading";

const BulkLeegalityRequestModal = () => {
  const dispatch = useDispatch();
  const open = useSelector(
    (state) => state.modal.openBulkLeegalityRequestModal
  );
  const { fetchNewOrResendStampRequest, sendBulkStampRequest } = useSelector(
    (store) => store.supportCenter
  );
  const { FETCH_NEW_OR_RESEND_STAMP_REQUEST, SEND_BULK_STAMP_REQUEST } =
    useSelector((state) => state?.loadingAndError?.loader);
  const handleClose = () => {
    dispatch(setOpenBulkLeegalityRequestModal(false));
    setSelected([]);
    //Prevent the modal from showing prvious data momentarily. Show loading spinner till the state rows is null
    setRows(null);
  };
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState(null);

  const headCells = [
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "Request Id",
      width: "30%",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: false,
      label: "Date",
      width: "15%",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
      width: "15%",
    },
    {
      id: "parties",
      numeric: false,
      disablePadding: false,
      label: "Parties",
      width: "40%",
    },
  ];

  useEffect(() => {
    if (fetchNewOrResendStampRequest) {
      const rows = fetchNewOrResendStampRequest?.map((request) => {
        return {
          id: request.request_id,
          date: moment(request?.added_date).format("YYYY-MM-DD"),
          status: request?.request_status_name,
          parties: `Primary -
          ${request?.parties?.primary
            ?.map((party) => party.party_name)
            ?.join(" + ")}
           Secondary -
          ${request?.parties?.secondary
            ?.map((party) => party.party_name)
            ?.join(" + ")}`,
        };
      });
      setRows(rows);
    }
  }, [fetchNewOrResendStampRequest]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            minWidth: "90vw",
            maxWidth: "95vw",
            maxHeight: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
          }}
        >
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
          {/*Check if the rows is null to prevent the modal from
           showing prvious data momentarily.
           Show loading spinner till the state rows is null*/}
          {!rows || FETCH_NEW_OR_RESEND_STAMP_REQUEST?.isLoading === true ? (
            <Box sx={{ height: "500px" }}>
              <Loading></Loading>
            </Box>
          ) : (
            <Box textAlign={"center"}>
              <MultiSelectTable
                headCells={headCells}
                rows={rows}
                title={
                  fetchNewOrResendStampRequest?.[0]?.request_status === 1
                    ? "Send Request to Leegality"
                    : "Resend Request to Leegality"
                }
                selected={selected}
                setSelected={setSelected}
                actionBtnTitle={"Send"}
                actionBtnListener={() => {
                  dispatch(
                    setBulkRequestConsentModal({
                      flag: open,
                      selectedRequests: selected,
                    })
                  );
                  handleClose();
                }}
              />
            </Box>
          )}

          {/* <Grid container gap={3} justifyContent="center" alignItems="center">
            <Button
              onClick={() => console.log(selected)}
              variant="contained"
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
          </Grid> */}
        </Card>
      </Modal>
    </>
  );
};

export default BulkLeegalityRequestModal;
