import React from "react";

import { compose } from "redux";
import { createAction, handleActions } from "redux-actions";

import { connect } from "react-redux";


import { WebService, AnalysisMethod } from "../api";

import {
    DataPage,
    DataGrid,
    dataGridInitialState,
    dataRequestInitialState,
    dataRequestAction,
    dataSortAction,
    handleDataRequestReducer,
    handleDataGridReducer
} from "../shared";


export const Summary = DataPage((props) => {
    const {
        data,
        sortColumn,
        sortDirection,
        onSortRecords
    } = props;

    return (
        <DataGrid
            data={data}
            onSortRecords={onSortRecords}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
        />
    );
});

export const fetchAnalysisData = createAction(
    "SUMMARY/FETCH_SUMMARY_ANALYSIS",
    WebService.prepareAnalysisRequest(AnalysisMethod.SUMMARY)
);

export const sortAnalysisRecords = createAction(
    "SUMMARY/SORT_ANALYSIS_RECORDS",
    (column, direction) => ({
        column,
        direction
    }));

const initialState = {
    ...dataRequestInitialState,
    ...dataGridInitialState
};

export const reducer = compose(
    handleDataGridReducer,
    handleDataRequestReducer
)(handleActions({
    [fetchAnalysisData]: (_state, _action) => dataRequestAction,
    [sortAnalysisRecords]: (_state, _action) => dataSortAction
}, initialState));


export default connect(
    ({ summary }) => summary,
    {
        "requestData": () => (dispatch, getState) => {
            const { "app": { appStartDate, appEndDate }} = getState();

            dispatch(fetchAnalysisData(appStartDate, appEndDate));
        },
        "onSortRecords": sortAnalysisRecords
    }
)(Summary);
