import React from "react";

import { applyMiddleware, createStore, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { Provider } from "react-redux";

import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import ar from "react-intl/locale-data/ar";

import localeData from "./../translations/locales/data.json";


import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";


import injectTapEventPlugin from "react-tap-event-plugin";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";


import FrameContainer, {
    reducer as AppReducer,
    Home
} from "./app";


// HACK: Needed for material-ui
injectTapEventPlugin();

const muiTheme = getMuiTheme({
    "fontFamily": "Noto sans, Roboto, sans-serif",
    "contentFontFamily": "Noto sans, Roboto, sans-serif"
});


const language =
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      navigator.userLanguage;

const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

const messages =
      localeData[languageWithoutRegionCode] ||
      localeData[language] ||
      localeData.en;


addLocaleData([...en, ...ar]);


const history = createHistory();

const store = createStore(
    combineReducers({
        "app": AppReducer,
        "router": routerReducer
    }),
    applyMiddleware(
        logger,
        thunk,
        routerMiddleware(history)
    ));


export default () => (
    <Provider
        store={store}
    >
        <IntlProvider
            locale={language}
            messages={messages}
        >
            <MuiThemeProvider
                muiTheme={muiTheme}
            >
                <FrameContainer
                    history={history}
                    root={Home}
                />
            </MuiThemeProvider>
        </IntlProvider>
    </Provider>
);
