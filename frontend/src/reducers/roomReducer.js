import {ROOM} from "../actions/type";
import {act} from "@testing-library/react";

const INTIAL_STATE = {
    request: null,
    type: null,
    msg: null,
    param1: null,
    param2: null,
    param3: null
};

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case ROOM:
            return {
                request: action.payload.request,
                type: action.payload.type,
                msg: action.payload.msg,
                param1: action.payload.param1,
                param2: action.payload.param2,
                param3: action.payload.param3
            };
        default:
            return state;
    }
};
