import React, { Component }  from "react";

import Drawer from "material-ui/Drawer";


export default ({ docked, open, onRequestChange }) => (
    <Drawer
      docked={docked || false}
      open={open || false}
      width={200}
      onRequestChange={onRequestChange}
      />
)
