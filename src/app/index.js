import React from "react";
import { connect } from "react-redux";
import { div } from "react-dom";

import Header from "./Header";
import SideMenu from "./SideMenu";
import Router from "./Router";

import { toggleSideMenu } from "./Action";
import Reducer from "./Reducer";

export const Frame = ({history, open, onRequestChange, onTouchTap}) =>
    (
        <div>
            <SideMenu
                onRequestChange={onRequestChange}
                open={open}
            />
            <Header
                onTouchTap={onTouchTap}
            />
            <Router
                history={history}
            />
        </div>
    );


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
