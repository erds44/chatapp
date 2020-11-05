import React, { useState } from 'react'
import {Layout, Row, Col} from 'antd'
import {Button, Popover} from 'antd'
import {useHistory} from 'react-router-dom'
import ChatArea from "./chat-area/ChatArea";
import Room from "../room";
import UserList from "./userList";
import ReportForm from "../room/report/reportForm";
import ReportAdminForm from "../room/report/reportAdminForm";

const {Header, Content, Footer, Sider} = Layout;
const Chat = (props) => {
    const history = useHistory();
    const userMap = {
        'CR1': ["Xiao Xia", "Zhijian Yao", "Weiwei Zhou"]
    };
    const selectedChatRoom = 'CR1';
    const currentUser = { name: 'Xiao Xia' };





    return (
        <Layout style={{height: '100vh'}}>
            <Sider width='300px' theme='light'>
                <Room />
            </Sider>
            <Layout>
                <Header style={{padding: 0, backgroundColor: 'white', borderLeft: '2px solid rgba(0, 0, 0, 0.06)'}}>
                    <span id={"chat-area-header-room-name"} style={{fontSize: 'larger', fontWeight: 'bolder'}}>{selectedChatRoom}</span>
                    <span id={"chat-area-header-user-count"} style={{fontSize: 'medium'}}>{`  (${userMap[selectedChatRoom].length})`}</span>
                    <Button style={{right: '-500px'}}
                            type="primary" shape="round" size='small'
                            onClick={() => {history.push('/')}}>
                        Logout
                    </Button>
                </Header>
                <Content style={{margin: '24px 16px 0'}}>
                    <Row style={{height: '100%'}}>
                        <Col span={17}>
                            <div className="site-layout-background"
                                 style={{ minHeight: 360, height: '100%' }}>
                                <ChatArea
                                    chatRoom={selectedChatRoom}
                                />
                            </div>
                        </Col>
                        <Col span={7} style={{borderLeft: '2px solid rgba(0, 0, 0, 0.06)'}}>
                            {UserList()}
                            {/*{ReportForm()}*/}
                        </Col>
                    </Row>
                </Content>
                {/*TEMP FOR Report*/}
                {/*<ReportAdminForm report={report}/>*/}
                <Footer style={{textAlign: 'center'}}>Chat App ©2020 Created by Summy the Owl</Footer>
            </Layout>
        </Layout>
    )
}

export default Chat;