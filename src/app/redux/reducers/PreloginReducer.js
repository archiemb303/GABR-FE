import {
  GENERATE_OTP,
  VERIFY_OTP,
  LOGOUT,
  ADD_CONTACT_FORM,
  DIRECT_ACCEPT_OR_REJECT_INVITE,
} from "../actions/PreloginActions";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  serviceName: null,
  userSessionId: null,
  userLoginId: null,
  serviceRequestId: null,
  userProfileId: null,
  addContactForm: null,
  invitationStatus: null,
};

const PreloginReducer = function (state = initialState, action) {
  switch (action.type) {
    case GENERATE_OTP: {
      const preloginState = {
        ...state,
        email: action.payload.email,
        userSessionId: action.payload.Payload.session_id,
        userLoginId: action.payload.Payload.login_id,
      };

      return preloginState;
    }
    case DIRECT_ACCEPT_OR_REJECT_INVITE: {
      const preloginState = {
        ...state,
        invitationStatus: action.payload.Payload,
      };

      return preloginState;
    }

    case VERIFY_OTP: {
      const preloginState = {
        ...state,
        isLoggedIn: true,
        userSessionId: action.payload.Payload.session_id,
        accessToken: action.payload.Payload.access_token,
        refreshToken: action.payload.Payload.refresh_token,
        serviceName: action.payload.Payload.service_name,
        serviceRequestId: action.payload.Payload.service_request_id,
        userProfileId: action.payload.Payload.user_profile_id,
      };

      return preloginState;
    }

    case LOGOUT: {
      const preloginState = {
        ...state,
        email: action.payload.email,
        isLoggedIn: action.payload.isLoggedIn,
        userSessionId: action.payload.userSessionId,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        serviceName: action.payload.serviceName,
        serviceRequestId: action.payload.serviceRequestId,
        userProfileId: action.payload.userProfileId,
        userLoginId: action.payload.userLoginId,
      };

      return preloginState;
    }

    case ADD_CONTACT_FORM: {
      return { ...state, addContactForm: action.payload.Payload };

      // return preloginState;
    }
    default: {
      return { ...state };
    }
  }
};

export default PreloginReducer;
