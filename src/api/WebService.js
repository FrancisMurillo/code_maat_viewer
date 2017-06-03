import axios from "axios";
import moment from "moment";

import config from "./Config";
import AnalysisMethod from "./AnalysisMethod";

const isDate =
      (value) => Object.prototype.toString.call(value) === "[object Date]";

const isAnalysisMethod = (value) => AnalysisMethod[value];

const serializeDate = (date) => moment(date).format("YYYY-MM-DD");


class WebService {
    constructor(webRoot) {
        this.webService = axios.create({
            "baseURL": webRoot,
            "responseType": "json",
            "headers": {"Accept": "application/json"}
        });
    }

    getAnalysis({ analysis, startDate, endDate}) {
        return new Promise((res, rej) => {
            // if (!isAnalysisMethod(analysis)) {
            //     rej({
            //         "type": "validation",
            //         "field": "analysis",
            //         "value": analysis,
            //         "message": "Invalid analysis type"
            //     });
            // }

            if (!isDate(startDate)) {
                rej({
                    "type": "validation",
                    "field": "startDate",
                    "value": startDate,
                    "message": "Start date is not a date"
                });

            }

            if (!isDate(endDate)) {
                rej({
                    "type": "validation",
                    "field": "endDate",
                    "value": endDate,
                    "message": "End date is not a date"
                });
            }

            if (!(startDate <= endDate)) {
                rej({
                    "type": "validation",
                    "field": "endDate",
                    "value": endDate,
                    "message": "Start date is ahead of the end date."
                });
            }

            return this.webService.get(
                "/api/code-maat",
                {
                    "params": {
                        analysis,
                        "start-date": serializeDate(startDate),
                        "end-date": serializeDate(endDate)
                    }
                });
        });
    }
}


export default new WebService(config.webRoot);
