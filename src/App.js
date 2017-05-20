import React from "react";
import { applyMiddleware, createStore, combineReducers } from 'redux'
import logger from 'redux-logger';

import { Provider, connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

import darkBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import AppContainer, { reducer as AppReducer } from "./app"

// HACK: Needed for material-ui
injectTapEventPlugin();


const muiTheme = getMuiTheme({
    fontFamily: 'Noto sans, Roboto, sans-serif',
    contentFontFamily: 'Noto sans, Roboto, sans-serif'
});


const store = createStore(
    combineReducers({
        app: AppReducer
    }),
    applyMiddleware(logger));


export default ({}) => (
    <Provider
      store={store}
      >
      <MuiThemeProvider
        muiTheme={muiTheme}
        >
        <AppContainer/>
      </MuiThemeProvider>
    </Provider>
);
