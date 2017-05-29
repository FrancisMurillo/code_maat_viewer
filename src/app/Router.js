import React from "react";
import { div } from "react-dom";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";


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
        "component": null
    },
    {
        "key": "revision",
        "path": "/analysis/revision",
        "component": null
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
];

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
