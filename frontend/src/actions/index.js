import {message} from 'antd';
import {SIGN_IN, SIGN_OUT, ON_MESSAGE, CREATE_ROOM, ROOM} from './type';

var mesId = 0;

export const onMessage = (messages) =>
    dispatch => {
        const data = JSON.parse(messages.data);
        // if (data.request === "login") {
        //     if (data.type === "err") {
        //         dispatch({type: SIGN_IN, payload: {mesId: mesId++, isSignedIn: false, user: null}});
        //     } else {
        //         dispatch({type: SIGN_IN, payload: {mesId: mesId++, isSignedIn: true, user: data.user}});
        //     }
        // } else if (data.request === "createRoom") {
        //     dispatch({type: CREATE_ROOM, payload: {type: data.type, msg: data.msg, body: data.body}});
        // } else {
        //     dispatch({type: ON_MESSAGE, payload: messages.data});
        // }
        switch (data.section) {
            case "room":
                dispatch({
                    type: ROOM,
                    payload: {request: data.request, type: data.type, msg: data.msg, body: data.body}
                });
                break;
            default:
                break;
        }
    };