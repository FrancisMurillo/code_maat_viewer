import axios from "axios";
import moment from "moment";
import setting from "./Setting";

const AnalyisMethod = {
    "SUMMARY": "summary",
    "COUPLING": "coupling",
    "AGE": "age",
    "ABS_CHURN": "abs-churn",
    "AUTHOR_CHURN": "author_churn",
    "ENTITY_CHURN": "entity_churn",
    "ENTITY_OWNERSHIP": "entity-ownership",
    "ENTITY_EFFORT": "entity-effort"
};


class WebService {
    constructor(webRoot) {
        this.webService = axios.create ({
            baseURL: webRoot,
            headers: {
                "Accept": "application/json"
            }
        });
    }

    getAnalysis({ analysis, startDate, endDate}) {
        return axios.post(
            '/api/code-maat',
            {
                "analysis": analysis,
                "start-date": startDate,
                "end-date": endDate
            });
    }

}


export default new WebService (setting.webRoot);
