import {Form, Input, Switch, Select, Button, Popover, Menu, Modal} from 'antd';
import React, {useState} from 'react';
import {PlusCircleOutlined} from "@ant-design/icons";
import webSocket from "../websocket/Websocket";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: '${label} is required!',
};

const CreateRoom = (props) => {
    const interests = [];
    const interest_string_list = ["Traveling", "Reading", "Music", "Sports", "Movies", "Games"];
    const {Option} = Select;
    const {visible, setVisible} = props;
    const [interestDisabled, setInterestDisabled] = useState(true);
    for (let i = 1; i < 10; i++) {
        interests.push(<Option value={interest_string_list[i]}>{interest_string_list[i]}</Option>);
    }
    const onFinish = (values) => {
        webSocket.send(
            JSON.stringify({
                    command: "createRoom",
                    body: {
                        name: values.name,
                        interests: values.interest,
                        isPrivate: values.switch || false
                    }
                }
            )
        )
        setVisible(false);
    };

    const handleVisibleChange = visible => {
        setVisible(visible);
    };
    return (
        <Popover placement="rightTop" title={"Create Room"}
                 content={<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
                                style={{outerWidth: "500"}}>
                     <Form.Item name={"name"}
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Name is required!',
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9_]{1,20}$/,
                                        message: 'Name should be 1-20 alphanumeric characters or underscores',
                                    },
                                ]}><Input/>
                     </Form.Item>
                     <Form.Item name="switch" label="Private" valuePropName="checked"><Switch onClick={() => {
                         setInterestDisabled(prevState => !prevState)
                     }}/>
                     </Form.Item>
                     <Form.Item name={"interest"}
                                label="Interests"
                                rules={[{required: !interestDisabled}]}>
                         <Select mode="multiple"
                                 allowClear
                                 style={{width: '100%'}}
                                 placeholder="Please select"
                                 disabled={interestDisabled}>{interests}</Select>
                     </Form.Item>

                     <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                         <Button type="primary" htmlType="submit">
                             Submit
                         </Button>
                     </Form.Item>
                 </Form>}
                 trigger="click"
                 visible={visible}
                 onVisibleChange={handleVisibleChange}>
            <span><PlusCircleOutlined/></span>Create
        </Popover>
    );

};
export default CreateRoom;


