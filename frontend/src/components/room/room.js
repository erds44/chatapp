import {Menu} from "antd";
import React, {useState} from "react";
import RoomForm from "./roomForm";
import JoinedRoom from "./joinedRoom";
import ExitRoom from "./exitRoom";
import ExitAllRooms from "./exitAllRooms";
import AllRooms from "./allRooms";

const Room = () => {
    const [joinedRooms, setJoinedRooms] = useState(["room1"]);
    const [allRooms, setAllRooms] = useState(["room1", "room2", "room3"]);
    const [visible, setVisible] = useState(false);

    // webSocket.onmessage = message =>{
    //     let res = JSON.parse(message.data);
    //     if(res.command === "login"){
    //         if(res.type === "err"){
    //             handleErr();
    //         }else{
    //             // go to chatroom page
    //         }
    //     }
    // }

    const handleClick = (e) => {
        if (e.key === "create") {
            setVisible(true);
        }
    }
    return (

        <Menu mode="inline" onClick={handleClick} selectedKeys={['']}>
            <Menu.Item key="create">
                <RoomForm visible={visible} setVisible={setVisible}/>
            </Menu.Item>
            <ExitRoom joinedRooms={joinedRooms}/>
            <ExitAllRooms/>
            <JoinedRoom rooms={joinedRooms}/>
            <AllRooms allRooms={allRooms}/>
        </Menu>

    )
}
export default Room;