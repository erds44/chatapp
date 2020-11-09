import React, { useState } from "react";
import { Popover, Space, Row, Col, Input, Button } from "antd";
import "./Compose.css";
import { useDispatch, useSelector } from "react-redux";
import { ON_MESSAGE } from "../../../actions/type";
import * as uuid from "uuid";
import webSocket from "../../websocket/Websocket";
import { messageCensor } from "../../../helpers/util";
import { BAN_BROADCAST } from "../../room/report/constant";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { SmileOutlined  } from '@ant-design/icons';


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
            source: BAN_BROADCAST
          }
        })
      );
    } else {
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
      payload: {
        ...payload,
        received: true
      }
    });
    webSocket.send(
      JSON.stringify({
        command: "broadcast",
        body: payload
      })
    );
  };

  const [showEmojiPicker, setshowEmojiPicker] = useState(false);

  const toggleEmojiPicker = () => {
    setshowEmojiPicker(!showEmojiPicker)
  }

  const emojiHandler = (emoji) => {
    setTextAreaText(textAreaText + emoji.native);
  }

  const content = (
        <Picker set = 'google' perLine = {12} exclude = {['search','recent','flags','custom']} onSelect={emojiHandler}/>
  );

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
      <Space style = {{float:"right"}}>
        <Popover content={content}  trigger="click"
                 visible={showEmojiPicker}
                 onVisibleChange={toggleEmojiPicker}
        >
          <Button ><SmileOutlined /></Button>
        </Popover>
          <Button onClick={handleMessageSend}>Send</Button>
      </Space>


    </div>
  );
};

export default Compose;
