import {
  postLoginApiHandler,
  postLoginApiHandler2,
  postLoginLocationApiHandler,
} from "app/utils/apiHandler";

export const GET_ALL_STATES_BY_COUNTRY = "GET_ALL_STATES_BY_COUNTRY";
export const GET_ALL_STATES = "GET_ALL_STATES";
export const GET_ALL_CITIES_BY_STATE = "GET_ALL_CITIES_BY_STATE";
export const GET_ALL_CITIES = "GET_ALL_CITIES";
export const SET_CURRENT_USER_LOCATION = "SET_CURRENT_USER_LOCATION";

export const getAllStatesByCountryAction = (apiParams) => (dispatch) =>
  postLoginLocationApiHandler(
    dispatch,
    GET_ALL_STATES_BY_COUNTRY,
    "POST",
    "/post_login/location/get_all_states_by_country/",
    apiParams
  );

export const getAllStatesAction = (apiParams) => (dispatch) =>
  postLoginLocationApiHandler(
    dispatch,
    GET_ALL_STATES,
    "POST",
    "/post_login/location/get_all_states/",
    apiParams
  );

export const getAllCitiesByStateAction = (apiParams) => (dispatch) =>
  postLoginLocationApiHandler(
    dispatch,
    GET_ALL_CITIES_BY_STATE,
    "POST",
    "/post_login/location/get_all_cities_by_state/",
    apiParams
  );
export const getAllCitiesAction = (apiParams) => (dispatch) =>
  postLoginLocationApiHandler(
    dispatch,
    GET_ALL_CITIES,
    "POST",
    "/post_login/location/get_all_cities/",
    apiParams
  );
