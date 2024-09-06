import {
  Link,
  TableHead,
  TableContainer,
  Table,
  Box,
  Card,
  useTheme,
  useMediaQuery,
  Button,
  Backdrop,
  CircularProgress,
  Menu,
  MenuItem,
  IconButton,
  TextField,
  Autocomplete,
  Pagination,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenBulkLeegalityRequestModal,
  setOpenMarkProcuredModal,
  setOpenProcurementDetailsModal,
  setOpenProcurementStatusModal,
} from "app/redux/actions/ModalActions";
import MarkProcuredModal from "./components/MarkProcuredModal";
import ProcurementStatusModal from "./components/ProcurementStatusModal";
import { useEffect, useState } from "react";
import {
  fetchNewOrResendStampRequestAction,
  fetchStampPaperRequestsAction,
  informTenanyPartiesForStampAction,
  markProcurementStatusAction,
  sendStampRequestToLeegalityAction,
} from "app/redux/actions/SupportCenterActions";
import moment from "moment";
import Loading from "app/components/MatxLoading";
import CustomSnackbar from "app/components/CustomSnackbar";
import { ArrowDropDown, MoreVert } from "@mui/icons-material";
import BulkLeegalityRequestModal from "./components/BulkLeegalityRequestModal";
import BulkRequestConsentModal from "./components/BulkRequestConsentModal";
import ProcurementDetailsModal from "./components/ProcurementDetailsModal";

export default function StampPaperRequests() {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [sortOption, setSortOption] = useState(1);
  const [sortedStampPaperRequests, setSortedStampPaperRequests] =
    useState(null);
  const [filteredStampPaperRequests, setFilteredStampPaperRequests] =
    useState(null);
  const [searchInput, setSearchInput] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = (event) => {
    // setSearchTerm(event.target.value);
    const results = sortedStampPaperRequests.filter((request) =>
      request.request_id.includes(event.target.value.toLowerCase())
    );
    setFilteredStampPaperRequests(results);
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  const { fetchStampPaperRequests } = useSelector(
    (store) => store.supportCenter
  );
  const {
    FETCH_STAMP_PAPER_REQUESTS,
    SEND_STAMP_REQUEST_TO_LEEGALITY,
    MARK_PROCUREMENT_STATUS,
    INFORM_TENANCY_PARTIES_FOR_STAMP,
    SEND_BULK_STAMP_REQUEST,
  } = useSelector((state) => state?.loadingAndError?.loader);

  useEffect(() => {
    dispatch(fetchStampPaperRequestsAction({}));
  }, []);

  const handlePlaceRequest = (request) => {
    dispatch(
      sendStampRequestToLeegalityAction({
        request_id: request.request_id,
        date: request.added_date,
        status_id: request.request_status,
        action_id: request.request_action,
        parties: request.parties,
      })
    );
  };

  //Handle sorting based on selected status (Status - New, Request sent to Leegality and Procured)
  const sortByStatus = (statusId) => {
    const sortedBySelectedStatus = [...fetchStampPaperRequests];
    sortedBySelectedStatus?.sort((a, b) => {
      if (a.request_status === statusId) {
        if (b.request_status === statusId) {
          return new Date(b.added_date) - new Date(a.added_date);
        }
        return -1;
      }
      if (b.request_status === statusId) {
        return 1;
      }
      if (a.request_status === b.request_status) {
        return new Date(b.added_date) - new Date(a.added_date);
      }
      return a.request_status - b.request_status;
    });
    setSortedStampPaperRequests(sortedBySelectedStatus);
    setFilteredStampPaperRequests(sortedBySelectedStatus);
  };

  const options = [
    {
      statusId: 1,
      statusText: "New",
    },
    { statusId: 2, statusText: "Sent Requests" },
    { statusId: 3, statusText: "Procured" },
  ];

  useEffect(() => {
    //Sort fetchStampPaperRequests to show new requests first
    if (fetchStampPaperRequests) {
      const sortedStampPaperStatusNew = [...fetchStampPaperRequests];
      sortedStampPaperStatusNew?.sort((a, b) => {
        if (a.request_status === 1) return -1;
        if (b.request_status === 1) return 1;
        return a.request_status - b.request_status;
      });
      setSortedStampPaperRequests(sortedStampPaperStatusNew);
      setFilteredStampPaperRequests(sortedStampPaperStatusNew);
    }
  }, [fetchStampPaperRequests]);

  const [page, setPage] = useState(1);
  const requestsPerPage = 5;
  const startIndex = (page - 1) * requestsPerPage;
  const endIndex = startIndex + requestsPerPage;
  return (
    <>
      {SEND_STAMP_REQUEST_TO_LEEGALITY?.isLoading === false && (
        <CustomSnackbar
          loaderChild={SEND_STAMP_REQUEST_TO_LEEGALITY}
          successMessage="Request Sent Successfully !"
          errorMessage={SEND_STAMP_REQUEST_TO_LEEGALITY?.error}
        />
      )}
      <CustomSnackbar
        loaderChild={MARK_PROCUREMENT_STATUS}
        successMessage="Stamp Paper Procured Successfully !"
        errorMessage={MARK_PROCUREMENT_STATUS?.error}
      />
      <CustomSnackbar
        loaderChild={INFORM_TENANCY_PARTIES_FOR_STAMP}
        successMessage="All tenancy parties have been informed successfully !"
        errorMessage={INFORM_TENANCY_PARTIES_FOR_STAMP?.error}
      />
      <CustomSnackbar
        loaderChild={SEND_BULK_STAMP_REQUEST}
        successMessage="Requests have been sent successfully !"
        errorMessage={SEND_BULK_STAMP_REQUEST?.error}
      />
      <Box
        sx={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "center",
          padding: matches ? "50px 150px" : "10px",
        }}
      >
        <MarkProcuredModal />
        <ProcurementStatusModal />
        <BulkLeegalityRequestModal />
        <BulkRequestConsentModal />
        <ProcurementDetailsModal />
        {FETCH_STAMP_PAPER_REQUESTS?.isLoading === true ? (
          <Box sx={{ height: "500px" }}>
            <Loading></Loading>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            gap={2}
          >
            <Card>
              <Box
                m={2}
                justifyContent={"space-between"}
                display={"flex"}
                alignItems={"center"}
              >
                <Box>
                  <TextField
                    id="outlined-basic"
                    label="Search By Request Id"
                    variant="outlined"
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      handleSearch(e);
                    }}
                  />
                </Box>
                <Box m={2} textAlign={"right"}>
                  <Button
                    onClick={() => {
                      dispatch(
                        fetchNewOrResendStampRequestAction({
                          request_status: 1,
                        })
                      );
                      dispatch(setOpenBulkLeegalityRequestModal(true));
                    }}
                    sx={{ marginRight: 1 }}
                    variant="outlined"
                    color="primary"
                  >
                    Send Bulk Request to Leegality
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch(
                        fetchNewOrResendStampRequestAction({
                          request_status: 2,
                        })
                      );
                      dispatch(setOpenBulkLeegalityRequestModal(true));
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Resend Bulk Request to Leegality
                  </Button>
                </Box>
              </Box>
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
                      <TableCell align="center" width={"15%"}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          Status{" "}
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? "long-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                          >
                            <MoreVert />
                          </IconButton>
                          <Menu
                            id="long-menu"
                            MenuListProps={{
                              "aria-labelledby": "long-button",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                              style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: "20ch",
                              },
                            }}
                          >
                            {options.map((option, index) => (
                              <MenuItem
                                key={index}
                                selected={option.statusId === sortOption}
                                onClick={() => {
                                  handleClose();
                                  setSortOption(option.statusId);
                                  sortByStatus(option.statusId);
                                }}
                              >
                                {option.statusText}
                              </MenuItem>
                            ))}
                          </Menu>{" "}
                        </Box>
                      </TableCell>
                      <TableCell align="center" width={"25%"}>
                        Parties
                      </TableCell>
                      <TableCell align="center" width={"25%"}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStampPaperRequests
                      ?.slice(startIndex, endIndex)
                      ?.map((request, index) => {
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
                            <TableCell align="center">
                              {request?.request_status_name}
                            </TableCell>
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
                            <TableCell align="center">
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
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
            <Pagination
              count={Math.ceil(
                filteredStampPaperRequests?.length / requestsPerPage
              )}
              page={page}
              onChange={(event, value) => setPage(value)}
            />
          </Box>
        )}

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={
            SEND_STAMP_REQUEST_TO_LEEGALITY?.isLoading === true ||
            MARK_PROCUREMENT_STATUS?.isLoading === true ||
            INFORM_TENANCY_PARTIES_FOR_STAMP?.isLoading === true ||
            SEND_BULK_STAMP_REQUEST?.isLoading === true
          }
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
}
