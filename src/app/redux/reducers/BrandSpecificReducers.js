import { CREATE_BRAND, CREATE_FORM, FETCH_MY_BRAND, GENERATE_UNDERSTANDING } from "../actions/BrandSpecificActions";

const initialState = {
    brands: null,
    message: null,
}
const brandSpecificReducer = function (state = initialState, action) {
    switch (action.type) {
      case CREATE_FORM: {
        return { ...state, ...action.payload.Payload };
      }
      case FETCH_MY_BRAND: {
        return {
          ...state,
          brands: action.payload.Payload,
        //   addNewbrand: null,
        };
      }  
      case GENERATE_UNDERSTANDING: {
        return {...state, dummyData: action.payload.Payload}
      }
      case CREATE_BRAND: {
        return {...state, messagee: action.payload.Payload}
      }
      default: {
        return { ...state };
      }
    }
  };

export default brandSpecificReducer;