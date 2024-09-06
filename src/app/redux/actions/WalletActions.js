import {
    postLoginApiHandlerOLD,
    postLoginApiHandler,
    postLoginLocationApiHandler
} from 'app/utils/apiHandler';

export const FETCH_MY_WALLET_TRANSACTIONS = 'FETCH_MY_WALLET_TRANSACTIONS';
export const ADD_WALLET_TRANSACTIONS = 'ADD_WALLET_TRANSACTIONS';
export const VERIFY_WALLET_TRANSACTIONS = 'VERIFY_WALLET_TRANSACTIONS';
export const SEND_INVOICE_EMAIL = 'SEND_INVOICE_EMAIL';

export const FetchMyWalletTransactionsAction = (apiParams) => (dispatch) =>
    postLoginApiHandler(
        dispatch,
        FETCH_MY_WALLET_TRANSACTIONS,
        'POST',
        '/post_login/payment/fetch_my_wallet_transactions/',
        apiParams
    );

export const AddWalletTransactionsAction = (apiParams) => (dispatch) =>
    postLoginApiHandler(
        dispatch,
        ADD_WALLET_TRANSACTIONS,
        'POST',
        '/post_login/payment/generate_order_id/',
        apiParams
    );

export const VerifyWalletTransactionsAction = (apiParams) => (dispatch) =>
    postLoginApiHandler(
        dispatch,
        VERIFY_WALLET_TRANSACTIONS,
        'POST',
        '/post_login/payment/verify_payment_signature/',
        apiParams
    );
export const SendInvoiceEmail = (apiParams) => (dispatch) =>
    postLoginApiHandler(
        dispatch,
        SEND_INVOICE_EMAIL,
        'POST',
        '/payment/send_invoice_email_sms/',
        apiParams
    );

export const RESET_ADDED_WALLET_TRANSACTIONS = 'RESET_ADDED_WALLET_TRANSACTIONS';

export const resetAddedWalletTransactionsAction = () => (dispatch) => {
    dispatch({ type: RESET_ADDED_WALLET_TRANSACTIONS });
};
    