import { breadcrumbsClasses } from '@mui/material';
import {
    GET_INDIVIDUAL_PROPERTY,
    UPDATE_TENANT_PREFERENCE,
    UPDATE_TENANCY_TERMS,
    FETCH_TENANCY_INCLUSIONS,
    ADD_TENANCY_INCLUSIONS,
    UPDATE_TENANCY_INCLUSIONS,
    ADD_OR_UPDATE_LISTING,
    ADD_LISTING_IMAGES,
    PUBLISH_LISTING,
    ADD_OR_UPDATE_LISTING_CONTACT,
    VERIFY_LISTING_CONTACT_OTP,
    UPDATE_BASIC_PROPERTY_DETAILS,
    SELECT_PACKAGE_PREFERENCE,
    CREATE_NEW_TENANCY,
    GET_TENANCY_COMMUNICATION,
    UPDATE_PROPERTY_PROFILE_PIC,
    ADD_UPDATE_TENANCY_FITTINGS,
    DEACTIVATE_TENANCY,
} from '../actions/PropertyActions';

export const LOADING_INDIVIDUAL_PROPERTY = 'LOADING_INDIVIDUAL_PROPERTY';
export const LOADING_UPDATED_TENANT_PREFERENCE =
    'LOADING_UPDATED_TENANT_PREFERENCE';
export const LOADING_UPDATED_TENANCY_TERMS = 'LOADING_UPDATED_TENANCY_TERMS';
export const LOADING_FETCH_TENANCY_INCLUSIONS =
    'LOADING_FETCH_TENANCY_INCLUSIONS';
export const LOADING_ADD_TENANCY_INCLUSIONS = 'LOADING_ADD_TENANCY_INCLUSIONS';
export const LOADING_UPDATE_TENANCY_INCLUSIONS =
    'LOADING_UPDATE_TENANCY_INCLUSIONS';
export const LOADING_EDIT_PROPERTY_BASIC_DETAILS =
    'LOADING_EDIT_PROPERTY_BASIC_DETAILS';
export const LOADING_EDIT_PROPERTY_LISTING_DETAILS =
    'LOADING_EDIT_PROPERTY_LISTING_DETAILS';
export const LOADING_ADD_LISTING_IMAGES = 'LOADING_ADD_LISTING_IMAGES';
export const LOADING_PUBLISH_LISTING = 'LOADING_PUBLISH_LISTING';
export const LOADING_ADD_OR_UPDATE_LISTING_CONTACT =
    'LOADING_ADD_OR_UPDATE_LISTING_CONTACT';
export const LOADING_VERIFY_LISTING_CONTACT_OTP =
    'LOADING_VERIFY_LISTING_CONTACT_OTP';
export const LOADING_CREATE_NEW_TENANCY = 'LOADING_CREATE_NEW_TENANCY';
export const LOADING_ADD_UPDATE_TENANCY_FITTINGS =
    'LOADING_ADD_UPDATE_TENANCY_FITTINGS';
export const LOADING_SELECT_PACKAGE_PREFERENCE =
    'LOADING_SELECT_PACKAGE_PREFERENCE';
export const LOADING_GET_TENANCY_COMMUNICATION =
    'LOADING_GET_TENANCY_COMMUNICATION';
export const LOADING_UPDATE_PROPERTY_PROFILE_PIC =
    'LOADING_UPDATE_PROPERTY_PROFILE_PIC';
export const LOADING_DEACTIVATE_TENANCY = 'LOADING_DEACTIVATE_TENANCY';

// toggle the console log - use false for production
const toggleDebugMode = false;

// Common method that will set the state to null for the key passed
export function resetLoadingStateFor(keyName, dispatch) {
    if (keyName) {
        dispatch({ type: 'RESET', payload: keyName });
    }
}

export function dispatchLoadingAction(flag, error, type, dispatch) {
    const loadingAction = (action) => {
        dispatch({
            type: action,
            payload: {
                isLoading: flag,
                error: error,
            },
        });
    };

    switch (type) {
        case GET_INDIVIDUAL_PROPERTY:
            loadingAction(LOADING_INDIVIDUAL_PROPERTY);
            break;
        case UPDATE_TENANT_PREFERENCE:
            loadingAction(LOADING_UPDATED_TENANT_PREFERENCE);
            break;
        case UPDATE_TENANCY_TERMS:
            loadingAction(LOADING_UPDATED_TENANCY_TERMS);
            break;
        case FETCH_TENANCY_INCLUSIONS:
            loadingAction(LOADING_FETCH_TENANCY_INCLUSIONS);
            break;
        case UPDATE_TENANCY_INCLUSIONS:
            loadingAction(LOADING_UPDATE_TENANCY_INCLUSIONS);
            break;
        case ADD_TENANCY_INCLUSIONS:
            loadingAction(LOADING_ADD_TENANCY_INCLUSIONS);
            break;
        case ADD_LISTING_IMAGES:
            loadingAction(LOADING_ADD_LISTING_IMAGES);
            break;
        case UPDATE_BASIC_PROPERTY_DETAILS:
            loadingAction(LOADING_EDIT_PROPERTY_BASIC_DETAILS);
            break;
        case ADD_OR_UPDATE_LISTING:
            loadingAction(LOADING_EDIT_PROPERTY_LISTING_DETAILS);
            break;
        case PUBLISH_LISTING:
            loadingAction(LOADING_PUBLISH_LISTING);
            break;
        case ADD_OR_UPDATE_LISTING_CONTACT:
            loadingAction(LOADING_ADD_OR_UPDATE_LISTING_CONTACT);
            break;
        case VERIFY_LISTING_CONTACT_OTP:
            loadingAction(LOADING_VERIFY_LISTING_CONTACT_OTP);
            break;
        case CREATE_NEW_TENANCY:
            loadingAction(LOADING_CREATE_NEW_TENANCY);
            break;
        case DEACTIVATE_TENANCY:
            loadingAction(LOADING_DEACTIVATE_TENANCY);
            break;
        default:
            break;
        case VERIFY_LISTING_CONTACT_OTP:
            loadingAction(LOADING_VERIFY_LISTING_CONTACT_OTP);
            break;
        case SELECT_PACKAGE_PREFERENCE:
            loadingAction(LOADING_SELECT_PACKAGE_PREFERENCE);
            break;
        case GET_TENANCY_COMMUNICATION:
            loadingAction(LOADING_GET_TENANCY_COMMUNICATION);
            break;
        case UPDATE_PROPERTY_PROFILE_PIC:
            loadingAction(LOADING_UPDATE_PROPERTY_PROFILE_PIC);
            break;
        case ADD_UPDATE_TENANCY_FITTINGS:
            loadingAction(LOADING_ADD_UPDATE_TENANCY_FITTINGS);
            break;
    }
}

export function loaderAction(
    dispatch,
    apiActionName,
    statusOfLoading,
    error = null
) {
    // return an action object
    const handleStatus = (choice) => {
        switch (choice) {
            case 'start':
                return {
                    type: 'LOADER',
                    payload: {
                        isLoading: true,
                        error: null,
                        actionName: apiActionName,
                    },
                };
            case 'success':
                return {
                    type: 'LOADER',
                    payload: {
                        isLoading: false,
                        error: null,
                        actionName: apiActionName,
                    },
                };
            case 'failure':
                return {
                    type: 'LOADER',
                    payload: {
                        isLoading: false,
                        error: error,
                        actionName: apiActionName,
                    },
                };
            case 'reset':
                return {
                    type: 'LOADER',
                    payload: {
                        isLoading: null,
                        error: null,
                        actionName: apiActionName,
                    },
                };
            default:
                return null;
        }
    };

    // prepare the action
    const action = handleStatus(statusOfLoading);
    // dispatch the action
    dispatch(action);

    if (toggleDebugMode) {
        console.log('🔃 LOADER => ', action.payload);
    }
}
