import React, { useEffect, useState } from "react";
import { Layout, Row, Col } from "antd";
import { Space, Button, Popover, notification } from "antd";
import { useHistory } from "react-router-dom";
import ChatArea from "./chat-area/ChatArea";
import Room from "../room";
import UserList from "./userList";
import ReportForm from "../room/report/reportForm";
import ReportAdminForm from "../room/report/reportAdminForm";
import webSocket from "../websocket/Websocket";
import { connect, useSelector } from "react-redux";
import notifications from "../notification";
import InviteForm from "./inviteForm";
import Message from "./userList/message";
import './index.css';

const { Header, Content, Footer, Sider } = Layout;
const Chat = props => {
  const history = useHistory();
  const { dispatch, logIn, priMsg } = props;
  const selectedChatRoom = useSelector(state => state.room.currentRoom);
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const userList = useSelector(state => {
    if (!state.room.userList || !state.room.joinedRoom) {
      return null;
    }
    return state.room.userList[state.room.joinedRoom.indexOf(selectedChatRoom)];
  });
  //const currentUser = { name: "Xiao Xia" };

  const mes = (description, userName) => {
    return(
      <div>
        <div className="message">
          {description}
        </div>
        <div className="message">
          <Button onClick={() => handleReply(userName)}>Reply</Button>
        </div>
      </div>
    )
  }

  const handleReply = (userName) => {
    setUserName(userName); 
    setVisible(true);
  }

  useEffect(() => {
    if (priMsg.message !== null) {
      notification.info({
        message: `${priMsg.sender} sends you a message`,
        description: mes(priMsg.message.info, priMsg.sender),
        duration: 3,
        styles: {paddingTop: '10px'}
      });
    } else if (priMsg.feedback !== null) {
      if (priMsg.feedback.indexOf("Sorry") < 0) {
        notifications.success(priMsg.feedback);
      } else {
        notifications.error(priMsg.feedback);
      }
    }
  }, [priMsg]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Message userName={userName} visible={visible} setVisible={setVisible}/>
      <Sider width="300px" theme="light">
        <Room />
      </Sider>
      <Layout style={{ overFlow: "hidden" }}>
        <Header
          style={{
            padding: 0,
            backgroundColor: "white",
            //borderLeft: "2px solid rgba(0, 0, 0, 0.06)"
          }}
        >
          {selectedChatRoom && (
            <span
              id={"chat-area-header-room-name"}
              style={{ fontSize: "larger", fontWeight: "bolder" }}
            >
              {selectedChatRoom || ""}
            </span>
          )}
          {selectedChatRoom && (
            <span
              id={"chat-area-header-user-count"}
              style={{ fontSize: "medium", marginLeft: "20px" }}
            >
              {(userList && `(${userList.length})`) || ""}
            </span>
          )}
          <Space style={{float: 'right'}}
                 size = "middle">
            <div>

              {selectedChatRoom != null ? <InviteForm selectedChatRoom = {selectedChatRoom}/>:null}
            </div>

            <Button
                type="primary"
                shape="round"
                size="small"
                onClick={() => {
                  webSocket.send(
                      JSON.stringify({
                        command: "logout",
                        body: {}
                      })
                  );
                }}
            >
              Logout
            </Button>
          </Space>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <Row style={{ height: "100%" }}>
            <Col span={17}>
              <div
                className="site-layout-background"
                style={{ minHeight: 360, height: "100%" }}
              >
                {selectedChatRoom && <ChatArea chatRoom={selectedChatRoom} />}
              </div>
            </Col>
            <Col
              span={7}
              style={{ borderLeft: "2px solid rgba(0, 0, 0, 0.06)" }}
            >
              {UserList()}
              {/*{ReportForm()}*/}
            </Col>
          </Row>
        </Content>
        {/*TEMP FOR Report*/}
        {/*<ReportAdminForm report={report}/>*/}
        <Footer style={{ textAlign: "center" }}>
          Chat App ©2020 Created by Sammy the Owl
        </Footer>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { logIn: state.login, priMsg: state.priMessage };
};

export default connect(mapStateToProps, {})(Chat);
