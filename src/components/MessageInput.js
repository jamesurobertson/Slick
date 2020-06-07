import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { sendChannelMessage } from "../actions/index";

const MessageInput = (props) => {
  const [message, setMessage] = useState("");

  const postMessage = (e) => {
      e.preventDefault();
      props.postMessage(message);
    setMessage("");
  };

  const messageChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    console.log(`mounted`)
  },[])

  console.log('it rerenders')

  return (
    <div className='message-input-container-outer'>
      <div className="message-input-container-inner">
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => dispatch(sendChannelMessage(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
