import React from "react";
import { div } from "react-dom";

import { connect } from "react-redux";

import { injectIntl, defineMessages } from "react-intl";

import { DataPage } from "../shared";

import Header from "./Header";
import SideMenu from "./SideMenu";
import Toolbar from "./Toolbar";
import Provider from "./Provider";

import {
    toggleSideMenu,
    fetchCommits
} from "./Action";

import store from "./Store";
import {history} from "./Middleware";

import Router, { routes } from "./Routing";

const messages = defineMessages({
    "noCommit": {
        "id": "frame.noCommit",
        "description": "Message for no commit label",
        "defaultMessage": "No commits made fo the repo yet."
    }
});

const Loading = () => (
    <div>
        <Header
            showMenu={false}
        />
    </div>
);

const Empty = injectIntl(({intl}) => (
    <div>
        <Header
            showMenu={false}
        />
        <div>{intl.formatMessage(messages.noCommit)}</div>
    </div>
));

export const Frame = injectIntl(DataPage((props) => {
    const {
        intl,
        open,
        title,
        onRequestChange,
        onTouchTap
    } = props;

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
}));


export {
    store,
    history,
    Provider
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
        "requestData": fetchCommits
    },
    (stateProps, dispatchProps, ownProps) => ({
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        Loading,
        Empty
    })
)(Frame);
