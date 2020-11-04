import {Menu, Button, Modal, message} from "antd";
import React, {useState, useMemo, useEffect} from "react";
import CreateRoom from "./createRoom";
import JoinedRoom from "./joinedRoom";
import ExitRoom from "./exitRoom";
import ExitAllRooms from "./exitAllRooms";
import AllRooms from "./allRooms";
import webSocket from "../websocket/Websocket";
import {connect} from "react-redux";

const Room = (props) => {
    const {room} = props;
    const [joinedRooms, setJoinedRooms] = useState(() => []);
    const [allRooms, setAllRooms] = useState(() => []);  //global
    const [visible, setVisible] = useState(false);
    const getAllRooms = useMemo(() => allRooms, [allRooms])
    const getJoinedRooms = useMemo(() => joinedRooms, [joinedRooms])
    const exitAll = () => {
        setJoinedRooms([])
    }
    const addRoom = (key, value) => {
        setJoinedRooms([...joinedRooms, [key, value]])

    }
    const exitRoom = roomName => {
        let r = joinedRooms.filter(x => x[0] !== roomName)
        setJoinedRooms(r);
    }

    const updateUserList = (key, value) => {
        let r = joinedRooms.filter(x => x[0] !== key)
        setJoinedRooms([...r, [key,value]])
        console.log(joinedRooms)
    }
    const handleClick = (e) => {
        if (e.key === "create") {
            setVisible(true);
        }
    }

    useEffect(() => {
        if (room.request != null) {
            if (room.request === "updateAllRoom") {
                let str = room.param1.replace('[', '').replace(']', '');
                setAllRooms(str.split(","));
                return;
            } else if (room.request === "updateUserList") {
                // let roomName = room.param1;
                // let list = room.param2.replace('[', '').replace(']', '');
                // updateUserList(roomName, list.split(","));
                // return;
            }
            if (room.type === "err") Modal.error({content: room.msg})
            else {
                Modal.success({content: room.msg});
                switch (room.request) {
                    case "joinRoom" :
                    case "createRoom":
                        let roomName = room.param1;
                        let list = room.param2.replace('[', '').replace(']', '');
                        addRoom(roomName, list.split(","));
                        break;
                    case "updateUserList":
                        let chatRoom = room.param1;
                        let userList = room.param2.replace('[', '').replace(']', '');
                        updateUserList(chatRoom, userList.split(","));

                        break;
                    case "exitRoom":
                        exitRoom(room.param1);
                        break;
                    case "exitAllRoom":
                        exitAll();
                        break;
                    default:
                        break;

                }
            }
        }
    }, [room])


    return (
        <Menu mode="inline" onClick={handleClick} selectedKeys={['']}>
            <Menu.Item key="create">
                <CreateRoom visible={visible} setVisible={setVisible}/>
            </Menu.Item>
            <ExitRoom joinedRooms={getJoinedRooms}/>
            <ExitAllRooms/>
            <JoinedRoom rooms={getJoinedRooms}/>
            <AllRooms allRooms={getAllRooms}/>
            {/*test method*/}
            {/*<Menu.Item onClick={() => {setAllRooms([...allRooms, "123"]);}}>Add all rooms</Menu.Item>*/}
            {/*<Menu.Item onClick={() => {setJoinedRooms([...joinedRooms, "456"]);}}>Add joined rooms</Menu.Item>*/}
        </Menu>


    )
}
const mapStateToProps = (state, ownProps) => {
    return {room: state.room}
};

export default connect(mapStateToProps, {})(Room);