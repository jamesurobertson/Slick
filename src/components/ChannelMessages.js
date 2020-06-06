import React, {useEffect, useRef} from 'react';
import { connect } from "react-redux";



const ChannelMessages = (props) => {

    const {messages} = props
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView()
    }
    useEffect(scrollToBottom, [messages])

    return (
        <div className='channel-messages-container'>
        {messages.map((message) => (
          <div className='channel-message' key={message}>{message[0]}: {message[1]}</div>
          ))}
          <div ref={messagesEndRef}/>
      </div>
    )
}


const mapStateToProps = (state) => {
    return {
        messages: state.messages
        // TODO set key for message.
    }
}

export default connect(mapStateToProps)(ChannelMessages)
