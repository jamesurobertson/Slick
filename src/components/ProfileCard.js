import React from "react";
import { connect } from "react-redux";

const ProfileCard = (props) => {
  const { users, userId, currentUser, openEditProfile} = props;
  const user = users[userId];

  const editProfile = (e) => {
    openEditProfile()
  };

  const messageUser = (e) => {
    console.log("message user!");
  };



  if (!currentUser || !userId) {
    return null;
  }
  return (
      <div className="procard-container">
        <img
          className="procard__procardImage"
          alt="Profile Card"
          src="http://localhost:8080/aws/get_file/img-1591895220578-403534187"
        />
        <div className="procard__userInfo">
          <div className="procard__fullName">{user.fullName}</div>
          <div className="procard__title">{user.title}</div>
        </div>
        <div className="procard__buttons">
          <button
            onClick={messageUser}
            className="procard__button procard__message-button"
          >
            Message
          </button>
          {currentUser == userId ? (
            <button
              onClick={editProfile}
              className="procard__button procard__editProfile-button"
            >
              Edit Profile
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    currentUser: state.session.currentUserId,
  };
};

export default connect(mapStateToProps)(ProfileCard);
