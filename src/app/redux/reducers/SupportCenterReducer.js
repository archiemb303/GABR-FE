import {
  FETCH_ALL_TICKETS,
  GET_TICKET_CATEGORY,
  RAISE_NEW_TICKET,
  CHECK_CUSTOMER_EXECUTIVE,
  FETCH_ADMIN_TICKETS,
  SEND_TICKET_MESSAGE,
  GET_TICKET_SUBCATEGORY,
  FETCH_EXECUTIVE_MESSAGES,
  REMOVE_TICKET_MESSAGES,
  CREATE_TICKET_CONVERSATION,
  REMOVE_TICKET_ATTACHMENT,
  FETCH_STAMP_PAPER_REQUESTS,
  SEND_STAMP_REQUEST_TO_LEEGALITY,
  FETCH_PROCUREMENT_PARTY_DETAILS,
  MARK_PROCUREMENT_STATUS,
  INFORM_PROCURED_STATUS_TO_TENANTOWNER,
  INFORM_TENANCY_PARTIES_FOR_STAMP,
  FETCH_NEW_OR_RESEND_STAMP_REQUEST,
  SEND_BULK_STAMP_REQUEST,
  FETCH_RESEND_STAMP_REQUESTS,
  GENERATE_TEST_AGREEMENT,
} from "../actions/SupportCenterActions";

const initialState = {
  supportCenterTickets: null,
  raiseNewTicket: null,
  getTicketCategory: null,
  checkCustomerExecutive: null,
  fecthAdminTickets: null,
  sendTicketMessage: null,
  fetchExecutiveMessages: null,
  getTicketSubcategory: null,
  removeTicketMessages: null,
  ticketconversation: null,
  removeTicketAttachment: null,
  fetchStampPaperRequests: null,
  sendStamRequestToLeegality: null,
  fetchProcurementPartyDetails: null,
  markProcurementStatus: null,
  informProcuredStatusToTenantOwner: null,
  informTenancyPartiesForStamp: null,
  fetchNewOrResendStampRequest: null,
  sendBulkStampRequest: null,
  fetchResendStampRequests: null,
  generateTestAgreement: null,
};

const SupportCenterReducer = function (state = initialState, action) {
  // console.log(action.type);
  switch (action.type) {
    case FETCH_ALL_TICKETS: {
      return {
        ...state,
        supportCenterTickets: action.payload.Payload.payload,
      };
    }
    case RAISE_NEW_TICKET: {
      return {
        ...state,
        supportCenterTickets: [
          ...state.supportCenterTickets,
          action.payload.Payload.payload,
        ],
        raiseNewTicket: action.payload.Payload.payload,
      };
    }
    case GENERATE_TEST_AGREEMENT: {
      return {
        ...state,
        generateTestAgreement: action.payload.Payload.payload,
      };
    }
    case GET_TICKET_CATEGORY: {
      return {
        ...state,
        getTicketCategory: action.payload.Payload.payload,
      };
    }
    case GET_TICKET_SUBCATEGORY: {
      return {
        ...state,
        getTicketSubcategory: action.payload.Payload.payload,
      };
    }
    case CHECK_CUSTOMER_EXECUTIVE: {
      return {
        ...state,
        checkCustomerExecutive: action.payload.Payload.payload,
      };
    }

    case FETCH_ADMIN_TICKETS: {
      return {
        ...state,
        fecthAdminTickets: action.payload.Payload.payload,
      };
    }

    case SEND_TICKET_MESSAGE: {
      // if (state.checkCustomerExecutive === null) {

      //   const allMassagesAndAttachment = [...state.ticketconversation];
      //   allMassagesAndAttachment.push(action.payload.Payload.payload)

      //   return {

      //     ...state, ticketconversation: allMassagesAndAttachment,

      //   };
      // }
      // else {

      //   const allfetchExecutiveMessages = [
      //     ...state.fetchExecutiveMessages];
      //   allfetchExecutiveMessages.push(action.payload.Payload.payload)

      //   return {
      //     ...state,
      //     fetchExecutiveMessages: {
      //       ...state.fetchExecutiveMessages,

      //     },

      //   };
      // }

      return {
        ...state,
        sendTicketMessage: action.payload.Payload.payload,
      };
    }

    case FETCH_EXECUTIVE_MESSAGES: {
      return {
        ...state,
        fetchExecutiveMessages: action.payload.Payload.payload,
      };
    }
    case REMOVE_TICKET_MESSAGES: {
      return {
        ...state,
        ticketconversation: state?.ticketconversation?.map((conversation) => {
          if (
            conversation.conversation_id !==
            action.payload.Payload.payload.conversation_id
          ) {
            return conversation;
          } else {
            return {
              ...conversation,
              message: "This Message was Deleted",
              status: action.payload.Payload.payload.status_id,
            };
          }
        }),
      };
    }

    case CREATE_TICKET_CONVERSATION: {
      return {
        ...state,
        ticketconversation: action.payload.Payload.payload,
      };
    }

    // case CREATE_TICKET_CONVERSATION: {
    //   return {
    //     ...state,
    //     ticketconversation: action.payload.Payload.payload,
    //   };
    // }

    case REMOVE_TICKET_ATTACHMENT: {
      //  return{
      //   ...state,
      //   ticketconversation: state?.ticketconversation?.attachments?.[0]?.media?.map( (attachment) =>{
      //     if(attachment.status_if
      //       !== action.payload.Payload.payload.attachment.status_if ) {
      //       return attachment
      //   } else{
      //     return{...attachment , message: "This attachment was Deleted",
      //           status: action.payload.Payload.payload.status_if
      //      }
      //        }
      //   })
      //  }
      return {
        ...state,
        removeTicketAttachment: action.payload.Payload.payload,
      };
    }
    case FETCH_STAMP_PAPER_REQUESTS: {
      return {
        ...state,
        fetchStampPaperRequests: action.payload.Payload,
      };
    }
    case SEND_STAMP_REQUEST_TO_LEEGALITY: {
      return {
        ...state,
        fetchStampPaperRequests: state.fetchStampPaperRequests?.map(
          (request) => {
            if (request.request_id === action.payload.Payload.request_id) {
              return {
                ...request,
                request_status: action.payload.Payload.request_status_id,
                request_status_name: "Request sent to Leegality",
              };
            }
            return request;
          }
        ),
      };
    }
    case FETCH_PROCUREMENT_PARTY_DETAILS: {
      return {
        ...state,
        fetchProcurementPartyDetails: action.payload.Payload,
      };
    }
    case MARK_PROCUREMENT_STATUS: {
      return {
        ...state,
        fetchStampPaperRequests: state.fetchStampPaperRequests?.map(
          (request) => {
            if (
              request.request_id === action.payload.Payload.payload.request_id
            ) {
              return {
                ...request,
                request_status:
                  action.payload.Payload.payload.request_status_id,
                request_status_name: "Procured",
              };
            }
            return request;
          }
        ),
      };
    }
    case INFORM_PROCURED_STATUS_TO_TENANTOWNER: {
      return {
        ...state,
        informProcuredStatusToTenantOwner: action.payload.Payload,
        fetchProcurementPartyDetails: {
          ...state.fetchProcurementPartyDetails,
          leegality_confirmation_status:
            action.payload.Payload.leegality_confirmation_status,
        },
      };
    }
    case INFORM_TENANCY_PARTIES_FOR_STAMP: {
      return {
        ...state,
        informTenancyPartiesForStamp: action.payload.Payload,
      };
    }
    case FETCH_NEW_OR_RESEND_STAMP_REQUEST: {
      return {
        ...state,
        fetchNewOrResendStampRequest: action.payload.Payload,
      };
    }
    case SEND_BULK_STAMP_REQUEST: {
      return {
        ...state,
        sendBulkStampRequest: action.payload.Payload,
        fetchStampPaperRequests: state.fetchStampPaperRequests.map(
          (request) => {
            const matchedRequest = action.payload.Payload?.filter(
              (item) => item.request_id === request.request_id
            )[0];
            if (matchedRequest) {
              return {
                ...request,
                request_status: matchedRequest.request_status_id,
                request_status_name: "Request sent to Leegality",
              };
            }
            return request;
          }
        ),
      };
    }
    case FETCH_RESEND_STAMP_REQUESTS: {
      return {
        ...state,
        fetchResendStampRequests: action.payload.Payload,
      };
    }
    default:
      return { ...state };
  }
};
export default SupportCenterReducer;
