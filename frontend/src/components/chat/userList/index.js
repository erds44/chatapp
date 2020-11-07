import {React, useState} from "react";
import { List, Avatar, Button } from "antd";
import inviteForm from "../inviteForm";
import webSocket from "../../websocket/Websocket";
import colorHelper from "../../../helpers/color-user-helper";
import Message from "./message";

const UserList = () => {

    const [visible, setVisible] = useState(false);
    const [userName, setUserName] = useState("");
  const data = [
    {
      name: { title: "Miss", first: "Weiwei", last: "Zhou" },
      school: "Rice University",
      interest: "Reading"
    },
    {
      name: { title: "Mr", first: "Xiao", last: "Xia" },
      school: "Rice University",
      interest: "Sports"
    },
    {
      name: { title: "Mr", first: "Zhijian", last: "Yao" },
      school: "Rice University",
      interest: "Traveling"
    },
    {
      name: { title: "Mr", first: "Xuyang", last: "Xiao" },
      school: "Rice University",
      interest: "Sports"
    },
    {
      name: { title: "Mr", first: "Wenlong", last: "Yan" },
      school: "Rice University",
      interest: "Sports"
    },
    {
      name: { title: "Miss", first: "Xinru", last: "Xiao" },
      school: "Rice University",
      interest: "Sports"
    }
  ];
  const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

  return (
    <div>
        <Message userName={userName} visible={visible} setVisible={setVisible}/>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item style={{ padding: "15px" }}>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    backgroundColor: colorHelper(
                      `${item.name.first} ${item.name.last}`
                    ),
                    verticalAlign: "middle"
                  }}
                  size="large"
                  gap={1}
                >
                  {item.name.first[0] + item.name.last[0]}
                </Avatar>
              }
              description={item.name.first + " " + item.name.last}
              title={item.school}
            />

            <Button
              type="primary"
              shape="round"
              size="small"
              onClick={() => {setUserName(item.name.first + " " + item.name.last); setVisible(true)}}
            >
              Chat!
            </Button>

          </List.Item>
        )}
      />
      {inviteForm()}
    </div>
  );
};

export default UserList;
