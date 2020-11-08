import React, { useState, useEffect } from "react";
import { Row, Input, Modal } from "antd";
import ChatMessage from "./ChatMessage";
import "./ChatMessages.css";
import { useDispatch, useSelector } from "react-redux";
import { EDIT_MESSAGE } from "../../../actions/type";
import webSocket from "../../websocket/Websocket";
import {messageCensor} from "../../../helpers/util";
import {BAN_BROADCAST} from "../../room/report/constant";
const { TextArea } = Input;

const ChatMessages = ({ inputMessages }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.login.user);
  const currentRoom = useSelector(state => state.room.currentRoom);
  const [modalVisible, setModalVisible] = useState(false);
  const [messageToEdit, setMessageToEdit] = useState("");

  const handleModalOK = () => {
    setModalVisible(false);
    const editMessageTextArea = document.getElementById(`editMessageTextArea`);

    if (!messageCensor(editMessageTextArea.value)) {
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
      return;
    }

    const payload = {
      messageId: messageToEdit.id,
      chatRoom: currentRoom,
      editedText: editMessageTextArea.value
    };
    dispatch({
      type: EDIT_MESSAGE,
      payload
    });
    webSocket.send(
      JSON.stringify({
        command: "editMessage",
        body: payload
      })
    );
  };

  const handleClickEdit = message => {
    setMessageToEdit(message);
    setModalVisible(true);
  };

  return (
    <article id={"chat-messages"}>
      {inputMessages &&
        inputMessages.map(message => {
          return (
            <Row className="message">
              <ChatMessage message={message} onClickEdit={handleClickEdit} />
            </Row>
          );
        })}
      <Modal
        title="Edit Message"
        visible={modalVisible}
        onOk={handleModalOK}
        onCancel={() => setModalVisible(false)}
      >
        <TextArea
          id={"editMessageTextArea"}
          rows={4}
          showCount={true}
          defaultValue={messageToEdit?.text}
          onPressEnter={handleModalOK}
        />
      </Modal>
    </article>
  );
};

export default ChatMessages;
