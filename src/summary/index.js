import React from "react";

import { compose } from "redux";
import { handleActions } from "redux-actions";

import { connect } from "react-redux";

import { WebService, AnalysisMethod } from "../api";

import {
    DataPage,
    DataGrid,
    ColumnType,
    createDataRequestAction,
    createDataSortAction,
    createDataFilterAction,
    dataGridInitialState,
    dataRequestInitialState,
    dataRequestAction,
    dataSortAction,
    dataFilterAction,
    handleDataRequestReducer,
    handleDataGridReducer
} from "../shared";


const columns = [
    {"key": "statistic"},
    {
        "key": "value",
        "mapper": ColumnType.integer
    }
];

export const Summary = DataPage((props) => {
    return (
        <DataGrid
            columns={columns}
            {...props}
        />
    );
});

export const fetchData = createDataRequestAction(
    "SUMMARY/FETCH_SUMMARY_ANALYSIS",
    WebService.prepareAnalysisRequest(AnalysisMethod.summary));

export const sortRecords = createDataSortAction("SUMMARY/SORT_RECORDS");

export const filterRecords = createDataFilterAction("SUMMARY/FILTER_RECORDS");


const initialState = {
    ...dataRequestInitialState,
    ...dataGridInitialState
};

export const reducer = compose(
    handleDataGridReducer,
    handleDataRequestReducer
)(handleActions({
    [fetchData]: (_state, _action) => dataRequestAction,
    [sortRecords]: (_state, _action) => dataSortAction,
    [filterRecords]: (_state, _action) => dataFilterAction
}, initialState));


export default connect(
    ({ summary }) => summary,
    {
        "onRequestData": () => (dispatch, getState) => {
            const { "app": { appStartDate, appEndDate }} = getState();

            dispatch(fetchData(appStartDate, appEndDate));
        },
        "onSortRecords": sortRecords,
        "onChangeFilters": filterRecords
    }
)(Summary);
