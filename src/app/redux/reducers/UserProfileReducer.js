import {
  FETCH_USER_PROFILE,
  UPDATE_USER_PROFILE,
  USER_ADMIN_CHECK,
} from "../actions/UserProfileActions";

const initialState = {
  userAdminCheck: null,
};

const UserProfileReducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_PROFILE: {
      return { ...state, ...action.payload.Payload };
    }

    case UPDATE_USER_PROFILE: {
      return { ...state, ...action.payload.Payload.payload };
    }
    case USER_ADMIN_CHECK: {
      return { ...state, userAdminCheck: action.payload.Payload.payload };
    }

    default: {
      return { ...state };
    }
  }
};

export default UserProfileReducer;
