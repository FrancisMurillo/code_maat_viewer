import React from "react";
import { h1 } from "react-dom";

import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
    "notound": {
        "id": "notfound.message",
        "description": "Message for 404",
        "defaultMessage": "404.. This page is not found!"
    }
});

export default injectIntl(({ intl }) => (
    <h1>{intl.formatMessage(messages.notFound)}</h1>
));
