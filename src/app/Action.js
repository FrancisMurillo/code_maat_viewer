import { createAction } from "redux-actions";

import { WebService } from "../api";


export const toggleSideMenu = createAction("APP/TOGGLE_SIDE_MENU");

export const fetchCommits = createAction(
    "APP/FETCH_COMMITS",
    WebService.getCommits);


const secondArg = (_first, second) => second;

export const changeStartDate = createAction("APP/CHANGE_START_DATE", secondArg);
export const changeEndDate = createAction("APP/CHANGE_END_DATE", secondArg);

export const clearDates = createAction("APP/CLEAR_DATES");
export const refreshData = createAction("APP/REFRESH_DATA");
