import React from "react";

import darkBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";


import {Header, SideMenu} from "./app"


export default () => (
    <MuiThemeProvider
      muiTheme={getMuiTheme(darkBaseTheme)}
      >
      <Header />
    </MuiThemeProvider>
);
