import React, { createElement } from "react";
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
    router,
    onRequestChange,
    onTouchTap,
    commitData,
    fetching,
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
                    onTouchTap={onTouchTap}
                />
                <Toolbar />
                {createElement(router)}
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
    (state) => ({...state.app}),
    {
        "onTouchTap": toggleSideMenu,
        "onRequestChange": toggleSideMenu,
        "requestData": fetchCommitData
    }
)(Frame);
