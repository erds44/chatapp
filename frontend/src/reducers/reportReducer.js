import {ON_REPORT} from '../actions/type';

const INTIAL_STATE = {
    isReportAdminVisible: false,
    reportedUsername:"",
    reportedReason: ""
};

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case ON_REPORT:
            return { ...state, isReportAdminVisible: true, reportedReason: action.payload.reportedReason,
                reportedUsername: action.payload.reportedUsername};
        default:
            return state;
    }
};