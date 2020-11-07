import React from "react";
import { Row, Col, Input, Button } from "antd";
import "./Compose.css";
import { useDispatch, useSelector } from "react-redux";
import { ON_MESSAGE } from "../../../actions/type";
import * as uuid from "uuid";
import webSocket from "../../websocket/Websocket";
const { TextArea } = Input;

const Compose = () => {
  const dispatch = useDispatch();
  // const currentUser = useSelector(state => state.login.user);
  const currentUser = "Xiao Xia";
  const selectedChatroom = "CR1";
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
        sender: currentUser
      }
    });
    // TODO @Xiao web socket
    webSocket.send(
        JSON.stringify({
              command: "createRoom",
              body: {
                name: values.name,
                interests: values.interest
              }
            }
        )
    )

    composeTextArea.value = null;
    console.log(composeTextArea.value)
  };
  console.log(document.getElementById(`compose-textarea`)?.value)
  return (
    <div id={"compose"}>
      <Row>
        <TextArea
          id={"compose-textarea"}
          rows={4}
          defaultValue={""}
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
