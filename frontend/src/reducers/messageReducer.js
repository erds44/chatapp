import { ON_MESSAGE } from '../actions/type';

// const INTIAL_STATE = {
//   messages: ""
// };

export default (state = '', action) => {
  switch (action.type) {
    case ON_MESSAGE:
        return { ...state, messages: action.payload.data };
    default:
      return state;
  }
};