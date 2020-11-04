import {Menu, Tag, Popover, Button} from "antd";
import {CloseCircleOutlined, GroupOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useState, useEffect} from "react";

const {SubMenu} = Menu;
const JoinedRoom = (props) => {
    const {rooms} = props;
    return (
        <Menu mode="inline" selectedKeys={['']}>
            <SubMenu title={<span><GroupOutlined/><span>Joined Rooms</span></span>}>
                {
                    Object.entries(rooms).map(([key, value]) => {
                        return (
                            <SubMenu key={value} title={value[0]}>
                                {
                                    value[1].map(item => {
                                        if (value[1][0] === item) {
                                            return <Menu.Item key={item}><Tag color="magenta">Owner</Tag>{item}
                                            </Menu.Item>
                                        }
                                        return <Menu.Item key={item}><Tag color="green">Member</Tag>{item}</Menu.Item>
                                    })
                                }
                            </SubMenu>
                        )
                    })
                }
            </SubMenu>
        </Menu>
    );


}
export default JoinedRoom;