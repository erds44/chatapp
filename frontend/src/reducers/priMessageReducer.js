import {PRI_MESSAGE, RESET, SIGN_OUT} from '../actions/type';
import userEvent from "@testing-library/user-event";

const INTIAL_STATE = {
    message: null,
    sender: null,
    feedback: null
};

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case PRI_MESSAGE:
            return { ...state, sender: action.sender, message: action.payload, feedback: action.feedback };
        case SIGN_OUT:
            return {...state, ...INTIAL_STATE};
        default:
            return state;
    }
};