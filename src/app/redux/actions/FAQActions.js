import {
  postLoginApiHandlerOLD,
  postLoginApiHandler,
  postLoginLocationApiHandler,
} from "app/utils/apiHandler";

export const GET_FAQ_QUESTIONS = "GET_FAQ_QUESTIONS";

export const getFaqQuestionsAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    GET_FAQ_QUESTIONS,
    "POST",
    "/post_login/faq/get_faq_by_type/",
    apiParams
  );
