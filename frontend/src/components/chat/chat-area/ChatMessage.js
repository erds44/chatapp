import React from "react";
import { Row, Col, Menu, Dropdown, Button, Avatar } from "antd";
import moment from "moment";
import "./ChatMessage.css";
import colorHelper from "../../../helpers/color-user-helper";
import { useSelector, useDispatch } from "react-redux";
import {
  DELETE_MESSAGE,
  RECALL_MESSAGE,
  EDIT_MESSAGE
} from "../../../actions/type";
import webSocket from "../../websocket/Websocket";
import { BAN_BROADCAST } from "../../room/report/constant";
import Interweave from 'interweave';
import { UrlMatcher } from 'interweave-autolink';

const ChatMessage = ({ message, onClickEdit }) => {
  const dispatch = useDispatch();
  const {
    id: messageId,
    text,
    time,
    sender,
    isRecalled,
    recallTime,
    received
  } = message;

  const currentUser = useSelector(state => state.login.user);
  const chatRoom = useSelector(state => state.room.currentRoom);
  const userList = useSelector(state => state.room.userList);
  const roomState = useSelector(state => state.room);
  const roomAdmin = useSelector(state => {
    if (!state.room.userList || !state.room.joinedRoom || !state.room.userList[state.room.joinedRoom.indexOf(chatRoom)]) {
      return null;
    }
    return state.room.userList[state.room.joinedRoom.indexOf(chatRoom)][0];
  });
  const isOwnMessage = currentUser === message.sender;
  const isAdmin = currentUser === roomAdmin;
  const isAdminMessage = sender === roomAdmin;
  const getOperationsForMessage = (isAdmin, isOwnMessage) => {
    if (isOwnMessage) {
      return ["edit", "delete", "recall"];
    }
    if (isAdmin) {
      return ["delete"];
    }
    return [];
  };
  const handleMenuClick = event => {
    if (!event || !event.key) {
      return;
    }
    switch (event.key) {
      case "edit": {
        onClickEdit(message);
        break;
      }
      case "delete": {
        dispatch({
          type: DELETE_MESSAGE,
          payload: {
            messageId,
            chatRoom
          }
        });
        webSocket.send(
          JSON.stringify({
            command: "deleteMessage",
            body: {
              messageId,
              chatRoom
            }
          })
        );
        break;
      }
      case "recall": {
        dispatch({
          type: RECALL_MESSAGE,
          payload: {
            messageId,
            chatRoom
          }
        });
        webSocket.send(
          JSON.stringify({
            command: "recallMessage",
            body: {
              messageId,
              chatRoom,
              recallTime: new Date().getTime()
            }
          })
        );
        break;
      }
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      {getOperationsForMessage(isAdmin, isOwnMessage).map(operation => {
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
    return sender.split("_").map(name => name[0]);
  };

  const getRecallText = (sender, recallTime) => {
    return `******* This message was recalled at ${moment(recallTime).format(
      "MMM DD hh:mm"
    )} *******`;
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
              <Col className="message-sender">
                {(isOwnMessage && "ME") || sender}{" "}
                {isAdminMessage && " (admin)"}
              </Col>
              <Col className="message-time">
                {!isRecalled && moment(time).format("ddd MMM DD hh:mm:ss")}
                {received && " (received)"}
              </Col>
            </Row>
            <Row>
              <Col className="message-text">
                <Interweave
                    content={(!isRecalled && text) || getRecallText(sender, recallTime)}
                    matchers={[new UrlMatcher('url')]}
                />
              </Col>
            </Row>
          </Col>
          <Col
            span={2}
            id={`${messageId}-dropdown`}
            className={"message-dropdown"}
          >
            {!isRecalled && (isOwnMessage || isAdmin) && (
              <Dropdown overlay={menu} placement="bottomLeft">
                <Button>...</Button>
              </Dropdown>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default ChatMessage;
