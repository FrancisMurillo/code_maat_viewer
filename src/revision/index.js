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


const messages = defineMessages({
    "record": {
        "id": "revision.record",
        "description": "Record Table tab label",
        "defaultMessage": "Records"
    }
});

const columns = [
    {"key": "entity"},
    {
        "key": "nRevs",
        "mapper": ColumnType.integer
    }
];


export const Revision = injectIntl(DataPage((props) => {
    const {intl} = props;

    return (
        <Tabs>
            <Tab
                label={intl.formatMessage(messages.record)}
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
    "REVISION/FETCH_REVISION_ANALYSIS",
    WebService.prepareAnalysisRequest(AnalysisMethod.revision));

export const sortRecords = createDataSortAction("REVISION/SORT_RECORDS");

export const filterRecords = createDataFilterAction("REVISION/FILTER_RECORDS");


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
    ({ revision }) => revision,
    {
        "onRequestData": () => (dispatch, getState) => {
            const { "app": { appStartDate, appEndDate }} = getState();

            dispatch(fetchData(appStartDate, appEndDate));
        },
        "onSortRecords": sortRecords,
        "onChangeFilters": filterRecords
    }
)(Revision);
