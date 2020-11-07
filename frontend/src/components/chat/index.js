import React, {useEffect, useState} from 'react'
import {Layout, Row, Col, Modal} from 'antd'
import {Button, Popover} from 'antd'
import {useHistory} from 'react-router-dom'
import ChatArea from "./chat-area/ChatArea";
import Room from "../room";
import UserList from "./userList";
import ReportForm from "../room/report/reportForm";
import ReportAdminForm from "../room/report/reportAdminForm";
import webSocket from "../websocket/Websocket";
import {connect} from "react-redux";

const {Header, Content, Footer, Sider} = Layout;
const Chat = (props) => {
    const history = useHistory();
    const {dispatch, logIn} = props;
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
        'CR1': ["Xiao Xia", "Zhijian Yao", "Weiwei Zhou"]
    };
    const selectedChatRoom = 'CR1';
    const currentUser = { name: 'Xiao Xia' };

    useEffect(() => {
        if(logIn.isSignedIn === null && logIn.user === null && logIn.msg !== null) {
            history.push('/');
            Modal.success(({content: logIn.msg}))
        }
    }, [logIn])

    // useEffect(() => {
    //     if (window.performance) {
    //         if (performance.navigation.type == 1) {
    //             //alert( "This page is reloaded" );
    //             history.push('/');
    //             // webSocket.send(
    //             //     JSON.stringify({
    //             //         command: "logout",
    //             //         body: {}
    //             //     })
    //             // );
    //         }
    //     }
    // }, [])

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
                            onClick={() => {
                                webSocket.send(
                                    JSON.stringify({
                                        command: "logout",
                                        body: {}
                                    })
                                )
                                }}>
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

const mapStateToProps = (state, ownProps) => {
    return { logIn: state.login }
};

export default connect(mapStateToProps, {})(Chat);