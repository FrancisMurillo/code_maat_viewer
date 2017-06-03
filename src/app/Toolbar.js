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

import { changeStartDate, changeEndDate } from "./Action";

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
        intl
    }) => (
        <Toolbar>
            <ToolbarGroup
                firstChild
            >
                <DatePicker
                    hintText={intl.formatMessage(messages.startDate)}
                    container={datePickerContainer}
                    formatDate={intl.formatDate}
                    onChange={onStartDateChange}
                    minDate={minDate}
                    maxDate={endDate}
                    value={startDate}
                />
                <DatePicker
                    hintText={intl.formatMessage(messages.endDate)}
                    container={datePickerContainer}
                    formatDate={intl.formatDate}
                    onChange={onEndDateChange}
                    minDate={startDate}
                    maxDate={maxDate}
                    value={endDate}
                />
            </ToolbarGroup>
        </Toolbar>
    ));


export default connect(
    (state) => state.app,
    {
        "onStartDateChange": changeStartDate,
        "onEndDateChange": changeEndDate
    }
)(ThisToolbar);
