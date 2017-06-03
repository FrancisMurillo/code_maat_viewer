import { handleActions } from "redux-actions";

import { toggleSideMenu, fetchCommits, markFetching } from "./Action";

const initialState = {
    "open": false,
    "commitData": null,
    "minDate": null,
    "maxData": null,
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

        return {
            ...state,
            "fetching": false,
            "commitData": action.payload,
            "minDate": minBy(identity, dates),
            "maxDate": maxBy(identity, dates)
        };
    }
}, initialState);
