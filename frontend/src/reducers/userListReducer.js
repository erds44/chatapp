import { SETALLUSERS } from '../actions/type';

const INITIAL_STATE = {
  allUserList : []
}


export default (state =  INITIAL_STATE, action) => {
  switch (action.type) {
    case SETALLUSERS:
      return {...state, allUserList: action.payload}
    default:
      return state;
  }
}