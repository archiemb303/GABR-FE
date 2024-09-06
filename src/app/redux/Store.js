import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import RootReducer from './reducers/RootReducer';
import { throttle } from 'lodash/throttle';
import { debounce } from 'lodash';

const middlewares = [thunk];
let devtools = (x) => x;

if (
    process.env.NODE_ENV !== 'production' &&
    process.browser &&
    window.__REDUX_DEVTOOLS_EXTENSION__
) {
    devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

// convert object to string and store in localStorage
function saveToLocalStorage(state, keyName = null) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem('persistentState', serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem('persistentState');
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

// create our Store from our RootReducers and use loadFromLocalStorage
// to overwrite any values that we already have saved
// loadFromLocalStorage(),
const Store = createStore(
    RootReducer,
    { prelogin: loadFromLocalStorage() },
    compose(applyMiddleware(...middlewares), devtools)
);

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
Store.subscribe(
    debounce(() => saveToLocalStorage(Store.getState().prelogin), 1000)
);

export default Store;
