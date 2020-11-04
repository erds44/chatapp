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
    const addRoom = value => {
        setJoinedRooms([...joinedRooms, value]);
    }
    const exitRoom = value => {
        let r = joinedRooms.filter(item => item !== value)
        setJoinedRooms(r);
    }
    const handleClick = (e) => {
        if (e.key === "create") {
            setVisible(true);
        }
    }

    useEffect(() => {
        if (room.request != null) {
            if(room.request === "updateAllRoom"){
                console.log(room.body);
                let str = room.body.replace('[', '').replace(']','');



                //console.log(room.body.substring(1, room.body.length - 1))
                setAllRooms(str.split(","));
                return ;
            }

            if (room.type === "err") Modal.error({content: room.msg})
            else {
                Modal.success({content: room.msg});
                switch (room.request) {
                    case "createRoom":
                        addRoom(room.body);
                        break;
                    case "exitRoom":
                        exitRoom(room.body);
                        break;
                    case "exitAllRoom":
                        exitAll();
                        break;
                    case "joinRoom":
                        addRoom(room.body);
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