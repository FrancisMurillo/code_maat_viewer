import { createAction } from "redux-actions";

import { WebService, AnalysisMethod } from "../api";

export const fetchData = createAction(
    "GET_REVISION_DATA",
    WebService.prepareAnalysisRequest(AnalysisMethod.REVISION)
);

export const markFetching = createAction("MARK_FETCHING_REVISION_DATA");

export const preventFetch = createAction("PREVENT_FETCHING_REVISION_DATA");

export const fetchRevisionData = (startDate, endDate) =>
    (dispatch) => {
        if (startDate && endDate) {
            dispatch(markFetching());
            dispatch(fetchData(startDate, endDate));
        } else {
            dispatch(preventFetch());
        }
    };
