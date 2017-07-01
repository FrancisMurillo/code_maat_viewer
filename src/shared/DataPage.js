import React from "react";
import { defineMessages, injectIntl } from "react-intl";

import CircularProgress from "material-ui/CircularProgress";

const messages = defineMessages({
    "empty": {
        "id": "dataPage.empty",
        "description": "Message for empty data records",
        "defaultMessage": "No record to show."
    }
});

export const dataRequestAction = Symbol("DATA_REQUEST/WEB_ACTION");

export const dataRequestInitialState = {
    "data": null,
    "fetching": false
};

export const handleDataRequestReducer = (reducer) => (state, action) => {
    const nextState = reducer(state, action);

    if (nextState === dataRequestAction) {
        if (action.meta === "fetching") {
            return {
                ...state,
                "fetching": true
            };
        } else if (action.error === true) {
            return {
                ...state,
                "fetching": false
            };
        } else {
            return {
                ...state,
                "fetching": false,
                "data": action.payload
            };
        }
    } else {
        return nextState;
    }
};


const DefaultLoading = () => (
    <CircularProgress
        size={80}
        thickness={8}
    />
);

const DefaultEmpty = injectIntl(({intl}) => (
    <div>
        {intl.formatMessage(messages.empty)}
    </div>
));

export default (Component) => {
    return class DataPage extends React.Component {
        componentDidMount() {
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
                data,
                Loading,
                Empty,
                ...otherProps
            } = this.props;

            if (data === null) {
                return React.createElement(Loading || DefaultLoading);
            } else if (data.length) {
                return React.createElement(Component, {
                    data,
                    ...otherProps
                });
            } else {
                return React.createElement(Empty || DefaultEmpty);
            }
        }
    };
};
