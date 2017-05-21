import React from "react";
import { injectIntl, defineMessages } from "react-intl";

import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";

const messages = defineMessages({
    "home": {
        "id": "menu.home",
        "description": "Home menu label",
        "defaultMessage": "Home"
    },
    "analysis": {
        "id": "menu.analysis",
        "description": "Analysis menu label",
        "defaultMessage": "Analysis"
    }
});

export default injectIntl(({ intl, open, onRequestChange }) => (
    <Drawer
        docked
        open={open}
        width={200}
        onRequestChange={onRequestChange}
    >
        <MenuItem
            primaryText={intl.formatMessage(messages.home)}
            onTouchTap={() => {
                debugger;
            }}
        />
        <MenuItem
            primaryText={intl.formatMessage(messages.analysis)}
            onTouchTap={() => {
                debugger;
            }}
        />
    </Drawer>
));
