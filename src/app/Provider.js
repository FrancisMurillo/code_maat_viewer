import React from "react";
import { Provider } from "react-redux";

import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import ar from "react-intl/locale-data/ar";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import injectTapEventPlugin from "react-tap-event-plugin";

import localeData from "../../translations/locales/data.json";

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

export default ({store, children}) => (
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
                {children}
            </MuiThemeProvider>
        </IntlProvider>
    </Provider>
);
