import {React, useState} from "react";
import { List, Avatar, Button } from "antd";
import webSocket from "../../websocket/Websocket";
import colorHelper from "../../../helpers/color-user-helper";
import Message from "./message";
import {connect, useSelector} from "react-redux";
import ChatMessage from "../chat-area/ChatMessage";


const UserList = (props) => {

    const [visible, setVisible] = useState(false);
    const [userName, setUserName] = useState("");


    const allUsers = useSelector( state => state.userList.allUserList);
    const currentUser = useSelector (state => state.login.user);
    const getDisplayName = sender => {
        return sender.split("_").map(name => name[0]);
    };
    console.log(currentUser)

    return (
    <div>
        <Message userName={userName} visible={visible} setVisible={setVisible}/>
            <List
                style = {{width:"100%", height:"100%",position:"absolute", overflow:"scroll"}}
                itemLayout="horizontal"
                dataSource={allUsers}
                renderItem={item => (
                    <List.Item style={{ padding: "15px" }}>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    style={{
                                        backgroundColor: colorHelper(
                                            item.name
                                        ),
                                        verticalAlign: "middle"
                                    }}
                                    size="large"
                                    gap={1}
                                >
                                    {getDisplayName(item.name)}
                                </Avatar>
                            }
                            description={item.name}
                            title={item.school}
                        />
                        {item.name != currentUser?
                            <Button
                                type="primary"
                                shape="round"
                                size="small"
                                onClick={() => {setUserName(item.name); setVisible(true)}}
                            >
                                Chat!
                            </Button>
                            :   <Button
                                type="primary"
                                shape="round"
                                size="small"
                                disabled = {true}
                            >
                                Chat!
                            </Button>}


                    </List.Item>
                )}
            />
    </div>
  );
};

export default UserList;
