import React, { useState, useEffect } from "react";
import { Row } from "antd";
import ChatMessage from "./ChatMessage";
import "./ChatMessages.css";

const ChatMessages = ({ inputMessages, onMessageDelete }) => {
  const [messages, setMessages] = useState(inputMessages);
  useEffect(() => {
    if (inputMessages) {
      setMessages(inputMessages);
    }
  }, [inputMessages]);
  return (
    <article id={"chat-messages"}>
      {messages &&
        messages.map(message => {
          return (
            <Row className="message">
              <ChatMessage
                message={message}
                onMessageDelete={onMessageDelete}
              />
            </Row>
          );
        })}
    </article>
  );
};

export default ChatMessages;
