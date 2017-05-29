import React from "react";
import { connect } from "react-redux";
import { div } from "react-dom";

import Header from "./Header";
import SideMenu from "./SideMenu";
import Router from "./Router";
import ThisHome from "./Home";

import { toggleSideMenu } from "./Action";
import Reducer from "./Reducer";

export const Frame = ({
    history,
    open,
    items,
    root,
    onRequestChange,
    onTouchTap
}) =>
    (
        <div>
            <SideMenu
                onRequestChange={onRequestChange}
                items={items}
                open={open}
            />
            <Header
                onTouchTap={onTouchTap}
            />
            <Router
                history={history}
                routes={routes}
                root={root}
            />
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
