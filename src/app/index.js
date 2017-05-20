import React from 'react';
import { connect } from 'react-redux';
import { div } from 'react-dom';

import Header  from './Header';
import SideMenu  from './SideMenu';
import Router  from './Router';

import { toggleSideMenu } from './Action';
import Reducer from './Reducer';

export const App = (
    {open, docked, onRequestChange, onTouchTap}) => (
    <div>
      <SideMenu
        onRequestChange={onRequestChange}
        open={open}
        docked={docked}
        />
      <Header
        onTouchTap={onTouchTap}/>
    </div>
);


export const reducer = Reducer;

export default connect(
    (state) => {
        return {...state.app}
    },
    (dispatch) => {
        return {
            onTouchTap () {
                dispatch(toggleSideMenu());
            },
            onRequestChange () {
                dispatch (toggleSideMenu ());
            }
        }
    }
)(App);
