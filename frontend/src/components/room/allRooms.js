import {Menu, Tag, Popover, Button} from "antd";
import {CloseCircleOutlined, GroupOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useState, useEffect} from "react";

const {SubMenu} = Menu;
const AllRooms = (props) => {
    const {allRooms, joinRoom} = props;
    return (
        <Menu mode="inline" onClick={(e) => {
            joinRoom(e.key)
        }}>
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