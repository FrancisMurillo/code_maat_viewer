import React from "react";
import { div } from "react-dom";

import { injectIntl, defineMessages } from "react-intl";

import CircularProgress from "material-ui/CircularProgress";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";


const messages = defineMessages({
    "noData": {
        "id": "recordTable.emptyData",
        "description": "Message for empty table data",
        "defaultMessage": "No data to display."
    }
});

const zip = (...rows) => {
    return rows[0].map((item, index) => {
        return rows.map((row) => row[index]);
    });
};

export default injectIntl(({
    intl,
    data,
    headerLabels,
    headerMapping
}) => {
    if (data === null) {
        return (
            <CircularProgress
                size={80}
                thickness={8}
            />
        );
    } else if (data.length) {
        const columnHeaders = Object.keys(data[0]);
        const headers = columnHeaders.map((header) => headerMapping[header]);
        const records = data.map(
            (record) => columnHeaders.map((header) => record[header]));

        return (
            <Table
                striped
            >
                <TableHeader
                    displaySelectAll={false}
                >
                    <TableRow>
                        {headers.map((header) => (
                            <TableHeaderColumn key={header.id}>
                                {intl.formatMessage(headerLabels[header])}
                            </TableHeaderColumn>
                  ))}
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    stripedRows
                >
                    {records.map((values) => {
                        return (
                            <TableRow
                                key={values[0]}
                            >
                                {values.map((value) => (
                                    <TableRowColumn
                                        key={value}
                                    >
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
            <div>{intl.formatMessage(messages.noData)}</div>
        );
    }
});
