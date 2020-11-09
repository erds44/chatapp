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

    const getDisplayName = sender => {
        return sender.split("_").map(name => name[0]);
    };

    return (
    <div>
        <Message userName={userName} visible={visible} setVisible={setVisible}/>
      <List
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

            <Button
              type="primary"
              shape="round"
              size="small"
              onClick={() => {setUserName(item.name); setVisible(true)}}
            >
              Chat!
            </Button>

          </List.Item>
        )}
      />
    </div>
  );
};

export default UserList;
