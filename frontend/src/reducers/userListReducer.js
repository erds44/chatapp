import { ON_MESSAGE } from '../actions/type';

export default (state = [], action) => {
  switch (action.type) {
    // case ON_MESSAGE:
    //     return { ...state, messages: action.payload.data };
    default:
      return state;
  }
};