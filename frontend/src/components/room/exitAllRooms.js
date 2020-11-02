import {Menu, Tag, Popover, Button} from "antd";
import {CloseCircleOutlined, GroupOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Route} from "react-router-dom";
import RoomForm from "./roomForm";
import webSocket from "../websocket/Websocket";
import JoinedRoom from "./joinedRoom";


const ExitAllRooms = () => {
    return (
        <Menu mode="inline" selectedKeys = {['']}>
            <Menu.Item><span><CloseCircleOutlined/></span>Exit All</Menu.Item>
        </Menu>
    );
}
export default ExitAllRooms;