import {Menu, Tag, Popover, Button} from "antd";
import {CloseCircleOutlined, GroupOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Route} from "react-router-dom";
import CreateRoomForm from "./createRoomForm";
import webSocket from "../websocket/Websocket";
import JoinedRoom from "./joinedRoom";


const ExitAllRooms = (props) => {
    const {exitAll} = props;
    return (
        <Menu mode="inline" selectedKeys={['']} onClick={exitAll}>
            <Menu.Item><span><CloseCircleOutlined/></span>Exit All</Menu.Item>
        </Menu>
    );
}
export default ExitAllRooms;