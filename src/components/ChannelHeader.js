import React from 'react';
import { connect } from "react-redux";

const ChannelHeader = () => {
    return (
        <div className='channel-header'>
            <div className='channel__header-name'>Name</div>
            <div className='chanel__header-info'>Info</div>
        </div>
    )
}


export default connect()(ChannelHeader)
