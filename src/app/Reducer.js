const initialState = {
    "open": false,
    "docked": false
};

export default (state = initialState, action) => {
    switch (action.type) {
    case "TOGGLE_SIDE_MENU":
        return {
            ...state,
            "open": !state.open
        };
    default:
        return state;
    }
};
