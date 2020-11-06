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
        for (let i = 0; i < joinedRooms.length; i++) {
            return (
                <SubMenu key={joinedRooms[i]} title={joinedRooms[i]}>
                    {userList[i].map(name => {
                        let color = (userList[i][0] === name) ? "magenta" : "green";
                        let tag = (userList[i][0] === name) ? "Admin" : "Member";
                        return <Menu.Item key={name}><Tag color={color}>{tag}</Tag>{name}
                            <Button type="text" danger onClick={() => {
                                report(joinedRooms[i], name)
                            }}>!</Button>
                        </Menu.Item>
                    })

                    }
                </SubMenu>
            )
        }
    }


    return (
        <Menu mode="inline" selectedKeys={['']}>
            <SubMenu title={<span><GroupOutlined/><span>Joined Rooms</span></span>}>
                {getRoomUserList()}
            </SubMenu>
        </Menu>
    );


}
export default JoinedRoom;