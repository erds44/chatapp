import { message } from 'antd';
import {SIGN_IN, SIGN_OUT, ON_MESSAGE, ON_REPORT} from './type';

var mesId = 0;

export const onMessage = (messages) =>
  dispatch => {
    const data = JSON.parse(messages.data);
    if(data.request === "login") {
        if(data.type === "err") {
          dispatch({ type: SIGN_IN, payload: {mesId: mesId++, isSignedIn: false, user: null }});
        }
        else {
          dispatch({ type: SIGN_IN, payload: {mesId: mesId++, isSignedIn: true, user: data.user }});
        }
    }
    else if (data.request === "report") {
        const body = JSON.parse(data.body)
        dispatch({ type: ON_REPORT, payload: {reportedUsername: body.reportedUsername, reportedReason:body.reportedReason}});
    }
    else {  
        dispatch({ type: ON_MESSAGE, payload: messages.data });
    }
};