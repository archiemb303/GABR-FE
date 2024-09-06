import { Clear } from "@mui/icons-material";
import {
  Badge,
  Button,
  Card,
  Drawer,
  Icon,
  IconButton,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import useNotification from "app/hooks/useNotification";
import useSettings from "app/hooks/useSettings";
import { sideNavWidth, topBarHeight } from "app/utils/constant";
import { getTimeDifference } from "app/utils/utils.js";
import React, { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FlexBetween } from "./FlexBox";
import { themeShadows } from "./MatxTheme/themeColors";
import { Paragraph, Small } from "./Typography";
import {
  getSearchedPropertiesAction,
  getIndividualSearchedPropertiesDetailsAction,
} from "app/redux/actions/PropertyActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchMyPropertyAction,
  getIndividualPropertyAction,
} from "app/redux/actions/PropertyActions";
import axios from "axios";
import { useEffect } from "react";
import {
  createNotificationsAction,
  fetchMyNotificationAction,
  readUpdateNotificationsAction,
} from "app/redux/actions/NotificationActions";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import MessageIcon from "@mui/icons-material/Message";
import { getScrollAction } from "app/redux/actions/ScrollAction";

const Notification = styled(Box)(() => ({
  padding: "16px",
  display: "flex",
  marginBottom: "10px",
  alignItems: "center",
  justifyContent: "space-between",
  height: topBarHeight,
  boxShadow: themeShadows[6],
  "& h5": {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: "8px",
    fontWeight: "500",
  },
}));

const style = {
  position: "absolute",
  width: "50%",
  minWidth: 300,
  maxWidth: 600,
  maxHeight: "90%",
  overflow: "auto",
};

const user = JSON.parse(localStorage.getItem("persistentState"));

const NotificationCard = styled(Box)(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  "& .icon": { fontSize: "1.25rem" },
  "& .messageTime": { color: theme.palette.text.secondary },
  "&:hover": {
    // "& .messageTime": { display: "none" },
    "& .deleteButton": { display: "block" },
  },
}));

const CardContain = styled(Box)(({ theme, notification_status }) => ({
  backgroundColor: notification_status === 1 ? "#bfffd4" : "white",
}));
const DeleteButton = styled(IconButton)(() => ({
  padding: 0,
  display: "none",
  background: "rgba(0, 0, 0, 0.01)",
}));

const CardLeftContent = styled(FlexBetween)(({ theme }) => ({
  padding: "12px 8px",
  background: "rgba(0, 0, 0, 0.02)",
  "& small": {
    fontWeight: "500",
    marginLeft: "16px",
    color: theme.palette.text.secondary,
  },
}));

const Heading = styled("span")(({ theme }) => ({
  fontWeight: "500",
  color: theme.palette.text.secondary,
}));

const NotificationBar = ({ container }) => {
  const theme = useTheme();
  const { settings } = useSettings();
  const location = useLocation();
  const secondary = theme.palette.text.secondary;
  const [panelOpen, setPanelOpen] = useState(false);
  const { deleteNotification, clearNotifications, notifications } =
    useNotification();
  const { READ_UPDATE_NOTIFICATIONS } = useSelector(
    (store) => store.loadingAndError.loader
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchMyNotification } = useSelector((state) => state.notifications);

  const handleDrawerToggle = () => {
    if (panelOpen === true) {
      // if (fetchMyNotification.some((notification) => notification.notification_status === 1)) {
      dispatch(readUpdateNotificationsAction());
      // }
    }
    setPanelOpen(!panelOpen);
  };
  const [notification, setnotification] = useState([]);

  const dateShortOnNotification = (arr) => {
    arr?.sort(function (a, b) {
      return (
        Number(new Date(b.notification_date)) -
        Number(new Date(a.notification_date))
      );
    });
    return arr;
  };
  dateShortOnNotification(fetchMyNotification);

  useEffect(() => {
    dispatch(fetchMyNotificationAction({}));
  }, []);

  const handleNotificationClick = (notification) => {
    dispatch(getScrollAction(notification));
    navigate(notification.redirection_page);
    setPanelOpen(false);
    dispatch(readUpdateNotificationsAction());
  };

  const clearNotification = () => {
    // console.log("Inside clearNotification");
    notification.map((el, index) => {
      el.Status = "Read";
    });
    setPanelOpen(!panelOpen);
    // console.log(notification);
  };

  // console.log(notifications);
  return (
    //sx={{style}}
    <Fragment>
      <IconButton onClick={handleDrawerToggle}>
        {/* <Badge color="secondary" badgeContent={notifications?.length}> */}
        <Badge
          color="secondary"
          badgeContent={
            fetchMyNotification?.filter(
              (notification) => notification?.notification_status === 1
            ).length
          }
        >
          <Icon sx={{ color: "text.primary" }}>notifications</Icon>
        </Badge>
      </IconButton>

      <ThemeProvider theme={settings.themes[settings.activeTheme]}>
        <Drawer
          width="100px"
          anchor="right"
          open={panelOpen}
          variant="temporary"
          container={container}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          <Box sx={{ width: sideNavWidth, flexGrow: 1 }}>
            <Notification
              sx={{
                position: "fixed",
                zIndex: "50",
                width: "260px",
                background: "white",
              }}
            >
              <Typography>
                <CloseIcon
                  onClick={clearNotification}
                  sx={{ cursor: "pointer" }}
                ></CloseIcon>
              </Typography>
              <Typography style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1">Notifications</Typography>

                <Icon color="primary" sx={{ zIndex: "50" }}>
                  notifications
                </Icon>
              </Typography>
            </Notification>

            <Box sx={{ marginTop: "80px" }}>
              {fetchMyNotification?.map((el, index) => (
                // ((el?.Status).localeCompare("Unread")==0) ?
                <NotificationCard sx={{ zIndex: "10" }}>
                  {/* <Link
                    to={`${((el?.notificationtype).localeCompare("Property")==0)?('/property'):(el?.targeturl)}`}
                    onClick={((el?.notificationtype).localeCompare("Property")==0)?(
                      ()=>{
                        setPanelOpen(!panelOpen);
                          dispatch(
                            getIndividualPropertyAction({
                                property_id: el?.targeturl,
                            })
                            );
                          // navigate('/property');
  
                      }
                    ):(handleDrawerToggle)}
                    style={{ textDecoration: "none"}}
                  > */}

                  <Card
                    onClick={() => handleNotificationClick(el)}
                    variant="outlined"
                    sx={{ mx: 2, mb: 1, maxHeight: 90 }}
                    elevation={3}
                  >
                    <CardContain notification_status={el.notification_status}>
                      <CardLeftContent sx={{ p: 0.2 }}>
                        <Box
                          display="flex"
                          gap={1}
                          sx={{ alignItems: "center" }}
                        >
                          <Small className="messageTime" sx={{ fontSize: 12 }}>
                            {moment(el?.notification_date).format("ll")}
                          </Small>
                        </Box>

                        <Link to="/dashboard">
                          <DeleteButton
                            size="small"
                            className="deleteButton"
                            // onClick={() => notifications[index].Status="Read"}
                          >
                            <Clear sx={{ fontSize: 16 }} />
                          </DeleteButton>
                        </Link>
                      </CardLeftContent>

                      <Box sx={{ px: 2, pt: 1, pb: 1 }}>
                        <Paragraph
                          sx={{
                            m: 0,
                            lineHeight: 1,
                            fontSize: 12,
                            zIndex: "10",
                          }}
                        >
                          {el?.notification_text}
                        </Paragraph>
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            marginTop: "2px",
                          }}
                        >
                          <Small
                            className="messageTime"
                            sx={{ fontSize: 12, zIndex: "10" }}
                          >
                            {moment(el?.notification_date).format("LT")}
                          </Small>
                        </Box>
                      </Box>
                    </CardContain>
                  </Card>

                  {/* </Link> */}
                </NotificationCard>
              ))}
            </Box>
            {/* {notification.filter(e => e.Status === 'Unread').length==0?(
              <div>There aren't any new notification</div>
            ):('')} */}
            {/* <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={clearNotification}
                  sx={{ borderRadius: 0, boxShadow: "none" }}
                >
                  Clear Notifications
                </Button> */}

            {/* {notifications?.map((notification) => (
              <NotificationCard key={notification.id}>
                <Link
                  to={`/${notification.path}`}
                  onClick={handleDrawerToggle}
                  style={{ textDecoration: "none" }}
                >
                  <Card sx={{ mx: 2, mb: 3 }} elevation={3}>
                    <CardLeftContent>
                      <Box display="flex" gap={1}>
                        <Icon className="icon" color={notification.icon.color}>
                          {notification.icon.name}
                        </Icon>
                        <Heading>{notification.heading}</Heading>
                      </Box>

                      <Small className="messageTime">
                        {getTimeDifference(new Date(notification.timestamp))}
                        ago
                      </Small>

                      <DeleteButton
                        size="small"
                        className="deleteButton"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Clear sx={{ fontSize: 16 }} />
                      </DeleteButton>
                    </CardLeftContent>

                    <Box sx={{ px: 2, pt: 1, pb: 2 }}>
                      <Paragraph sx={{ m: 0 }}>{notification.title}</Paragraph>
                      <Small sx={{ color: secondary }}>{notification.subtitle}</Small>
                    </Box>
                  </Card>
                </Link>
              </NotificationCard>
            ))} */}
          </Box>
        </Drawer>
      </ThemeProvider>
    </Fragment>
  );
};

export default NotificationBar;
