import {
  postLoginApiHandlerOLD,
  postLoginApiHandler,
  postLoginLocationApiHandler,
} from "app/utils/apiHandler";

export const FETCH_MY_PROPERTY = "FETCH_MY_PROPERTY";
export const ADD_NEW_PROPERTY = "ADD_NEW_PROPERTY";
export const GET_SEARCHED_PROPERTIES = "GET_SEARCHED_PROPERTIES";
export const GET_INDIVIDUAL_SEARCHED_PROPERTIES_DETAILS =
  "GET_INDIVIDUAL_SEARCHED_PROPERTIES_DETAILS";
export const GET_INDIVIDUAL_PROPERTY = "GET_INDIVIDUAL_PROPERTY";
export const UPDATE_BASIC_PROPERTY_DETAILS = "UPDATE_BASIC_PROPERTY_DETAILS";
export const ADD_OR_UPDATE_LISTING = "ADD_OR_UPDATE_LISTING";
export const UPDATE_TENANCY_TERMS = "UPDATE_TENANCY_TERMS";
export const UPDATE_TENANT_PREFERENCE = "UPDATE_TENANT_PREFERENCE";
export const GENERATE_AGREEMENT_DRAFT = "GENERATE_AGREEMENT_DRAFT";
export const UPDATE_AGREEMENT_DRAFT = "UPDATE_AGREEMENT_DRAFT";
export const INITIATE_AGREEMENT_SIGNING = "INITIATE_AGREEMENT_SIGNING";
export const CHECK_AGREEMENT_SIGNING = "CHECK_AGREEMENT_SIGNING";
export const REFRESH_AGREEMENT_SIGNING = "REFRESH_AGREEMENT_SIGNING";
export const FETCH_LATEST_AGREEMENT_DRAFT = "FETCH_LATEST_AGREEMENT_DRAFT";
export const VERIFY_AGREEMENT = "VERIFY_AGREEMENT";
export const FETCH_TENANCY_INCLUSIONS = "FETCH_TENANCY_INCLUSIONS";
export const ADD_TENANCY_INCLUSIONS = "ADD_TENANCY_INCLUSIONS";
export const UPDATE_TENANCY_INCLUSIONS = "UPDATE_TENANCY_INCLUSIONS";
export const ADD_LISTING_IMAGES = "ADD_LISTING_IMAGES";
export const REMOVE_LISTING_IMAGES = "REMOVE_LISTING_IMAGES";
export const ADD_OR_UPDATE_LISTING_CONTACT = "ADD_OR_UPDATE_LISTING_CONTACT";
export const SEND_LISTING_CONTACT_OTP = "SEND_LISTING_CONTACT_OTP";
export const VERIFY_LISTING_CONTACT_OTP = "VERIFY_LISTING_CONTACT_OTP";
export const PUBLISH_LISTING = "PUBLISH_LISTING";
export const SELECT_PACKAGE_PREFERENCE = "SELECT_PACKAGE_PREFERENCE";
export const CREATE_NEW_TENANCY = "CREATE_NEW_TENANCY";
export const GET_TENANCY_COMMUNICATION = "GET_TENANCY_COMMUNICATION";
export const SEND_TENANCY_COMMUNICATION = "SEND_TENANCY_COMMUNICATION";
export const UPDATE_PROPERTY_PROFILE_PIC = "UPDATE_PROPERTY_PROFILE_PIC";
export const ADD_UPDATE_TENANCY_FITTINGS = "ADD_UPDATE_TENANCY_FITTINGS";
export const REMOVE_TENANCY_INCLUSIONS = "REMOVE_TENANCY_INCLUSIONS";
export const ADD_TENANCY_PARTIES = "ADD_TENANCY_PARTIES";
export const DEACTIVATE_TENANCY = "DEACTIVATE_TENANCY";
export const FETCH_MY_INVITATIONS = "FETCH_MY_INVITATIONS";
export const MANAGE_PARTY_INVITATIONS = "MANAGE_PARTY_INVITATIONS";
export const EDIT_TENANCY_PARTIES = "EDIT_TENANCY_PARTIES";
export const REMOVE_TENANCY_PARTIES = "REMOVE_TENANCY_PARTIES";
export const REMOVE_ACTIVE_LISTING = "REMOVE_ACTIVE_LISTING";
export const RESET_PROPERTY = "RESET_PROPERTY";

export const PAST_SAVE_SEARCHES = "PAST_SAVE_SEARCHES";
export const ADD_SAVED_SEARCHES = "ADD_SAVED_SEARCHES";
export const SHORTLISTED_PROPERTIES = "SHORTLISTED_PROPERTIES";
export const ADD_SHORTLISTED_PROPERTY = "ADD_SHORTLISTED_PROPERTY";
export const REMOVE_SHORTLISTED_PROPERTY = "REMOVE_SHORTLISTED_PROPERTY";
export const GET_CONTACT_LISTING = "GET_CONTACT_LISTING";
export const GET_LISTING_PERFORMANCE = "GET_LISTING_PERFORMANCE";
export const ADD_PREMIUM_SEEKER = "ADD_PREMIUM_SEEKER";
export const REMOVE_SAVED_SEARCHES = "REMOVE_SAVED_SEARCHES";
export const ADD_REPORTED_lISTING = "ADD_REPORTED_lISTING";
export const GET_REPORT_TYPE = "GET_REPORT_TYPE";
export const ADD_STAMP_PAPER_REQUEST = "ADD_STAMP_PAPER_REQUEST";
export const UPDATE_ONLY_PROPERTY_PROFILE_PIC =
  "UPDATE_ONLY_PROPERTY_PROFILE_PIC";
export const MARK_PREMIUM_TENANCY = "MARK_PREMIUM_TENANCY";
export const MARK_PREMIUM_TENANCY_BY_SEEKER_ID =
  "MARK_PREMIUM_TENANCY_BY_SEEKER_ID";
export const INITIATE_RENTAL_PAYMENT = "INITIATE_RENTAL_PAYMENT";
export const VERIFY_RENTAL_PAYMENT = "VERIFY_RENTAL_PAYMENT";
export const FETCH_ALL_RENTAL_PAYMENT_RECEIPTS =
  "FETCH_ALL_RENTAL_PAYMENT_RECEIPTS";
export const FETCH_INDIVIDUAL_RENTAL_PAYMENT_RECEIPTS =
  "FETCH_INDIVIDUAL_RENTAL_PAYMENT_RECEIPTS";
export const GET_ALL_TENANCIES = "GET_ALL_TENANCIES";
export const SEND_RENT_PAYMENT_INVOICE_EMAIL =
  "SEND_RENT_PAYMENT_INVOICE_EMAIL";

export const addPremiumSeekerAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    ADD_PREMIUM_SEEKER,
    "POST",
    "/post_login/property_listing/add_premium_seeker/",
    apiParams
  );
export const pastSaveSearchAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    ADD_SAVED_SEARCHES,
    "POST",
    "/post_login/property_listing/add_saved_searches/",
    apiParams
  );
export const getSavedSearches = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    PAST_SAVE_SEARCHES,
    "POST",
    "/post_login/property_listing/get_saved_searches/",
    apiParams
  );
export const getShortlistedProperties = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    SHORTLISTED_PROPERTIES,
    "POST",
    "/post_login/property_listing/get_shortlisted_properties/",
    apiParams
  );
export const updateOnlyPropertyProfilePicAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    UPDATE_ONLY_PROPERTY_PROFILE_PIC,
    "POST",
    "/post_login/property_management/update_only_property_profile_pic/",
    apiParams
  );
export const addShortlistedProperties = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    ADD_SHORTLISTED_PROPERTY,
    "POST",
    "/post_login/property_listing/add_shortlisted_properties/",
    apiParams
  );
export const removeShortlistedProperties = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    REMOVE_SHORTLISTED_PROPERTY,
    "POST",
    "/post_login/property_listing/remove_shortlisted_properties/",
    apiParams
  );
export const getContactListingAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    GET_CONTACT_LISTING,
    "POST",
    "/post_login/property_listing/get_listing_contact/",
    apiParams
  );
export const getListingPerformanceAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    GET_LISTING_PERFORMANCE,
    "POST",
    "/post_login/property_listing/get_listing_performance/",
    apiParams
  );

export const addNewPropertyAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    ADD_NEW_PROPERTY,
    "POST",
    "/post_login/property_management/add_new_property/",
    apiParams
  );

export const fetchMyPropertyAction = (apiParams) => (dispatch) =>
  postLoginLocationApiHandler(
    dispatch,
    FETCH_MY_PROPERTY,
    "POST",
    "/post_login/property_management/fetch_my_property/",
    apiParams
  );

export const getIndividualPropertyAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    GET_INDIVIDUAL_PROPERTY,
    "POST",
    "/post_login/property_management/get_individual_property/",
    apiParams
  );

export const getSearchedPropertiesAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    GET_SEARCHED_PROPERTIES,
    "POST",
    "/post_login/property_listing/get_searched_properties/",
    apiParams
  );
};

export const getIndividualSearchedPropertiesDetailsAction =
  (apiParams) => (dispatch) => {
    postLoginApiHandler(
      dispatch,
      GET_INDIVIDUAL_SEARCHED_PROPERTIES_DETAILS,
      "POST",
      "/post_login/property_listing/get_individual_searched_properties_details/",
      apiParams
    );
  };

export const updateBasicPropertyDetailsAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    UPDATE_BASIC_PROPERTY_DETAILS,
    "POST",
    "/post_login/property_management/update_basic_property_details/",
    apiParams
  );
};

export const updateTenancyTermsAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    UPDATE_TENANCY_TERMS,
    "POST",
    "/post_login/tenancy_management/update_tenancy_terms/",
    apiParams
  );
};

export const updateTenancyPreferenceAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    UPDATE_TENANT_PREFERENCE,
    "POST",
    "/post_login/property_listing/add_or_update_tenancy_preference/",
    apiParams
  );
};

export const generateAgreementDraftAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    GENERATE_AGREEMENT_DRAFT,
    "POST",
    "/agreementdrafting/generate_agreement_draft/",
    apiParams
  );
};

export const updateAgreementDraftAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    UPDATE_AGREEMENT_DRAFT,
    "POST",
    "/agreementdrafting/update_agreement_draft/",
    apiParams
  );
};

export const initiateAgreementSigningAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    INITIATE_AGREEMENT_SIGNING,
    "POST",
    "/agreementdrafting/initiate_agreement_signing/",
    apiParams
  );
};

export const checkAgreementSigningAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    CHECK_AGREEMENT_SIGNING,
    "POST",
    "/agreementdrafting/check_agreement_signing/",
    apiParams
  );
};

export const updateAgreementSigningStatusAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    REFRESH_AGREEMENT_SIGNING,
    "POST",
    "/agreementdrafting/update_agreement_signing_status/",
    apiParams
  );
};

export const fetchLatestAgreementDraftAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    FETCH_LATEST_AGREEMENT_DRAFT,
    "POST",
    "/agreementdrafting/fetch_latest_agreement_draft/",
    apiParams
  );
};

export const verifyAgreementAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    VERIFY_AGREEMENT,
    "POST",
    "/agreementdrafting/verify_agreement/",
    apiParams
  );
};

export const fetchTenancyInclusionsAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    FETCH_TENANCY_INCLUSIONS,
    "POST",
    "/post_login/tenancy_management/fetch_tenancy_inclusions/",
    apiParams
  );
};

export const addTenancyInclusionsAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    ADD_TENANCY_INCLUSIONS,
    "POST",
    "/post_login/tenancy_management/add_tenancy_inclusions/",
    apiParams
  );
};

export const updateTenancyInclusionsAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    UPDATE_TENANCY_INCLUSIONS,
    "POST",
    "/post_login/tenancy_management/update_tenancy_inclusions/",
    apiParams
  );
};

export const addOrUpdateListingAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    ADD_OR_UPDATE_LISTING,
    "POST",
    "/post_login/property_listing/add_or_update_listing/",
    apiParams
  );
};

export const addListingImagesAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    ADD_LISTING_IMAGES,
    "POST",
    "/post_login/property_listing/add_listing_images/",
    apiParams
  );
};

export const removeListingImagesAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    REMOVE_LISTING_IMAGES,
    "POST",
    "/post_login/property_listing/remove_listing_images/",
    apiParams
  );
};

export const addOrUpdateListingContactAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    ADD_OR_UPDATE_LISTING_CONTACT,
    "POST",
    "/post_login/property_listing/add_or_update_listing_contact/",
    apiParams
  );
};

export const sendListingContactOtpAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    SEND_LISTING_CONTACT_OTP,
    "POST",
    "/post_login/property_listing/send_listing_contact_otp/",
    apiParams
  );
};

export const verifyListingContactOtpAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    VERIFY_LISTING_CONTACT_OTP,
    "POST",
    "/post_login/property_listing/verify_listing_contact_otp/",
    apiParams
  );
};

export const publishListingAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    PUBLISH_LISTING,
    "POST",
    "/post_login/property_listing/publish_listing/",
    apiParams
  );
};

export const selectPackagePreferenceAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    SELECT_PACKAGE_PREFERENCE,
    "POST",
    "/post_login/property_listing/select_package_preference/",
    apiParams
  );
};

export const createNewTenancyAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    CREATE_NEW_TENANCY,
    "POST",
    "/post_login/tenancy_management/create_new_tenancy/",
    apiParams
  );
};

export const getTenancyCommunicationAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    GET_TENANCY_COMMUNICATION,
    "POST",
    "/post_login/tenancy_management/get_tenancy_communication/",
    apiParams
  );
};

export const sendTenancyCommunicationAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    SEND_TENANCY_COMMUNICATION,
    "POST",
    "/post_login/tenancy_management/send_tenancy_communication/",
    apiParams
  );
};

export const updatePropertyProfilePicAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    UPDATE_PROPERTY_PROFILE_PIC,
    "POST",
    "/post_login/property_management/update_property_profile_pic/",
    apiParams
  );
};

export const addUpdateTenancyFittingsAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    ADD_UPDATE_TENANCY_FITTINGS,
    "POST",
    "/post_login/tenancy_management/add_update_tenancy_fittings/",
    apiParams
  );
};

export const removeTenancyInclusionsAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    REMOVE_TENANCY_INCLUSIONS,
    "POST",
    "/post_login/tenancy_management/remove_tenancy_inclusions/",
    apiParams
  );
};

export const addTenancyPartiesAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    ADD_TENANCY_PARTIES,
    "POST",
    "/post_login/tenancy_management/add_tenancy_parties/",
    apiParams
  );
};
export const deactivateTenancyAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    DEACTIVATE_TENANCY,
    "POST",
    "/post_login/tenancy_management/deactivate_tenancy/",
    apiParams
  );
};

export const fetchMyInvitationsAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    FETCH_MY_INVITATIONS,
    "POST",
    "/post_login/tenancy_management/fetch_my_invitations/",
    apiParams
  );
};

export const managePartyInvitationsAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    MANAGE_PARTY_INVITATIONS,
    "POST",
    "/post_login/tenancy_management/manage_party_invitations/",
    apiParams
  );
};
export const editTenancyPartiesAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    EDIT_TENANCY_PARTIES,
    "POST",
    "/post_login/tenancy_management/edit_tenancy_parties/",
    apiParams
  );
};
export const removeTenancyPartiesAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    REMOVE_TENANCY_PARTIES,
    "POST",
    "/post_login/tenancy_management/remove_tenancy_parties/",
    apiParams
  );
};
export const removeActiveListingAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    REMOVE_ACTIVE_LISTING,
    "POST",
    "/post_login/property_listing/remove_active_listing/",
    apiParams
  );
};
export const removeSavedSearchesAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    REMOVE_SAVED_SEARCHES,
    "POST",
    "/post_login/property_listing/remove_saved_searches/",
    apiParams
  );
};
export const addReportedListingAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    ADD_REPORTED_lISTING,
    "POST",
    "/post_login/property_listing/add_reported_listing/",
    apiParams
  );
};
export const getReportTypeAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
    dispatch,
    GET_REPORT_TYPE,
    "POST",
    "/post_login/property_listing/get_report_type/",
    apiParams
  );
};

export const addStampPaperRequestsAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    ADD_STAMP_PAPER_REQUEST,
    "POST",
    "/post_login/customer_support/add_stamp_paper_request/",
    apiParams
  );

export const markPremiumTenancyAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    MARK_PREMIUM_TENANCY,
    "POST",
    "/post_login/tenancy_management/mark_premium_tenancy/",
    apiParams
  );

export const markPremiumTenancyBySeekerIDAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    MARK_PREMIUM_TENANCY_BY_SEEKER_ID,
    "POST",
    "/post_login/tenancy_management/mark_premium_tenancy_by_seeker_id/",
    apiParams
  );

export const initiateRentalPaymentAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    INITIATE_RENTAL_PAYMENT,
    "POST",
    "/payment/initiate_rental_payment/",
    apiParams
  );

export const verifyRentalPaymentAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    VERIFY_RENTAL_PAYMENT,
    "POST",
    "/payment/verify_rental_payment/",
    apiParams
  );
export const fetchAllRentalPaymentReceipts = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    FETCH_ALL_RENTAL_PAYMENT_RECEIPTS,
    "POST",
    "/payment/fetch_all_rental_payment_receipts/",
    apiParams
  );
export const fetchIndividualPaymentReceipts = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    FETCH_INDIVIDUAL_RENTAL_PAYMENT_RECEIPTS,
    "POST",
    "/payment/fetch_individual_payment_receipt/",
    apiParams
  );

export const getAllTenanciesAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    GET_ALL_TENANCIES,
    "POST",
    "/post_login/tenancy_management/get_all_tenancies/",
    apiParams
  );
export const sendRentPaymentInvoiceEmailAction = (apiParams) => (dispatch) =>
  postLoginApiHandler(
    dispatch,
    SEND_RENT_PAYMENT_INVOICE_EMAIL,
    "POST",
    "/payment/send_invoice_rent_payment_email_sms/",
    apiParams
  );
