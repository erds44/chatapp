import {message} from 'antd';
import {SIGN_IN, SIGN_OUT, ON_MESSAGE, CREATE_ROOM, RESET, ROOM, ON_REPORT, PRI_MESSAGE, SETALLUSERS} from './type';

var mesId = 0;

export const onMessage = (messages) =>
    dispatch => {
        const data = JSON.parse(messages.data);
        switch (data.section) {
            case "login":
                if (data.type === "err") {
                    dispatch({type: SIGN_IN, payload: {mesId: mesId++, isSignedIn: false, user: null, msg: data.msg}});
                } else {
                    dispatch({
                        type: SIGN_IN,
                        payload: {mesId: mesId++, isSignedIn: true, user: data.msg, msg: data.msg}
                    });
                }
                break;
            case "logout":
                dispatch({type: SIGN_OUT, payload: {mesId: mesId++, isSignedIn: false, user: null, msg: data.msg}});
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
                        param4: data.param4,
                        param5: data.param5
                    }
                });
                break;
            case "report":
                const body = JSON.parse(data.msg);
                dispatch({
                    type: ON_REPORT,
                    payload: {
                        reportedUsername: body.reportedUsername,
                        reportedReason: body.reportedReason,
                        reportedRoom: body.reportedRoom
                    }
                });
                break;
            case "message":
                const type = data.request;
                const payload = JSON.parse(data.msg);
                dispatch({ type, payload});
                break;
            case "privateMessage":
                if(data.request === "priMsg_feedback") {
                    dispatch({type: PRI_MESSAGE, payload: null, sender: null, feedback: data.msg});
                    break;
                }
                const sender = data.request;
                //const payload = JSON.parse(data.msg);
                dispatch({type: PRI_MESSAGE, payload: JSON.parse(data.msg), sender: sender, feedback: null});
                break;
            case "setallusers":
                dispatch({
                    type: SETALLUSERS,
                    payload: JSON.parse(data.msg)
                });
                break;
            default:
                break;
        }
    };

