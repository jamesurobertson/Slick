import React from 'react';
import MessageInput from './MessageInput';
import ChannelHeader from './ChannelHeader.js'
import ChannelMessages from './ChannelMessages.js'
import { connect } from "react-redux";



const Channel = (props) => {

    return (
        <div className='channel-container'>
            <ChannelHeader/>
            <ChannelMessages/>
            <div className='channel-input-container'>
            <MessageInput/>
            </div>

        </div>
    )
}


export default connect()(Channel)
