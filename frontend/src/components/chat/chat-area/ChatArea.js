import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Layout } from "antd";
import ChatMessages from "./ChatMessages";
import Compose from "./Compose";
import ChatAreaHeader from "./ChatAreaHeader";
import "./ChatArea.css";

const { Content, Footer, Header } = Layout;

const ChatArea = ({ chatRoom }) => {
  const messages = useSelector(state => {
    return state.message.messages;
  });

  return (
    <div id={"chat-area"}>
      <Layout>
        <Content>
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
