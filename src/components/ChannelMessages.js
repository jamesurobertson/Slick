import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import MessageInput from "./MessageInput";
import logo from "../profileImages/profile.jpeg";

const ChannelMessages = (props) => {
  const { messages } = props;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };
  useEffect(scrollToBottom, [messages]);
  let count = 0;
  console.log(`img`, props.profilePic);
  return (
    <div className="channel-primary-view">
      <div className="channel-messages-container">
        {messages.map((message) => (
          <div className="channel-message" key={++count}>
            <img className="message-profile-pic" src={logo} alt="profile-pic" />
            <div className="message-content">
                <div className='messageSender'>{props.displayName}
                </div>
                <div className='messageContent'>{message}</div>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    profilePic: state.userInfo.profilePic,
    displayName: state.userInfo.displayName || state.userInfo.fullName

  };
};

export default connect(mapStateToProps)(ChannelMessages);
