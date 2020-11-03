import { SIGN_IN, SIGN_OUT } from '../actions/type';

const INTIAL_STATE = {
  isSignedIn: null,
  user: null,
  mesId: 0,
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      if (action.payload.isSignedIn === true)
        return { ...state, isSignedIn: true, user: action.payload.user, mesId: action.payload.mesId };
      else
        return { ...state, isSignedIn: false, user: null, mesId: action.payload.mesId };
    case SIGN_OUT:
      return { ...state, isSignedIn: null, user: null, mesId: action.payload.mesId };
    default:
      return state;
  }
};