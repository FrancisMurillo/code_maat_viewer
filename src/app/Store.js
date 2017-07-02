import { compose, combineReducers, createStore } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import { routerReducer } from "react-router-redux";

import { reducer as summaryReducer } from "../summary";
import { reducer as revisionReducer } from "../revision";
import { reducer as couplingReducer } from "../coupling";
import { reducer as ageReducer } from "../age";
import { reducer as absoluteChurnReducer } from "../absoluteChurn";
import { reducer as authorChurnReducer } from "../authorChurn";
import { reducer as entityChurnReducer } from "../entityChurn";
import { reducer as entityOwnershipReducer } from "../entityOwnership";
import { reducer as entityEffortReducer } from "../entityEffort";
import { reducer as settingReducer } from "../setting";

import middleware from "./Middleware";

import appReducer, {
    joinReducers,
    featureReducer,
    persistenceReducer
} from "./Reducer";


const reducer = combineReducers({
    "app": appReducer,
    "summary": joinReducers(summaryReducer, featureReducer),
    "revision": joinReducers(revisionReducer, featureReducer),
    "coupling": joinReducers(couplingReducer, featureReducer),
    "age": joinReducers(ageReducer, featureReducer),
    "absoluteChurn": joinReducers(absoluteChurnReducer, featureReducer),
    "authorChurn": joinReducers(authorChurnReducer, featureReducer),
    "entityChurn": joinReducers(entityChurnReducer, featureReducer),
    "entityOwnership": joinReducers(entityOwnershipReducer, featureReducer),
    "entityEffort": joinReducers(entityEffortReducer, featureReducer),
    "setting": settingReducer,
    "router": routerReducer,
    "persistence": persistenceReducer
});

const store = createStore(
    reducer,
    undefined,
    compose(middleware, autoRehydrate({"log": true})));

persistStore(store, {"blacklist": ["persistence"]});


export default store;
