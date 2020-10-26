import React from 'react'
import { Layout, Menu } from 'antd'
import { Divider } from 'antd'
import { Button } from 'antd'
import {useHistory} from 'react-router-dom'


const { Header, Content, Footer, Sider } = Layout;

const Chat = () => {

    const history = useHistory();

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider width='300px' theme='light'>
                <div style={{ height: '50%' }}>Part 1</div>
                <Divider/>
                <div>Part 2</div>
            </Sider>
            <Layout>
            <Header style={{ padding: 0, backgroundColor: 'white'}}>
                <span>Chat Room</span>
                <Button style={{ right: '-500px' }} type="primary" shape="round" size='small' onClick={() => history.push('/')}>Logout</Button>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                content
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Chat App ©2020 Created by Summy the Owl</Footer>
            </Layout>
        </Layout>
    )
}

export default Chat;