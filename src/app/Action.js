import { createAction } from "redux-actions";

import { WebService } from "../api";

export const toggleSideMenu = createAction("TOGGLE_SIDE_MENU");

export const markFetching = createAction("MARK_FETCHING_APP_DATA");

export const fetchCommits = createAction(
    "FETCH_REPO_COMMITS",
     WebService.getCommits.bind(WebService));

export const fetchCommitData = () => (dispatch, getState) => {
    dispatch(markFetching());
    dispatch(fetchCommits());
};
