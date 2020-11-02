import {Menu, Tag, Popover, Button} from "antd";
import {CloseCircleOutlined, GroupOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Route} from "react-router-dom";
import CreateRoomForm from "./createRoomForm";
import webSocket from "../websocket/Websocket";
import JoinedRoom from "./joinedRoom";

const {SubMenu} = Menu;

const ExitRoom = (props) => {
    const {joinedRooms, exitRoom} = props;
    return (
        <Menu mode="inline" onClick={(e) => {exitRoom(e.key)}}>
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