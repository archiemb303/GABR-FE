import {
        ADD_WALLET_TRANSACTIONS,
        FETCH_MY_WALLET_TRANSACTIONS,
        VERIFY_WALLET_TRANSACTIONS,
        RESET_ADDED_WALLET_TRANSACTIONS,
        SEND_INVOICE_EMAIL 
} from '../actions/WalletActions';

const initialState = {
          addedWalletTransactions: null,
        fetchMyWalletTransactions: null ,
        send_invoice_email: null
        
    };

const WalletReducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_WALLET_TRANSACTIONS: {
            return { ...state, addedWalletTransactions: action.payload.Payload };
        }
        case FETCH_MY_WALLET_TRANSACTIONS: {
            // console.log("test13")
            return { ...state, fetchMyWalletTransactions: action.payload.Payload };
        }
        case VERIFY_WALLET_TRANSACTIONS: {
            if (action.payload.Payload.verify_var == true){
                return { ...state, fetchMyWalletTransactions: action.payload.Payload.fetch_my_wallet_transactions_data, paymentFlag: true };
            }
        }
        case RESET_ADDED_WALLET_TRANSACTIONS: {
            // console.log("resetAction")
            return { ...state,addedWalletTransactions:null,paymentFlag:false}
        }
        
        case SEND_INVOICE_EMAIL: {
            return { ...state, send_invoice_email: action.payload.Payload };
        }
        default: {
            return { ...state };
        }
    }
};

export default WalletReducer;
