import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { isFSA } from "flux-standard-action";

import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import thunkFsaMiddleware from "redux-fsa-thunk";
import promiseMiddleware from "redux-promise";

import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";

export const history = createHistory();


// Optimistic Thunk: Dispatch promise action to capture fetching events.
// Makes a promise
const isPromise = (value) => value && typeof value.then === "function";

const optimisticPromiseMiddleware = (store) => (next) => (action) => {
    if (isFSA(action)) {
        if (isPromise(action.payload)) {
            store.dispatch({
                ...action,
                "payload": null,
                "meta": "fetching"
            });

            return next(action);
        } else {
            return next(action);
        }
    } else {
        return next(action);
    }
};

export default applyMiddleware(
    thunkFsaMiddleware,
    thunkMiddleware,
    optimisticPromiseMiddleware,
    promiseMiddleware,
    routerMiddleware(history),
    loggerMiddleware
);
