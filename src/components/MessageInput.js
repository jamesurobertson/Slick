import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { postChannelMessage } from "../actions/index";

const MessageInput = (props) => {
  const {channelId, postChannelMessage, channels, dName} = props
  const [message, setMessage] = useState("");
  const [channelName, setChannelName] = useState('')

  const postMessage = (e) => {
    e.preventDefault();
    if (message === "") return;
    const displayName = dName.userInfo.displayName
    postChannelMessage(message, channelId[0], displayName);

    setMessage("");
  };

  const messageChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
      let vals = Object.values(channels)
      for (let i = 0; i < vals.length; i++) {
          if (parseInt(channelId) === vals[i].id) {
              setChannelName(vals[i].name)
          }
      }
  },[channels, channelName, channelId])


  return (
    <div className="message-input-container-outer">
      <div className="message-input-container-inner">
        {/* <div className="shortcut-button"></div> */}
        <form onSubmit={postMessage}>
          <input
            className="message-input"
            onChange={messageChange}
            value={message}
            placeholder={`Message ${channelName}`}
          />
          {/* <button type="submit">Send Message</button> */}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    channelId: state.session.activeChannel,
    channels: state.channels,
    dName: state.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postChannelMessage: (content,channelId, userId, displayName) => dispatch(postChannelMessage(content,channelId, userId, displayName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
