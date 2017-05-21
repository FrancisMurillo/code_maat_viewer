import React from "react";
import PropTypes from "prop-types";
import { injectIntl, defineMessages } from "react-intl";

import MuiAppBar from "material-ui/AppBar";

const messages = defineMessages({
    "title": {
        "id": "app.title",
        "description": "Application title",
        "defaultMessage": "Code Maat Viewer"
    }
});

const AppBar = injectIntl(({onTouchTap, intl}) => (
    <MuiAppBar
        title={intl.formatMessage(messages.title)}
        showMenuIconButton
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={onTouchTap}
    />
));

AppBar.propTypes = {"onTouchTap": PropTypes.func.isRequired};

export default AppBar;
