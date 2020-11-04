import { message } from 'antd';
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import messageReducer from './messageReducer';
import userListReducer from './userListReducer';
import roomReducer from "./roomReducer";


export default combineReducers({
  login: loginReducer,
  message: messageReducer,
  userList: userListReducer,
  room: roomReducer,
});