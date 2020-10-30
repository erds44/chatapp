import React from "react";
import "./ChatAreaHeader.css";

const ChatAreaHeader = ({ chatRoom, userCount }) => {
  return (
    <div id={"chat-area-header"}>
      <span id={"chat-area-header-room-name"}>{chatRoom}</span>
      <span id={"chat-area-header-user-count"}>{`  (${userCount})`}</span>
    </div>
  );
};

export default ChatAreaHeader;
