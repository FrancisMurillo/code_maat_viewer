import React from "react";
import { div } from "react-dom";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import RaisedButton from "material-ui/RaisedButton";


export default ({ history, root, routes }) => (
    <ConnectedRouter
        history={history}
    >
        <Route
            exact
            path="/"
            component={root}
        >
            {routes.map((route) => (<Route {...route} />))}
        </Route>

    </ConnectedRouter>
);
