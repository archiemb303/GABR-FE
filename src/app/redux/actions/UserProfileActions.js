import {
  postLoginApiHandler,
  postLoginApiHandlerOLD,
} from "app/utils/apiHandler";

export const FETCH_USER_PROFILE = "FETCH_USER_PROFILE";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const USER_ADMIN_CHECK = "USER_ADMIN_CHECK";

export const fetchUserProfileAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    FETCH_USER_PROFILE,
    "POST",
    "/post_login/user_profile/fetch_user_profile/",
    apiParams
  );
};
export const updateUserProfileAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    UPDATE_USER_PROFILE,
    "POST",
    "/post_login/user_profile/update_user_profile/",
    apiParams
  );
};

export const checkUserAdmin = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    USER_ADMIN_CHECK,
    "POST",
    "/adminmodule/user_admin_check/",
    apiParams
  );
};
