import React, { useState } from "react";
import { connect } from "react-redux";
import { sendChannelMessage } from "../actions/index";

const MessageInput = (props) => {
  const [message, setMessage] = useState("");

  const { messages } = props;

  const postMessage = (e) => {
    e.preventDefault();
    props.dispatch(sendChannelMessage(message));
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
  };
};

export default connect(mapStateToProps)(MessageInput);
