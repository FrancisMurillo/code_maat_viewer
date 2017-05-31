import * as Action from "./Action";

const initialState = {
    "open": false,
    "startDate": null,
    "endDate": null
};

export default (state = initialState, action) => {
    switch (action.type) {
    case Action.TOGGLE_SIDE_MENU:
        return {
            ...state,
            "open": !state.open
        };
    default:
        return state;
    }
};
