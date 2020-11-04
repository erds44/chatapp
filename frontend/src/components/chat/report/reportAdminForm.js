import { Modal, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

const ReportAdminForm = (props) => {
    const {isReportAdminVisible, reportedReason, reportedUsername} = props.reportStore;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(isReportAdminVisible);
    })
    const handleOk = e => {
        setVisible(false);
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

export default connect(mapStateToProps)(ReportAdminForm);