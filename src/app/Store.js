import { compose, combineReducers, createStore } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import { routerReducer } from "react-router-redux";

import { reducer as summaryReducer } from "../summary";
import { reducer as revisionReducer } from "../revision";
import { reducer as couplingReducer } from "../coupling";
import { reducer as settingReducer } from "../setting";

import middleware from "./Middleware";

import appReducer, {
    joinReducers,
    featureReducer,
    persistenceReducer
} from "./Reducer";


const reducer = combineReducers({
    "persistence": persistenceReducer,
    "app": appReducer,
    "summary": joinReducers(summaryReducer, featureReducer),
    "revision": joinReducers(revisionReducer, featureReducer),
    "coupling": joinReducers(couplingReducer, featureReducer),
    "setting": settingReducer,
    "router": routerReducer
});

const store = createStore(
    reducer,
    compose(middleware, autoRehydrate({"log": true})));

persistStore(store, {"blacklist": ["persistence"]});


export default store;
