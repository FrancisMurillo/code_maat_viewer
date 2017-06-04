import { createAction } from "redux-actions";

import { WebService } from "../api";


export const toggleSideMenu = createAction("TOGGLE_SIDE_MENU");

export const markFetching = createAction("MARK_FETCHING_APP_DATA");

export const fetchCommits = createAction(
    "FETCH_REPO_COMMITS",
     WebService.getCommits.bind(WebService));

export const fetchCommitData = () => (dispatch) => {
    dispatch(markFetching());
    dispatch(fetchCommits());
};


const secondArg = (_first, second) => second;

export const changeStartDate = createAction("CHANGE_START_DATE", secondArg);
export const changeEndDate = createAction("CHANGE_END_DATE", secondArg);

export const clearDates = createAction("CLEAR_DATES");
export const refreshData = createAction("REFRESH_DATA");
