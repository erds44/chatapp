import { Modal, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import webSocket from "../../websocket/Websocket";

const ReportAdminForm = (props) => {
    const {isReportAdminVisible, reportedReason, reportedUsername, reportedRoom} = props.reportStore;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(isReportAdminVisible);
    }, [props.reportStore])

    const handleOk = e => {
        setVisible(false);
        webSocket.send(
            JSON.stringify({
                    command: "ban",
                    body: {
                        username: reportedUsername.trim(),
                        room: reportedRoom.trim()
                    }
                }
            )
        )
    };

    const handleCancel = e => {
        setVisible(false);
    };

    return (
        <div>
            <Modal
                title="Handle Report Message"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={"Approve"}
                cancelText={"Disapprove"}
            >
                <p>Reported User: {reportedUsername}</p>
                <p>{reportedReason}</p>
            </Modal>
        </div>
    );

}

const mapStateToProps = (state, ownProps) => {
    return { reportStore: state.report }
};

export default connect(mapStateToProps, {})(ReportAdminForm);