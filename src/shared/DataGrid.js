import React from "react";
import { injectIntl } from "react-intl";

import { compose } from "redux";

import ReactDataGrid from "react-data-grid";

import columnMessages from "./ColumnMessage";


export const dataSortAction = Symbol("DATA_GRID/SORT_COLUMN");

export const dataSortDirection = {
    "ascending": "ASC",
    "descending": "DESC",
    "none": "NONE"
};

export const dataGridInitialState = {
    "sortColumn": null,
    "sortDirection": null
};

export const handleDataGridReducer = (reducer) => (state, action) => {
    const nextState = reducer(state, action);

    if (nextState === dataSortAction) {
        const { column, direction } = action.payload;

        return {
            ...state,
            "sortColumn": column,
            "sortDirection": direction
        };
    } else {
        return nextState;
    }
};

const sortRecordsByColumn = (column, direction) => {
    if (column && direction) {
        const comparer = (left, right) => {
            if (direction === dataSortDirection.ascending) {
                return (left[column] > right[column]) ? 1 : -1;
            } else if (direction === dataSortDirection.descending) {
                return (left[column] < right[column]) ? 1 : -1;
            } else {
                return 0;
            }
        };

        return (records) => {
            return direction ? records.slice().sort(comparer) : records;
        };
    } else {
        return (records) => records;
    }
};

const namingNormalizer = (key) => key.replace(
    /-([a-z])/g,
    (value) => value[1].toUpperCase());


const normalizeRecordKeys = (normalizer) => (records) => {
    return records.map((record) => {
        const newRecord = Object.create(null);

        Object.keys(record).forEach((key) => {
            const newKey = normalizer(key);

            newRecord[newKey] = record[key];
        });

        return newRecord;
    });
};

export default injectIntl(({
    intl,
    data,
    sortColumn,
    sortDirection,
    onSortRecords
}) => {
    const columns = Object.keys(data[0]).map((key) => {
        return {
            key,
            "name": columnMessages[key] ?
                intl.formatMessage(columnMessages[key]) : key,
            "sortable": true
        };
    });

    const rows = compose(
        sortRecordsByColumn(sortColumn, sortDirection),
        normalizeRecordKeys(namingNormalizer)
    )(data);

    return (
        <ReactDataGrid
            columns={columns}
            rowGetter={(index) => rows[index]}
            rowsCount={rows.length}
            onGridSort={onSortRecords}
        />
    );
});
