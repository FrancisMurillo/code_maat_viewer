import React, { createElement } from "react";
import { connect } from "react-redux";
import { div } from "react-dom";

import Header from "./Header";
import SideMenu from "./SideMenu";
import ThisHome from "./Home";

import { toggleSideMenu, fetchCommitData, fetchCommits } from "./Action";
import Reducer from "./Reducer";


export const Frame = ({
    open,
    router,
    onRequestChange,
    onTouchTap,
    commitData,
    fetching,
    requestData
}) => {
    if (commitData === null && !fetching) {
        requestData();
    }

    if (fetching) {
        return (
            <div>
                <Header
                    showMenu={false}
                />
            </div>
        );
    } else {
        return (
            <div>
                <SideMenu
                    onRequestChange={onRequestChange}
                    open={open}
                />
                <Header
                    showMenu
                    onTouchTap={onTouchTap}
                />
                {createElement(router)}
            </div>
        );
    }
};

export const reducer = Reducer;
export const Home = ThisHome;

export default connect(
    (state) => ({...state.app}),
    {
        "onTouchTap": toggleSideMenu,
        "onRequestChange": toggleSideMenu,
        "requestData": fetchCommitData
    }
)(Frame);
