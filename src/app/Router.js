import React from 'react';
import { Router, Route } from 'react-router-redux';

import RaisedButton from 'material-ui/RaisedButton';


export default ({ history, routes }) => (
    <Router
      history={history}
      >
      <Route
        path="/"
        component={() => (<RaisedButton label="Default" />)}
        />
    </Router>
);
