import {Menu, Tag, Popover, Button, Modal} from "antd";
import {CloseCircleOutlined, GroupOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Route} from "react-router-dom";
import CreateRoom from "./createRoom";
import webSocket from "../websocket/Websocket";
import JoinedRoom from "./joinedRoom";

const {SubMenu} = Menu;

const ExitRoom = (props) => {
    const {joinedRooms} = props;
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
    };
    return (
        <Menu mode="inline" onClick={(e) => {
            onFinish(e)
        }}>
            <SubMenu title={<span><span><MinusCircleOutlined/></span>Exit</span>}>
                {
                    Object.entries(joinedRooms).map(([key, value]) => {
                      return(
                          <Menu.Item key={value[0]}>{value[0]}</Menu.Item>
                      )
                    })
                }
            </SubMenu>
        </Menu>
    );
}
export default ExitRoom;