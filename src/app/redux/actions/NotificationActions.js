import { postLoginApiHandler } from "app/utils/apiHandler";
import axios from "axios";

export const GET_NOTIFICATION = "GET_NOTIFICATION";
export const CREATE_NOTIFICATION = "CREATE_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const DELETE_ALL_NOTIFICATION = "DELETE_ALL_NOTIFICATION";
export const FETCH_MY_NOTIFICATION = "FETCH_MY_NOTIFICATION";
export const READ_UPDATE_NOTIFICATIONS = "READ_UPDATE_NOTIFICATIONS"

export const getNotification = () => (dispatch) => {
  axios.get("/api/notification").then((res) => {
    dispatch({ type: GET_NOTIFICATION, payload: res.data });
  });
};

export const deleteNotification = (id) => (dispatch) => {
  axios.post("/api/notification/delete", { id }).then((res) => {
    dispatch({ type: DELETE_NOTIFICATION, payload: res.data });
  });
};

export const deleteAllNotification = () => (dispatch) => {
  axios.post("/api/notification/delete-all").then((res) => {
    dispatch({ type: DELETE_ALL_NOTIFICATION, payload: res.data });
  });
};

// export const createNotification = (notification) => (dispatch) => {
//   axios.post("/api/notification/add", { notification }).then((res) => {
//     dispatch({ type: CREATE_NOTIFICATION, payload: res.data });
//   });
// };

// axios.post("communications/generate_all_notifications/", { apiParams }).then((res) => {
//   dispatch({ type: CREATE_NOTIFICATION, payload: res.data });

// });
export const createNotificationsAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    CREATE_NOTIFICATION,
    "POST",
    "/communications/generate_notifications/",
    apiParams
  );
};

export const fetchMyNotificationAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    FETCH_MY_NOTIFICATION,
    "POST",
    "/notifications/fetch_my_notifications/",
    apiParams
  );
};

export const readUpdateNotificationsAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    READ_UPDATE_NOTIFICATIONS,
    "POST",
    "/notifications/update_read_notifications/",
    apiParams
  );
};
