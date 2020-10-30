import { Popover, Button, Input, Space } from 'antd';


const inviteForm = () =>{

    const content = (
        <Space align="center">
            <Input placeholder="Username" />
            <Button  type="primary" >Invite</Button>
        </Space>
    );

    return (
        <Popover content={content} title="Invite your friend!" trigger="click">
            <Button>Click me to invite</Button>
        </Popover>
    );

}


export default inviteForm