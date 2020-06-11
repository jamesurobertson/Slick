import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { postChannelMessage } from "../actions/index";
import { Picker } from "emoji-mart";

const MessageInput = (props) => {
  const { channelId, postChannelMessage, channels, userInfo } = props;
  const [message, setMessage] = useState("");
  const [channelName, setChannelName] = useState("");
  const [emojiActive, setEmojiActive] = useState(false);

  const postMessage = (e) => {
    e.preventDefault();
    if (message === "") return;
    const displayName = userInfo.userInfo.displayName;
    const profileImageUrl = userInfo.userInfo.profileImageUrl
    postChannelMessage(message, channelId[0], displayName, profileImageUrl);

    setMessage("");
  };

  const messageChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    let vals = Object.values(channels);
    for (let i = 0; i < vals.length; i++) {
      if (parseInt(channelId) === vals[i].id) {
        setChannelName(vals[i].name);
      }
    }
  }, [channels, channelName, channelId]);

  const pickEmoji = (e) => {
    e.preventDefault();
    setEmojiActive(!emojiActive);
  };

  const addEmoji = (e) => {
    setMessage(message + e.native);
    setEmojiActive(!emojiActive);
  };

  return (
    <div className="message-input-container-outer">
      <div className="message-input-container-inner">
        <form className="message-form" onSubmit={postMessage}>
          <input
            className="message-input"
            onChange={messageChange}
            value={message}
            placeholder={`Message ${channelName}`}
          />
        </form>
        <div className="message-button-container">
          <button className="emojiButton" onClick={pickEmoji}>
            <i className="far fa-laugh"></i>
          </button>
        </div>
        <div>
          {emojiActive ? (
            <Picker
              emojiTooltip
              title="Slick Emojis for you"
              emoji="point_up"
              onSelect={addEmoji}
              autoFocus
              style={{ position: "absolute", bottom: "51px", right: "6px" }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    channelId: state.session.activeChannel,
    channels: state.channels,
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postChannelMessage: (content, channelId, userId, displayName) =>
      dispatch(postChannelMessage(content, channelId, userId, displayName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
