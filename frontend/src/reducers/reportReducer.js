import {ON_REPORT} from '../actions/type';

const INTIAL_STATE = {
    visible: false,
    reason: ""
};

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case ON_REPORT:
            return { ...state, visible: true, reason: action.payload.reason};
        default:
            return state;
    }
};