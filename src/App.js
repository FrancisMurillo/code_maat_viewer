import React from "react";

import { connect } from "react-redux";

import CircularProgress from "material-ui/CircularProgress";

import FrameContainer, {
    store,
    Provider
} from "./app";


const StartupLoading = () => (
    <CircularProgress
        size={80}
        thickness={8}
    />
);

const PersistenceContainer = connect(
    (state) => ({"loaded": state.persistence}),
    null
)(({loaded}) => React.createElement(loaded ? FrameContainer : StartupLoading));

export default () => (
    <Provider
        store={store}
    >
        <PersistenceContainer />
    </Provider>
);
