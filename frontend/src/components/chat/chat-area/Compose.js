import React from "react";
import { Row, Col, Input, Button } from "antd";
import "./Compose.css";
import { useDispatch, useSelector } from "react-redux";
import { ON_MESSAGE } from "../../../actions/type";
import * as uuid from "uuid";
const { TextArea } = Input;

const Compose = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.login.user);
  const selectedChatroom = 'CR1';
  const handleMessageSend = () => {
    const composeTextArea = document.getElementById(`compose-textarea`);
    if (!composeTextArea.value) {
      return;
    }
    dispatch({
      type: ON_MESSAGE,
      payload: {
        chatRoom: selectedChatroom,
        text: composeTextArea.value,
        id: uuid.v4(),
        time: new Date().getTime(),
        sender: currentUser?.name
      }
    });
    // TODO @Xiao web socket
  };
  return (
    <div id={"compose"}>
      <Row>
        <TextArea
          id={"compose-textarea"}
          rows={4}
          showCount={true}
          onPressEnter={handleMessageSend}
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
