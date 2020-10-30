import React, { useState, useEffect} from "react";
import { Row, Layout } from "antd";
import ChatMessages from "./ChatMessages";
import Compose from "./Compose";
import ChatAreaHeader from "./ChatAreaHeader";
import "./ChatArea.css";

const { Content, Footer, Header } = Layout;

const ChatArea = ({ inputMessages, chatRoom, onMessageDelete }) => {
  const [messages, setMessages] = useState(inputMessages);

  useEffect(() => {
    if (inputMessages) {
      setMessages(inputMessages);
    }
  }, [inputMessages]);

  const handleMessageDelete = messageId => {
    onMessageDelete(messageId, chatRoom);
  };

  return (
    <div id={"chat-area"}>
      <Layout>
        <Content>
          <ChatMessages
            inputMessages={messages}
            onMessageDelete={handleMessageDelete}
          />
        </Content>
        <Footer>
          <Compose />
        </Footer>
      </Layout>
    </div>
  );
};

export default ChatArea;
