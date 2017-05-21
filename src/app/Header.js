import React from "react";
import { injectIntl, defineMessages } from "react-intl";

import MuiAppBar from "material-ui/AppBar";

const messages = defineMessages({
    "title": {
        "id": "app.title",
        "description": "Application title",
        "defaultMessage": "Code Maat Viewer"
    }
});


export default injectIntl(({onTouchTap, intl}) => (
    <MuiAppBar
        title={intl.formatMessage(messages.title)}
        showMenuIconButton
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={onTouchTap}
    />
));
