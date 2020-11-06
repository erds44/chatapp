import React, { useState, useEffect } from "react";
import { Row, Input, Modal } from "antd";
import ChatMessage from "./ChatMessage";
import "./ChatMessages.css";
import { useDispatch } from "react-redux";
import { EDIT_MESSAGE } from "../../../actions/type";
const { TextArea } = Input;

const ChatMessages = ({ inputMessages }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [messageToEdit, setMessageToEdit] = useState("");
  const selectedChatRoom = "CR1";

  const handleModalOK = () => {
    setModalVisible(false);
    const editMessageTextArea = document.getElementById(`editMessageTextArea`);
    dispatch({
      type: EDIT_MESSAGE,
      payload: {
        messageId: messageToEdit.id,
        chatRoom: selectedChatRoom,
        editedText: editMessageTextArea.value
      }
    });
  //  TODO @Xiao websocket
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
      <Modal title="Edit Message" visible={modalVisible} onOk={handleModalOK}>
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
