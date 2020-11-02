import {Menu, Tag, Popover, Button} from "antd";
import {CloseCircleOutlined, GroupOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Route} from "react-router-dom";
import RoomForm from "./roomForm";
import webSocket from "../websocket/Websocket";
import JoinedRoom from "./joinedRoom";

const {SubMenu} = Menu;

const ExitRoom = (props) => {
    const {joinedRooms} = props;
    return (
        <Menu mode="inline" selectedKeys = {['']}>
            <SubMenu title={<span><span><MinusCircleOutlined/></span>Exit</span>}>
                {joinedRooms.map(item => {
                    return (
                        <Menu.Item>{item}</Menu.Item>
                    );
                })
                }
            </SubMenu>
        </Menu>
    );
}
export default ExitRoom;