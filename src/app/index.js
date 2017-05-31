import React, { createElement } from "react";
import { connect } from "react-redux";
import { div } from "react-dom";

import Header from "./Header";
import SideMenu from "./SideMenu";
import ThisHome from "./Home";

import { toggleSideMenu } from "./Action";
import Reducer from "./Reducer";

export const Frame = ({
    open,
    router,
    onRequestChange,
    onTouchTap
}) =>
    (
        <div>
            <SideMenu
                onRequestChange={onRequestChange}
                open={open}
            />
            <Header
                onTouchTap={onTouchTap}
              />
            {createElement (router)}
        </div>
    );


export const reducer = Reducer;
export const Home = ThisHome;

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
