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
    const [joinedRooms, setJoinedRooms] = useState(() => []);
    const [userList, setUserList] = useState(() => [[]]);
    const [allRooms, setAllRooms] = useState(() => []);  //global
    const [visible, setVisible] = useState(false);
    const getAllRooms = useMemo(() => allRooms, [allRooms])
    const getJoinedRooms = useMemo(() => joinedRooms, [joinedRooms])
    const getUserList = useMemo(() => userList, [userList])
    const [report, setReport] = useState({visible: false, reportRoom: null, reportName: null})
    const handleClick = (e) => {
        if (e.key === "create") {
            setVisible(true);
        }
    }

    useEffect(() => {
        if(room.msg == null){
            setJoinedRooms(prevState => room.joinedRoom);
            setUserList(()=>room.userList);
            setAllRooms(()=>room.allRooms);

        }else{
            if(room.type === "err") Modal.error({content: room.msg});
            else Modal.success({content: room.msg});
        }
    }, [room])


    return (
        <Menu mode="inline" onClick={handleClick} selectedKeys={['']}>
            <Menu.Item key="create">
                <CreateRoom visible={visible} setVisible={setVisible}/>
            </Menu.Item>
            <ExitRoom joinedRooms={joinedRooms} />
            <ExitAllRooms/>
            <JoinedRoom joinedRooms={joinedRooms} userList={userList} setReport={setReport}/>
            <AllRooms allRooms={allRooms}/>
            <ReportForm report={report} setReport={setReport}/>
            <ReportAdminForm/>
        </Menu>


    )
}
const mapStateToProps = (state, ownProps) => {
    return {room: state.room}
};

export default connect(mapStateToProps, {})(Index);