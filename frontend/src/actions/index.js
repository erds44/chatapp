import {message} from 'antd';
import {SIGN_IN, SIGN_OUT, ON_MESSAGE, CREATE_ROOM, ROOM, ON_REPORT} from './type';

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
            case "login":
                dispatch({type: SIGN_IN, payload: {isSignedIn: true}});
                break;
            case "room":
                dispatch({
                    type: ROOM,
                    payload: {
                        request: data.request,
                        type: data.type,
                        msg: data.msg,
                        param1: data.param1,
                        param2: data.param2,
                        param3: data.param3,
                        param4: data.param4
                    }
                });
                break;
            case "report": 
                //console.log(data.msg);
                const body = JSON.parse(data.msg);
                //console.log(body);
                dispatch({ type: ON_REPORT, payload: {
                        reportedUsername: body.reportedUsername,
                        reportedReason: body.reportedReason,
                        reportedRoom: body.reportedRoom
                }});
                break;
            default:
                break;
        }
    };

