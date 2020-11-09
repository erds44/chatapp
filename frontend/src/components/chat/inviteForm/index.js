import { Popover, Button, Input, Space } from 'antd';
import React, {useState, useEffect} from 'react';
import { connect , useSelector} from 'react-redux';
import webSocket from "../../websocket/Websocket"
import notification from "../../notification";
import {JOIN_ROOM} from "../../../actions/type";

const InviteForm = (props) => {
    const {selectedChatRoom, rooms} = props;
    const [name, setName] = useState("");
    const [joinedRooms, setJoinedRooms] = useState([]);
    const currentUser = useSelector(state => state.login.user);
    const [visible, setVisible] = useState(false);

    const hide = () => {
        setVisible(false)
    }



    const handleVisibleChange = e => {
        setVisible(e)
    }

    const onChange = e => {
        setName(e.target.value);
    }

    useEffect(() => {
        if (rooms.msg == null) {
            if (rooms.joinedRoom) setJoinedRooms(rooms.joinedRoom);
        } else {
            if (rooms.type === "err") notification.error(rooms.msg);
            else notification.success(rooms.msg);
        }
    }, [rooms])

    const onFinish = (room, user) => {
        setVisible(false)
        if (room != null && user != null) {
            webSocket.send(
                JSON.stringify({
                    command: "invite",
                    body: {
                        currentUser: currentUser,
                        inviteUserName: user,
                        invitedRoom: room
                    }
                })
            )
        }
    };


    const content = (
        <Space align="center">
            <Input placeholder="Username" onChange={onChange}/>
            <Button type="primary" onClick={() => onFinish(selectedChatRoom, name)}>Invite</Button>
        </Space>
    );

    return (

        <Popover content={content} title="Invite your friend!" trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
        >
            <Button>Invite</Button>
        </Popover>

    );
}

const mapStateToProps = (state, ownProps) => {
    return {rooms: state.room}
};

export default connect(mapStateToProps, {})(InviteForm);