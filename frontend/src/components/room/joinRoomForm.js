import {Modal, Button, Space} from 'antd';

const JoinedRoomForm = () => {

    function success() {
        Modal.success({
            content: 'some messages...some messages...',
        });
    }

    function error() {
        Modal.error({
            title: 'This is an error message',
            content: 'some messages...some messages...',
        });
    }

    function warning() {
        Modal.warning({
            title: 'This is a warning message',
            content: 'some messages...some messages...',
        });
    }

    return (
        <Space>
            <Button onClick={success}>Success</Button>
        </Space>
    );

}
export default JoinedRoomForm;
