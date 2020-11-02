import React from "react";
import { Row, Col, Menu, Dropdown, Button, Avatar } from "antd";
import moment from "moment";
import "./ChatMessage.css";
import colorHelper from "../../../helpers/color-user-helper";

const ChatMessage = ({
  message,
  currentUser,
  onMessageRecall,
  onMessageDelete,
  onMessageEdit
}) => {
  const { id: messageId, text, time, sender } = message;
  // const isMyMessage = currentUser.id === message.userId;
  const isMyMessage = true;
  const operationForMyMessage = ["edit", "delete", "recall"];
  const operationForOthersMessage = ["report"];
  const handleMenuClick = event => {
    if (!event || !event.key) {
      return;
    }
    switch (event.key) {
      case "edit": {
        break;
      }
      case "delete": {
        onMessageDelete(messageId);
        break;
      }
      case "recall": {
        break;
      }
      case "report": {
        break;
      }
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      {isMyMessage &&
        operationForMyMessage.map(operation => {
          return <Menu.Item key={operation}>{operation}</Menu.Item>;
        })}
      {!isMyMessage &&
        operationForOthersMessage.map(operation => {
          return <Menu.Item key={operation}>{operation}</Menu.Item>;
        })}
    </Menu>
  );

  const handleMouseEnter = () => {
    const dropDownElement = document.getElementById(`${messageId}-dropdown`);
    if (!dropDownElement) {
      return;
    }
    dropDownElement.style.visibility = "visible";
    dropDownElement.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    const dropDownElement = document.getElementById(`${messageId}-dropdown`);
    if (!dropDownElement) {
      return;
    }
    dropDownElement.style.visibility = "hidden";
    dropDownElement.style.opacity = "0";
  };

  const getDisplayName = sender => {
    return sender.split(" ").map(name => name[0]);
  };

  return (
    <Row>
      <Col span={1} className="avatar-container">
        <Avatar
          style={{
            backgroundColor: colorHelper(sender),
            verticalAlign: "middle"
          }}
          size="large"
          gap={1}
        >
          {getDisplayName(sender)}
        </Avatar>
      </Col>
      <Col span={23}>
        <Row
          className={`${messageId ?? ""} message-wrapper`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Col span={22}>
            <Row className="message-header">
              <Col className="message-sender">{sender}</Col>
              <Col className="message-time">{time}</Col>
            </Row>
            <Row>
              <Col className="message-text">{text}</Col>
            </Row>
          </Col>
          <Col
            span={2}
            id={`${messageId}-dropdown`}
            className={"message-dropdown"}
          >
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button>...</Button>
            </Dropdown>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default ChatMessage;