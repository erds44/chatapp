import {Menu, Tag, Popover, Button} from "antd";
import {CloseCircleOutlined, GroupOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useState, useEffect} from "react";

const {SubMenu} = Menu;
const AllRooms = (props) => {
    const {allRooms} = props;
    return (
        <Menu mode="inline">
            <SubMenu key="allRooms" title={<span><GroupOutlined/><span>All Rooms</span></span>}>
                {allRooms.map(item => {
                    return (
                        <Menu.Item>{item}</Menu.Item>
                    );
                })
                }
            </SubMenu>
        </Menu>
    );


}
export default AllRooms;