import React from "react";
import { injectIntl } from "react-intl";

import { compose } from "redux";
import { handleActions } from "redux-actions";
import { connect } from "react-redux";

import {Tabs, Tab} from "material-ui/Tabs";

import { WebService, AnalysisMethod } from "../api";

import {
    DataPage,
    DataGrid,
    ColumnType,
    messages as sharedMessages,
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
    {"key": "author"},
    {
        "key": "commits",
        "mapper": ColumnType.integer
    },
    {
        "key": "added",
        "mapper": ColumnType.integer
    },
    {
        "key": "deleted",
        "mapper": ColumnType.integer
    }
];


export const AuthorChurn = injectIntl(DataPage((props) => {
    const {intl} = props;

    return (
        <Tabs>
            <Tab
                label={intl.formatMessage(sharedMessages.record)}
            >
                <DataGrid
                    columns={columns}
                    {...props}
                />
            </Tab>
        </Tabs>
    );
}));


export const fetchData = createDataRequestAction(
    "AUTHOR_CHURN/FETCH_ANALYSIS",
    WebService.prepareAnalysisRequest(AnalysisMethod.authorChurn));

export const sortRecords = createDataSortAction("AUTHOR_CHURN/SORT_RECORDS");

export const filterRecords = createDataFilterAction(
    "AUTHOR_CHURN/FILTER_RECORDS");


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
    (state) => state.authorChurn,
    {
        "onRequestData": () => (dispatch, getState) => {
            const { "app": { appStartDate, appEndDate }} = getState();

            dispatch(fetchData(appStartDate, appEndDate));
        },
        "onSortRecords": sortRecords,
        "onChangeFilters": filterRecords
    }
)(AuthorChurn);
