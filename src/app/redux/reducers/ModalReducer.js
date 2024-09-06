import {
  OPEN_UTILITY_MODAL,
  OPEN_CONTACT_INFORMATION_MODAL,
  OPEN_PRICING_MODAL,
  OPEN_ADD_PROPERTY_MODAL,
  OPEN_EDIT_PROPERTY_BASIC_DETAILS_MODAL,
  OPEN_EDIT_PROPERTY_LISTING_DETAILS_MODAL,
  OPEN_EDIT_TENANT_PREFERENCE_MODAL,
  OPEN_EDIT_TENANCY_TERMS_MODAL,
  OPEN_EDIT_TENANCY_FITTINGS_MODAL,
  OPEN_EDIT_PROPERTY_INCLUSION_MODAL,
  OPEN_UPLOAD_PROPERTY_IMAGES_MODAL,
  OPEN_EDIT_CONTACT_INFO_MODAL,
  OPEN_LISTING_CONFIRMATION_MODAL,
  OPEN_EMAIL_OTP_MODAL,
  OPEN_PHONE_OTP_MODAL,
  OPEN_PACKAGE_PREFERENCE_MODAL,
  OPEN_PREMIUM_PACKAGE_STATUS_MODAL,
  OPEN_CREATE_NEW_TENANCY_MODAL,
  OPEN_ADD_PROPERTY_PARTIES_MODAL,
  OPEN_ADD_PROPERTY_INCLUSION_MODAL,
  OPEN_INCLUSION_WARNING_MODAL,
  OPEN_PROPERTY_IMAGES_WARNING_MODAL,
  OPEN_PACKAGE_PREFERENCE_SUCCESS_MODAL,
  OPEN_LISTING_PERFORMANCE_WARNING_MODAL,
  OPEN_DEACTIVATE_TENANCY_MODAL,
  OPEN_VIDEO_TUTORIAL_MODAL,
  OPEN_UPDATE_USER_PROFILE_MODAL,
  OPEN_INVITATION_PROPERTY_INFO_MODAL,
  RENTAL_AGREEMENT_WARNING_MODAL,
  OPEN_EDIT_PROPERTY_PARTY_MODAL,
  OPEN_SUPPORT_CENTER_MODAL,
  OPEN_REMOVE_LISTING_MODAL,
  OPEN_UPDATE_PROPERTY_MODAL,
  OPEN_DASHBOARD_VIDEO_MODAL,
  OPEN_AGREEMENT_SIGNING_WARNING_MODAL,
  OPEN_AGREEMENT_SIGNING_CONFIRMATION_MODAL,
  OPEN_VIEW_INVOICE_MODAL,
  OPEN_PREMIUM_SEARCH_SUCCESS_MODAL,
  OPEN_PREMIUM_SEARCH_STATUS_MODAL,
  OPEN_PREMIUM_SEARCH_MODAL,
  OPEN_REPORT_MODAL,
  OPEN_ADD_PARTY_CONFIRM_MODAL,
  OPEN_ADD_USER_PARTY_MODAL,
  OPEN_MARK_PROCURED_MODAL,
  OPEN_PROCUREMENT_STATUS_MODAL,
  OPEN_LAST_MODIFICATION_HISTORY_MODAL,
  OPEN_UPDATE_PROPERTY_PIC,
  OPEN_BULK_LEEGALITY_REQUEST_MODAL,
  BULK_REQUEST_CONSENT_MODAL,
  OPEN_VIEW_UPDATED_DRAFT_MODAL,
  OPEN_AGREEMENT_CREDIT_SELECTION_MODAL,
  OPEN_PROCUREMENT_DETAILS_MODAL,
  OPEN_LEEGALITY_VIEW_ALL_REQUESTS_MODAL,
  OPEN_UPGRADE_TO_PREMIUM_MODAL,
  MEMBER_ALREADY_PREMIUM_MODAL,
  VIEW_RENT_RECEIPT_MODAL,
  PAY_MONTHLY_RENT_MODAL,
  VIEW_ALL_RENT_RECEIPT_MODAL,
  PAY_MONTHLY_RENT_RECEIPT_MODAL,
} from "../actions/ModalActions";

const initialState = {
  openUtility: false,
  openContactInformation: false,
  openPricingDetails: false,
  openAddPropertyInfo: false,
  openEditPropertyBasicDetails: false,
  openEditPropertyListingDetails: false,
  openEditTenantPreference: false,
  openEditTenancyTerms: false,
  openEditTenancyFittings: false,
  openEditPropertyInclusion: { flag: false, inclusionModalData: {} },
  openUploadPropertyImages: false,
  openEditContactInfo: false,
  openListingConfirmation: false,
  openEmailOtp: false,
  openPhoneOtp: false,
  openPackagePreference: false,
  openPremiumPackageStatus: false,
  openPremiumUserTenancy: false,
  openCreateNewTenancy: false,
  openAddPropertyParties: false,
  openAddPropertyInclusion: false,
  openInclusionWarningModal: false,
  openPropertyImagesWarningModal: false,
  openPackagePreferenceSuccessModal: false,
  openListingPerformanceWarningModal: false,
  openDeactivateTenancy: false,
  openVideoTutorialModal: { flag: false, tutorialLink: null, src: null },
  openUpdateUserProfile: false,
  openInvitationPropertyInfoModal: false,
  openRentalAgreementWarning: false,
  // openInvitationPropertyInfoModal: false,
  openEditPropertyPartyModal: false,
  openSupportCenterModal: false,
  openCloseListingModal: false,
  openUpdatePropertyModal: false,
  openDashboardVideoModal: { flag: false, tutorialLink: "" },
  openAgreementSigningWarningModal: false,
  openAgreementSigningConfirmationModal: false,
  openViewInvoiceModal: { flag: false, index: null },
  openPremiumSearchModal: false,
  openPremiumSearchSuccessModal: false,
  openPremiumSearchStatusModal: false,
  openReportModal: false,
  openAddPartyConfirm: false,
  openAddUserParty: false,
  openMarkProcuredModal: { flag: false, request: null },
  openProcurementStatusModal: false,
  openLastModificationHistoryModal: false,
  openUpdatePropertyPic: false,
  openBulkLeegalityRequestModal: false,
  openbulkRequestConsentModal: { flag: false, selectedRequests: null },
  openViewUpdatedDraftModal: false,
  openAgreementCreditSelectionModal: false,
  openProcurementDetailsModal: { flag: false, request: null },
  openLeegalityViewAllRequestsModal: false,
  openUpgardeToPremiumModal: false,
  openMemberAlreadyPremiumModal: false,
  openViewRentReceiptModal: { flag: false, type: "Draft Receipt" },
  openPayMonthlyRentModal: false,
  openViewAllRentReceiptsModal: false,
  openPayMonthlyRentReceiptModal: false,
};

const ModalReducer = function (state = initialState, action) {
  switch (action.type) {
    case BULK_REQUEST_CONSENT_MODAL: {
      return { ...state, openbulkRequestConsentModal: action.payload };
    }
    case OPEN_VIEW_UPDATED_DRAFT_MODAL: {
      return { ...state, openViewUpdatedDraftModal: action.payload };
    }
    case OPEN_ADD_PARTY_CONFIRM_MODAL: {
      return { ...state, openAddPartyConfirm: action.payload };
    }
    case OPEN_ADD_USER_PARTY_MODAL: {
      return { ...state, openAddUserParty: action.payload };
    }
    case OPEN_EDIT_PROPERTY_PARTY_MODAL: {
      return { ...state, openEditPropertyPartyModal: action.payload };
    }
    case OPEN_UPDATE_USER_PROFILE_MODAL: {
      return { ...state, openUpdateUserProfile: action.payload };
    }
    case OPEN_DEACTIVATE_TENANCY_MODAL: {
      return { ...state, openDeactivateTenancy: action.payload };
    }
    case OPEN_UTILITY_MODAL: {
      return { ...state, openUtility: action.payload };
    }
    case OPEN_CONTACT_INFORMATION_MODAL: {
      return { ...state, openContactInformation: action.payload };
    }
    case OPEN_PRICING_MODAL: {
      return { ...state, openPricingDetails: action.payload };
    }
    case OPEN_ADD_PROPERTY_MODAL: {
      return { ...state, openAddPropertyInfo: action.payload };
    }
    case OPEN_UPDATE_PROPERTY_PIC: {
      return { ...state, openUpdatePropertyPic: action.payload };
    }
    case OPEN_EDIT_PROPERTY_BASIC_DETAILS_MODAL: {
      return { ...state, openEditPropertyBasicDetails: action.payload };
    }
    case OPEN_EDIT_PROPERTY_LISTING_DETAILS_MODAL: {
      return { ...state, openEditPropertyListingDetails: action.payload };
    }
    case OPEN_EDIT_TENANT_PREFERENCE_MODAL: {
      return { ...state, openEditTenantPreference: action.payload };
    }
    case OPEN_EDIT_TENANCY_TERMS_MODAL: {
      return { ...state, openEditTenancyTerms: action.payload };
    }
    case OPEN_EDIT_TENANCY_FITTINGS_MODAL: {
      return { ...state, openEditTenancyFittings: action.payload };
    }
    case OPEN_EDIT_PROPERTY_INCLUSION_MODAL: {
      return { ...state, openEditPropertyInclusion: action.payload };
    }
    case OPEN_ADD_PROPERTY_INCLUSION_MODAL: {
      return { ...state, openAddPropertyInclusion: action.payload };
    }
    case OPEN_UPLOAD_PROPERTY_IMAGES_MODAL: {
      return { ...state, openUploadPropertyImages: action.payload };
    }
    case OPEN_EDIT_CONTACT_INFO_MODAL: {
      return { ...state, openEditContactInfo: action.payload };
    }
    case OPEN_LISTING_CONFIRMATION_MODAL: {
      return { ...state, openListingConfirmation: action.payload };
    }
    case OPEN_EMAIL_OTP_MODAL: {
      return { ...state, openEmailOtp: action.payload };
    }
    case OPEN_PHONE_OTP_MODAL: {
      return { ...state, openPhoneOtp: action.payload };
    }
    case OPEN_PACKAGE_PREFERENCE_MODAL: {
      return { ...state, openPackagePreference: action.payload };
    }
    case OPEN_PREMIUM_PACKAGE_STATUS_MODAL: {
      return { ...state, openPremiumPackageStatus: action.payload };
    }
    case OPEN_PREMIUM_SEARCH_SUCCESS_MODAL: {
      return { ...state, openPremiumSearchSuccessModal: action.payload };
    }
    case OPEN_PREMIUM_SEARCH_STATUS_MODAL: {
      return { ...state, openPremiumSearchStatusModal: action.payload };
    }
    case OPEN_PREMIUM_SEARCH_MODAL: {
      return { ...state, openPremiumSearchModal: action.payload };
    }
    case OPEN_CREATE_NEW_TENANCY_MODAL: {
      return { ...state, openCreateNewTenancy: action.payload };
    }
    case OPEN_ADD_PROPERTY_PARTIES_MODAL: {
      return { ...state, openAddPropertyParties: action.payload };
    }
    case OPEN_INCLUSION_WARNING_MODAL: {
      return { ...state, openInclusionWarningModal: action.payload };
    }
    case OPEN_PROPERTY_IMAGES_WARNING_MODAL: {
      return { ...state, openPropertyImagesWarningModal: action.payload };
    }
    case OPEN_PACKAGE_PREFERENCE_SUCCESS_MODAL: {
      return {
        ...state,
        openPackagePreferenceSuccessModal: action.payload,
      };
    }
    case OPEN_LISTING_PERFORMANCE_WARNING_MODAL: {
      return {
        ...state,
        openListingPerformanceWarningModal: action.payload,
      };
    }
    case OPEN_VIDEO_TUTORIAL_MODAL: {
      return { ...state, openVideoTutorialModal: action.payload };
    }
    case OPEN_INVITATION_PROPERTY_INFO_MODAL: {
      return {
        ...state,
        openInvitationPropertyInfoModal: action.payload,
      };
    }
    case RENTAL_AGREEMENT_WARNING_MODAL: {
      return { ...state, openRentalAgreementWarning: action.payload };
    }
    case OPEN_SUPPORT_CENTER_MODAL: {
      return { ...state, openSupportCenterModal: action.payload };
    }
    case OPEN_REMOVE_LISTING_MODAL: {
      return { ...state, openCloseListingModal: action.payload };
    }
    case OPEN_UPDATE_PROPERTY_MODAL: {
      return { ...state, openUpdatePropertyModal: action.payload };
    }
    case OPEN_DASHBOARD_VIDEO_MODAL: {
      return { ...state, openDashboardVideoModal: action.payload };
    }
    case OPEN_AGREEMENT_SIGNING_WARNING_MODAL: {
      return { ...state, openAgreementSigningWarningModal: action.payload };
    }
    case OPEN_AGREEMENT_SIGNING_CONFIRMATION_MODAL: {
      return {
        ...state,
        openAgreementSigningConfirmationModal: action.payload,
      };
    }
    case OPEN_VIEW_INVOICE_MODAL: {
      return { ...state, openViewInvoiceModal: action.payload };
    }
    case OPEN_REPORT_MODAL: {
      return { ...state, openReportModal: action.payload };
    }
    case OPEN_MARK_PROCURED_MODAL: {
      return {
        ...state,
        openMarkProcuredModal: action.payload,
      };
    }
    case OPEN_PROCUREMENT_STATUS_MODAL: {
      return {
        ...state,
        openProcurementStatusModal: action.payload,
      };
    }
    case OPEN_LAST_MODIFICATION_HISTORY_MODAL: {
      return {
        ...state,
        openLastModificationHistoryModal: action.payload,
      };
    }
    case OPEN_BULK_LEEGALITY_REQUEST_MODAL: {
      return {
        ...state,
        openBulkLeegalityRequestModal: action.payload,
      };
    }
    case OPEN_AGREEMENT_CREDIT_SELECTION_MODAL: {
      return {
        ...state,
        openAgreementCreditSelectionModal: action.payload,
      };
    }
    case OPEN_PROCUREMENT_DETAILS_MODAL: {
      return {
        ...state,
        openProcurementDetailsModal: action.payload,
      };
    }
    case OPEN_LEEGALITY_VIEW_ALL_REQUESTS_MODAL: {
      return {
        ...state,
        openLeegalityViewAllRequestsModal: action.payload,
      };
    }
    case OPEN_UPGRADE_TO_PREMIUM_MODAL: {
      return {
        ...state,
        openUpgardeToPremiumModal: action.payload,
      };
    }
    case MEMBER_ALREADY_PREMIUM_MODAL: {
      return {
        ...state,
        openMemberAlreadyPremiumModal: action.payload,
      };
    }
    case VIEW_RENT_RECEIPT_MODAL: {
      return {
        ...state,
        openViewRentReceiptModal: action.payload,
      };
    }
    case PAY_MONTHLY_RENT_MODAL: {
      return {
        ...state,
        openPayMonthlyRentModal: action.payload,
      };
    }

    case VIEW_ALL_RENT_RECEIPT_MODAL: {
      return {
        ...state,
        openViewAllRentReceiptsModal: action.payload,
      };
    }
    case PAY_MONTHLY_RENT_RECEIPT_MODAL: {
      return {
        ...state,
        openPayMonthlyRentReceiptModal: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default ModalReducer;
