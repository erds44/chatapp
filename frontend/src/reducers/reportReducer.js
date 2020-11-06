import {ON_REPORT} from '../actions/type';

const INITIAL_STATE = {
    isReportAdminVisible: false,
    reportedUsername:"",
    reportedReason: "",
    reportedRoom:""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_REPORT:
            return { ...state, isReportAdminVisible: true, reportedReason: action.payload.reportedReason,
                reportedUsername: action.payload.reportedUsername, reportedRoom: action.payload.reportedRoom};
        default:
            return state;
    }
};