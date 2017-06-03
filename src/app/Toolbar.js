import React from "react";

import { injectIntl, defineMessages } from "react-intl";

import { connect } from "react-redux";

import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    ToolbarTitle
} from "material-ui/Toolbar";
import DatePicker from "material-ui/DatePicker";
import RaisedButton from "material-ui/RaisedButton";


import {
    changeStartDate,
    changeEndDate,
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
                    formatDate={intl.formatDate}
                    onChange={onStartDateChange}
                    minDate={minDate}
                    maxDate={endDate || maxDate}
                    value={startDate || minDate}
                />
                <DatePicker
                    hintText={intl.formatMessage(messages.endDate)}
                    container={datePickerContainer}
                    formatDate={intl.formatDate}
                    onChange={onEndDateChange}
                    minDate={startDate || minDate}
                    maxDate={maxDate}
                    value={endDate || maxDate}
                />
                <ToolbarSeparator />
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
        "onRefresh": refreshData,
        "onStartDateChange": changeStartDate,
        "onEndDateChange": changeEndDate
    }
)(ThisToolbar);
