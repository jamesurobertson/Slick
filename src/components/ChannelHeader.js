import React from 'react';
import { connect } from "react-redux";

const ChannelHeader = (props) => {
    return (
        <div className='channel-header'>
            <div className='channel__header-name'>{props.channel[1]}</div>
            <div className='chanel__header-info'>Info</div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        channel: state.session.activeChannel
    }
}

export default connect(mapStateToProps)(ChannelHeader)
