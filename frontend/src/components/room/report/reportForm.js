import { Modal, Button } from 'antd';
import React, { useState } from "react";
import webSocket from "../../websocket/Websocket";
import { Radio, Input } from 'antd';
import './reportForm.css'
import {reportReasons} from './constant'

const ReportForm = (props) => {
    const [value, setValue] = useState(undefined);
    const [checkedReason, setCheckedReason] = useState("");
    const [okButtonDisabled, setOkButtonDisabled]  = useState(true);
    const {report, setReport} = props;

    const handleOk = () => {
       setReport({...report, visible: false})
        webSocket.send(
            JSON.stringify({
                    command: "report",
                    body: {
                        reportedUsername: report.reportName.trim(),
                        reportedReason: checkedReason,
                        reportedRoom: report.reportRoom.trim(),
                    }
                }
            )
        )
    };

    const handleCancel = () => {
        setReport({...report, visible: false})
    };

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setOkButtonDisabled(false);
        setValue(e.target.value);

        if (e.target.value !== 3) {
            setCheckedReason(reportReasons[e.target.value]);
        }
    };

    const onChangeInput = e => {
        console.log('input', e.target.value);

        if (value === 3) {
            setCheckedReason(e.target.value);
        }
    };

    return (
        <div>
            <Modal
                title="Report"
                visible={report.visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{disabled: okButtonDisabled}}
            >
                <p>Please Choose Your Reasons</p>
                <Radio.Group class="radio-group" onChange={onChange} value={value}>
                    <Radio  class="radio-option" value={0}>
                        {reportReasons[0]}
                    </Radio>
                    <Radio  class="radio-option" value={1}>
                        {reportReasons[1]}
                    </Radio>
                    <Radio  class="radio-option" value={2}>
                        {reportReasons[2]}
                    </Radio>
                    <Radio  class="radio-option" value={3}>
                        More...
                        {value === 3 ? <Input style={{ width: 100, marginLeft: 10 }} onChange={onChangeInput} /> : null}
                    </Radio>
                </Radio.Group>
            </Modal>
        </div>
    );

}

export default ReportForm