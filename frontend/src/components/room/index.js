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
        if (e.key === "create") {
            setVisible(true);
        }
    }

    useEffect(() => {
        if (room.msg == null) {
            if (room.joinedRoom) setJoinedRooms(room.joinedRoom);
            if (room.userList) setUserList(room.userList);
            if (room.allRooms) setAllRooms(room.allRooms);
            if (room.userName) setUserName(room.userName);
            if (room.isPublic) setIsPublic(room.isPublic);

        } else {
            if (room.type === "err") Modal.error({content: room.msg});
            else Modal.success({content: room.msg});
        }
    }, [room])


    return (
        <Menu mode="inline" onClick={handleClick} selectedKeys={['']}>
            <Menu.Item key="create">
                <CreateRoom visible={visible} setVisible={setVisible}/>
            </Menu.Item>
            <ExitRoom joinedRooms={joinedRooms}/>
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