import { createAction } from "redux-actions";

import { WebService, AnalysisMethod } from "../api";

export const fetchData = createAction(
    "GET_SUMMARY_DATA",
    WebService.prepareAnalysisRequest(AnalysisMethod.SUMMARY)
);

export const markFetching = createAction("MARK_FETCHING_SUMMARY_DATA");


export const fetchSummaryData = (statDate, endDate) => (dispatch) => {
    dispatch(markFetching());
    dispatch(fetchData(statDate, endDate));
};
