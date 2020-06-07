import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import MessageInput from "./MessageInput";

const ChannelMessages = (props) => {
  const { messages } = props;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };
  useEffect(scrollToBottom, [messages]);
  let count = 0;
  return (
    <div className='channel-primary-view'>
      <div className="channel-messages-container">
        {messages.map((message) => (
          <div className="channel-message" key={++count}>
            Ben: {message}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
      <MessageInput/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
  };
};

export default connect(mapStateToProps)(ChannelMessages);
