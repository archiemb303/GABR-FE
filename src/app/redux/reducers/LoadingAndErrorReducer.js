import {
    LOADING_INDIVIDUAL_PROPERTY,
    LOADING_UPDATED_TENANT_PREFERENCE,
    LOADING_UPDATED_TENANCY_TERMS,
    LOADING_FETCH_TENANCY_INCLUSIONS,
    LOADING_ADD_TENANCY_INCLUSIONS,
    LOADING_UPDATE_TENANCY_INCLUSIONS,
    LOADING_EDIT_PROPERTY_BASIC_DETAILS,
    LOADING_EDIT_PROPERTY_LISTING_DETAILS,
    LOADING_ADD_LISTING_IMAGES,
    LOADING_PUBLISH_LISTING,
    LOADING_ADD_OR_UPDATE_LISTING_CONTACT,
    LOADING_VERIFY_LISTING_CONTACT_OTP,
    LOADING_SELECT_PACKAGE_PREFERENCE,
    LOADING_CREATE_NEW_TENANCY,
    LOADING_GET_TENANCY_COMMUNICATION,
    LOADING_UPDATE_PROPERTY_PROFILE_PIC,
    LOADING_ADD_UPDATE_TENANCY_FITTINGS,
    LOADING_DEACTIVATE_TENANCY,
} from '../actions/LoadingAndErrorAction';
import { GET_INDIVIDUAL_PROPERTY } from '../actions/PropertyActions';

const initialState = {
    individualPropertyLoading: null,
    updatedTenantPreferenceLoading: null,
    updatedTenancyTermsLoading: null,
    fetchTenancyInclusionLoading: null,
    addTenancyInclusionLoading: null,
    updateTenancyInclusionLoading: null,
    editPropertyBasicDetailsLoading: null,
    editPropertyListingDetailsLoading: null,
    addListingImagesLoading: null,
    publishListingLoading: null,
    addOrUpdateListingContactLoading: null,
    verifyListingContactOtpLoading: null,
    selectPackagePreferenceLoading: null,
    createNewTenancyLoading: null,
    getTenancyCommunicationsLoading: null,
    updatePropertyProfilePicLoading: null,
    addUpdateTenancyFittingsLoading: null,
    deactivateTenancyLoading: null,
    loader: {},
};

export default function loadingAndErrorReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOADER':
            const { error, isLoading, actionName } = action.payload;
            let result = {
                ...state.loader,
                [actionName]: {
                    error: error,
                    isLoading: isLoading,
                },
            };
            return { ...state, loader: result };

        case LOADING_INDIVIDUAL_PROPERTY:
            return { ...state, individualPropertyLoading: action.payload };
        case LOADING_UPDATED_TENANT_PREFERENCE:
            return { ...state, updatedTenantPreferenceLoading: action.payload };
        case LOADING_UPDATED_TENANCY_TERMS:
            return { ...state, updatedTenancyTermsLoading: action.payload };
        case LOADING_FETCH_TENANCY_INCLUSIONS:
            return { ...state, fetchTenancyInclusionLoading: action.payload };
        case LOADING_ADD_TENANCY_INCLUSIONS:
            return { ...state, addTenancyInclusionLoading: action.payload };
        case LOADING_UPDATE_TENANCY_INCLUSIONS:
            return { ...state, updateTenancyInclusionLoading: action.payload };
        case LOADING_ADD_LISTING_IMAGES:
            return { ...state, addListingImagesLoading: action.payload };
        case LOADING_EDIT_PROPERTY_BASIC_DETAILS:
            return {
                ...state,
                editPropertyBasicDetailsLoading: action.payload,
            };
        case LOADING_EDIT_PROPERTY_LISTING_DETAILS:
            return {
                ...state,
                editPropertyListingDetailsLoading: action.payload,
            };
        case LOADING_PUBLISH_LISTING:
            return {
                ...state,
                publishListingLoading: action.payload,
            };
        case LOADING_ADD_OR_UPDATE_LISTING_CONTACT:
            return {
                ...state,
                addOrUpdateListingContactLoading: action.payload,
            };
        case LOADING_VERIFY_LISTING_CONTACT_OTP:
            return {
                ...state,
                verifyListingContactOtpLoading: action.payload,
            };
        case LOADING_SELECT_PACKAGE_PREFERENCE:
            return {
                ...state,
                selectPackagePreferenceLoading: action.payload,
            };
        case LOADING_CREATE_NEW_TENANCY:
            return {
                ...state,
                createNewTenancyLoading: action.payload,
            };
        case LOADING_DEACTIVATE_TENANCY:
            return {
                ...state,
                deactivateTenancyLoading: action.payload,
            };
        case LOADING_GET_TENANCY_COMMUNICATION:
            return {
                ...state,
                getTenancyCommunicationsLoading: action.payload,
            };
        case LOADING_UPDATE_PROPERTY_PROFILE_PIC:
            return {
                ...state,
                updatePropertyProfilePicLoading: action.payload,
            };
        case LOADING_ADD_UPDATE_TENANCY_FITTINGS:
            return {
                ...state,
                addUpdateTenancyFittingsLoading: action.payload,
            };
        case 'RESET': {
            // This is a common action that will be used to reset the state.
            // Pass the store state key name when calling the action to reset it
            const key = action.payload;
            const value = null;
            const obj = { [key]: value };
            return { ...state, ...obj };
        }

        default:
            return state;
    }
}
