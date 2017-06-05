import { createAction } from "redux-actions";

import { WebService, AnalysisMethod } from "../api";

export const fetchData = createAction(
    "GET_COUPLING_DATA",
    WebService.prepareAnalysisRequest(AnalysisMethod.COUPLING)
);

export const markFetching = createAction("MARK_FETCHING_COUPLING_DATA");

export const preventFetch = createAction("PREVENT_FETCHING_COUPLING_DATA");

export const fetchCouplingData = (startDate, endDate) =>
    (dispatch) => {
        if (startDate && endDate) {
            dispatch(markFetching());
            dispatch(fetchData(startDate, endDate));
        } else {
            dispatch(preventFetch());
        }
    };
