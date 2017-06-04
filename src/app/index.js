import React, { Component } from "react";
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

export const Frame = injectIntl(class Frame extends Component {
    componentDidMount() {
        const {
            commitData,
            fetching,
            requestData
        } = this.props;

        if (commitData === null && !fetching) {
            requestData();
        }
    }

    render() {
        const {
            intl,
            open,
            title,
            onRequestChange,
            onTouchTap,
            commitData,
            fetching,
            history
        } = this.props;

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
                    if (thisRoute.path) {
                        return thisRoute.path.startsWith(pathname)
                            ? thisRoute : prev;
                    } else {
                        return prev;
                    }
                },
                null);

            const routeProps = route ? { "title": route.title} : {};

            return {
                ...app,
                ...routeProps
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
