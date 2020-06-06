import React, { useState } from "react";
import { connect } from "react-redux";
import { sendChannelMessage } from "../actions/index";

const MessageInput = (props) => {
  const [message, setMessage] = useState("");

  const postMessage = (e) => {
      e.preventDefault();
      props.postMessage([props.user, message]);
    setMessage("");
  };

  const messageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <div className="message-input-container">
        {/* <div className="shortcut-button"></div> */}
        <form onSubmit={postMessage}>
          <input
            className="message-input"
            onChange={messageChange}
            value={message}
            placeholder="Message #general"
          />
          {/* <button type="submit">Send Message</button> */}
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.userInfo.fullName
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => dispatch(sendChannelMessage(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
