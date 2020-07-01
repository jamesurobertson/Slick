import React from "react";
import {connect} from 'react-redux'
import {postAddDm, changeChannel} from '../actions/index'

const UserCard = (props) => {
  const {
    user: { fullName, title, displayName, profileImageUrl, id },
    postAddDm,
    closeDmModal,
    channels,
    currentUser,
    users,
    changeChannel,
  } = props;


  const addDm = (e) => {
    const userToMessageId = e.currentTarget.id.split('-')[1]
    const user = users[userToMessageId]

    let hasDm
    console.log(userToMessageId)
    for (let i = 0; i < Object.values(channels).length; i++) {
        const name = Object.values(channels)[i].name
        const channelId = Object.values(channels)[i].id
        if (name === `- ${userToMessageId} ${currentUser}`) {
            hasDm = [channelId, user.fullName]
            break
        } else if (name === `- ${currentUser} ${userToMessageId}`) {

            hasDm = [channelId, user.fullName]
            break
        }
    }

    console.log(hasDm)

    if (hasDm) {
        changeChannel(hasDm)
    } else {
        postAddDm(userToMessageId)
    }


    closeDmModal()
  }

  return (
    <div id={`userCard-${id}`} onClick={addDm} className="userCardContainer">
      <img className="userCard-image" src={profileImageUrl} alt="profile" />
      <div className="userCardUserInfo">
        <div className="userCard-names">
          <div className="userCard-displayName">{displayName}</div>
          <div className="userCard-fullName">{fullName}</div>
        </div>
        <div className="userCard-title">{title}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
    return {
        channels: state.channels,
        currentUser: state.session.currentUserId,
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postAddDm: (toMessageId) => dispatch(postAddDm(toMessageId)),
        changeChannel: (channel) => dispatch(changeChannel(channel)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
