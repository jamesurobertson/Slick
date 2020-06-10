import React from 'react';
import ChannelHeader from './ChannelHeader.js'
import ChannelMessages from './ChannelMessages.js'
import { connect } from "react-redux";



const Channel = (props) => {

    return (
        <div className='channel-container'>
            <ChannelHeader/>
            <ChannelMessages/>

        </div>
    )
}


export default connect()(Channel)
