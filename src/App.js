import React from "react";

import FrameContainer, {
    store,
    Provider
} from "./app";


export default () => (
    <Provider
        store={store}
    >
        <FrameContainer />
    </Provider>
);
