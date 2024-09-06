import { postLoginApiHandler, preLoginApiHandler } from "app/utils/apiHandler";

export const GENERATE_OTP = "GENERATE_OTP";
export const VERIFY_OTP = "VERIFY_OTP";
export const LOGOUT = "LOGOUT";
export const ADD_CONTACT_FORM = "ADD_CONTACT_FORM";
export const DIRECT_ACCEPT_OR_REJECT_INVITE = "DIRECT_ACCEPT_OR_REJECT_INVITE";
export const generateOtpAction = (apiParams) => (dispatch) =>
  preLoginApiHandler(
    dispatch,
    GENERATE_OTP,
    "POST",
    "/session_handlers/user_login_generate_otp/",
    apiParams
  );
export const acceptOrRejectInviteAction = (apiParams) => (dispatch) =>
  preLoginApiHandler(
    dispatch,
    DIRECT_ACCEPT_OR_REJECT_INVITE,
    "POST",
    "/post_login/tenancy_management/direct_accept_reject_invitation/",
    { payload: apiParams }
  );

export const verifyOtpAction = (apiParams) => (dispatch) =>
  preLoginApiHandler(
    dispatch,
    VERIFY_OTP,
    "POST",
    "/session_handlers/user_login_verify_otp/",
    apiParams
  );
export const addContactFormAction = (apiParams) => (dispatch) =>
  preLoginApiHandler(
    dispatch,
    ADD_CONTACT_FORM,
    "POST",
    "/post_login/pre_login_contactus/add_contact_form/",
    apiParams
  );

export const logoutAction = () => (dispatch) =>
  dispatch({
    type: LOGOUT,
    payload: {
      isLoggedIn: false,
      email: null,
      userSessionId: null,
      userLoginId: null,
      accessToken: null,
      refreshToken: null,
      serviceName: null,
      serviceRequestId: null,
      userProfileId: null,
    },
  });
