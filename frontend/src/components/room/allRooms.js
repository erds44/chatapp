import {Menu, Tag, Popover, Button} from "antd";
import {CloseCircleOutlined, GroupOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useState, useEffect} from "react";
import webSocket from "../websocket/Websocket";

const {SubMenu} = Menu;
const AllRooms = (props) => {
    const {allRooms} = props;
    const onFinish = (values) => {
        webSocket.send(
            JSON.stringify({
                    command: "joinRoom",
                    body: {
                        name:values.key.replace(' ','')
                    }
                }
            )
        )
    };


    return (
        <Menu mode="inline" onClick={(e) => {onFinish(e)}}>
            <SubMenu key="allRooms" title={<span><GroupOutlined/><span>All Rooms</span></span>}>
                {allRooms.map(item => {
                    return (
                        <Menu.Item key={item}>{item}</Menu.Item>
                    );
                })
                }
            </SubMenu>
        </Menu>
    );


}
export default AllRooms;