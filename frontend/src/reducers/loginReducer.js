import { SIGN_IN, SIGN_OUT } from '../actions/type';
import userEvent from "@testing-library/user-event";

const INTIAL_STATE = {
  isSignedIn: null,
  user: null,
  mesId: 0,
  msg: null
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      console.log("sign in " , state.user)
      if (action.payload.isSignedIn === true)
        return { ...state, isSignedIn: true, user: action.payload.user, mesId: action.payload.mesId, msg: action.payload.msg };
      else
        return { ...state, isSignedIn: false, user: null, mesId: action.payload.mesId, msg: action.payload.msg};
    case SIGN_OUT:
      return { ...state, isSignedIn: null, user: null, mesId: action.payload.mesId, msg: action.payload.msg };
    default:
      return state;
  }
};