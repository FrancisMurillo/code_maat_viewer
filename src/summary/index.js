import React, { Component } from "react";
import { div } from "react-dom";

import { injectIntl, defineMessages } from "react-intl";

import { connect } from "react-redux";

import CircularProgress from "material-ui/CircularProgress";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

import reducer from "./Reducer";
import { fetchSummaryData } from "./Action";

export {
    reducer
};

const messages = defineMessages({
    "numberOfCommits": {
        "id": "summary.numberOfCommits",
        "description": "Number of Commits field label",
        "defaultMessage": "Number of Commits"
    },
    "numberOfEntities": {
        "id": "summary.numberOfEntities",
        "description": "Number of Entities field label",
        "defaultMessage": "Number of Entities"
    },
    "numberOfEntitiesChanged": {
        "id": "summary.numberOfEntitiesChanged",
        "description": "Number of Entities Changed field label",
        "defaultMessage": "Number of Entities Changed"
    },
    "numberOfAuthors": {
        "id": "summary.numberOfAuthors",
        "description": "Number of Authors field label",
        "defaultMessage": "Number of Authors"
    }
});

const fieldMessageMapping = {
    "number-of-commits": "numberOfCommits",
    "number-of-entities": "numberOfEntities",
    "number-of-entities-changed": "numberOfEntitiesChanged",
    "number-of-authors": "numberOfAuthors"
};


export const Summary = injectIntl(class Page extends Component {
    componentDidUpdate() {
        const {
            data,
            fetching,
            requestData
        } = this.props;

        if (data === null && !fetching) {
            requestData();
        }
    }

    render() {
        const {
            intl,
            data
        } = this.props;

        if (data === null) {
            return (
                <CircularProgress
                    size={80}
                    thickness={8}
                />
            );
        } else if (data.length) {
            const columnHeaders = Object.keys(data[0]);

            const zip = (...rows) => {
                return rows[0].map((item, index) => {
                    return rows.map((row) => row[index]);
                });
            };

            return (
                <Table
                    striped
                >
                    <TableHeader>
                        <TableRow>
                            {columnHeaders.map((header) => (
                                <TableHeaderColumn key={header}>
                                    {header}
                                </TableHeaderColumn>
                      ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((record) => {
                            const headers = Object.keys(record);
                            const values = headers.map(
                                (header) => record[header]);
                            const entries = zip(headers, values);

                            return (
                                <TableRow key={record.statistic}>
                                    {entries.map(([header, value]) => (
                                        <TableRowColumn
                                            key={`${header}-${value}`}
                                        >
                                            {
                                        fieldMessageMapping[value]
                                            ? intl.formatMessage(
                                                messages[
                                                    fieldMessageMapping[value]
                                                ])
                                            : value
                                    }
                                        </TableRowColumn>
                              ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            );
        } else {
            return (
                <div>{"Nothing"}</div>
            );
        }
    }
});


export default connect(
    ({ summary }) => summary,
    {
        "requestData": () => (dispatch, getState) => {
            const { "app": { appStartDate, appEndDate }} = getState();

            dispatch(fetchSummaryData(appStartDate, appEndDate));
        }
    }
)(Summary);
