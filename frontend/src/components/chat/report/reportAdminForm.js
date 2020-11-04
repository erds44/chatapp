import { Modal, Button } from 'antd';
import React, { useState } from "react";
import webSocket from "../../websocket/Websocket";
import { connect } from 'react-redux'

const ReportAdminForm = (props) => {
    const {visible, reason} = props.reportStore;
    const handleOk = e => {

    };

    const handleCancel = e => {

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
                <p>{reason}</p>
            </Modal>
        </div>
    );

}

const mapStateToProps = (state, ownProps) => {
    return { reportStore: state.report }
};

export default connect(mapStateToProps)(ReportAdminForm);