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

import Reducer from "./Reducer";
import { fetchSummaryData } from "./Action";

export const reducer = Reducer;


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
            <Table>
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
        "requestData": () => fetchSummaryData(
                new Date(2017, 4, 14),
                new Date(2017, 5, 3)
            )
    }
)(Summary);
