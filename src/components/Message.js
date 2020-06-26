import React, { useState } from "react";
import { connect } from "react-redux";
// import { Picker } from "emoji-mart";
import Modal from "react-modal";
import ProfileCard from "./ProfileCard";
import EditProfile from "./EditProfile";
import { deleteMessage } from "../actions/index";

const Message = (props) => {
  const { profileImageUrl, deleteMessage, userId, sessionId } = props;
  const [emojiShown, setEmojiShown] = useState(false);
  const [profCardX, setprofCardX] = useState(null);
  const [profCardY, setprofCardY] = useState(null);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  Modal.setAppElement("#root");

  function closeUserCard() {
    setShowProfileCard(false);
  }

  function closeEditProfile() {
    setShowEditProfile(false);
  }

  const profileCardStyles = {
    content: {
      top: profCardY,
      left: profCardX,
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: "0",
      border: "none",
      borderRadius: "5px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.0)",
      zIndex: "1000",
    },
  };

  const editProfileCardStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: "1000",
    },
  };

  const deleteMessageHandler = (e) => {
    const messageId = e.target.parentNode.parentNode.parentNode.id;
    deleteMessage(messageId);
  };

  const editMessageHandler = (e) => {
    const messageId = e.target.parentNode.parentNode.parentNode.id;
    deleteMessage(messageId);
  };

  //   const openEmoji = (e) => {
  //     document.body.style.overflowY = 'hidden'

  //     setEmojiShown(!emojiShown);
  //   };

  const openProfileCard = (e) => {
    const rect = e.target.getBoundingClientRect();
    //429
    if (rect.y > 484) {
      setprofCardY(485);
    } else {
      setprofCardY(rect.y);
    }
    setprofCardX(rect.x + 45);
    setShowProfileCard(true);
  };

  const openEditProfile = () => {
    closeUserCard();
    setShowEditProfile(true);
  };

  //   const onEmojiPicked = (e) => {
  //     const emojiObj = {id: e.id, skin: e.skin}

  //     postReaction(emojiObj, props.messageId)
  //     setEmojiShown(!setEmojiShown)
  //     document.body.style.overflowY = 'visible'
  //   }

  return (
    <>
      <button className="profileCardButton" onClick={openProfileCard}>
        <img
          className="message-profile-pic"
          src={profileImageUrl}
          alt="profile-pic"
        />
      </button>
      <div className="message-content">
        {/* TODO: On timestamp hover show date */}
        <div className="messageSender">
          {props.displayName || props.fullName}
          <span className="message-timestamp"> {props.createdAt}</span>
        </div>
        <div className="messageContent">{props.message}</div>
      </div>
      <div className="messagePopup">
        <button className="message-popup-button emoji-button">
          <i className="message-popup-emoji emoji-open far fa-laugh-wink"></i>
        </button>
        {userId === parseInt(sessionId) ? (
          <button
            onClick={editMessageHandler}
            className="message-popup-button thread-button"
          >
            <i className="message-popup-emoji thread-open far fa-edit" />
          </button>
        ) : (
          ""
        )}
        {userId === parseInt(sessionId) ? (
          <button
            onClick={deleteMessageHandler}
            className="message-popup-button thread-button"
          >
            <i className="message-popup-emoji thread-open fas fa-times" />
          </button>
        ) : (
          ""
        )}

      </div>
      <div className="message-emoji-picker"></div>
      <Modal
        isOpen={showProfileCard}
        onRequestClose={closeUserCard}
        style={profileCardStyles}
        contentLabel="Example Modal"
      >
        <ProfileCard userId={userId} openEditProfile={openEditProfile} />
      </Modal>
      <Modal
        isOpen={showEditProfile}
        onRequestClose={closeEditProfile}
        style={editProfileCardStyles}
        contentLabel="Example Modal"
      >
        <EditProfile closeModal={closeEditProfile} />
      </Modal>
    </>
  );
};

const msp = (state) => {
  return {
    sessionId: state.session.currentUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMessage: (messageId) => dispatch(deleteMessage(messageId)),
  };
};

export default connect(msp, mapDispatchToProps)(Message);
