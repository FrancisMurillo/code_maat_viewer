import React from "react";
import PropTypes from "prop-types";

import Drawer from "material-ui/Drawer";

const SideMenu = ({ docked, open, onRequestChange }) => (
    <Drawer
        docked={docked}
        open={open}
        width={200}
        onRequestChange={onRequestChange}
    />
);

SideMenu.propTypes = {
    "docked": PropTypes.bool.isRequired,
    "open": PropTypes.bool.isRequired,
    "onRequestChange": PropTypes.func.isRequired
};


export default SideMenu;
