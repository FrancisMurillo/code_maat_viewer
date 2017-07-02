import React from "react";
import { div } from "react-dom";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import { injectIntl, defineMessages } from "react-intl";

import Summary from "../summary";
import Revision from "../revision";
import Coupling from "../coupling";
import Age from "../age";
import AbsoluteChurn from "../absoluteChurn";
import AuthorChurn from "../authorChurn";
import EntityChurn from "../entityChurn";
import EntityOwnership from "../entityOwnership";
import EntityEffort from "../entityEffort";

const messages = defineMessages({
    "notImplemented": {
        "id": "menu.notImplemented",
        "description": "Not Implemented message",
        "defaultMessage": "Sorry, this feature is not implemented yet."
    },
    "dashboard": {
        "id": "menu.dashboard",
        "description": "Dashboard menu label",
        "defaultMessage": "Dashboard"
    },
    "summary": {
        "id": "menu.summary",
        "description": "Summary menu label",
        "defaultMessage": "Summary"
    },
    "revision": {
        "id": "menu.revision",
        "description": "Revision menu label",
        "defaultMessage": "Revisions"
    },
    "coupling": {
        "id": "menu.coupling",
        "description": "Coupling menu label",
        "defaultMessage": "Coupling"
    },
    "age": {
        "id": "menu.age",
        "description": "Age menu label",
        "defaultMessage": "Age"
    },
    "absoluteChurn": {
        "id": "menu.absoluteChurn",
        "description": "Absolute Churn menu label",
        "defaultMessage": "Absolute Churn"
    },
    "authorChurn": {
        "id": "menu.authorChurn",
        "description": "Author Churn menu label",
        "defaultMessage": "Author Churn"
    },
    "entityChurn": {
        "id": "menu.entityChurn",
        "description": "Entity Churn menu label",
        "defaultMessage": "Entity Churn"
    },
    "entityOwnership": {
        "id": "menu.entityOwnership",
        "description": "Entity Ownership menu label",
        "defaultMessage": "Entity Ownership"
    },
    "entityEffort": {
        "id": "menu.entityEffort",
        "description": "Entity Effort menu label",
        "defaultMessage": "Entity Effort"
    },

    "setting": {
        "id": "menu.setting",
        "description": "Setting menu label",
        "defaultMessage": "Settings"
    },
    "exit": {
        "id": "menu.exit",
        "description": "Exit menu label",
        "defaultMessage": "Exit"
    }
});


const NotImplemented = injectIntl(({ intl }) => (
    <div>{intl.formatMessage(messages.notImplemented)}</div>
));

export const routes = [
    {
        "key": "dashboard",
        "path": "/",
        "exact": true,
        "component": NotImplemented
    },
    {
        "key": "summary",
        "path": "/analysis/summary",
        "component": Summary
    },
    {
        "key": "revision",
        "path": "/analysis/revision",
        "component": Revision
    },
    {
        "key": "coupling",
        "path": "/analysis/coupling",
        "component": Coupling
    },
    {
        "key": "age",
        "path": "/analysis/age",
        "component": Age
    },
    {
        "key": "absoluteChurn",
        "path": "/analysis/absolute-churn",
        "component": AbsoluteChurn
    },
    {
        "key": "authorChurn",
        "path": "/analysis/author-churn",
        "component": AuthorChurn
    },
    {
        "key": "entityChurn",
        "path": "/analysis/entity-churn",
        "component": EntityChurn
    },
    {
        "key": "entityOwnership",
        "path": "/analysis/entity-ownership",
        "component": EntityOwnership
    },
    {
        "key": "entityEffort",
        "path": "/analysis/entity-effort",
        "component": EntityEffort
    },

    {
        "key": "setting",
        "path": "/analysis/setting",
        "component": NotImplemented
    }

].map((route) => {
    return {
        ...route,
        "title": messages[route.key]
    };
});

export default ({ history }) => (
    <ConnectedRouter
        history={history}
    >
        <div>
            {routes.map(({key, ...props}) => (
                <Route
                    key={key}
                    {...props}
                />
        ))}
        </div>
    </ConnectedRouter>
);
