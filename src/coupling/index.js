import React from "react";
import { injectIntl, defineMessages } from "react-intl";

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
    {"key": "entity"},
    {"key": "coupled"},
    {
        "key": "degree",
        "mapper": ColumnType.integer
    },
    {
        "key": "averageRevs",
        "mapper": ColumnType.integer
    }
];


export const Coupling = injectIntl(DataPage((props) => {
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
    "COUPLING/FETCH_ANALYSIS",
    WebService.prepareAnalysisRequest(AnalysisMethod.coupling));

export const sortRecords = createDataSortAction("COUPLING/SORT_RECORDS");

export const filterRecords = createDataFilterAction("COUPLING/FILTER_RECORDS");


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
    (state) => state.coupling,
    {
        "onRequestData": () => (dispatch, getState) => {
            const { "app": { appStartDate, appEndDate }} = getState();

            dispatch(fetchData(appStartDate, appEndDate));
        },
        "onSortRecords": sortRecords,
        "onChangeFilters": filterRecords
    }
)(Coupling);
