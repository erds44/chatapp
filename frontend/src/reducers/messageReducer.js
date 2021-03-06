import {
  ON_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  RECALL_MESSAGE, ON_MESSAGE_ERR
} from "../actions/type";

const INITIAL_STATE = {
  messages: {},
  err_msg: ""
};

export default function (state = INITIAL_STATE, action)  {
  switch (action.type) {
    case ON_MESSAGE_ERR: {
      return {
        err_msg: action.payload.err_msg,
        messages: {}
      };
    }
    case ON_MESSAGE: {
      const { messages } = state;
      const { id, text, time, sender, chatRoom, received } = action.payload;
      if (!messages[chatRoom]) {
        messages[chatRoom] = [];
      }
      messages[chatRoom].push({
        id,
        text,
        time,
        sender,
        received
      });
      return { ...state, messages: { ...messages } };
    }
    case DELETE_MESSAGE: {
      const { messages } = state;
      const { messageId, chatRoom } = action.payload;
      const newChatRoomMessages = messages[chatRoom].filter(
        m => m.id !== messageId
      );
      const newMessages = { ...messages };
      newMessages[chatRoom] = newChatRoomMessages;
      return {
        ...state,
        messages: newMessages
      };
    }
    case RECALL_MESSAGE: {
      const { messages } = state;
      const { messageId, chatRoom, recallTime } = action.payload;
      const newChatRoomMessages = messages[chatRoom].map(m => {
        if (m.id === messageId) {
          m.isRecalled = true;
          m.recallTime = recallTime;
          m.text = "";
        }
        return m;
      });
      const newMessages = { ...messages };
      newMessages[chatRoom] = newChatRoomMessages;
      return {
        ...state,
        messages: newMessages
      };
    }
    case EDIT_MESSAGE: {
      const { messages } = state;
      const { messageId, chatRoom, editedText } = action.payload;
      const newChatRoomMessages = messages[chatRoom].map(m => {
        if (m.id === messageId) {
          m.text = editedText;
        }
        return m;
      });
      const newMessages = { ...messages };
      newMessages[chatRoom] = newChatRoomMessages;
      return {
        ...state,
        messages: newMessages
      };
    }
    default:
      return state;
  }
};
