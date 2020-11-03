import {Menu, Tag, Popover, Button} from "antd";
import {CloseCircleOutlined, GroupOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useState, useEffect} from "react";

const {SubMenu} = Menu;
const JoinedRoom = (props) => {
    const {rooms} = props;
    return (
        <Menu mode="inline" selectedKeys = {['']}>
            <SubMenu title={<span><GroupOutlined/><span>Joined Rooms</span></span>}>
                {rooms.map(item => {
                    return (
                        <SubMenu key={item} title={item}>
                            <Menu.Item key="u1"><Tag color="magenta">Owner</Tag>User 1</Menu.Item>
                            <Menu.Item key="u2"><Tag color="green">Member</Tag>User 2</Menu.Item>
                            <Menu.Item key="u3"><Tag color="green">Member</Tag>User 3</Menu.Item>
                        </SubMenu>
                    );
                })
                }
            </SubMenu>
        </Menu>
    );


}
export default JoinedRoom;