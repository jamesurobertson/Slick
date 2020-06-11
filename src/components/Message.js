import React, {useState} from "react";
import { connect } from "react-redux";
import logo from "../profileImages/profile.jpeg";
import { Picker } from "emoji-mart";

const Message = (props) => {

    const {addEmoji} = props
    const [emojiShown, setEmojiShown] = useState(false)
  const openThread = (e) => {
    console.log("open thread");
  };

  const openEmoji = (e) => {
    console.log("open emoji");
    setEmojiShown(!emojiShown)
  };


  return (
    <>
      <img className="message-profile-pic" src={logo} alt="profile-pic" />
      <div className="message-content">
        {/* TODO: On timestamp hover show date */}
        <div className="messageSender">
          {props.displayName}
          <span className="message-timestamp"> {props.createdAt}</span>
        </div>
        <div className="messageContent">{props.message}</div>
      </div>
      <div className="messagePopup">
        <button
          onClick={openEmoji}
          className="message-popup-button emoji-button"
        >
          <i className="message-popup-emoji emoji-open far fa-laugh-wink"></i>
        </button>
        <button
          onClick={openThread}
          className="message-popup-button thread-button"
        >
          <i className="message-popup-emoji thread-open far fa-comment-dots"></i>
        </button>
      </div>
      <div className="message-emoji-picker">
        {emojiShown ? (
          <Picker
            emojiTooltip
            title="Slick Emojis for you"
            emoji="point_up"
            onSelect={addEmoji}
            autoFocus
            style={{ position: "absolute", top: '-445px', right: "10px" }}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default connect()(Message);
