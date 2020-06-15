import React from "react";
import { connect } from "react-redux";
import {changeChannel, postAddDm} from '../actions/index'

const ProfileCard = (props) => {
  const { users, userId, currentUser, openEditProfile, channels, postAddDm, changeChannel} = props;
  const user = users[userId];

  const editProfile = (e) => {
    openEditProfile()
  };

  const messageUser = (e) => {
    let hasDm
    for (let i = 0; i < Object.values(channels).length; i++) {
        const name = Object.values(channels)[i].name
        const channelId = Object.values(channels)[i].id
        if (name === `- ${user.id} ${currentUser}`) {
            hasDm = [channelId, user.fullName]
            break
        } else if (name === `- ${currentUser} ${user.id}`) {
            hasDm = [channelId, user.fullName]
            break
        }
    }

    if (hasDm) {
        changeChannel(hasDm)
    } else {
        postAddDm(user.id)
    }
  };



  if (!currentUser || !userId) {
    return null;

  }
  return (
      <div className="procard-container">
        <img
          className="procard__procardImage"
          alt="Profile Card"
          src={user.profileImageUrl}
        />
        <div className="procard__userInfo">
          <div className="procard__fullName">{user.fullName}</div>
          <div className="procard__title">{user.title}</div>
        </div>
        <div className="procard__buttons">
          {parseInt(currentUser) === parseInt(userId) ? (
            <button
              onClick={editProfile}
              className="procard__button procard__editProfile-button"
            >
              Edit Profile
            </button>
          ) : (
            <button
            onClick={messageUser}
            className="procard__button procard__message-button"
          >
            Message
          </button>
          )}
        </div>
      </div>

  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    currentUser: state.session.currentUserId,
    channels: state.channels,
  };
};

const mapDispatchToProps = dispatch => {
    return {
        changeChannel: (channel) => dispatch(changeChannel(channel)),
        postAddDm: (toMessageId) => dispatch(postAddDm(toMessageId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
