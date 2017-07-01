import { handleActions } from "redux-actions";

import { fetchData, markFetching } from "./Action";

const initialState = {
    "data": null,
    "fetching": false
};

export default handleActions({
    [fetchData]: (state, action) => {
        if (action.meta === "fetching") {
            return {
                ...state,
                "fetching": true
            };
        } else if (action.error === true) {
            return state;
        } else {
            return {
                ...state,
                "data": action.payload,
                "fetching": false
            };
        }
    },
    [markFetching]: (state, _action) => ({
        ...state,
        "fetching": true
    })
}, initialState);
