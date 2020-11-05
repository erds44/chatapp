import {Menu, Tag, Button} from "antd";
import {GroupOutlined} from "@ant-design/icons";
import React, {useState} from "react";


const {SubMenu} = Menu;
const JoinedRoom = (props) => {
    const {rooms, setReport} = props;
    const report = (reportRoom, reportName) => {
        setReport({visible: true, reportRoom: reportRoom, reportName: reportName})
    }

    return (
        <Menu mode="inline" selectedKeys={['']}>
            <SubMenu title={<span><GroupOutlined/><span>Joined Rooms</span></span>}>
                {
                    Object.entries(rooms).map(([key, value]) => {
                        return (
                            <SubMenu key={value[0]} title={value[0]}>
                                {
                                    value[1].map(item => {
                                        if (value[1][0] === item) {
                                            return <Menu.Item key={item}><Tag color="magenta">Owner</Tag>{item}
                                                <Button type="text" danger onClick={() => {
                                                    report(value[0], item)
                                                }}>!</Button>
                                            </Menu.Item>
                                        }
                                        return <Menu.Item key={item}><Tag color="green">Member</Tag>{item}
                                            <Button type="text" danger onClick={() => {
                                                report(value[0], item)
                                            }}>!</Button>
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