import { Modal, Button } from 'antd';
import React, { useState } from "react";
import webSocket from "../../websocket/Websocket";
import { Radio, Input } from 'antd';
import './reportForm.css'

const ReportForm = () => {

    const [visible, setVisible] = useState(true);
    const [value, setValue] = useState(1);

    const handleOk = e => {
        setVisible(false);

        webSocket.send(
            JSON.stringify({
                    command: "report",
                    body: {
                        reportedName: "test",
                        room: "1"
                    }
                }
            )
        )
    };

    const handleCancel = e => {
        setVisible(false);
    };

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };


    return (
        <div>
            <Modal
                title="Report"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Please Choose Your Reasons</p>
                <Radio.Group class="radio-group" onChange={onChange} value={value}>
                    <Radio  class="radio-option" value={1}>
                        Option A
                    </Radio>
                    <Radio  class="radio-option" value={2}>
                        Option B
                    </Radio>
                    <Radio  class="radio-option" value={3}>
                        Option C
                    </Radio>
                    <Radio  class="radio-option" value={4}>
                        More...
                        {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                    </Radio>
                </Radio.Group>
            </Modal>
        </div>
    );

}

export default ReportForm