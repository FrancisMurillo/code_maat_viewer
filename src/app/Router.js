import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import RaisedButton from "material-ui/RaisedButton";


export default ({ history, routes }) => (
    <ConnectedRouter
        history={history}
    >
        <Route
            path="/"
            component={() => (<RaisedButton label="Default" />)}
        />
    </ConnectedRouter>
);
