import { SCROLL } from "../actions/ScrollAction";


export const scrollReducer = (state = {notification: null}, action) => {
    
    switch(action.type){
        case SCROLL: {
            return {...state, notification: action.payload}
        }
        default: return state;
    }
}