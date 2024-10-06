import {
  GET_ALL_STATES_BY_COUNTRY,
  GET_ALL_CITIES_BY_STATE,
  GET_ALL_CITIES,
  GET_ALL_STATES,
  SET_CURRENT_USER_LOCATION,
  GET_ALL_COUNTRIES,
} from "../actions/LocationActions";

const initialState = {
  statesList: null,
  states: null,
  cities: null,
  city: null,
  currentLocation: null,
  countries: null,
};

const LocationReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_STATES_BY_COUNTRY: {
      return { ...state, states: action.payload.Payload };
    }
    case GET_ALL_STATES: {
      return { ...state, statesList: action.payload.Payload };
    }
    case GET_ALL_CITIES_BY_STATE: {
      return { ...state, city: action.payload.Payload };
    }
    case GET_ALL_CITIES: {
      return { ...state, cities: action.payload.Payload };
    }
    case SET_CURRENT_USER_LOCATION: {
      return { ...state, currentLocation: action.payload };
    }
    case GET_ALL_COUNTRIES: {
      return {...state, countries: action.payload.Payload}
    }
    default: {
      return { ...state };
    }
  }
};

export default LocationReducer;
