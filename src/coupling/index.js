import React, { Component } from "react";
import { div } from "react-dom";

import { injectIntl, defineMessages } from "react-intl";

import { connect } from "react-redux";

import {Tabs, Tab} from "material-ui/Tabs";

import reducer from "./Reducer";
import { fetchCouplingData } from "./Action";

import { RecordTable } from "../shared";

export {
    reducer
};

const messages = defineMessages({
    "record": {
        "id": "coupling.record",
        "description": "Record Table tab label",
        "defaultMessage": "Records"
    },
    "entity": {
        "id": "coupling.entity",
        "description": "Entity field label",
        "defaultMessage": "Entity"
    },
    "coupled": {
        "id": "coupling.coupled",
        "description": "Coupled field label",
        "defaultMessage": "Coupled"
    },
    "degree": {
        "id": "coupling.degree",
        "description": "Degree field label",
        "defaultMessage": "Degree"
    },
    "averageRevisions": {
        "id": "coupling.averageRevisions",
        "description": "Average Revisions field label",
        "defaultMessage": "Average Revisions"
    }
});

const fieldMessageMapping = {
    "entity": "entity",
    "coupled": "coupled",
    "average-revs": "averageRevisions",
    "degree": "degree"
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
                >
                    <RecordTable
                        data={data}
                        headerMapping={fieldMessageMapping}
                        headerLabels={messages}
                    />
                </Tab>
            </Tabs>
        );
    }
});


export default connect(
    ({ coupling }) => coupling,
    {
        "requestData": () => (dispatch, getState) => {
            const { "app": { appStartDate, appEndDate }} = getState();

            dispatch(fetchCouplingData(appStartDate, appEndDate));
        }
    }
)(Page);
