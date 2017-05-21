import React from "react";
import { h2 } from "react-dom";
import {Tabs, Tab} from "material-ui/Tabs";

export default () => (
    <Tabs>
        <Tab
            label="One"
        >
            <h2>Home Page</h2>
        </Tab>
        <Tab
            label="Two"
        >
            <h2>About Something Else</h2>
        </Tab>
    </Tabs>
);
