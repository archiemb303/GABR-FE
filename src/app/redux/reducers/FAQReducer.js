import { GET_FAQ_QUESTIONS } from "../actions/FAQActions";
const initialState = {
  faqQuestions: null,
};
const FAQReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_FAQ_QUESTIONS: {
      return {
        ...state,
        faqQuestions: action.payload.Payload.payload,
      };
    }

    default: {
      return { ...state };
    }
  }
};
export default FAQReducer;
