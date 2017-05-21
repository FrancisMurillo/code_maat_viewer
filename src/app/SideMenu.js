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

export default injectIntl(({ intl, open, items, onRequestChange }) => (
    <Drawer
        docked={false}
        open={open}
        width={200}
        onRequestChange={onRequestChange}
    >
        {items.map((item) => (
            <MenuItem
                primaryText={item.label}
                onTouchTap={item.onTouchTap}
            />))}
    </Drawer>
));
