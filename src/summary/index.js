import React from "react";
import { div } from "react-dom";
import { connect } from "react-redux";

import Reducer from "./Reducer";

import CircularProgress from "material-ui/CircularProgress";

export const reducer = Reducer;


export const Summary = () => (
    <div>
        <CircularProgress
            size={80}
            thickness={8}
        />
    </div>
);


export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(Summary);
