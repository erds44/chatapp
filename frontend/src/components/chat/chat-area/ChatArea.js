import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Layout } from "antd";
import ChatMessages from "./ChatMessages";
import Compose from "./Compose";
import "./ChatArea.css";

const { Content, Footer, Header } = Layout;

const ChatArea = ({ chatRoom }) => {
  const messages = useSelector(state => {
    return state.message.messages;
  });
  const [userScrolled, setUserScrolled] = useState(false);
  useEffect(() => {
    const chatAreaContent = document.querySelector("#chat-area-content");
    if (
      chatAreaContent.scrollTop >
      chatAreaContent.scrollHeight - 1.5 * chatAreaContent.clientHeight
    ) {
      chatAreaContent.scrollTop =
        chatAreaContent.scrollHeight - chatAreaContent.clientHeight;
    }
  }, [messages]);

  return (
    <div id={"chat-area"}>
      <Layout>
        <Content id={"chat-area-content"}>
          <ChatMessages inputMessages={messages[chatRoom]} />
        </Content>
        <Footer>
          <Compose />
        </Footer>
      </Layout>
    </div>
  );
};

export default ChatArea;
