import {React, useState} from "react";
import { Modal, Input} from "antd";
import webSocket from "../../websocket/Websocket";

const Message = (props) => {

    const [value, setValue] = useState("");
    const {userName, visible, setVisible} = props;
    const { TextArea } = Input;
    const handleOk = () => {
        webSocket.send(
            JSON.stringify({
                command: "privateMessage",
                body: {
                    name: userName,
                    info: value
                }
            })
        )
        setValue("");
        setVisible(false);
    }

    const onChange = ({ target: { value } }) => {
        setValue(value);
    }

    return (
        <Modal
            title={`To ${userName}`}
            visible={visible}
            onOk={handleOk}
            onCancel={() => {setValue(""); setVisible(false)}}
        >
            <TextArea value={value}
                   onChange={onChange}/>
        </Modal>
    )
}

export default Message;