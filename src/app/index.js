import React from "react";
import { div } from "react-dom";

import { connect } from "react-redux";

import { injectIntl, defineMessages } from "react-intl";

import Header from "./Header";
import SideMenu from "./SideMenu";
import Home from "./Home";
import Toolbar from "./Toolbar";

import {
    toggleSideMenu,
    fetchCommitData
} from "./Action";

import reducer, {
    featureReducer,
    joinReducers
} from "./Reducer";

import Router, { routes } from "./Routing";

const messages = defineMessages({
    "noCommit": {
        "id": "frame.noCommit",
        "description": "Message for no commit label",
        "defaultMessage": "No commits made fo the repo yet."
    }
});

export const Frame = injectIntl(({
    intl,
    open,
    title,
    onRequestChange,
    onTouchTap,
    commitData,
    fetching,
    history,
    requestData
}) => {
    if (commitData === null && !fetching) {
        requestData();
    }

    if (commitData === null || fetching) {
        return (
            <div>
                <Header
                    showMenu={false}
                />
            </div>
        );
    } else if (commitData.length) {
        return (
            <div>
                <SideMenu
                    onRequestChange={onRequestChange}
                    open={open}
                />
                <Header
                    showMenu
                    title={title ? intl.formatMessage(title) : null}
                    onTouchTap={onTouchTap}
                />
                <Toolbar />
                <Router
                    history={history}
                />
            </div>
        );
    } else {
        return (
            <div>
                <Header
                    showMenu={false}
                />
                <div>{intl.formatMessage(messages.noCommit)}</div>
            </div>
        );
    }
});


export {
    reducer,
    featureReducer,
    joinReducers,
    Home
};


export default connect(
    (state) => {
        const {
            "router": { location },
            app
        } = state;

        if (location) {
            const { pathname } = location;
            const route = routes.reduce(
                (prev, thisRoute) => {
                    return thisRoute.path.startsWith(pathname)
                        ? route : prev;
                },
                null);

            const { title } = route;

            return {
                ...app,
                title
            };
        } else {
            return {...app};
        }
    },
    {
        "onTouchTap": toggleSideMenu,
        "onRequestChange": toggleSideMenu,
        "requestData": fetchCommitData
    }
)(Frame);
