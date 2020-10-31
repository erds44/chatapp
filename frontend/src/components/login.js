import React from 'react'
import {Form, Input, InputNumber, Button, Select} from 'antd'
import { Card } from 'antd'
import {useHistory} from 'react-router-dom';


const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const Login = () => {

    const history = useHistory();
    const {Option} = Select;
    const interests = [];
    const schools = [];
    const interest_string_list = ["Traveling","Reading","Music","Sports","Movies","Games"];
    const school_string_list = ["Rice University","Duke University","USC","UCLA","New York University","Other"];

    for (let i = 0; i < school_string_list.length; i++) {
        schools.push(<Option key={i}>{school_string_list[i]}</Option>);
    }

    for (let i = 0; i < interest_string_list.length; i++) {
        interests.push(<Option key={i}>{interest_string_list[i]}</Option>);
    }

    const onFinish = values => {
        console.log(values);
        history.push('/chat');
    };

    return (
        <Card title="Login Chat Room" style={{ width: '600px', margin: '80px auto'}} headstyle={{fontSize:'30px'}}>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]} >
                <Input placeholder="Your Name"/>
            </Form.Item>
            <Form.Item name={['user', 'school']} label="School">
                <Select style={{width: '100%', textAlign:'left'}}
                        placeholder="Please select your school">{schools}</Select>
                <br/>
            </Form.Item>
            <Form.Item name={['user', 'interests']} label="Interests" >
                <Select mode="multiple"
                        allowClear
                        style={{width: '100%', textAlign:'left'}}
                        placeholder="Please select your interests">{interests}</Select>
                <br/>
            </Form.Item>


            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
                <Button type="primary" htmlType="submit" size="large">
                    Login
                </Button>
            </Form.Item>
            </Form>
        </Card>

    );
};

export default Login;