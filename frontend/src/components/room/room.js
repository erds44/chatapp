import {Menu, Tag, Popover, Button} from "antd";
import {CloseCircleOutlined, GroupOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Route} from "react-router-dom";
import RoomForm from "../roomForm/roomForm";
const {SubMenu} = Menu;

const Room = () => {
    const [rooms, setRooms] = useState([]);
    const [visible, setVisible] = useState(false);

    const handleClick = (e) => {
        if(e.key === "create") {
            setVisible(true);
        }
    }
    return (
        <>
            <Menu mode="inline" onClick={handleClick}>
                <Menu.Item key="create">
                    <RoomForm visible={visible} setVisible={setVisible}/>
                </Menu.Item>
                <SubMenu title={<span><span><MinusCircleOutlined/></span>Exit</span>}>
                    <Menu.Item key="7">Room 1</Menu.Item>
                </SubMenu>
                <Menu.Item><span><CloseCircleOutlined/></span>Exit All</Menu.Item>
                <SubMenu key="JoinedRooms" title={<span><GroupOutlined/><span>Joined Rooms</span></span>}>
                    <Menu.ItemGroup key="g2">
                        <SubMenu key="sub3" title="Room 1">
                            <Menu.Item key="u1"><Tag color="magenta">Owner</Tag>User 1</Menu.Item>
                            <Menu.Item key="u2"><Tag color="green">Member</Tag>User 2</Menu.Item>
                            <Menu.Item key="u3"><Tag color="green">Member</Tag>User 3</Menu.Item>
                        </SubMenu>
                    </Menu.ItemGroup>
                </SubMenu>
                <SubMenu key="allRooms" title={<span><GroupOutlined/><span>All Rooms</span></span>}>
                    <Menu.ItemGroup key="g2">
                        <Menu.Item key="room1">Room 1</Menu.Item>
                        <Menu.Item key="room2">Room 2</Menu.Item>
                        <Menu.Item key="room3">Room 3</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
            </Menu>
        </>
    )
}
export default Room;