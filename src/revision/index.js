import React, { Component } from "react";
import { injectIntl, defineMessages } from "react-intl";

import { connect } from "react-redux";

import {Tabs, Tab} from "material-ui/Tabs";

import reducer from "./Reducer";
import { fetchRevisionData } from "./Action";

export {
    reducer
};

const messages = defineMessages({
    "record": {
        "id": "revision.record",
        "description": "Record Table tab label",
        "defaultMessage": "Records"
    },
    "entity": {
        "id": "revision.entity",
        "description": "Entity field label",
        "defaultMessage": "Entity"
    },
    "numberOfRevisions": {
        "id": "revision.numberOfRevisions",
        "description": "Number of Revisions field label",
        "defaultMessage": "Number of Revisions"
    }
});

const fieldMessageMapping = {
    "entity": "entity",
    "n-revs": "numberOfRevisions"
};


export const Page = injectIntl(class Page extends Component {
    componentDidUpdate() {
        const {
            data,
            fetching,
            requestData
        } = this.props;

        if (data === null && !fetching) {
            requestData();
        }
    }

    render() {
        const {
            intl,
            data
        } = this.props;

        return (
            <Tabs>
                <Tab
                    label={intl.formatMessage(messages.record)}
                />
            </Tabs>
        );
    }
});


export default connect(
    ({ revision }) => revision,
    {
        "requestData": () => (dispatch, getState) => {
            const { "app": { appStartDate, appEndDate }} = getState();

            dispatch(fetchRevisionData(appStartDate, appEndDate));
        }
    }
)(Page);
