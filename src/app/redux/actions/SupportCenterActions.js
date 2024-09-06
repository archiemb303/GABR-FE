import {
  postLoginApiHandlerOLD,
  postLoginApiHandler,
  postLoginLocationApiHandler,
  preLoginApiHandler,
} from "app/utils/apiHandler";

export const FETCH_ALL_TICKETS = "FETCH_ALL_TICKETS";

export const fetchAllSupportCenterTicketsAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    FETCH_ALL_TICKETS,
    "POST",
    "/post_login/customer_support/fetch_all_tickets/",
    apiParams
  );

export const RAISE_NEW_TICKET = "RAISE_NEW_TICKET";

export const raiseNewTicketAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    RAISE_NEW_TICKET,
    "POST",
    "/post_login/customer_support/raise_new_ticket/",
    apiParams
  );
export const GENERATE_TEST_AGREEMENT = "GENERATE_TEST_AGREEMENT";

export const generateTestAgreementAction = (apiParams) => (dispatch) =>
  preLoginApiHandler(
    dispatch,
    GENERATE_TEST_AGREEMENT,
    "POST",
    "/agreementdrafting/generate_test_agreement/",
    apiParams
  );

export const GET_TICKET_CATEGORY = "GET_TICKET_CATEGORY";

export const getTicketCategoryAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    GET_TICKET_CATEGORY,
    "POST",
    "/post_login/customer_support/get_ticket_category/",
    apiParams
  );

export const GET_TICKET_SUBCATEGORY = "GET_TICKET_SUBCATEGORY";

export const getTicketSubcategoryAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    GET_TICKET_SUBCATEGORY,
    "POST",
    "/post_login/customer_support/get_ticket_subcategory/",
    apiParams
  );
export const CHECK_CUSTOMER_EXECUTIVE = "CHECK_CUSTOMER_EXECUTIVE";

export const checkCustomerExecutiveAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    CHECK_CUSTOMER_EXECUTIVE,
    "POST",
    "/adminmodule/check_customer_executive/",
    apiParams
  );

export const FETCH_ADMIN_TICKETS = "FETCH_ADMIN_TICKETS";

export const fetchAdminTicketsAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    FETCH_ADMIN_TICKETS,
    "POST",
    "/adminmodule/fetch_admin_tickets/",
    apiParams
  );

export const SEND_TICKET_MESSAGE = "SEND_TICKET_MESSAGE";

export const sentTicketMessageAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    SEND_TICKET_MESSAGE,
    "POST",
    "/post_login/customer_support/send_ticket_messages/",
    apiParams
  );

export const FETCH_EXECUTIVE_MESSAGES = "FETCH_EXECUTIVE_MESSAGES";

export const fetchExecutiveMessagesAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    FETCH_EXECUTIVE_MESSAGES,
    "POST",
    "/adminmodule/fetch_executive_messages/",
    apiParams
  );

export const REMOVE_TICKET_MESSAGES = "REMOVE_TICKET_MESSAGES";

export const removeTicketMessageAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    REMOVE_TICKET_MESSAGES,
    "POST",
    "/post_login/customer_support/remove_ticket_message/",
    apiParams
  );

export const CREATE_TICKET_CONVERSATION = "CREATE_TICKET_CONVERSATION";

export const createTicketConversationAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    CREATE_TICKET_CONVERSATION,
    "POST",
    "/post_login/customer_support/create_ticket_conversation/",
    apiParams
  );

export const REMOVE_TICKET_ATTACHMENT = "REMOVE_TICKET_ATTACHMENT";

export const removeTicketAttachmentAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    REMOVE_TICKET_ATTACHMENT,
    "POST",
    "/post_login/customer_support/remove_ticket_attachment/",
    apiParams
  );

export const FETCH_STAMP_PAPER_REQUESTS = "FETCH_STAMP_PAPER_REQUESTS";

export const fetchStampPaperRequestsAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    FETCH_STAMP_PAPER_REQUESTS,
    "POST",
    "/adminmodule/fetch_stamp_paper_requests/",
    apiParams
  );

export const SEND_STAMP_REQUEST_TO_LEEGALITY =
  "SEND_STAMP_REQUEST_TO_LEEGALITY";

export const sendStampRequestToLeegalityAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    SEND_STAMP_REQUEST_TO_LEEGALITY,
    "POST",
    "/adminmodule/send_stamp_request_to_leegality/",
    apiParams
  );

export const FETCH_PROCUREMENT_PARTY_DETAILS =
  "FETCH_PROCUREMENT_PARTY_DETAILS";

export const fetchProcurementPartyDetailsAction = (apiParams) => (dispatch) =>
  preLoginApiHandler(
    dispatch,
    FETCH_PROCUREMENT_PARTY_DETAILS,
    "POST",
    "/post_login/customer_support/fetch_procurement_party_details/",
    apiParams
  );

export const MARK_PROCUREMENT_STATUS = "MARK_PROCUREMENT_STATUS";

export const markProcurementStatusAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    MARK_PROCUREMENT_STATUS,
    "POST",
    "/post_login/customer_support/mark_procurement_status/",
    apiParams
  );

export const INFORM_PROCURED_STATUS_TO_TENANTOWNER =
  "INFORM_PROCURED_STATUS_TO_TENANTOWNER";

export const informProcuredStatusToTenantOwnerAction =
  (apiParams) => (dispatch) =>
    preLoginApiHandler(
      dispatch,
      INFORM_PROCURED_STATUS_TO_TENANTOWNER,
      "POST",
      "/post_login/customer_support/inform_procured_status_to_tenantowner/",
      apiParams
    );

export const INFORM_TENANCY_PARTIES_FOR_STAMP =
  "INFORM_TENANCY_PARTIES_FOR_STAMP";

export const informTenanyPartiesForStampAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    INFORM_TENANCY_PARTIES_FOR_STAMP,
    "POST",
    "/post_login/customer_support/inform_tenancy_parties_for_stamp/",
    apiParams
  );

export const FETCH_NEW_OR_RESEND_STAMP_REQUEST =
  "FETCH_NEW_OR_RESEND_STAMP_REQUEST";

export const fetchNewOrResendStampRequestAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    FETCH_NEW_OR_RESEND_STAMP_REQUEST,
    "POST",
    "/adminmodule/fetch_new_or_resend_stamp_request/",
    apiParams
  );

export const SEND_BULK_STAMP_REQUEST = "SEND_BULK_STAMP_REQUEST";

export const sendBulkStampRequestAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    SEND_BULK_STAMP_REQUEST,
    "POST",
    "/adminmodule/send_bulk_stamp_request/",
    apiParams
  );

export const FETCH_RESEND_STAMP_REQUESTS = "FETCH_RESEND_STAMP_REQUESTS";

export const fetchResendStampRequestAction = (apiParams) => (dispatch) =>
  preLoginApiHandler(
    dispatch,
    FETCH_RESEND_STAMP_REQUESTS,
    "POST",
    "/post_login/customer_support/fetch_resend_stamp_requests/",
    apiParams
  );
