import React from "react";
import PropTypes from "prop-types";
import { Router, Route } from "react-router-redux";

import RaisedButton from "material-ui/RaisedButton";


const ThisRouter = ({ history, routes }) => (
    <Router
        history={history}
    >
        <Route
            path="/"
            component={() => (<RaisedButton label="Default" />)}
        />
    </Router>
);

ThisRouter.propTypes = {
    "history": PropTypes.array,
    "routes": PropTypes.array
};

export default ThisRouter;
