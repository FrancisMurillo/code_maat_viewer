import React, {Component} from 'react';

import AppBar from 'material-ui/AppBar';


export default ({onTouchTap}) => (
    <AppBar
      title="My AppBar"
      showMenuIconButton={true}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      onLeftIconButtonTouchTap={onTouchTap}
      />
);
