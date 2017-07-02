import React from "react";
import { injectIntl, defineMessages } from "react-intl";

import { compose } from "redux";
import { handleActions } from "redux-actions";
import { connect } from "react-redux";

import {Tabs, Tab} from "material-ui/Tabs";

import Chart from "d3act/lib/components/Chart";

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
    {"key": "date"},
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


const messages = defineMessages({
    "chart": {
        "id": "tab.chart",
        "description": "Tab label for Chart",
        "defaultMessage": "Chart"
    }
});

export const AbsoluteChurn = injectIntl(DataPage((props) => {
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
            <Tab
                label={intl.formatMessage(messages.chart)}
            >
                <Chart
                    type={"bar"}
                    width={500}
                    height={500}
                    margin={{
                        "top": 40,
                        "right": 40,
                        "bottom": 40,
                        "left": 40
                    }}
                    showTooltips
                    data={props.data.map((record) => {
                        return {
                            "xValue": record.date,
                            "yValue": parseInt(record.commits, 10)
                        };
                    })}
                />
            </Tab>
        </Tabs>
    );
}));


export const fetchData = createDataRequestAction(
    "ABSOLUTE_CHURN/FETCH_ANALYSIS",
    WebService.prepareAnalysisRequest(AnalysisMethod.absoluteChurn));

export const sortRecords = createDataSortAction("ABSOLUTE_CHURN/SORT_RECORDS");

export const filterRecords = createDataFilterAction(
    "ABSOLUTE_CHURN/FILTER_RECORDS");


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
    (state) => state.absoluteChurn,
    {
        "onRequestData": () => (dispatch, getState) => {
            const { "app": { appStartDate, appEndDate }} = getState();

            dispatch(fetchData(appStartDate, appEndDate));
        },
        "onSortRecords": sortRecords,
        "onChangeFilters": filterRecords
    }
)(AbsoluteChurn);
