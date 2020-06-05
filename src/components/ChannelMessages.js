import React from 'react';
import { connect } from "react-redux";



const ChannelMessages = (props) => {

    const {messages} = props

    return (
        <div className='channel-messages-container'>
        {messages.map((message) => (
          <div className='channel-message' key={message}>James: {message}</div>
        ))}
      </div>
    )
}


const mapStateToProps = (state) => {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps)(ChannelMessages)
