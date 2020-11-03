import {Menu, Tag, Popover, Button, Modal} from "antd";
import {CloseCircleOutlined, GroupOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Route} from "react-router-dom";
import CreateRoom from "./createRoom";
import webSocket from "../websocket/Websocket";
import JoinedRoom from "./joinedRoom";


const ExitAllRooms = (props) => {
    const {exitAll} = props;
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

    // webSocket.onmessage = message => {
    //     let res = JSON.parse(message.data);
    //     if (res.request === "exitAllRoom") {
    //         Modal.success({
    //             content: res.body
    //         })
    //     }
    //     exitAll();
    // }
    return (
        <Menu mode="inline" selectedKeys={['']} onClick={onFinish}>
            <Menu.Item><span><CloseCircleOutlined/></span>Exit All</Menu.Item>
        </Menu>
    );
}
export default ExitAllRooms;