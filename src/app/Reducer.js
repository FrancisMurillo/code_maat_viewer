import { handleActions } from "redux-actions";

import {
    toggleSideMenu,
    fetchCommits,
    markFetching,
    changeStartDate,
    changeEndDate
} from "./Action";

const initialState = {
    "open": false,
    "commitData": null,
    "minDate": null,
    "maxData": null,
    "startDate": null,
    "endDate": null,
    "fetching": false
};

const maxBy = (f, xs) => (xs.reduceRight((prev, x) => {
    return (f(prev) < f(x)) ? x : prev;
}));

const minBy = (f, xs) => (xs.reduceRight((prev, x) => {
    return (f(prev) > f(x)) ? x : prev;
}));


export default handleActions({
    [toggleSideMenu]: (state, _action) => ({
        ...state,
        "open": !state.open
    }),

    [markFetching]: (state, _action) => ({
        ...state,
        "fetching": true
    }),

    [fetchCommits]: (state, action) => {
        const commits = action.payload;
        const dates = commits.map(({commitDate}) => commitDate);
        const identity = (x) => x;

        const minDate = minBy(identity, dates);
        const maxDate = maxBy(identity, dates);

        return {
            ...state,
            "fetching": false,
            "commitData": action.payload,
            minDate,
            maxDate,
            "startDate": minDate,
            "endDate": maxDate
        };
    },

    [changeStartDate]: (state, action) => ({
        ...state,
        "startDate": action.payload
    }),

    [changeEndDate]: (state, action) => ({
        ...state,
        "endDate": action.payload
    })

}, initialState);
