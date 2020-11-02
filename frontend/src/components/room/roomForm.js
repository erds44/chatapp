import {Form, Input, Switch, Select, Button, Popover, Menu} from 'antd';
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
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const RoomForm = (props) => {
    const interests = [];
    const {Option} = Select;
    const {visible, setVisible} = props;

    for (let i = 1; i < 10; i++) {
        interests.push(<Option key={i}>{"Interest " + i}</Option>);
    }

    //const [visible, setVisible] = useState(false);


    const onFinish = (values) => {
        webSocket.send(JSON.stringify(values));
        setVisible(false);
    };

    const handleVisibleChange = visible => {
        setVisible(visible);
    };

    const hide = () => {
        setVisible(false);
    };

    return (
        <Popover placement="rightTop" title={"Create Room"}
                 content={<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
                                style={{outerWidth: "500"}}>
                     <Form.Item name={['user', 'name']}
                                label="Name"
                                rules={[{required: true}]}><Input/>
                     </Form.Item>
                     <Form.Item name="switch" label="Private" valuePropName="checked"><Switch/>
                     </Form.Item>
                     <Form.Item name={['user', 'interest']}
                                label="Interests">
                         <Select mode="multiple"
                                 allowClear
                                 style={{width: '100%'}}
                                 placeholder="Please select">{interests}</Select>
                         <br/>
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
export default RoomForm;
