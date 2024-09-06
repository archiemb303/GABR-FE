export const OPEN_UTILITY_MODAL = "OPEN_UTILITY_MODAL";

export const setUtilityModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_UTILITY_MODAL, payload: flag });
};

export const OPEN_CONTACT_INFORMATION_MODAL = "OPEN_CONTACT_INFORMATION_MODAL";

export const setContactInformationModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_CONTACT_INFORMATION_MODAL, payload: flag });
};
export const OPEN_VIEW_UPDATED_DRAFT_MODAL = "OPEN_VIEW_UPDATED_DRAFT_MODAL";

export const setViewUpdatedDraftModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_VIEW_UPDATED_DRAFT_MODAL, payload: flag });
};

export const OPEN_PRICING_MODAL = "OPEN_PRICING_MODAL";

export const setPricingModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_PRICING_MODAL, payload: flag });
};

export const OPEN_ADD_PROPERTY_MODAL = "OPEN_ADD_PROPERTY_MODAL";

export const setAddPropertyInfoModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_ADD_PROPERTY_MODAL, payload: flag });
};

export const OPEN_EDIT_PROPERTY_BASIC_DETAILS_MODAL =
  "OPEN_EDIT_PROPERTY_BASIC_DETAILS_MODAL";

export const setEditPropertyBasicDetailsModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_EDIT_PROPERTY_BASIC_DETAILS_MODAL, payload: flag });
};

export const OPEN_EDIT_PROPERTY_LISTING_DETAILS_MODAL =
  "OPEN_EDIT_PROPERTY_LISTING_DETAILS_MODAL";

export const setEditPropertyListingDetailsModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_EDIT_PROPERTY_LISTING_DETAILS_MODAL, payload: flag });
};

export const OPEN_EDIT_TENANT_PREFERENCE_MODAL =
  "OPEN_EDIT_TENANT_PREFERENCE_MODAL";

export const setEditTenantPreferenceModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_EDIT_TENANT_PREFERENCE_MODAL, payload: flag });
};

export const OPEN_EDIT_TENANCY_TERMS_MODAL = "OPEN_EDIT_TENANCY_TERMS_MODAL";

export const setEditTenancyTermsModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_EDIT_TENANCY_TERMS_MODAL, payload: flag });
};

export const OPEN_EDIT_TENANCY_FITTINGS_MODAL =
  "OPEN_EDIT_TENANCY_FITTINGS_MODAL";

export const setEditTenancyFittingsModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_EDIT_TENANCY_FITTINGS_MODAL, payload: flag });
};

export const OPEN_EDIT_PROPERTY_INCLUSION_MODAL =
  "OPEN_EDIT_PROPERTY_INCLUSION_MODAL";

export const setEditPropertyInclusionModal =
  (inclusionModalData) => (dispatch) => {
    dispatch({
      type: OPEN_EDIT_PROPERTY_INCLUSION_MODAL,
      payload: inclusionModalData,
    });
  };

export const OPEN_ADD_PROPERTY_INCLUSION_MODAL =
  "OPEN_ADD_PROPERTY_INCLUSION_MODAL";

export const setAddPropertyInclusionModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_ADD_PROPERTY_INCLUSION_MODAL, payload: flag });
};

export const OPEN_UPLOAD_PROPERTY_IMAGES_MODAL =
  "OPEN_UPLOAD_PROPERTY_IMAGES_MODAL";

export const setUploadPropertyImagesModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_UPLOAD_PROPERTY_IMAGES_MODAL, payload: flag });
};

export const OPEN_EDIT_CONTACT_INFO_MODAL = "OPEN_EDIT_CONTACT_INFO_MODAL";

export const setEditContactInfoModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_EDIT_CONTACT_INFO_MODAL, payload: flag });
};

export const OPEN_EMAIL_OTP_MODAL = "OPEN_EMAIL_OTP_MODAL";

export const setEmailOtpModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_EMAIL_OTP_MODAL, payload: flag });
};

export const OPEN_PHONE_OTP_MODAL = "OPEN_PHONE_OTP_MODAL";

export const setPhoneOtpModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_PHONE_OTP_MODAL, payload: flag });
};

export const OPEN_LISTING_CONFIRMATION_MODAL =
  "OPEN_FREE_LISTING_CONFIRMATION_MODAL";

export const setListingConfirmationModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_LISTING_CONFIRMATION_MODAL, payload: flag });
};

export const OPEN_PACKAGE_PREFERENCE_MODAL = "OPEN_PACKAGE_PREFERENCE_MODAL";

export const setPackagePreferenceModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_PACKAGE_PREFERENCE_MODAL, payload: flag });
};
export const OPEN_PREMIUM_SEARCH_MODAL = "OPEN_PREMIUM_SEARCH_MODAL";

export const setPremiumSearchModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_PREMIUM_SEARCH_MODAL, payload: flag });
};

export const OPEN_PREMIUM_SEARCH_SUCCESS_MODAL =
  "OPEN_PREMIUM_SEARCH_SUCCESS_MODAL";

export const setPremiumSearchSuccessModal = (flag) => (dispatch) => {
  // console.log("open Premium Search Success Modal changed to " + flag);
  dispatch({ type: OPEN_PREMIUM_SEARCH_SUCCESS_MODAL, payload: flag });
};

export const OPEN_PREMIUM_SEARCH_STATUS_MODAL =
  "OPEN_PREMIUM_SEARCH_STATUS_MODAL";

export const setPremiumSearchStatusModal = (flag) => (dispatch) => {
  // console.log("open Premium Search Success Modal changed to " + flag);
  dispatch({ type: OPEN_PREMIUM_SEARCH_STATUS_MODAL, payload: flag });
};
export const OPEN_PREMIUM_PACKAGE_STATUS_MODAL =
  "OPEN_PREMIUM_PACKAGE_STATUS_MODAL";

export const setPremiumPackageStatusModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_PREMIUM_PACKAGE_STATUS_MODAL, payload: flag });
};
export const OPEN_CREATE_NEW_TENANCY_MODAL = "OPEN_CREATE_NEW_TENANCY_MODAL";

export const setCreateNewTenancyModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_CREATE_NEW_TENANCY_MODAL, payload: flag });
};
export const OPEN_ADD_PARTY_CONFIRM_MODAL = "OPEN_ADD_PARTY_CONFIRM_MODAL";

export const setAddPartyConfirmModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_ADD_PARTY_CONFIRM_MODAL, payload: flag });
};
export const OPEN_ADD_USER_PARTY_MODAL = "OPEN_ADD_USER_PARTY_MODAL";

export const setAddUserPartyModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_ADD_USER_PARTY_MODAL, payload: flag });
};

export const OPEN_ADD_PROPERTY_PARTIES_MODAL =
  "OPEN_ADD_PROPERTY_PARTIES_MODAL";

export const setAddPropertyPartiesModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_ADD_PROPERTY_PARTIES_MODAL, payload: flag });
};

export const OPEN_INCLUSION_WARNING_MODAL = "OPEN_INCLUSION_WARNING_MODAL";

export const setInclusionWarningModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_INCLUSION_WARNING_MODAL, payload: flag });
};

export const OPEN_PROPERTY_IMAGES_WARNING_MODAL =
  "OPEN_PROPERTY_IMAGES_WARNING_MODAL";

export const setPropertyImagesWarningModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_PROPERTY_IMAGES_WARNING_MODAL, payload: flag });
};

export const OPEN_PACKAGE_PREFERENCE_SUCCESS_MODAL =
  "OPEN_PACKAGE_PREFERENCE_SUCCESS_MODAL";

export const setPackagePreferenceSuccessModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_PACKAGE_PREFERENCE_SUCCESS_MODAL, payload: flag });
};

export const OPEN_LISTING_PERFORMANCE_WARNING_MODAL =
  "OPEN_LISTING_PERFORMANCE_WARNING_MODAL";

export const setListingPerformanceWarningModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_LISTING_PERFORMANCE_WARNING_MODAL, payload: flag });
};

export const OPEN_DEACTIVATE_TENANCY_MODAL = "OPEN_DEACTIVATE_TENANCY_MODAL";

export const setDeactivateTenancyModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_DEACTIVATE_TENANCY_MODAL, payload: flag });
};

export const OPEN_VIDEO_TUTORIAL_MODAL = "OPEN_VIDEO_TUTORIAL_MODAL";

export const setVideoTutorialModal = (tutorialModalPayload) => (dispatch) => {
  dispatch({
    type: OPEN_VIDEO_TUTORIAL_MODAL,
    payload: tutorialModalPayload,
  });
};

export const OPEN_UPDATE_USER_PROFILE_MODAL = "OPEN_UPDATE_USER_PROFILE_MODAL";

export const setUpdateUserProfileModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_UPDATE_USER_PROFILE_MODAL, payload: flag });
};

export const OPEN_INVITATION_PROPERTY_INFO_MODAL =
  "OPEN_INVITATION_PROPERTY_INFO_MODAL";

export const setInvitationPropertyInfoModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_INVITATION_PROPERTY_INFO_MODAL, payload: flag });
};

export const RENTAL_AGREEMENT_WARNING_MODAL = "RENTAL_AGREEMENT_WARNING_MODAL";

export const setRentalAgreementWarningModal = (flag) => (dispatch) => {
  dispatch({ type: RENTAL_AGREEMENT_WARNING_MODAL, payload: flag });
};
export const OPEN_EDIT_PROPERTY_PARTY_MODAL = "OPEN_EDIT_PROPERTY_PARTY_MODAL";

export const setEditPropertyPartyModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_EDIT_PROPERTY_PARTY_MODAL, payload: flag });
};
export const OPEN_SUPPORT_CENTER_MODAL = "OPEN_SUPPORT_CENTER_MODAL";

export const setSupportCenterMOdal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_SUPPORT_CENTER_MODAL, payload: flag });
};

export const OPEN_REMOVE_LISTING_MODAL = "OPEN_REMOVE_LISTING_MODAL";
export const setRemoveListingModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_REMOVE_LISTING_MODAL, payload: flag });
};
export const OPEN_UPDATE_PROPERTY_MODAL = "OPEN_UPDATE_PROPERTY_MODAL";
export const setUpdatePropertyModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_UPDATE_PROPERTY_MODAL, payload: flag });
};
export const OPEN_UPDATE_PROPERTY_PIC = "OPEN_UPDATE_PROPERTY_MODAL";
export const setUpdatePropertyPicModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_UPDATE_PROPERTY_PIC, payload: flag });
};
export const OPEN_DASHBOARD_VIDEO_MODAL = "OPEN_DASHBOARD_VIDEO_MODAL";
export const setDashboardVideoModal = (dashboardModalPayload) => (dispatch) => {
  dispatch({
    type: OPEN_DASHBOARD_VIDEO_MODAL,
    payload: dashboardModalPayload,
  });
};
export const BULK_REQUEST_CONSENT_MODAL = "BULK_REQUEST_CONSENT_MODAL";
export const setBulkRequestConsentModal = (Payload) => (dispatch) => {
  dispatch({
    type: BULK_REQUEST_CONSENT_MODAL,
    payload: Payload,
  });
};

export const OPEN_AGREEMENT_SIGNING_WARNING_MODAL =
  "OPEN_AGREEMENT_SIGNING_WARNING_MODAL";
export const setAgreementSigningWarningModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_AGREEMENT_SIGNING_WARNING_MODAL, payload: flag });
};

export const OPEN_AGREEMENT_SIGNING_CONFIRMATION_MODAL =
  "OPEN_AGREEMENT_SIGNING_CONFIRMATION_MODAL";
export const setAgreementSigningConfirmationModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_AGREEMENT_SIGNING_CONFIRMATION_MODAL, payload: flag });
};

export const OPEN_VIEW_INVOICE_MODAL = "OPEN_VIEW_INVOICE_MODAL";

export const setViewInvoiceModal = (invoiceModalPayload) => (dispatch) => {
  dispatch({
    type: OPEN_VIEW_INVOICE_MODAL,
    payload: invoiceModalPayload,
  });
};
export const OPEN_REPORT_MODAL = "OPEN_REPORT_MODAL";

export const setReportModal = (openReportModal) => (dispatch) => {
  dispatch({
    type: OPEN_REPORT_MODAL,
    payload: openReportModal,
  });
};

export const OPEN_MARK_PROCURED_MODAL = "OPEN_MARK_PROCURED_MODAL";

export const setOpenMarkProcuredModal = (markProcuredPayload) => (dispatch) => {
  dispatch({ type: OPEN_MARK_PROCURED_MODAL, payload: markProcuredPayload });
};

export const OPEN_PROCUREMENT_STATUS_MODAL = "OPEN_PROCUREMENT_STATUS_MODAL";

export const setOpenProcurementStatusModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_PROCUREMENT_STATUS_MODAL, payload: flag });
};

export const OPEN_LAST_MODIFICATION_HISTORY_MODAL =
  "OPEN_LAST_MODIFICATION_HISTORY_MODAL";

export const setOpenLastModificationHistoryModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_LAST_MODIFICATION_HISTORY_MODAL, payload: flag });
};

export const OPEN_BULK_LEEGALITY_REQUEST_MODAL =
  "OPEN_BULK_LEEGALITY_REQUEST_MODAL";

export const setOpenBulkLeegalityRequestModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_BULK_LEEGALITY_REQUEST_MODAL, payload: flag });
};

export const OPEN_AGREEMENT_CREDIT_SELECTION_MODAL =
  "OPEN_AGREEMENT_CREDIT_SELECTION_MODAL";

export const setOpenAgreementCreditSelectionModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_AGREEMENT_CREDIT_SELECTION_MODAL, payload: flag });
};

export const OPEN_PROCUREMENT_DETAILS_MODAL = "OPEN_PROCUREMENT_DETAILS_MODAL";

export const setOpenProcurementDetailsModal = (payload) => (dispatch) => {
  dispatch({ type: OPEN_PROCUREMENT_DETAILS_MODAL, payload: payload });
};

export const OPEN_LEEGALITY_VIEW_ALL_REQUESTS_MODAL =
  "OPEN_LEEGALITY_VIEW_ALL_REQUESTS_MODAL";

export const setOpenLeegalityViewAllRequestsModal = (payload) => (dispatch) => {
  dispatch({ type: OPEN_LEEGALITY_VIEW_ALL_REQUESTS_MODAL, payload: payload });
};

export const OPEN_UPGRADE_TO_PREMIUM_MODAL = "OPEN_UPGRADE_TO_PREMIUM_MODAL";

export const setOpenUpgradeToPremiumModal = (flag) => (dispatch) => {
  dispatch({ type: OPEN_UPGRADE_TO_PREMIUM_MODAL, payload: flag });
};
export const MEMBER_ALREADY_PREMIUM_MODAL = "MEMBER_ALREADY_PREMIUM_MODAL";

export const setOpenMemberAlreadyPremiumModal = (flag) => (dispatch) => {
  dispatch({ type: MEMBER_ALREADY_PREMIUM_MODAL, payload: flag });
};
export const VIEW_ALL_RENT_RECEIPT_MODAL = "VIEW_ALL_RENT_RECEIPT_MODAL";

export const setOpenViewAllReceiptModal = (flag) => (dispatch) => {
  dispatch({ type: VIEW_ALL_RENT_RECEIPT_MODAL, payload: flag });
};
export const VIEW_RENT_RECEIPT_MODAL = "VIEW_RENT_RECEIPT_MODAL";

export const setOpenViewReceiptModal = (flag) => (dispatch) => {
  dispatch({ type: VIEW_RENT_RECEIPT_MODAL, payload: flag });
};

export const PAY_MONTHLY_RENT_MODAL = "PAY_MONTHLY_RENT_MODAL";

export const setOpenPayMonthlyRentModal = (flag) => (dispatch) => {
  dispatch({ type: PAY_MONTHLY_RENT_MODAL, payload: flag });
};

export const PAY_MONTHLY_RENT_RECEIPT_MODAL = "PAY_MONTHLY_RENT_RECEIPT_MODAL";

export const setOpenPayMonthlyRentRecieptModal = (flag) => (dispatch) => {
  dispatch({ type: PAY_MONTHLY_RENT_RECEIPT_MODAL, payload: flag });
};
