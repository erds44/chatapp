import {ROOM} from "../actions/type";
import {act} from "@testing-library/react";

const INTIAL_STATE = {
    request: null,
    type: null,
    msg: null,
    body: null
};

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case ROOM:
            return {...state, request: action.payload.request, type: action.payload.type, msg: action.payload.msg, body: action.payload.body};
        default:
            return state;
    }
};
