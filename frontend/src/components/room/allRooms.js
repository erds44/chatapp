import {Menu} from "antd";
import {LockOutlined} from "@ant-design/icons";
import {GroupOutlined} from "@ant-design/icons";
import React from "react";
import webSocket from "../websocket/Websocket";

const {SubMenu} = Menu;
const AllRooms = (props) => {
    const {allRooms, isPublic} = props;
    const onFinish = (values) => {
        webSocket.send(
            JSON.stringify({
                    command: "joinRoom",
                    body: {
                        name: values.key
                    }
                }
            )
        )
    };

    return (
        <Menu mode="inline"  onClick={(e) => {
            onFinish(e)
        }} defaultOpenKeys={['allRooms']} >
            <SubMenu key="allRooms" title={<span><GroupOutlined/><span>All Rooms</span></span>}>
                {
                    allRooms.map((name, index) => {
                        return (

                            <Menu.Item key={name}><span>{isPublic[index] === "false" ?
                                <span><LockOutlined/></span> : null}{name}</span></Menu.Item>
                        );
                    })

                }
            </SubMenu>
        </Menu>
    );


}
export default AllRooms;