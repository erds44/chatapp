import React, { useState } from 'react'
import {Layout, Row, Col} from 'antd'
import {Button, Popover} from 'antd'
import {Route, useHistory} from 'react-router-dom'
import ChatArea from "./chat-area/ChatArea";
import Room from "../room/room";
import UserList from "./userList";

const {Header, Content, Footer, Sider} = Layout;
const Chat = (props, ref) => {
    const history = useHistory();
    const [allMessages, setAllMessages] = useState({
        'Chat Room 1': [
            {
                'id': 1,
                'sender': 'Xiao Xia',
                'text': 'This is the first message for chat room 1',
                'time': '2020-10-29 08:00:00'
            },
            {
                'id': 2,
                'sender': 'Zhijian Yao',
                'text': 'This is the second message for chat room 1',
                'time': '2020-10-29 08:05:00'
            },
            {
                'id': 3,
                'sender': 'Weiwei Zhou',
                'text': 'This is the third message for chat room 1',
                'time': '2020-10-29 08:15:30'
            }
        ]
    });
    const userMap = {
        'Chat Room 1': ["Xiao Xia", "Zhijian Yao", "Weiwei Zhou"]
    };
    const selectedChatRoom = 'Chat Room 1';
    const currentUser = { name: 'Xiao Xia' };
    const handleMessageDelete = ( messageId, chatRoom) => {
        allMessages[chatRoom] = allMessages[chatRoom].filter((m) => m.id !== messageId);
        setAllMessages({...allMessages});
    }

    return (
        <Layout style={{height: '100vh'}}>
            <Sider width='300px' theme='light'>
                <Room handleCreateRoom={props.handleCreateRoom}/>
            </Sider>
            <Layout>
                <Header style={{padding: 0, backgroundColor: 'white', borderLeft: '2px solid rgba(0, 0, 0, 0.06)'}}>
                    <span id={"chat-area-header-room-name"} style={{fontSize: 'larger', fontWeight: 'bolder'}}>{selectedChatRoom}</span>
                    <span id={"chat-area-header-user-count"} style={{fontSize: 'medium'}}>{`  (${userMap[selectedChatRoom].length})`}</span>
                    <Button style={{right: '-500px'}}
                            type="primary" shape="round" size='small'
                            onClick={() => history.push('/')}>
                        Logout
                    </Button>
                </Header>
                <Content style={{margin: '24px 16px 0'}}>
                    <Row style={{height: '100%'}}>
                        <Col span={17}>
                            <div className="site-layout-background"
                                 style={{ minHeight: 360, height: '100%' }}>
                                <ChatArea
                                    inputMessages={allMessages[selectedChatRoom]}
                                    chatRoom={selectedChatRoom}
                                    onMessageDelete={handleMessageDelete}
                                />
                            </div>
                        </Col>
                        <Col span={7} style={{borderLeft: '2px solid rgba(0, 0, 0, 0.06)'}}>
                            {UserList()}
                        </Col>
                    </Row>
                </Content>
                <Footer style={{textAlign: 'center'}}>Chat App ©2020 Created by Summy the Owl</Footer>
            </Layout>
        </Layout>
    )
}

export default Chat;