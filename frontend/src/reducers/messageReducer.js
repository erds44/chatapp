import {
  ON_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  RECALL_MESSAGE
} from "../actions/type";

const INITIAL_STATE = {
  messages: {
    CR1: [
      {
        id: '1',
        sender: "Xiao Xia",
        text: "This is the first message for chat room 1",
        time: new Date("2020-10-29 08:00:00").getTime()
      },
      {
        id: '2',
        sender: "Zhijian Yao",
        text: "This is the second message for chat room 1",
        time: new Date("2020-10-29 08:05:00").getTime()
      },
      {
        id: '3',
        sender: "Weiwei Zhou",
        text: "This is the third message for chat room 1",
        time: new Date("2020-10-29 08:15:30").getTime()
      }
    ]
  }
};

export default function (state = INITIAL_STATE, action)  {
  console.log(action.type, action.payload);
  // messageId format: CR1@3
  switch (action.type) {
    case ON_MESSAGE: {
      const { messages } = state;
      const { id, text, time, sender, chatRoom } = action.payload;
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
