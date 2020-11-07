import {Badge, Menu, Tag, Button, Dropdown, Col, Popover} from "antd";
import {GroupOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import webSocket from "../websocket/Websocket";
import {useDispatch} from "react-redux";
import {JOIN_ROOM} from "../../actions/type";


const {SubMenu} = Menu;
const JoinedRoom = (props) => {
    let keyId = 1;
    const dispatch = useDispatch();
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

    const block = (name) => {
        webSocket.send(
            JSON.stringify({
                    command: "block",
                    body: {
                        userName: name
                    }
                }
            )
        )

    }

    const getRemoveButton = (name, roomName, admin) => {
        if (name === userName || name === admin) return null;
        if (userName === admin) return <Menu.Item key={name + "remove" + keyId++}
                                                  onClick={() => forceToLeave(name, roomName)}>Remove</Menu.Item>
        return <Menu.Item key={name + "report" + keyId++} onClick={() => {
            report(roomName, name)
        }}>Report</Menu.Item>
    }

    const getBlockButton = (name) => {
        if (name !== userName) return <Menu.Item key={name + "block" + keyId++}
                                                 onClick={() => block(name)}>Block</Menu.Item>
        return null
    }

    const handleSelectedRoom = ({key}) => {
        dispatch({
            type: JOIN_ROOM,
            payload: key
        })
    }
    return (
        <Menu mode="inline" selectedKeys={['']}>
            <SubMenu title={<span><GroupOutlined/><span>Joined Rooms</span></span>}>
                {
                    joinedRooms.map((name, index) => {
                        return (

                                <SubMenu key={name} title={name} onTitleClick={handleSelectedRoom}>
                                    {userList[index].map(name => {
                                        let color = (userList[index][0] === name) ? "magenta" : "green";
                                        let tag = (userList[index][0] === name) ? "Admin" : "Member";
                                        return (
                                            <SubMenu key={name + keyId++}
                                                     title={<><Tag color={color}>{tag}</Tag>{name}</>}>
                                                {getRemoveButton(name, joinedRooms[index], userList[index][0])}
                                                {getBlockButton(name)}
                                            </SubMenu>
                                        )

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