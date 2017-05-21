import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { div } from "react-dom";

import Header from "./Header";
import SideMenu from "./SideMenu";
import Router from "./Router";

import { toggleSideMenu } from "./Action";
import Reducer from "./Reducer";

export const Frame = ({open, docked, onRequestChange, onTouchTap}) =>
    (
        <div>
            <SideMenu
                onRequestChange={onRequestChange}
                open={open}
                docked={docked}
            />
            <Header
                onTouchTap={onTouchTap}
            />

        </div>
    );

Frame.propTypes = {
    "open": PropTypes.bool.isRequired,
    "docked": PropTypes.bool.isRequired,
    "onRequestChange": PropTypes.func.isRequired,
    "onTouchTap": PropTypes.func.isRequired
};


export const reducer = Reducer;

export default connect(
    (state) => ({...state.app}),
    (dispatch) => ({
        onTouchTap() {

            dispatch(toggleSideMenu());

        },
        onRequestChange() {

            dispatch(toggleSideMenu());

        }
    })
)(Frame);
