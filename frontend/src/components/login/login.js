import {React, useEffect, useState} from 'react'
import {Form, Input, message, Button, Select, Modal} from 'antd'
import {Card} from 'antd'
import {useHistory} from 'react-router-dom'
import webSocket from "../websocket/Websocket"
import { connect } from 'react-redux'


const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

const validateMessages = {
    required: '${label} is required!'
};

const Login = (props) => {

    const history = useHistory();
    const {Option} = Select;
    const interests = [];
    const schools = [];
    const interest_string_list = ["Traveling", "Reading", "Music", "Sports", "Movies", "Games"];
    const school_string_list = ["Rice University", "Duke University", "USC", "UCLA", "New York University", "Other"];
    const {dispatch, logIn} = props;
    const [form] = Form.useForm();
    const {validateFields} = form;

    for (let i = 0; i < school_string_list.length; i++) {
        schools.push(<Option key={i}>{school_string_list[i]}</Option>);
    }

    for (let i = 0; i < interest_string_list.length; i++) {
        interests.push(<Option key={i}>{interest_string_list[i]}</Option>);
    }

    const onFinish = values => {
        console.log(values.user);
        webSocket.send(
            JSON.stringify({
                command: "login",
                body: {
                    name: values.user.name,
                    school: values.user.school,
                    interests: interest_string_list
                }
            })
        )
    };

    useEffect(() => {
        console.log(logIn);
        if(logIn.isSignedIn !== null) {
            if(logIn.isSignedIn === true) {
                history.push('/chat');
            }
            else {
                Modal.error({content: "This user has been logged in"});
            }
        }
    }, [logIn])

    return (
        <Card title="Login Chat Index" style={{width: '600px', margin: '80px auto'}}
              headStyle={{fontSize: '30px', backgroundColor: '#d9d9d9'}}
              bodyStyle={{backgroundColor: '#f5f5f5'}}>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={['user', 'name']} label="Name" rules={[{required: true}]}>
                    <Input placeholder="Your Name"/>
                </Form.Item>
                <Form.Item name={['user', 'school']} label="School">
                    <Select style={{width: '100%', textAlign: 'left'}}
                            placeholder="Please select your school">{schools}</Select>
                    <br/>
                </Form.Item>
                <Form.Item name={['user', 'interests']} label="Interests">
                    <Select mode="multiple"
                            allowClear
                            style={{width: '100%', textAlign: 'left'}}
                            placeholder="Please select your interests">{interests}</Select>
                    <br/>
                </Form.Item>

                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 20}}>
                    <Button type="primary" htmlType="submit" size="large" >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Card>

    );
};

const mapStateToProps = (state, ownProps) => {
    return { logIn: state.login }
  };

export default connect(mapStateToProps, {})(Login);