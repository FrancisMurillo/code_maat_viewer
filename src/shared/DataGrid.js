import React from "react";
import { injectIntl } from "react-intl";

import { compose } from "redux";
import { createAction } from "redux-actions";

import ReactDataGrid from "react-data-grid";
import { Toolbar, Data } from "react-data-grid-addons";
const { Selectors } = Data;

import columnMessages from "./ColumnMessage";

export const dataSortAction = Symbol("DATA_GRID/SORT_COLUMN");
export const dataFilterAction = Symbol("DATA_GRID/FILTER_COLUMN");

export const createDataSortAction = (type) =>
    createAction(type, (column, direction) => ({
        column,
        direction
    }));

export const createDataFilterAction = (type) =>
    createAction(type, (filter) => filter);

export const dataSortDirection = {
    "ascending": "ASC",
    "descending": "DESC",
    "none": "NONE"
};

export const dataGridInitialState = {
    "sortColumn": null,
    "sortDirection": null,
    "filters": {}
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
    } else if (nextState === dataFilterAction) {
        const filter = action.payload;
        let newFilters = {...state.filters};

        if (!filter) {
            newFilters = {};
        } else if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }

        return {
            ...state,
            "filters": newFilters
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

const filterRecords = (filters) => {
    return (records) => Selectors.getRows({
        "rows": records,
        filters
    });
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

export const ColumnType = {"integer": "integer"};

const mapRecords = (columnModels) => (records) => {
    return records.map((record) => {
        const newRecord = Object.create(null);

        columnModels.forEach(({key, mapper}) => {
            const value = record[key];

            if (typeof mapper === "function") {
                newRecord[key] = parseInt(value, 10);
            } else {
                switch (mapper) {
                case ColumnType.integer:
                    newRecord[key] = parseInt(value, 10);
                    break;
                default:
                    newRecord[key] = value;
                    break;
                }
            }
        });

        return newRecord;
    });
};

export default injectIntl(({
    intl,
    data,
    columns,
    sortColumn,
    sortDirection,
    onSortRecords,
    filters,
    onChangeFilters,
    onClearFilters
}) => {
    const columnModels = columns.map((column) => {
        const { key } = column;


        return {
            key,
            "name": columnMessages[key] ?
                intl.formatMessage(columnMessages[key]) : key,
            "sortable": true,
            "filterable": true
        };
    });

    const rows = compose(
        sortRecordsByColumn(sortColumn, sortDirection),
        filterRecords(filters),
        mapRecords(columns),
        normalizeRecordKeys(namingNormalizer)
    )(data);

    const toolbar = onChangeFilters ? (
        <Toolbar
            enableFilter
        />
    ) : null;

    return (
        <ReactDataGrid
            columns={columnModels}
            rowGetter={(index) => rows[index]}
            rowsCount={rows.length}
            onGridSort={onSortRecords}
            onAddFilter={onChangeFilters}
            onClearFilters={onChangeFilters}
            toolbar={toolbar}
        />
    );
});
