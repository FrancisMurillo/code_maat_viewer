import React from "react";
import { injectIntl, defineMessages } from "react-intl";

import { connect } from "react-redux";

import { push } from "react-router-redux";

import {List, ListItem} from "material-ui/List";
import Drawer from "material-ui/Drawer";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";

import DashboardIcon from "material-ui/svg-icons/action/dashboard";

import SummaryIcon from "material-ui/svg-icons/action/track-changes";
import RevisionIcon from "material-ui/svg-icons/editor/linear-scale";
import CouplingIcon from "material-ui/svg-icons/image/leak-remove";
import AgeIcon from "material-ui/svg-icons/av/av-timer";
import AbsoluteChurnIcon from "material-ui/svg-icons/editor/show-chart";
import AuthorChurnIcon from "material-ui/svg-icons/social/people";
import EntityChurnIcon from "material-ui/svg-icons/action/group-work";
import EntityOwnershipIcon from "material-ui/svg-icons/editor/bubble-chart";
import EntityEffortIcon from "material-ui/svg-icons/action/donut-small";

import SettingIcon from "material-ui/svg-icons/action/settings";
// import ExitIcon from "material-ui/svg-icons/action/exit-to-app";

import { routes } from "./Routing";

const messages = defineMessages({
    "codeMaat": {
        "id": "menu.codeMaat",
        "description": "Code Maat subheader label",
        "defaultMessage": "Code Maat"
    },
    "analysis": {
        "id": "menu.analysis",
        "description": "Analysis subheader label",
        "defaultMessage": "Analysis"
    },
    "preferences": {
        "id": "menu.preferences",
        "description": "Preferences subheader label",
        "defaultMessage": "Preferences"
    }
});

const codeMaatRouteKeys = [
    {
        "key": "dashboard",
        "icon": DashboardIcon
    }
];

const analysisRouteKeys = [
    {
        "key": "summary",
        "icon": SummaryIcon
    },
    {
        "key": "revision",
        "icon": RevisionIcon
    },
    {
        "key": "coupling",
        "icon": CouplingIcon
    },
    {
        "key": "age",
        "icon": AgeIcon
    },
    {
        "key": "absoluteChurn",
        "icon": AbsoluteChurnIcon
    },
    {
        "key": "authorChurn",
        "icon": AuthorChurnIcon
    },
    {
        "key": "entityChurn",
        "icon": EntityChurnIcon
    },
    {
        "key": "entityOwnership",
        "icon": EntityOwnershipIcon
    },
    {
        "key": "entityEffort",
        "icon": EntityEffortIcon
    }
];

const preferenceRouteKeys = [
    {
        "key": "setting",
        "icon": SettingIcon
    }
];


export const Router = injectIntl(
    ({ intl, open, onRequestChange, onChangeRoute }) => {
        const renderRouteKeys = (routeKeys) => routeKeys.map(({key, icon}) => {
            const route = routes.find((thisRoute) => thisRoute.key === key);
            const label = intl.formatMessage(route.title);

            const { path } = route;

            return (
                <ListItem
                    key={key}
                    primaryText={label}
                    leftIcon={React.createElement(icon)}
                    onClick={() => {
                        onChangeRoute(path);
                    }}
                />
            );
        });

        return (
            <Drawer
                docked={false}
                open={open}
                width={400}
                onRequestChange={onRequestChange}
            >
                <List>
                    <List>
                        <Subheader>
                            {intl.formatMessage(messages.codeMaat)}
                        </Subheader>
                        {renderRouteKeys(codeMaatRouteKeys)}
                    </List>
                    <Divider />
                    <List>
                        <Subheader>
                            {intl.formatMessage(messages.analysis)}
                        </Subheader>
                        {renderRouteKeys(analysisRouteKeys)}
                        <Divider />
                        <List>
                            <Subheader>
                                {intl.formatMessage(messages.preferences)}
                            </Subheader>
                            {renderRouteKeys(preferenceRouteKeys)}
                        </List>
                    </List>
                </List>
            </Drawer>
        );
    });

export default connect(
    null,
    (dispatch) => ({
        onChangeRoute(path) {
            dispatch(push(path));
        }
    })
)(Router);
