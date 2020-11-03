import {Menu, Tag, Popover, Button, Modal} from "antd";
import {CloseCircleOutlined, GroupOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Route} from "react-router-dom";
import CreateRoom from "./createRoom";
import webSocket from "../websocket/Websocket";
import JoinedRoom from "./joinedRoom";

const {SubMenu} = Menu;

const ExitRoom = (props) => {
    const {joinedRooms, exitRoom} = props;
    const [room, setRoom] = useState();
    const onFinish = (values) => {
        webSocket.send(
            JSON.stringify({
                    command: "exitRoom",
                    body: {
                        name: values.key
                    }
                }
            )
        )
        setRoom(values.key);
    };

    // webSocket.onmessage = message => {
    //     let res = JSON.parse(message.data);
    //     if (res.request === "exitRoom") {
    //         Modal.success({
    //             content: res.body
    //         })
    //     }
    //     exitRoom(room);
    // }

    return (
        // <Menu mode="inline" onClick={(e) => {exitRoom(e.key)}}>
        <Menu mode="inline" onClick={(e) => {
            onFinish(e)
        }}>
            <SubMenu title={<span><span><MinusCircleOutlined/></span>Exit</span>}>
                {joinedRooms.map(item => {
                    return (
                        <Menu.Item key={item}>{item}</Menu.Item>
                    );
                })
                }
            </SubMenu>
        </Menu>
    );
}
export default ExitRoom;