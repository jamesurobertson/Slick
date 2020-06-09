import React, { useState } from "react";
import { connect } from "react-redux";
import { postChannelMessage } from "../actions/index";

const MessageInput = (props) => {
    const {messages, channelId, postChannelMessage} = props
  const [message, setMessage] = useState("");

  const postMessage = (e) => {
    e.preventDefault();
    if (message === "") return;
    postChannelMessage(message, channelId,localStorage.getItem('SLICK_CURRENT_USER_ID'));
    setMessage("");
  };

  const messageChange = (e) => {
    setMessage(e.target.value);
  };


  return (
    <div className="message-input-container-outer">
      <div className="message-input-container-inner">
        {/* <div className="shortcut-button"></div> */}
        <form onSubmit={postMessage}>
          <input
            className="message-input"
            onChange={messageChange}
            value={message}
            placeholder={`Message ${channelId}`}
          />
          {/* <button type="submit">Send Message</button> */}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    channelId: state.session.activeChannel
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postChannelMessage: (content,channelId, userId) => dispatch(postChannelMessage(content,channelId, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
