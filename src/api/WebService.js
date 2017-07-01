import axios from "axios";
import moment from "moment";

import config from "./Config";
// import AnalysisMethod from "./AnalysisMethod";

const isDate =
      (value) => Object.prototype.toString.call(value) === "[object Date]";

// const isAnalysisMethod = (value) => AnalysisMethod[value];

const serializeDate = (date) => moment(date).format("YYYY-MM-DD");

const namingNormalizer = (key) => key.replace(
    /-([a-z])/g,
    (value) => value[1].toUpperCase());

const WebService = (webRoot) => {
    const webService = axios.create({
        "baseURL": webRoot,
        "responseType": "json",
        "headers": {"Accept": "application/json"}
    });

    const service = {
        getAnalysis({ analysis, startDate, endDate}) {
            return new Promise((res, rej) => {
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

                return webService.get(
                    "/api/code-maat",
                    {
                        "params": {
                            analysis,
                            "start-date": serializeDate(startDate),
                            "end-date": serializeDate(endDate)
                        }
                    })
                    .then(({data}) => {
                        res(data);
                    })
                    .then((data) => {
                        return data && data.length ?
                            data.map((record) => {
                                const newRecord = Object.create(null);

                                Object.keys(record).forEach((key) => {
                                    const newKey = namingNormalizer(key);

                                    newRecord[newKey] = record[key];
                                });

                                return newRecord;
                            }) : [];
                    })
                    .catch(rej);
            });
        },

        prepareAnalysisRequest(analysis) {
            return (startDate, endDate) => service.getAnalysis({
                analysis,
                startDate,
                endDate
            });
        },

        getCommits() {
            return webService.get("/api/commits")
                .then(({data}) => data.map(({commitDate, commitHash}) => ({
                    commitHash,
                    "commitDate": new Date(commitDate)
                })));
        }
    };

    return service;
};

export default new WebService(config.webRoot);
