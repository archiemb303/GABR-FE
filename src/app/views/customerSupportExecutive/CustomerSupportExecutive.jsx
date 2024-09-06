import { Box, Button, Card, Divider, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { AttachmentOutlined, Send, Upload } from "@mui/icons-material";
import { H1 } from "app/components/Typography";
import CloseIcon from "@mui/icons-material/Close";

import {
  checkCustomerExecutiveAction,
  fetchAdminTicketsAction,
  fetchExecutiveMessagesAction,
  FETCH_ADMIN_TICKETS,
  removeTicketMessageAction,
  sentTicketMessageAction,
  removeTicketAttachmentAction,
} from "app/redux/actions/SupportCenterActions";
import moment from "moment";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchUserProfileAction } from "app/redux/actions/UserProfileActions";
import Loading from "app/components/MatxLoading";
import { setUploadPropertyImagesModal } from "app/redux/actions/ModalActions";
import SupportCenterSendImageTicketAttachment from "../Property/SupportCenterSendImageTicketAttachment";

const MessageTime = styled("span")(({ theme }) => ({
  fontSize: "13px",
  fontWeight: "500",
  color: theme.palette.text.secondary,
}));

const ChatImgContainer = styled("div")(() => ({
  padding: "20px",
  display: "flex",
  justifyContent: "flex-end",
  cursor: "pointer",
  "&:hover": {
    // "& .messageTime": { display: "none" },
    "& .deleteButton": { display: "block" },
  },
}));

const CustomerSupportExecutive = () => {
  const { userAdminCheck } = useSelector((state) => state.userProfile);
  const currentUser = useSelector((state) => state.userProfile);

  const {
    CHECK_CUSTOMER_EXECUTIVE,
    USER_ADMIN_CHECK,
    SEND_TICKET_MESSAGE,
    FETCH_EXECUTIVE_MESSAGES,
    FETCH_ADMIN_TICKETS,
    REMOVE_TICKET_MESSAGES,
    REMOVE_TICKET_ATTACHMENT,
  } = useSelector((state) => state?.loadingAndError?.loader);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTicket, setselectedTicket] = useState(null);
  // const currentUser = useSelector((state) => state.userProfile);

  const {
    fecthAdminTickets,
    fetchExecutiveMessages,
    removeTicketAttachment,
    sendTicketMessage,
    removeTicketMessages,
  } = useSelector((store) => store.supportCenter);

  const ticketCategory = [
    "Property Details",
    "Listing",
    "Tenancy",
    "Packages",
    "Searching",
    "Agents",
    "Invitations",
  ];

  const dateShortOnfecthAdminTickets = (arr) => {
    arr?.sort(function (a, b) {
      return Number(new Date(b.added_date)) - Number(new Date(a.added_date));
    });
    return arr;
  };
  dateShortOnfecthAdminTickets(fecthAdminTickets);

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const user = JSON.parse(localStorage.getItem("persistentState"));
  const lastChatRef = useRef(null);
  const isFirstRender = useRef(true);

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
  }, [fetchExecutiveMessages]);
  useEffect(() => {
    if (
      SEND_TICKET_MESSAGE?.isLoading === false ||
      REMOVE_TICKET_MESSAGES?.isLoading === false ||
      REMOVE_TICKET_ATTACHMENT?.isLoading === false
    )
      dispatch(
        fetchExecutiveMessagesAction({
          ticket_id: selectedTicket?.ticket_id,
        })
      );
  }, [sendTicketMessage, removeTicketMessages, removeTicketAttachment]);

  useEffect(() => {
    dispatch(
      fetchUserProfileAction({
        user_profile_id: user.userProfileId,
        to_view_profile_id: user.userProfileId,
        desired_output: "full",
      })
    );
  }, []);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (userAdminCheck?.admin_id !== null) {
      dispatch(
        checkCustomerExecutiveAction({
          admin_id: userAdminCheck?.admin_id ?? "",
        })
      );

      dispatch(fetchAdminTicketsAction({}));
    } else {
      setError(true);
    }
  }, [userAdminCheck?.admin_id]);

  useEffect(() => {
    if (CHECK_CUSTOMER_EXECUTIVE?.error === "None is not of type 'string'")
      setError(true);
  }, [CHECK_CUSTOMER_EXECUTIVE?.isLoading === false]);

  return (
    <>
      <SupportCenterSendImageTicketAttachment type="Executive" />
      <>
        {!error ? (
          USER_ADMIN_CHECK?.isLoading === true ||
          CHECK_CUSTOMER_EXECUTIVE?.isLoading === true ? (
            <>
              <Box sx={{ height: "100%" }}>
                <Loading />
              </Box>
            </>
          ) : (
            <>
              {" "}
              <Box
                sx={{
                  backgroundColor: "#F2DEB3",
                  paddingTop: "30px",
                }}
              >
                <Box paddingX={10}>
                  {/* <Container sx={{width:"1350px"}}> */}
                  <Box>
                    <Paper
                      sx={{
                        backgroundColor: "white",
                        padding: "17px 0",
                        width: "0 100px",
                        marginBottom: "15px",
                        display: "flex",
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <H1
                        sx={{
                          fontSize: "35px",
                          fontWeight: "bold",
                          marginLeft: "10px",
                        }}
                      >
                        {" "}
                        Support Executive
                      </H1>
                     <Box>
                       <Button
                         sx={{
                           marginLeft: "auto",
                           marginRight: "10px",
                         }}
                         onClick={() => {
                           navigate("/faq");
                         }}
                         variant="outlined"
                       >
                         FAQ
                       </Button>
                       <Button
                         sx={{
                           marginLeft: "auto",
                           marginRight: "10px",
                         }}
                         onClick={() => {
                           navigate("/stampPaperRequests");
                         }}
                         variant="outlined"
                       >
                        View Stamp Paper Requests
                       </Button>
                     </Box>
                    </Paper>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Paper>
                          {/* modal start */}

                          <Box sx={{ height: "100vh", overflowY: "scroll" }}>
                            {FETCH_ADMIN_TICKETS?.isLoading === true ? (
                              <>
                                <Box height="100%">
                                  <Loading />
                                </Box>
                              </>
                            ) : (
                              <>
                                {fecthAdminTickets?.map((ticket) => {
                                  return (
                                    <Card
                                      onClick={() => {
                                        setselectedTicket(ticket);
                                        dispatch(
                                          fetchExecutiveMessagesAction({
                                            ticket_id: ticket.ticket_id,
                                          })
                                        );
                                      }}
                                      variant="outlined"
                                      sx={{
                                        cursor: "pointer",
                                        boxShadow:
                                          ticket.ticket_id ===
                                          selectedTicket?.ticket_id
                                            ? "5px 5px 10px 0px rgb(178 201 224) !important"
                                            : "unset",
                                        padding: "10px 15px",
                                        margin: "20px",
                                      }}
                                    >
                                      <Typography
                                        variant="body1"
                                        fontSize="md"
                                        marginBottom={1}
                                      >
                                        Category: {ticket.ticket_category_name}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        fontSize="md"
                                        marginBottom={1}
                                      >
                                        Sub-Category:{" "}
                                        {ticket.ticket_subcategory_name}
                                        <Typography
                                          textAlign="right"
                                          variant="body1"
                                        >
                                          {moment(ticket.added_date).format(
                                            "l"
                                          )}
                                        </Typography>
                                      </Typography>
                                    </Card>
                                  );
                                })}
                              </>
                            )}
                          </Box>
                        </Paper>
                      </Box>
                    </Grid>
                    {selectedTicket === null ? (
                      <Paper
                        sx={{
                          width: "50%",
                          height: "100px",
                          margin: "100px auto",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "25px",
                            textAlign: "center",
                            marginTop: "20px",
                          }}
                        >
                          Please select a Ticket from the left menu!
                        </Typography>
                      </Paper>
                    ) : (
                      <Grid item xs={12} md={8}>
                        <Box>
                          <Box />
                          <Card
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              padding: 3,
                              margin: "0 auto",
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
                                  Ticket id: {selectedTicket?.ticket_id}
                                </Typography>
                                <Typography variant="body1">
                                  Category:{" "}
                                  {selectedTicket?.ticket_category_name}
                                </Typography>
                                <Typography variant="body1">
                                  Sub-Category:{" "}
                                  {selectedTicket?.ticket_subcategory_name}
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
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  padding: 2,
                                  margin: "0 auto",
                                  my: 2,
                                  width: "100%",
                                  // height: "415px",
                                  overflowY: "scroll",
                                }}
                              >
                                {selectedTicket && (
                                  <Box>
                                    {/* {!m.isAuthor ? (
                                    </Card>
                                  );
                                })}
                              </>
                            )}
                          </Box>
                        </Paper>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Box>
                        <Box />
                        <Card
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            padding: 3,
                            margin: "0 auto",
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
                                Ticket id: {selectedTicket?.ticket_id}
                              </Typography>
                              <Typography variant="body1">
                                Category: {selectedTicket?.ticket_category_name}
                              </Typography>
                              <Typography variant="body1">
                                Sub-Category:{" "}
                                {selectedTicket?.ticket_subcategory_name}
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
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                padding: 2,
                                margin: "0 auto",
                                my: 2,
                                width: "100%",
                                height: "415px",
                                overflowY: "scroll",
                              }}
                            >
                              {selectedTicket && (
                                <Box>
                                  {/* {!m.isAuthor ? (
                            <ChatImgContainer
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Box>
                                <Box
                                  sx={{
                                    backgroundColor: "#e8e8e8",
                                    padding: "10px",
                                    with: "100%",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      margin: "2px",
                                      padding: "3px",
                                      bgcolor: "#d2d2d2",
                                      display: "inline",
                                    }}
                                  >
                                    {m.name}
                                  </Typography>
                                  <Typography>{m.message}</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                  <MessageTime sx={{ marginRight: "4px" }}>
                                    {m.time}
                                  </MessageTime>
                                  <Typography>{m.date}</Typography>
                                </Box>
                              </Box>
                            </ChatImgContainer>
                          ) 
                          : */}

                                    <Grid
                                      // className={classes.root}
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        padding: 2,
                                        margin: "0 auto",
                                        my: 2,
                                        width: "100%",
                                        // height: "450px",
                                        // overflowY: "scroll",
                                      }}
                                    >
                                      {FETCH_EXECUTIVE_MESSAGES?.isLoading ===
                                      true ? (
                                        <Box sx={{ height: 100 }}>
                                          <Loading />
                                        </Box>
                                      ) : (
                                        <>
                                          {fetchExecutiveMessages?.map(
                                            (message, i) => {
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
                                                              borderTopRightRadius:
                                                                "0px",
                                                            }
                                                          : {
                                                              borderTopLeftRadius:
                                                                "0px",
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
                                                          justifyContent:
                                                            "space-between",
                                                          height: "26px",
                                                        }}
                                                      >
                                                        <span
                                                          fontSize={12}
                                                          color="primary"
                                                          variant="body1"
                                                        >
                                                          {message?.added_by ===
                                                          user?.userProfileId
                                                            ? currentUser.first_name +
                                                              " " +
                                                              currentUser.last_name
                                                            : message?.ticket_raised_by}
                                                          {/* {message?.ticket_conversation_data?.first_name}{" "} */}
                                                          <span>
                                                            {/* ~{communication.party_type_name} */}
                                                          </span>
                                                        </span>

                                                        <Box
                                                          sx={{
                                                            display:
                                                              hoveron === i &&
                                                              message?.added_by ===
                                                                user?.userProfileId &&
                                                              message?.status ===
                                                                1
                                                                ? "block"
                                                                : "none",
                                                          }}
                                                        >
                                                          <Typography>
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
                                                                cursor:
                                                                  "pointer",
                                                              }}
                                                            ></CloseIcon>
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
                                                            message?.status ===
                                                            1
                                                              ? message?.message
                                                              : "This Message was Deleted",
                                                        }}
                                                      ></div>

                                                      {message
                                                        ?.attachment_detail?.[0]
                                                        ?.document_file_name && (
                                                        <>
                                                          {message
                                                            ?.attachment_detail[0]
                                                            ?.status === 2 ? (
                                                            <img
                                                              style={{
                                                                width: "50px",
                                                                marginTop:
                                                                  "5px",
                                                              }}
                                                              src="https://cdn-icons-png.flaticon.com/512/3142/3142890.png"
                                                              alt=""
                                                            />
                                                          ) : (
                                                            <div className="">
                                                              <Box
                                                                sx={{
                                                                  display:
                                                                    hoveron ===
                                                                      i &&
                                                                    message?.added_by ===
                                                                      user?.userProfileId
                                                                      ? "block"
                                                                      : "none",
                                                                }}
                                                              >
                                                                <Typography>
                                                                  {/* {message?.attachments?.[0]?.status === 1 && ( */}
                                                                  <CloseIcon
                                                                    onClick={() => {
                                                                      dispatch(
                                                                        removeTicketAttachmentAction(
                                                                          {
                                                                            ticket_attachment_id:
                                                                              message
                                                                                ?.attachment_detail?.[0]
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
                                                                </Typography>
                                                              </Box>

                                                              <img
                                                                style={{
                                                                  width: "100%",
                                                                }}
                                                                src={
                                                                  message
                                                                    ?.attachment_detail?.[0]
                                                                    ?.document_file_name
                                                                }
                                                                alt=""
                                                              />
                                                            </div>
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
                                            }
                                          )}
                                        </>
                                      )}
                                    </Grid>

                                    {/* } */}
                                  </Box>
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
                                  onBlur={(newContent) => {
                                    setContent(newContent);
                                  }} // preferred to use only this option to update the content for performance reasons
                                  onChange={(newContent) => {}}
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
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                  {/* </Container> */}
                </Box>
              </Box>
            </>
          )
        ) : (
          <Box
            sx={{
              textAlign: "center",
              marginTop: "15vh",
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsjuUzWB-VlUIBH6zcP6CzwSVF-bMCL3NKAs4s4aEGMawwt8bvHBgwrzA-QQE_cYyvtNY&usqp=CAU"
              alt=""
            />
            <Typography
              sx={{
                textAlign: "center",
                color: "#B90000",
                fontSize: "23px",
                marginBottom: "20px",
              }}
            >
              Unauthorized access for given user
            </Typography>
            <Link to="/">
              <Button variant="contained"> Home</Button>
            </Link>
          </Box>
        )}
      </>
    </>
  );
};

export default CustomerSupportExecutive;
