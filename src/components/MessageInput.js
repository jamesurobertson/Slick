import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { postChannelMessage } from "../actions/index";
import { Picker } from "emoji-mart";

const MessageInput = (props) => {
  const { channelId, postChannelMessage, userInfo, channelName } = props;
  const [message, setMessage] = useState("");
  const [emojiActive, setEmojiActive] = useState(false);

  const messageInput = useRef(null)

  const postMessage = (e) => {
    e.preventDefault();
    if (message === "") return;
    const displayName = userInfo.userInfo.displayName;
    const fullName = userInfo.userInfo.fullName;
    const profileImageUrl = userInfo.userInfo.profileImageUrl
    postChannelMessage(message, channelId[0], displayName, fullName, profileImageUrl);

    setMessage("");
  };

  const messageChange = (e) => {
    setMessage(e.target.value);
  };

  const pickEmoji = (e) => {
    e.preventDefault();
    setEmojiActive(!emojiActive);
  };

  const addEmoji = (e) => {
    setMessage(message + e.native);
    setEmojiActive(!emojiActive);
  };

  useEffect(() => {
    messageInput.current.focus()
  })

  return (
    <div className="message-input-container-outer">
      <div className="message-input-container-inner">
        <form className="message-form" onSubmit={postMessage}>
          <input
            ref={messageInput}
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
    channelName: state.session.activeChannel[1],
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postChannelMessage: (content, channelId, displayName, fullName, profilePic) =>
      dispatch(postChannelMessage(content, channelId, displayName, fullName, profilePic)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
