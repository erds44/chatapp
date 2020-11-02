import {Menu, Button, Modal} from "antd";
import React, {useState, useMemo} from "react";
import CreateRoomForm from "./createRoomForm";
import JoinedRoom from "./joinedRoom";
import ExitRoom from "./exitRoom";
import ExitAllRooms from "./exitAllRooms";
import AllRooms from "./allRooms";
import webSocket from "../websocket/Websocket";

const Room = () => {
    const [joinedRooms, setJoinedRooms] = useState(() => []);
    const [allRooms, setAllRooms] = useState(() => []);
    const [visible, setVisible] = useState(false);
    const getAllRooms = useMemo(() => allRooms, [allRooms])
    const getJoinedRooms = useMemo(() => joinedRooms, [joinedRooms])
    const exitAll = () => {
        setJoinedRooms([])
    }
    const addRoom = value => {
        setJoinedRooms([...joinedRooms, value]);
        setAllRooms([...allRooms, value]);
    }
    const exitRoom = value => {
        let r = joinedRooms.filter(item => item !== value)
        setJoinedRooms(r);
    }
    const joinRoom = value => {
        if (joinedRooms.includes(value)) {
            Modal.error({
                content: value + "already joined!"
            })
        } else {
            Modal.success({
                content: "Join " + value + " successfully!"
            });
            addRoom(value);
        }
    }
    const handleClick = (e) => {
        if (e.key === "create") {
            setVisible(true);
        }
    }

    // webSocket.onmessage = message => {
    //     let res = JSON.parse(message.data);
    //     if (res.command === "room") {
    //         if (res.type === "err") {
    //             Modal.error({
    //                 content: res.body
    //             })
    //         } else {
    //             Modal.success({
    //                 content: res.body
    //             })
    //         }
    //     }
    // }
    return (
        <Menu mode="inline" onClick={handleClick} selectedKeys={['']}>
            <Menu.Item key="create">
                <CreateRoomForm visible={visible} setVisible={setVisible} addRoom={addRoom}/>
            </Menu.Item>
            <ExitRoom joinedRooms={getJoinedRooms} exitRoom={exitRoom}/>
            <ExitAllRooms exitAll={exitAll}/>
            <JoinedRoom rooms={getJoinedRooms}/>
            <AllRooms allRooms={getAllRooms} joinRoom={joinRoom}/>
            {/*test method*/}
            {/*<Menu.Item onClick={() => {setAllRooms([...allRooms, "123"]);}}>Add all rooms</Menu.Item>*/}
            {/*<Menu.Item onClick={() => {setJoinedRooms([...joinedRooms, "456"]);}}>Add joined rooms</Menu.Item>*/}
        </Menu>


    )
}
export default Room;