import React, { useState, useEffect } from "react";
import { Row } from "antd";
import ChatMessage from "./ChatMessage";
import "./ChatMessages.css";

const ChatMessages = ({ inputMessages }) => {
  return (
    <article id={"chat-messages"}>
      {inputMessages &&
        inputMessages.map(message => {
          return (
            <Row className="message">
              <ChatMessage message={message} />
            </Row>
          );
        })}
    </article>
  );
};

export default ChatMessages;
