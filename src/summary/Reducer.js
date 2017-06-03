import { handleActions } from "redux-actions";

import { fetchData, markFetching } from "./Action";

const initialState = {
    "data": null,
    "fetching": false
};

export default handleActions({
    [fetchData]: (state, action) => ({
        ...state,
        "data": action.payload,
        "fetching": false
    }),
    [markFetching]: (state, _action) => ({
        ...state,
        "fetching": true
    })
}, initialState);
