import {Menu, Tag, Popover, Button, Modal} from "antd";
import {CloseCircleOutlined, GroupOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Route} from "react-router-dom";
import CreateRoom from "./createRoom";
import webSocket from "../websocket/Websocket";
import JoinedRoom from "./joinedRoom";


const ExitAllRooms = () => {
    const onFinish = () => {
        webSocket.send(
            JSON.stringify({
                    command: "exitAllRoom",
                    body: {
                    }
                }
            )
        )
    };

    return (
        <Menu mode="inline" selectedKeys={['']} onClick={onFinish}>
            <Menu.Item><span><CloseCircleOutlined/></span>Exit All</Menu.Item>
        </Menu>
    );
}
export default ExitAllRooms;