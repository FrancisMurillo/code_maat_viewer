import React from "react";
import { div } from "react-dom";
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


export const Summary = ({ data, fetching, requestData }) => {
    if (data === null && !fetching) {
        requestData();
    }

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
                        const values = headers.map((header) => record[header]);
                        const entries = zip(headers, values);

                        return (
                            <TableRow key={record.statistic}>
                                {entries.map(([header, value]) => (
                                    <TableRowColumn key={header}>
                                        {value}
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
};


export default connect(
    ({ summary }) => summary,
    {
        "requestData": () => (dispatch, getState) => {
            const { "app": { appStartDate, appEndDate }} = getState();

            dispatch(fetchSummaryData(appStartDate, appEndDate));
        }
    }
)(Summary);
