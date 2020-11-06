import {Menu, Tag, Button} from "antd";
import {GroupOutlined} from "@ant-design/icons";
import React, {useState} from "react";


const {SubMenu} = Menu;
const JoinedRoom = (props) => {
    const {joinedRooms, userList, userName, setReport} = props;
    const report = (reportRoom, reportName) => {
        setReport({visible: true, reportRoom: reportRoom, reportName: reportName})
    }

    const getButton = (name, roomName, admin) => {
        console.log("current name: " + name);
        console.log("admin name: " + admin);
        console.log("username: " + userName);


        if (name === userName || name === admin) return null;
        return <Button type="text" danger onClick={() => {
            report(roomName, name)
        }}>{userName === admin ? "Ban" : "Report"}</Button>
    }


    return (
        <Menu mode="inline" selectedKeys={['']}>
            <SubMenu title={<span><GroupOutlined/><span>Joined Rooms</span></span>}>
                {
                    joinedRooms.map((name, index) => {
                        return (
                            <SubMenu key={name} title={name}>
                                {userList[index].map(name => {
                                    let color = (userList[index][0] === name) ? "magenta" : "green";
                                    let tag = (userList[index][0] === name) ? "Admin" : "Member";
                                    return <Menu.Item key={name}><Tag color={color}>{tag}</Tag>{name}
                                        {getButton(name, joinedRooms[index], userList[index][0])}
                                    </Menu.Item>

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