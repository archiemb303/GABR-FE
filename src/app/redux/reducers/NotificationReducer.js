import {

  CREATE_NOTIFICATION,
  DELETE_ALL_NOTIFICATION,
  DELETE_NOTIFICATION,
  FETCH_MY_NOTIFICATION,
  GET_NOTIFICATION,
  READ_UPDATE_NOTIFICATIONS
} from "../actions/NotificationActions";

const initialState = {

  fetchMyNotification: null,
};

const NotificationReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATION: {
      return [...action.payload];
    }

    case CREATE_NOTIFICATION: {
      const fetchNotificaton = [...state.fetchMyNotification];
      fetchNotificaton.push(action.payload.Payload.payload);
      return { ...state, fetchMyNotification: fetchNotificaton };
    }
    case FETCH_MY_NOTIFICATION: {

      return { ...state, fetchMyNotification: action.payload.Payload.payload };
    }

    case DELETE_NOTIFICATION: {
      return [...action.payload];
    }

    case DELETE_ALL_NOTIFICATION: {
      return [...action.payload];
    }

    case READ_UPDATE_NOTIFICATIONS: {
      return { ...state, fetchMyNotification: action.payload.Payload.payload };
    }


    default: {
      return { ...state };
    }
  }
};

export default NotificationReducer;
