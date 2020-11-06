import {ROOM} from "../actions/type";
import {act} from "@testing-library/react";

const INTIAL_STATE = {
    request: null,
    type: null,
    msg: null,
    joinedRoom: [],
    userList: [[]],
    allRooms: []
};

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case ROOM:
            console.log("in user!!!")
            return {
                request: action.payload.request,
                type: action.payload.type,
                msg: action.payload.msg,

                joinedRoom: parse(action.payload.param1),
                userList: parseNestedList(action.payload.param1, action.payload.param2),
                allRooms: parse(action.payload.param3)
            };
        default:
            return state;
    }
};

const parse = (value)=>{
    if (value) {
        let v = value.substring(1, value.length - 1);
        return v.split(",");
    }
}

const parseNestedList = (param1, value) =>{
    console.log("before nest: " + value);
    if(value) {
        let length = parse(param1).length;
        let list = []
        let v = value.substring(1, value.length - 1)
        for(let i = 0; i < length; i++){
            let start = v.indexOf("[");
            let end = v.indexOf("]");
            let ele = v.substring(start + 1, end).split(",");
            list.push(ele);
            v = v.substring(end + 1);
        }
        console.log("after: " + list);
        return list;
    }
}


