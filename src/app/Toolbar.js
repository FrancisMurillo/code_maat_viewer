import React from "react";

import { injectIntl, defineMessages } from "react-intl";

import { connect } from "react-redux";

import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator
} from "material-ui/Toolbar";
import DatePicker from "material-ui/DatePicker";
import RaisedButton from "material-ui/RaisedButton";


import {
    changeStartDate,
    changeEndDate,
    clearDates,
    refreshData
} from "./Action";

const messages = defineMessages({
    "startDate": {
        "id": "toolbar.startDate",
        "description": "Start Date date picker hint text",
        "defaultMessage": "Start Date"
    },
    "endDate": {
        "id": "toolbar.endDate",
        "description": "End Date date picker hint text",
        "defaultMessage": "End Date"
    },
    "clear": {
        "id": "toolbar.clear",
        "description": "Clear button button text",
        "defaultMessage": "Clear"
    },
    "refresh": {
        "id": "toolbar.refresh",
        "description": "Refresh button button text",
        "defaultMessage": "Refresh"
    }
});

const ThisToolbar = injectIntl(
    ({
        datePickerContainer = "inline",
        minDate,
        maxDate,
        startDate,
        endDate,
        onStartDateChange,
        onEndDateChange,
        onClear,
        onRefresh,
        intl
    }) => (
        <Toolbar >
            <ToolbarGroup
                firstChild
            >
                <DatePicker
                    hintText={intl.formatMessage(messages.startDate)}
                    container={datePickerContainer}
                    autoOk
                    formatDate={intl.formatDate}
                    onChange={onStartDateChange}
                    minDate={minDate}
                    maxDate={endDate || maxDate}
                    value={startDate}
                />
                <DatePicker
                    hintText={intl.formatMessage(messages.endDate)}
                    container={datePickerContainer}
                    autoOk
                    formatDate={intl.formatDate}
                    onChange={onEndDateChange}
                    minDate={startDate || minDate}
                    maxDate={maxDate}
                    value={endDate}
                />
                <ToolbarSeparator />
                <RaisedButton
                    label={intl.formatMessage(messages.clear)}
                    onTouchTap={onClear}
                    primary
                />
                <RaisedButton
                    label={intl.formatMessage(messages.refresh)}
                    onTouchTap={onRefresh}
                    primary
                />
            </ToolbarGroup>
        </Toolbar>
    ));


export default connect(
    (state) => state.app,
    {
        "onClear": clearDates,
        "onRefresh": refreshData,
        "onStartDateChange": changeStartDate,
        "onEndDateChange": changeEndDate
    }
)(ThisToolbar);
