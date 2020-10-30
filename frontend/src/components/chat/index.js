import React from 'react'
import {Layout, Row, Col} from 'antd'
import {Button, Popover} from 'antd'
import {Route, useHistory} from 'react-router-dom'
import Room from "../room/room";
import userList from "./userList";

const {Header, Content, Footer, Sider} = Layout;
const Chat = (props) => {

    const history = useHistory();

    return (
        <Layout style={{height: '100vh'}}>
            <Sider width='300px' theme='light'>
                <Room/>
            </Sider>
            <Layout>
                <Header style={{padding: 0, backgroundColor: 'white', borderLeft: '2px solid rgba(0, 0, 0, 0.06)'}}>
                    <span>Chat Room</span>
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
                                 style={{padding: 24, minHeight: 360, height: '100%'}}>
                                content
                            </div>
                        </Col>
                        <Col span={7} style={{borderLeft: '2px solid rgba(0, 0, 0, 0.06)'}}>
                            {userList()}
                        </Col>
                    </Row>
                </Content>
                <Footer style={{textAlign: 'center'}}>Chat App ©2020 Created by Summy the Owl</Footer>
            </Layout>
        </Layout>
    )
}

export default Chat;