import React from "react";
import { div } from "react-dom";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import { defineMessages } from "react-intl";

import Summary from "../summary";
// import Revision from "./revision";


const messages = defineMessages({
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

export const routes = [
    {
        "key": "dashboard",
        "path": "/",
        "exact": true,
        "component": null
    },
    {
        "key": "notFound",
        "path": "",
        "component": null
    },

    {
        "key": "summary",
        "path": "/analysis/summary",
        "component": Summary
    },
    {
        "key": "revision",
        "path": "/analysis/revision",
        "component": null // Revision
    },
    {
        "key": "coupling",
        "path": "/analysis/coupling",
        "component": null
    },
    {
        "key": "age",
        "path": "/analysis/age",
        "component": null
    },
    {
        "key": "absoluteChurn",
        "path": "/analysis/absolute-churn",
        "component": null
    },
    {
        "key": "authorChurn",
        "path": "/analysis/author-churn",
        "component": null
    },
    {
        "key": "entityChurn",
        "path": "/analysis/entity-churn",
        "component": null
    },
    {
        "key": "entityOwnership",
        "path": "/analysis/entity-ownership",
        "component": null
    },
    {
        "key": "entityEffort",
        "path": "/analysis/entity-effort",
        "component": null
    },

    {
        "key": "setting",
        "path": "/analysis/setting",
        "component": null
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
            {routes.map((route) => (
                <Route
                    key={route.key}
                    {...route}
                />
        ))}
        </div>
    </ConnectedRouter>
);
