import React, { useState } from "react";
import { Row, Col, Input, Button } from "antd";
import "./Compose.css";
import { useDispatch, useSelector } from "react-redux";
import { ON_MESSAGE } from "../../../actions/type";
import * as uuid from "uuid";
import webSocket from "../../websocket/Websocket";
const { TextArea } = Input;

const Compose = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.login.user);
  const currentRoom = useSelector(state => state.room.currentRoom);
  const [textAreaText, setTextAreaText] = useState("");
  const handleMessageSend = () => {
    if (!textAreaText) {
      return;
    }

    if (!messageCensor(textAreaText)) {
        webSocket.send(
            JSON.stringify({
                  command: "ban",
                  body: {
                    username: currentUser.trim(),
                    room: currentRoom.trim(),
                    isViaReport: false
                  }
                }
            )
        );
    }
    else {
        sendMessage();
    }

    setTextAreaText("");
  };
  const handleMessageChange = event => {
      setTextAreaText(event.target.value);
  };

  const sendMessage = () => {
      const payload = {
        chatRoom: currentRoom,
        text: textAreaText,
        id: uuid.v4(),
        time: new Date().getTime(),
        sender: currentUser
      };
      dispatch({
        type: ON_MESSAGE,
        payload
      });
      webSocket.send(
          JSON.stringify({
            command: "broadcast",
            body: payload
          })
      );
  }
  const messageCensor = (content) => {
    return !content.toLowerCase().includes("hate");
  }
  return (
    <div id={"compose"}>
      <Row>
        <TextArea
          allowClear={true}
          id={"compose-textarea"}
          rows={4}
          // defaultValue={""}
          value={textAreaText}
          showCount={true}
          onPressEnter={handleMessageSend}
          onChange={handleMessageChange}
        />
      </Row>
      <Row>
        <Col span={3} offset={21}>
          <Button onClick={handleMessageSend}>Send</Button>
        </Col>
      </Row>
    </div>
  );
};

export default Compose;
