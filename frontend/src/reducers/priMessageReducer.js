import { PRI_MESSAGE } from '../actions/type';
import userEvent from "@testing-library/user-event";

const INTIAL_STATE = {
    message: null,
    sender: null
};

export default (state = INTIAL_STATE, action) => {
    console.log(action.sender);
    switch (action.type) {
        case PRI_MESSAGE:
            return { ...state, sender: action.sender, message: action.payload };
        default:
            return state;
    }
};