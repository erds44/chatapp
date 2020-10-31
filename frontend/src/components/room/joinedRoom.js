import {Menu, Tag, Popover, Button} from "antd";
import {CloseCircleOutlined, GroupOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useState, useEffect} from "react";
import RoomForm from "./roomForm";
import webSocket from "../websocket/Websocket";

const {SubMenu} = Menu;
const JoinedRoom = ({rooms}) => {
    const [room, setRoom] = useState([])

    useEffect(() => {
        setRoom(rooms())
    }, [rooms])

    return (
        room.map(r => <SubMenu key={r} title={r}>
            <Menu.Item key="u1"><Tag color="magenta">Owner</Tag>User 1</Menu.Item>
            <Menu.Item key="u2"><Tag color="green">Member</Tag>User 2</Menu.Item>
            <Menu.Item key="u3"><Tag color="green">Member</Tag>User 3</Menu.Item>
        </SubMenu>)
    )

}
export default JoinedRoom;