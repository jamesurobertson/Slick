import React from 'react';
import { connect } from "react-redux";

const ChannelHeader = () => {
    return (
        <div className='channel-header'>
            <div className='channel__header-name'></div>
            <div className='chanel__header-info'></div>
        </div>
    )
}


export default connect()(ChannelHeader)
