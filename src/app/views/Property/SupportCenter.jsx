//Support Center

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  styled,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setSupportCenterMOdal,
  setUploadPropertyImagesModal,
} from "app/redux/actions/ModalActions";
import VideoTutorialModal from "./VideoTutorialModal";
import { fetchUserProfileAction } from "app/redux/actions/UserProfileActions";
import JoditEditor from "jodit-react";
import { AttachmentOutlined, Send } from "@mui/icons-material";
import { H1 } from "app/components/Typography";
import SupportCenterModal from "./SupportCenterModal";
import {
  REMOVE_TICKET_MESSAGES,
  createTicketConversationAction,
  fetchAllSupportCenterTicketsAction,
  getTicketCategoryAction,
  getTicketSubcategoryAction,
  removeTicketAttachmentAction,
  removeTicketMessageAction,
  sentTicketMessageAction,
} from "app/redux/actions/SupportCenterActions";
import moment from "moment";
import Loading from "app/components/MatxLoading";
import SupportCenterSendImageTicketAttachment from "./SupportCenterSendImageTicketAttachment";
import UploadPropertyImagesModal from "./uploadPropertyImagesModal";
import { height } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";

const MessageTime = styled("span")(({ theme }) => ({
  fontSize: "13px",
  fontWeight: "500",
  color: theme.palette.text.secondary,
}));

const ChatImgContainer = styled("div")(() => ({
  padding: "20px",
  display: "flex",
  justifyContent: "flex-end",
}));

const SupportCenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTicket, setselectedTicket] = useState(null);
  const currentUser = useSelector((state) => state.userProfile);
  const {
    RAISE_NEW_TICKET,
    FETCH_ALL_TICKETS,
    CREATE_TICKET_CONVERSATION,
    SEND_TICKET_MESSAGE,
    REMOVE_TICKET_ATTACHMENT,
  } = useSelector((store) => store.loadingAndError.loader);

  const {
    supportCenterTickets,
    fecthAdminTickets,
    getTicketSubcategory,
    getTicketCategory,
    ticketconversation,
    removeTicketAttachment,
    removeTicketMessages,
    sendTicketMessage,
    raiseNewTicket,
  } = useSelector((store) => store.supportCenter);

  useEffect(() => {
    dispatch(fetchAllSupportCenterTicketsAction());
  }, []);

  const dateShortOnfecthSupportCenterTickets = (arr) => {
    arr?.sort(function (a, b) {
      return Number(new Date(b.added_date)) - Number(new Date(a.added_date));
    });
    return arr;
  };
  dateShortOnfecthSupportCenterTickets(supportCenterTickets);

  const ticketCategory = [
    "Property Details",
    "Listing",
    "Tenancy",
    "Packages",
    "Searching",
    "Agents",
    "Invitations",
  ];

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const user = JSON.parse(localStorage.getItem("persistentState"));
  const lastChatRef = useRef(null);
  const isFirstRender = useRef(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const handleToggleSidebar = () => {
    setShowSidebar((prevState) => {
      return !prevState;
    });
  };

  const sendMessage = () => {
    dispatch(
      sentTicketMessageAction({
        ticket_id: selectedTicket?.ticket_id,
        message: content,
        ticket_assignee: "",
        images: [],
      })
    );
    setContent("");
  };
  const [hoveron, sethoveron] = useState(null);

  useEffect(() => {
    if (!isFirstRender.current) {
      lastChatRef?.current?.scrollIntoView({
        smooth: true,
        block: "nearest",
      });
    }
    isFirstRender.current = false;
  }, [ticketconversation]);
  useEffect(() => {
    const params = {
      user_profile_id: user.userProfileId,
      to_view_profile_id: user.userProfileId,
      desired_output: "full",
    };

    dispatch(fetchUserProfileAction(params));
  }, []);

  useEffect(() => {
    if (
      SEND_TICKET_MESSAGE?.isLoading === false ||
      REMOVE_TICKET_MESSAGES?.isLoading === false ||
      REMOVE_TICKET_ATTACHMENT?.isLoading === false
    )
      dispatch(
        createTicketConversationAction({
          ticket_id: supportCenterTickets?.[0]?.ticket_id,
        })
      );
  }, [sendTicketMessage, removeTicketMessages, removeTicketAttachment]);

  return (
    <>
      <SupportCenterModal />
      <SupportCenterSendImageTicketAttachment type="Support" />
      <Box
        sx={(themes) => ({
          [themes.breakpoints.down("md")]: {
            // border: 'medium dashed green',
            position: "absolute",
          },
          position: "sticky",
          top: "0",
        })}
      >
        <IconButton
          id="burger-icon"
          sx={(themes) => ({
            [themes.breakpoints.down("md")]: {
              // border: 'medium dashed green',
              display: "block",
              position: "fixed",
              top: 10,
              left: 10,
              zIndex: 100,
            },
            display: "none",
          })}
          onClick={handleToggleSidebar}
        >
          <MenuIcon />
        </IconButton>

        <Box
          onClick={handleToggleSidebar}
          id="dropdown-background"
          sx={(themes) => ({
            [themes.breakpoints.down("md")]: {
              // border: 'medium dashed green',
              display: showSidebar ? "block" : "none",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 99,
              backdropFilter: "blur(4px)",
              height: "100%",
              width: "100%",
            },
          })}
        ></Box>
        <Box sx={{ display: "flex" }}>
          <Paper
            sx={(themes) => ({
              [themes.breakpoints.down("md")]: {
                // border: 'medium dashed green',
                display: showSidebar ? "flex" : "none",
                position: "fixed",
                top: 40,
                left: 0,
                width: "60%",
                zIndex: 100,
              },
              top: "0",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 2,
              height: "100vh",
              width: "25%",
              overflow: "auto",
            })}
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(setSupportCenterMOdal(true));
              }}
              sx={(themes) => ({
                [themes.breakpoints.down("md")]: {
                  // border: 'medium dashed green',
                  // mb: 2,
                },
                backgroundColor: "#DBA30B",
              })}
            >
              Create A New Ticket
            </Button>
            {FETCH_ALL_TICKETS?.isLoading === true ? (
              <Box
                height="100vh"
                sx={{
                  background: "white",
                  width: "100%",
                }}
              >
                <Loading />
              </Box>
            ) : (
              <>
                {supportCenterTickets?.map((ticket) => {
                  return (
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        justifyContent: "start",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setShowSidebar(false);
                        setselectedTicket(ticket);
                        dispatch(
                          createTicketConversationAction({
                            ticket_id: ticket.ticket_id,
                          })
                        );
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography component="div">
                            {ticket?.ticket_category}
                          </Typography>
                          <Typography
                            // variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            {ticket?.ticket_subcategory}
                          </Typography>
                        </CardContent>
                      </Box>
                      <CardMedia
                        component="img"
                        sx={{ width: 150 }}
                        image={
                          ticket?.file_url ||
                          "http://34.36.127.104/tenantowner/twitter_header_photo_1.png"
                        }
                        alt="Ticket Image"
                      />
                    </Card>
                  );
                })}
              </>
            )}
          </Paper>
          <Box
            sx={{
              height: "100vh",
              backgroundColor: "#F2DEB3",
              // paddingTop: "30px",
              paddingBottom: "30px",
              width: "100%",
            }}
          >
            <Box sx={{ height: "100%" }}>
              <VideoTutorialModal />
              {/* <Container> */}
              <Box>
                <Paper
                  sx={{
                    backgroundColor: "white",
                    padding: "17px 0",
                    width: "0 100px",
                    marginBottom: "15px",
                    display: "flex",
                  }}
                >
                  <H1
                    sx={{
                      fontSize: { md: "35px", sx: "28px" },
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                  >
                    {" "}
                    Support Center
                  </H1>
                  <Button
                    sx={{
                      marginLeft: "auto",
                      marginRight: "10px",
                      width: "100px",
                    }}
                    onClick={() => {
                      navigate("/faq");
                    }}
                    variant="outlined"
                  >
                    FAQ
                  </Button>
                </Paper>
              </Box>

              <Grid
                container
                spacing={2}
                sx={{
                  margin: "auto",
                  display: "flex",
                  justifyContent: "center",
                  // paddingX: "13px",
                }}
              >
                {selectedTicket === null ? (
                  <Paper
                    sx={{
                      width: "100%",
                      backgroundColor: "white",
                      paddingY: "30px",
                      marginX: "30px",
                      // width: "50%",
                      // height: "100px",
                      // margin: "100px auto",
                      // height: "100vh",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        textAlign: "center",
                        // marginTop: "20px",
                      }}
                    >
                      Please select a Ticket from the left menu!
                    </Typography>
                  </Paper>
                ) : (
                  <Grid
                    item
                    xs={12}
                    md={8}
                    paddingLeft={"12px"}
                    paddingRight={"27px"}
                  >
                    <Box>
                      {/* <Box /> */}
                      {CREATE_TICKET_CONVERSATION?.isLoading === true ? (
                        <Box
                          height="80vh"
                          sx={{
                            background: "white",
                            width: "100%",
                          }}
                        >
                          <Loading />
                        </Box>
                      ) : (
                        <Card
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "23px",
                            margin: "0 auto",
                            height: "80vh",
                          }}
                        >
                          {selectedTicket && (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              <Typography variant="body1">
                                Ticket id: {selectedTicket.ticket_id}
                              </Typography>
                              <Typography variant="body1">
                                Category:{" "}
                                {supportCenterTickets?.[0]?.ticket_category}
                                {
                                  ticketCategory[
                                    selectedTicket?.ticket_category_id - 1
                                  ]
                                }
                              </Typography>
                              <Typography variant="body1">
                                Sub-Category:
                                {supportCenterTickets?.[0]?.ticket_subcategory}
                              </Typography>
                            </Box>
                          )}
                          <Card
                            variant="outlined"
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              margin: "0 auto",
                              width: "100%",
                            }}
                          >
                            <Grid
                              style={
                                selectedTicket === null
                                  ? { height: "68vh" }
                                  : { height: "63vh" }
                              }
                              // className={classes.root}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                padding: 2,
                                margin: "0 auto",
                                my: 2,
                                width: "100%",
                                // height: "450px",
                                overflowY: "scroll",
                              }}
                            >
                              {SEND_TICKET_MESSAGE?.isLoading === true ? (
                                <Box sx={{ height: 100 }}>
                                  <Loading />
                                </Box>
                              ) : (
                                <>
                                  {ticketconversation?.map((message, i) => {
                                    return (
                                      <Grid
                                        ref={
                                          i === message.length - 1
                                            ? lastChatRef
                                            : null
                                        }
                                        marginY={1}
                                        container
                                        direction={
                                          message?.added_by ===
                                          user?.userProfileId
                                            ? "row-reverse"
                                            : "row"
                                        }
                                      >
                                        <Box component="div">
                                          <Box
                                            onMouseEnter={() => {
                                              sethoveron(i);
                                            }}
                                            onMouseLeave={() => {
                                              sethoveron(-1);
                                            }}
                                            maxWidth={300}
                                            borderRadius="15px"
                                            sx={
                                              message?.added_by ===
                                              user?.userProfileId
                                                ? {
                                                    borderTopRightRadius: "0px",
                                                  }
                                                : {
                                                    borderTopLeftRadius: "0px",
                                                  }
                                            }
                                            bgcolor={
                                              message?.status === 4
                                                ? "#ffdad5ee"
                                                : message?.added_by ===
                                                  user?.userProfileId
                                                ? "#1976d21a"
                                                : "#80808014"
                                            }
                                            paddingX={3}
                                            paddingY={1}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                height: "26px",
                                              }}
                                            >
                                              <span
                                                fontSize={12}
                                                color="primary"
                                                variant="body1"
                                              >
                                                {/* {message?.ticket_raised_by
                                                 } */}

                                                {message?.ticket_assignee
                                                  ? message?.ticket_assignee
                                                  : message?.ticket_raised_by}
                                              </span>
                                              <Box
                                                sx={{
                                                  display:
                                                    hoveron === i &&
                                                    message?.added_by ===
                                                      user?.userProfileId
                                                      ? "block"
                                                      : "none",
                                                }}
                                              >
                                                <Typography>
                                                  {message?.status === 1 && (
                                                    <CloseIcon
                                                      onClick={() => {
                                                        dispatch(
                                                          removeTicketMessageAction(
                                                            {
                                                              conversation_id:
                                                                message?.conversation_id,
                                                            }
                                                          )
                                                        );
                                                      }}
                                                      sx={{
                                                        cursor: "pointer",
                                                      }}
                                                    ></CloseIcon>
                                                  )}
                                                </Typography>
                                              </Box>
                                            </Box>
                                            <div
                                              style={{
                                                fontSize: "13px",
                                                padding: "0px",
                                              }}
                                              dangerouslySetInnerHTML={{
                                                __html:
                                                  message?.status === 1
                                                    ? message?.message
                                                    : "This Message was Deleted",
                                              }}
                                            ></div>
                                            {message?.attachments?.[0]
                                              ?.status === 2 ? (
                                              <img
                                                style={{
                                                  width: "50px",
                                                  marginTop: "5px",
                                                }}
                                                src="https://cdn-icons-png.flaticon.com/512/3142/3142890.png"
                                                alt=""
                                              />
                                            ) : (
                                              <>
                                                {message?.attachments?.[0]
                                                  ?.media?.[0]
                                                  ?.document_file_name && (
                                                  <>
                                                    <div className="">
                                                      <Box
                                                        sx={{
                                                          display:
                                                            hoveron === i &&
                                                            message?.added_by ===
                                                              user?.userProfileId
                                                              ? "block"
                                                              : "none",
                                                        }}
                                                      >
                                                        <Typography>
                                                          {message
                                                            ?.attachments?.[0]
                                                            ?.status === 1 && (
                                                            <CloseIcon
                                                              onClick={() => {
                                                                dispatch(
                                                                  removeTicketAttachmentAction(
                                                                    {
                                                                      ticket_attachment_id:
                                                                        message
                                                                          ?.attachments?.[0]
                                                                          ?.ticket_attachment_id,
                                                                    }
                                                                  )
                                                                );
                                                              }}
                                                              sx={{
                                                                cursor:
                                                                  "pointer",
                                                              }}
                                                            ></CloseIcon>
                                                          )}
                                                        </Typography>
                                                      </Box>

                                                      {message?.attachments?.map(
                                                        (attachment, i) => (
                                                          <img
                                                            style={{
                                                              width: "100%",
                                                            }}
                                                            src={
                                                              attachment
                                                                ?.media?.[i]
                                                                ?.document_file_name
                                                            }
                                                            alt=""
                                                          />
                                                        )
                                                      )}
                                                    </div>
                                                  </>
                                                )}
                                              </>
                                            )}

                                            <Typography
                                              fontSize={10}
                                              color="GrayText"
                                              textAlign="right"
                                              variant="body1"
                                            >
                                              {moment(
                                                message?.added_date
                                              ).format("lll")}
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </Grid>
                                    );
                                  })}
                                </>
                              )}
                            </Grid>

                            <Divider sx={{ marginBottom: "10px" }}></Divider>

                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "end",
                              }}
                            >
                              <AttachmentOutlined
                                titleAccess="Upload Your Attachment"
                                onClick={() =>
                                  dispatch(setUploadPropertyImagesModal(true))
                                }
                                sx={{
                                  borderRadius: "2px",
                                  fontSize: "30px",
                                  color: "#82817a",
                                  boxShadow: "0px 5px 6px",
                                  border: "1px solid #cbc4c4",
                                  cursor: "pointer",
                                  width: "43px",
                                  marginRight: "17px",
                                  marginTop: "-9px",
                                }}
                              ></AttachmentOutlined>
                            </Box>
                            <Box marginX={2}>
                              <JoditEditor
                                ref={editor}
                                value={content}
                                // config={{readOnly: false}}
                                config={{
                                  readonly: false,
                                  placeholder: "Start typing...",
                                }}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={() => {}}
                                style={{ minHeight: "130px" }}
                              />
                            </Box>
                            <Grid
                              width="auto"
                              marginX={2}
                              marginY={1}
                              container
                              justifyContent="flex-end"
                            >
                              <Button
                                sx={{
                                  borderRadius: "30px",
                                }}
                                onClick={() => sendMessage()}
                                variant="contained"
                                endIcon={<Send />}
                              >
                                Send
                              </Button>
                            </Grid>
                          </Card>
                        </Card>
                      )}
                    </Box>
                  </Grid>
                )}
              </Grid>
              {/* </Container> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SupportCenter;
