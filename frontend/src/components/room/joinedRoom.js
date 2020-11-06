import {Menu, Tag, Button} from "antd";
import {GroupOutlined} from "@ant-design/icons";
import React, {useState} from "react";


const {SubMenu} = Menu;
const JoinedRoom = (props) => {
    const {joinedRooms, userList, setReport} = props;
    const report = (reportRoom, reportName) => {
        setReport({visible: true, reportRoom: reportRoom, reportName: reportName})
    }

    const getRoomUserList = () => {

        joinedRooms.map((roomName, index) => {
                console.log("roomName: " + roomName);
                return (
                    <SubMenu key={roomName} title={roomName}>
                        {userList[index].map(name => {
                            console.log("name: " + name);
                            let color = (userList[index][0] === name) ? "magenta" : "green";
                            let tag = (userList[index][0] === name) ? "Admin" : "Member";
                            return (
                                <Menu.Item key={name}><Tag color={color}>{tag}</Tag>{name}
                                    <Button type="text" danger onClick={() => {
                                        report(joinedRooms[index], name)
                                    }}>!</Button>
                                </Menu.Item>
                            )
                        })

                        }
                    </SubMenu>
                )
            }
        )


    }
    // const getRoomUserList = () => {
    //
    //     joinedRooms.forEach((roomName, index) => {
    //
    //             return (
    //                 <Menu.Item>{roomName}</Menu.Item>
    //             )
    //         }
    //     )
    //
    //
    // }


    return (
        <Menu mode="inline" selectedKeys={['']}>
            <SubMenu title={<span><GroupOutlined/><span>Joined Rooms</span></span>}>
                {
                    joinedRooms.map((name, index) => {
                        console.log(index);
                        return (
                            <SubMenu key={name} title={name}>
                                <Menu.Item key={name}>{name}</Menu.Item>
                            </SubMenu>
                        )
                    })
                }
            </SubMenu>
        </Menu>
    );


}
export default JoinedRoom;