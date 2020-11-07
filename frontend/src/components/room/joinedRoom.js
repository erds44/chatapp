import {Menu, Tag, Button} from "antd";
import {GroupOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import webSocket from "../websocket/Websocket";


const {SubMenu} = Menu;
const JoinedRoom = (props) => {
    const {joinedRooms, userList, userName, setReport} = props;
    const report = (reportRoom, reportName) => {
        setReport({visible: true, reportRoom: reportRoom, reportName: reportName})
    }
    const forceToLeave = (name, room) => {
        webSocket.send(
            JSON.stringify({
                    command: "forceToLeave",
                    body: {
                        userName: name,
                        roomName: room
                    }
                }
            )
        )
    };

    const getButton = (name, roomName, admin) => {
        if (name === userName || name === admin) return null;
        if (userName === admin) return <Button type="text" danger onClick={() => forceToLeave(name, roomName)}>Remove</Button>
        return <Button type="text" danger onClick={() => {report(roomName, name)}}>Report</Button>
    }


    return (
        <Menu mode="inline" selectedKeys={['']}>
            <SubMenu title={<span><GroupOutlined/><span>Joined Rooms</span></span>}>
                {console.log(joinedRooms)}
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