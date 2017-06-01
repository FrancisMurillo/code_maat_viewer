import React from "react";
import { div } from "react-dom";
import { createAction } from "redux-action";
import { connect } from "react-redux";

import CircularProgress from "material-ui/CircularProgress";

import { WebService, AnalysisMethod } from "../api";

import Reducer from "./Reducer";


export const reducer = Reducer;


const randomAction = createAction("Meow");

export const Summary = ({ data, fetching, requestData }) => {
    if (data === null) {
        requestData();
    }

    if (data === null) {
        return (
            <CircularProgress
                size={80}
                thickness={8}
            />
        );
    } else if (data.length) {
        return (
            <div>Hello</div>
        );
    }

    return (
        <div>Meow</div>
    );

};


export default connect(
    ({ summary }) => summary,
    {
        requestData() {
            const x = WebService.getAnalysis({
                "analysis": AnalysisMethod.SUMMARY,
                "startDate": new Date(2000, 0, 1),
                "endDate": new Date(2100, 0, 1)
            });

            debugger;

            return randomAction();
        }
    }
)(Summary);
