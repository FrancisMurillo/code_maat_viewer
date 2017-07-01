import { handleActions } from "redux-actions";

import { REHYDRATE } from "redux-persist/constants";

import { dataRequestInitialState } from "../shared";

import {
    toggleSideMenu,
    fetchCommits,
    changeStartDate,
    changeEndDate,
    clearDates,
    refreshData
} from "./Action";

const initialState = {
    "open": false,
    "minDate": null,
    "maxDate": null,
    "startDate": null,
    "endDate": null,
    "title": null,

    "appStartDate": null,
    "appEndDate": null,
    ...dataRequestInitialState
};

const maxBy = (f, xs) => (xs.reduceRight((prev, x) => {
    return (f(prev) < f(x)) ? x : prev;
}));

const minBy = (f, xs) => (xs.reduceRight((prev, x) => {
    return (f(prev) > f(x)) ? x : prev;
}));


export const joinReducers = (...reducers) => {
    return (state, action) => {
        return reducers.reduce((prevState, reducer) => {
            return reducer(prevState, action);
        }, state);
    };
};

export const reducer = handleActions({
    [toggleSideMenu]: (state, _action) => ({
        ...state,
        "open": !state.open
    }),

    [fetchCommits]: (state, action) => {
        if (action.error === true) {
            return {
                ...state,
                "fetching": false
            };
        } else if (action.meta === "fetching") {
            return {
                ...state,
                "fetching": true
            };
        } else {
            const commits = action.payload;
            const dates = commits.map(({commitDate}) => commitDate);
            const identity = (x) => x;

            return {
                ...state,
                "fetching": false,
                "data": action.payload,
                "minDate": minBy(identity, dates),
                "maxDate": maxBy(identity, dates)
            };
        }
    },

    [changeStartDate]: (state, action) => ({
        ...state,
        "startDate": action.payload
    }),

    [changeEndDate]: (state, action) => ({
        ...state,
        "endDate": action.payload
    }),

    [clearDates]: (state, _action) => ({
        ...state,
        "startDate": null,
        "endDate": null
    })
}, initialState);

export const dateReducer = (state = initialState, _action) => ({
    ...state,
    "appStartDate": state.startDate || state.minDate,
    "appEndDate": state.endDate || state.maxDate
});

export const actionReducer = handleActions({
    [refreshData]: (state, _action) => ({
        ...state,
        "data": null,
        "fetching": false
    })
}, initialState);

export const persistenceReducer = handleActions(
    {[REHYDRATE]: (_state, _action) => true},
    false);

export const featureReducer = joinReducers(actionReducer);

export default joinReducers(reducer, dateReducer);
