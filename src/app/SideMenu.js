import React from "react";
import { injectIntl, defineMessages } from "react-intl";

import { Link } from 'react-router';

import { routes } from './Router';

import {List, ListItem} from "material-ui/List";
import Drawer from "material-ui/Drawer";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";

import DashboardIcon from "material-ui/svg-icons/action/dashboard";

import SummaryIcon from "material-ui/svg-icons/action/track-changes";
import CouplingIcon from "material-ui/svg-icons/image/leak-remove";
import AgeIcon from "material-ui/svg-icons/av/av-timer";
import AbsoluteChurnIcon from "material-ui/svg-icons/editor/show-chart";
import AuthorChurnIcon from "material-ui/svg-icons/social/people";
import EntityChurnIcon from "material-ui/svg-icons/action/group-work";
import EntityOwnershipIcon from "material-ui/svg-icons/editor/bubble-chart";
import EntityEffortIcon from "material-ui/svg-icons/action/donut-small";

import SettingIcon from "material-ui/svg-icons/action/settings";
import ExitIcon from "material-ui/svg-icons/action/exit-to-app";


const messages = defineMessages({
    "codeMaat": {
        "id": "menu.codeMaat",
        "description": "Code Maat subheader label",
        "defaultMessage": "Code Maat"
    },

    "home": {
        "id": "menu.home",
        "description": "Home menu label",
        "defaultMessage": "Home"
    },
    "analysis": {
        "id": "menu.analysis",
        "description": "Analysis subheader label",
        "defaultMessage": "Analysis"
    },
    "summary": {
        "id": "menu.summary",
        "description": "Summary menu label",
        "defaultMessage": "Summary"
    },
    "coupling": {
        "id": "menu.coupling",
        "description": "Coupling menu label",
        "defaultMessage": "Coupling"
    },
    "age": {
        "id": "menu.age",
        "description": "Age menu label",
        "defaultMessage": "Age"
    },
    "absoluteChurn": {
        "id": "menu.absoluteChurn",
        "description": "Absolute Churn menu label",
        "defaultMessage": "Absolute Churn"
    },
    "authorChurn": {
        "id": "menu.authorChurn",
        "description": "Author Churn menu label",
        "defaultMessage": "Author Churn"
    },
    "entityChurn": {
        "id": "menu.entityChurn",
        "description": "Entity Churn menu label",
        "defaultMessage": "Entity Churn"
    },
    "entityOwnership": {
        "id": "menu.entityOwnership",
        "description": "Entity Ownership menu label",
        "defaultMessage": "Entity Ownership"
    },
    "entityEffort": {
        "id": "menu.entityEffort",
        "description": "Entity Effort menu label",
        "defaultMessage": "Entity Effort"
    },

    "preferences": {
        "id": "menu.preferences",
        "description": "Preferences subheader label",
        "defaultMessage": "Preferences"
    },
    "setting": {
        "id": "menu.setting",
        "description": "Setting menu label",
        "defaultMessage": "Settings"
    },
    "exit": {
        "id": "menu.exit",
        "description": "Exit menu label",
        "defaultMessage": "Exit"
    }
});


export default injectIntl(({ intl, open, items, onRequestChange }) => (
    <Drawer
        docked={false}
        open={open}
        width={400}
        onRequestChange={onRequestChange}
    >
        <List>
            <List>
                <Subheader>{intl.formatMessage(messages.codeMaat)}</Subheader>
                <ListItem
                  primaryText={intl.formatMessage(messages.home)}
                  leftIcon={<DashboardIcon />}
                  containerElement={(props) => (<Link to="/" {...props} />)}
                />
            </List>
            <Divider />
            <List>
                <Subheader>{intl.formatMessage(messages.analysis)}</Subheader>
                <ListItem
                    primaryText={intl.formatMessage(messages.summary)}
                    leftIcon={<SummaryIcon />}
                />
                <ListItem
                    primaryText={intl.formatMessage(messages.coupling)}
                    leftIcon={<CouplingIcon />}
                />
                <ListItem
                    primaryText={intl.formatMessage(messages.age)}
                    leftIcon={<AgeIcon />}
                />
                <ListItem
                    primaryText={intl.formatMessage(messages.absoluteChurn)}
                    leftIcon={<AbsoluteChurnIcon />}
                />
                <ListItem
                    primaryText={intl.formatMessage(messages.authorChurn)}
                    leftIcon={<AuthorChurnIcon />}
                />
                <ListItem
                    primaryText={intl.formatMessage(messages.entityChurn)}
                    leftIcon={<EntityChurnIcon />}
                />
                <ListItem
                    primaryText={intl.formatMessage(messages.entityOwnership)}
                    leftIcon={<EntityOwnershipIcon />}
                />
                <ListItem
                    primaryText={intl.formatMessage(messages.entityEffort)}
                    leftIcon={<EntityEffortIcon />}
                />
            </List>
            <Divider />
            <List>
                <Subheader>
                  {intl.formatMessage(messages.preferences)}
                </Subheader>
                <ListItem
                    primaryText={intl.formatMessage(messages.setting)}
                    leftIcon={<SettingIcon />}
                />
                <ListItem
                    primaryText={intl.formatMessage(messages.exit)}
                    leftIcon={<ExitIcon />}
                />
            </List>
        </List>
    </Drawer>
));
