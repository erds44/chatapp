import {React, useEffect, useState} from 'react'
import {Card, Form, Input, message, Button, Select, Modal, InputNumber, Tooltip} from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';
import {useHistory} from 'react-router-dom'
import webSocket from "../websocket/Websocket"
import { connect } from 'react-redux'
import notification from "../notification";


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
    // const ss=[{value:'a', label:'a'}]

    for (let i = 0; i < school_string_list.length; i++) {
        schools.push(<Option value={school_string_list[i]}>{school_string_list[i]}</Option>);
    }

    for (let i = 0; i < interest_string_list.length; i++) {
        interests.push(<Option value={interest_string_list[i]}>{interest_string_list[i]}</Option>);
    }

    const onFinish = values => {
        console.log(values.user);
        webSocket.send(
            JSON.stringify({
                command: "login",
                body: {
                    name: values.user.name,
                    age: values.user.age,
                    school: values.user.school,
                    interests: values.user.interests
                }
            })
        )

    };

    useEffect(() => {
        console.log(logIn);
        if(logIn) {
            if (logIn.isSignedIn !== null) {
                if (logIn.isSignedIn === true) {
                    history.push('/chat');
                } else {
                    notification.error("This user has been logged in");
                }
            }
        }
    }, [logIn])

    return (
        <Card title="Login Chat Room" style={{width: '600px', margin: '80px auto'}}
              headStyle={{fontSize: '30px', backgroundColor: '#d9d9d9'}}
              bodyStyle={{backgroundColor: '#f5f5f5'}}>
            <Form {...layout} name="LoginForm" form={form} onFinish={onFinish} validateMessages={validateMessages} align="left">
                <Form.Item
                    name={['user', 'name']}
                    label={
                        <span>
                            Name&nbsp;
                            <Tooltip title="5-20 alphanumeric characters or underscores">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Name is required!',
                        },
                        {
                            pattern: /^[a-zA-Z0-9_]{5,20}$/,
                            message: 'Name should be 5-20 alphanumeric characters or underscores',
                        },
                    ]}>
                    <Input placeholder="Your Name"/>
                </Form.Item>

                <Form.Item name={['user', 'age']} label="Age" rules={[{required: true}]}>
                    <InputNumber min={0} max={200}/>
                </Form.Item>

                <Form.Item name={['user', 'school']} label="School" rules={[{required: true}]}>
                    <Select style={{width: '100%', textAlign: 'left'}}
                            allowClear
                            placeholder="Please select your school">{schools}</Select>
                </Form.Item>

                <Form.Item name={['user', 'interests']} label="Interests" rules={[{required: true}]}>
                    <Select mode="multiple"
                            allowClear
                            style={{width: '100%', textAlign: 'left'}}
                            placeholder="Please select your interests">{interests}</Select>
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