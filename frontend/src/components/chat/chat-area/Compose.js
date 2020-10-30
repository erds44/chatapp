import React from "react";
import { Row, Col, Input, Button } from "antd";
import "./Compose.css";
const { TextArea } = Input;

const Compose = ({ messageForEdit = null, handleMessageSend }) => {
  const onMessageSend = value => {
    handleMessageSend(value);
  };
  return (
    <div id={"compose"}>
      <Row>
        <TextArea
          className="textarea"
          rows={4}
          showCount={true}
          onPressEnter={onMessageSend}
        />
      </Row>
      <Row>
        <Col span={3} offset={21}>
          <Button onClick={onMessageSend}>Send</Button>
        </Col>
      </Row>
    </div>
  );
};

export default Compose;
