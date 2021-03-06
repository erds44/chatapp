import {Menu, Button, Modal, message} from "antd";
import React, {useState, useMemo, useEffect} from "react";
import CreateRoom from "./createRoom";
import JoinedRoom from "./joinedRoom";
import ExitRoom from "./exitRoom";
import ExitAllRooms from "./exitAllRooms";
import AllRooms from "./allRooms";
import webSocket from "../websocket/Websocket";
import {connect} from "react-redux";
import ReportForm from "./report/reportForm";
import ReportAdminForm from "./report/reportAdminForm";
import notification from "../notification";

const Index = (props) => {
    const {room} = props;
    const [joinedRooms, setJoinedRooms] = useState([]);
    const [userList, setUserList] = useState(() => [[]]);
    const [allRooms, setAllRooms] = useState(() => []);
    const [visible, setVisible] = useState(false);
    const [userName, setUserName] = useState();
    const [isPublic, setIsPublic] = useState(() => []);
    const [report, setReport] = useState({visible: false, reportRoom: null, reportName: null})
    const handleClick = (e) => {
        if (e.key === "create") setVisible(true);
    }

    useEffect(() => {
        if (room.msg == null) {
            if (room.joinedRoom) setJoinedRooms(room.joinedRoom);
            if (room.userList) setUserList(room.userList);
            if (room.allRooms) setAllRooms(room.allRooms);
            if (room.userName) setUserName(room.userName);
            if (room.isPublic) setIsPublic(room.isPublic);

        } else {
            if (room.type === "err") notification.error(room.msg);
            else if (room.type === "info") notification.info(room.msg);
            else notification.success(room.msg);

        }
    }, [room])

    useEffect(() => {
        setInterval(() => {
            webSocket.send(JSON.stringify({
                    command: "preventTimeOut",
                    body: {
                        name: "preventTimeOut"
                    }
                }
            ))
        }, 10000);
    }, []);

    return (
        <Menu mode="inline" onClick={handleClick} selectedKeys={['']} defaultOpenKeys={['allRooms', 'joinedRooms']}>
            <Menu.Item key="create">
                <CreateRoom visible={visible} setVisible={setVisible}/>
            </Menu.Item>
            {/*<ExitRoom joinedRooms={joinedRooms}/>*/}
            <ExitAllRooms/>
            <JoinedRoom joinedRooms={joinedRooms} userList={userList} userName={userName} setReport={setReport}/>
            <AllRooms allRooms={allRooms} isPublic={isPublic}/>
            <ReportForm report={report} setReport={setReport}/>
            <ReportAdminForm/>
        </Menu>


    )
}
const mapStateToProps = (state, ownProps) => {
    return {room: state.room}
};

export default connect(mapStateToProps, {})(Index);