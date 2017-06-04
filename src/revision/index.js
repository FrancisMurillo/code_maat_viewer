import React, { Component } from "react";
import { div } from "react-dom";

import { injectIntl, defineMessages } from "react-intl";

import { connect } from "react-redux";

import reducer from "./Reducer";
import { fetchRevisionData } from "./Action";

import { RecordTable } from "../shared";

export {
    reducer
};

const messages = defineMessages({
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
            <RecordTable
                data={data}
                headerMapping={fieldMessageMapping}
                headerLabels={messages}
            />
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
