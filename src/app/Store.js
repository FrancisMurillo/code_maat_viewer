import { applyMiddleware, createStore, combineReducers } from "redux";

import logger from "redux-logger";

import thunk from "redux-thunk";

import promiseMiddleware from "redux-promise";

import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";


import appReducer, {
    joinReducers,
    featureReducer
} from "./Reducer";

import { reducer as summaryReducer } from "../summary";
import { reducer as revisionReducer } from "../revision";
import { reducer as couplingReducer } from "../coupling";
import { reducer as settingReducer } from "../setting";


export const history = createHistory();


const middleware = applyMiddleware(
    thunk,
    promiseMiddleware,
    routerMiddleware(history),
    logger
);

const reducer = combineReducers({
    "app": appReducer,
    "summary": joinReducers(summaryReducer, featureReducer),
    "revision": joinReducers(revisionReducer, featureReducer),
    "coupling": joinReducers(couplingReducer, featureReducer),
    "setting": settingReducer,
    "router": routerReducer
});

export default createStore(reducer, middleware);
