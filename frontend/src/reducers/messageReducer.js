import {
  ON_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  RECALL_MESSAGE
} from "../actions/type";

const INITIAL_STATE = {
  messages: {}
};

export default function (state = INITIAL_STATE, action)  {
  console.log(action.type, action.payload);
  switch (action.type) {
    case ON_MESSAGE: {
      const { messages } = state;
      const { id, text, time, sender, chatRoom } = action.payload;
      if (!messages[chatRoom]) {
        messages[chatRoom] = [];
      }
      messages[chatRoom].push({
        id,
        text,
        time,
        sender
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
      const { messageId, chatRoom } = action.payload;
      const newChatRoomMessages = messages[chatRoom].map(m => {
        if (m.id === messageId) {
          m.isRecalled = true;
        }
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
