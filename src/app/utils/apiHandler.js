import { loaderAction } from "app/redux/actions/LoadingAndErrorAction";
import { logoutAction } from "app/redux/actions/PreloginActions";
import { RESET_PROPERTY } from "app/redux/actions/PropertyActions";
import axios from "axios";
import customHistory from "./customHistory";
import Store from "app/redux/Store";

// actionType = required
// apiMethod = required
// apiUrl = required
// apiParams = required

// toggle the console log - use false for production
const toggleDebugMode = true;

const callApi = (api, dispatch, actionType) => {
  // This will reset the loader state after the set milliseconds have passed
  const resetLoaderAfterDelay = () => {
    setTimeout(() => {
      loaderAction(dispatch, actionType, "reset");
    }, 5000);
  };

  loaderAction(dispatch, actionType, "start");
  axios(api)
    .then((res) => {
      console.log(res);
      // Api Success Response
      if (res.data.Status === 200 || res.data.Status === "Success") {
        if (toggleDebugMode) {
          console.log(
            "\n😛API Success  =>  ",
            res.config.url,
            "\n",
            " 🅿️ API Parameters => ",
            api.data,
            "\n",
            " ⚡ Action Name => ",
            actionType,
            "\n",
            " ✅API Response => ",
            res.data.Payload
          );
        }
        loaderAction(dispatch, actionType, "success");
        resetLoaderAfterDelay();
        return dispatch({
          type: actionType,
          payload: { ...res.data, email: api.data.email_id },
        });
      }
      // Api Payload Issue
      if (toggleDebugMode) {
        console.log(
          "\n👩‍💻API Payload Issue  =>  ",
          res.config.url,
          "\n",
          " 🅿️ API Parameters => ",
          api.data,
          "\n",
          " ⚡ Action Name => ",
          actionType,
          "\n",
          " ⚠️ Issue => ",
          res.data
        );
      }
      loaderAction(dispatch, actionType, "failure", res.data.Message);
      resetLoaderAfterDelay();
      //If token has expired then log the user out
      if (
        res.data.Status === 451 &&
        res.data.Message === "Token prefix expired"
      ) {
        dispatch(logoutAction());
        dispatch({
          type: RESET_PROPERTY,
        });
        //Navigate the user to the login page
        customHistory.navigate("/session/signin");
      }
    })
    .catch((err) => {
      // Api Failure
      if (toggleDebugMode) {
        console.log(
          "\n😐 API Failed =>  ",
          api.url,
          "\n",
          " 🅿️ API Parameters => ",
          api.data,
          "\n",
          " ⚡ Action Name => ",
          actionType,
          "\n",
          " 🚫Error => ",
          err
        );
      }
      loaderAction(dispatch, actionType, "failure", err);
      resetLoaderAfterDelay();
      return null;
    });
};

export const preLoginApiHandler = (
  dispatch,
  actionType,
  apiMethod,
  apiUrl,
  apiParams
) => {
  const api = {
    method: apiMethod,
    url: process.env.REACT_APP_HOST_ADDRESS + apiUrl,
    data: apiParams,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": process.env.REACT_APP_API_CSRF_TOKEN,
      Authorization: process.env.REACT_APP_PRELOGIN_API_AUTHORIZATION,
    },
  };

  return callApi(api, dispatch, actionType);
};

export const postLoginApiHandlerOLD = (
  dispatch,
  actionType,
  apiMethod,
  apiUrl,
  apiParams
) => {
  const persistentState = JSON.parse(localStorage.getItem("persistentState"));

  const api = {
    method: apiMethod,
    url: process.env.REACT_APP_HOST_ADDRESS + apiUrl,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": process.env.REACT_APP_API_CSRF_TOKEN,
      Authorization: process.env.REACT_APP_POSTLOGIN_API_AUTHORIZATION,
      accesstoken: persistentState.accessToken,
    },
    data: {
      ...apiParams,
      refresh_token: persistentState.refreshToken,
    },
  };

  return callApi(api, dispatch, actionType);
};

export const postLoginApiHandler = (
  dispatch,
  actionType,
  apiMethod,
  apiUrl,
  apiParams
) => {
  // {console.log(apiParams)}
  const persistentState = JSON.parse(localStorage.getItem("persistentState"));
  const currentLocation = Store.getState().location.currentLocation;

  const api = {
    method: apiMethod,
    url: process.env.REACT_APP_HOST_ADDRESS + apiUrl,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": process.env.REACT_APP_API_CSRF_TOKEN,
      Authorization: process.env.REACT_APP_POSTLOGIN_API_AUTHORIZATION,
      accesstoken: persistentState.accessToken,
    },
    data: {
      authentication_params: {
        user_profile_id: persistentState.userProfileId,
        refresh_token: persistentState.refreshToken,
      },
      payload: { ...apiParams },
      currentLocation: { ...currentLocation },
    },
  };

  return callApi(api, dispatch, actionType);
};

export const postLoginLocationApiHandler = (
  dispatch,
  actionType,
  apiMethod,
  apiUrl,
  apiParams
) => {
  const persistentState = JSON.parse(localStorage.getItem("persistentState"));

  const api = {
    method: apiMethod,
    url: process.env.REACT_APP_HOST_ADDRESS + apiUrl,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": process.env.REACT_APP_API_CSRF_TOKEN,
      Authorization: process.env.REACT_APP_POSTLOGIN_API_AUTHORIZATION,
      accesstoken: persistentState.accessToken,
    },
    data: apiParams,
  };

  return callApi(api, dispatch, actionType);
};
