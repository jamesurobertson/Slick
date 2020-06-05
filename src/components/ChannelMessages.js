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
          <div className='channel-message' key={message}>Ben: {message}</div>
          ))}
          <div ref={messagesEndRef}/>
      </div>
    )
}


const mapStateToProps = (state) => {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps)(ChannelMessages)